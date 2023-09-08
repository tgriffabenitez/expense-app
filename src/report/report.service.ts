import { Injectable } from "@nestjs/common";
import { ReportType, data } from "../data";
import { v4 as uuid } from "uuid";
import { ReportResponseDto } from "../dto/report.dto";

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    // devuelvo solo los registros donde el valor del enum coincide con el del registro
    // y los transformo al tipo de dato ReportResponseDto
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    // primero busco todos los registros que coinciden con el parametro del tipo
    // luego, de todos esos registros, busco el que coincide con el id pasado
    const report = data.report
      .filter((report) => report.type == type)
      .find((report) => report.id === id);

    return new ReportResponseDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: Report
  ): ReportResponseDto {
    // Con los datos del body creo un nuevo objeto para luego agregarlo a la lista
    const newReport = {
      id: uuid(),
      source,
      amount,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    body: UpdateReport,
    id: string
  ): ReportResponseDto {
    // busco el registro existente en la lista
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    // si no existe el reporte salgo
    if (!reportToUpdate) return;

    // busco el indice del objeto encontrado
    const reportIndex = data.report.findIndex((report) => report.id === id);

    /**
     * Se actualiza un registro en la lista 'data.report' en la posicion 'reportIndex'.
     * Para hacerlo, se sigue el siguiente proceso:
     *
     * 1. Se crea una copia superficial del objeto existente en 'data.report[reportIndex]'
     *    utilizando el operador "spread" ({ ...data.report[reportIndex]}).
     *    Esto asegura que el objeto original no se modifique directamente y que los cambios
     *    se realicen en una copia.
     *
     * 2. Se copian las propiedades del objeto 'body' en la copia del objeto original.
     *    Si existen propiedades con los mismos nombres tanto en 'body' como en el objeto
     *    original, las propiedades en 'body' sobrescribiran las del objeto original.
     *
     * 3. Se agrega una nueva propiedad llamada 'updatedAt' al objeto copiado, y se le asigna
     *    el valor actual de la fecha y hora, obtenido mediante 'new Date()'.
     */
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updatedAt: new Date(),
    };

    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    // Busco la posicion del objeto qu estoy buscando
    const reportIndex = data.report.findIndex((report) => report.id === id);

    // si no se encuentra el objeto, findindex devuelve -1
    if (reportIndex === -1) return;

    // elimino 1 objeto del array que esta en la posicion reportIndex
    data.report.splice(reportIndex, 1);

    return;
  }
}
