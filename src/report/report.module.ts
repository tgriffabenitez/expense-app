import { Module } from "@nestjs/common";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

@Module({
  controllers: [ReportController],
  providers: [ReportService],

  // exporto el service y el controller para usarlo en otros modulos
  exports: [ReportService],
})
export class ReportModule {}
