import { Injectable } from "@nestjs/common";
import { ReportType } from "src/data";
import { ReportService } from "src/report/report.service";

@Injectable()
export class SummaryService {
  /**
   * Para poder inyectar el report.service en este service, primero
   * tengo que importarlo en el summary.module, sino no se puede
   * inyectar
   */
  constructor(private readonly reportService: ReportService) {}

  calculateSummary() {
    const totalExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0);

    const totalIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);

    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
