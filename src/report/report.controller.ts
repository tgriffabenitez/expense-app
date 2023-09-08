import {
  Controller,
  Param,
  Body,
  HttpCode,
  Get,
  Post,
  Delete,
  Put,
  ParseUUIDPipe,
  ParseEnumPipe,
} from "@nestjs/common";
import { ReportType, data } from "src/data";
import { ReportService } from "./report.service";
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from "src/dto/report.dto";

/**
 * Haciendo dinamico el punto de entrada, puedo hacer que los
 * endpoints funcionen tanto con report/income como con report/expense
 */
@Controller("report/:type")
export class ReportController {
  // "inyecto" el servicio dentro del contructor
  constructor(private readonly reportService: ReportService) {}

  /**
   * Para poder validar el tipo de endpoint (income/expense) lo podemos
   * validar con el ParseEnumPipe. Este es distinto a los otros, ya que lo
   * tenemos que instanciar y pasarle el tipo de enum con el cual tiene que
   * comparar.
   */
  @Get()
  getAllReports(
    @Param("type", new ParseEnumPipe(ReportType)) type: string
  ): ReportResponseDto[] {
    // obtengo el valor del parametro y lo comparo con el enum
    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  /**
   * Con el ParseUUIDPipe dentro del param especifico que el valor del id se va a
   * castear al tipo uuid, en caso que no sea correcto el valor ingresado por parametro
   * arrojara un error. (Es una forma de validar )
   */
  @Get(":id")
  getReportById(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Param("id", ParseUUIDPipe) id: string
  ): ReportResponseDto {
    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  addReport(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Body() { amount, source }: CreateReportDto
  ): ReportResponseDto {
    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.createReport(reportType, { amount, source });
  }

  @Put(":id")
  updateReport(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto
  ): ReportResponseDto {
    const reportType =
      type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(reportType, body, id);
  }

  @Delete(":id")
  deleteReport(@Param("id", ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
