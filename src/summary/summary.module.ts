import { Module } from "@nestjs/common";
import { SummaryController } from "./summary.controller";
import { SummaryService } from "./summary.service";
import { ReportModule } from "src/report/report.module";

@Module({
  imports: [ReportModule], // importo el modulo entero (services y controllers)
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}