import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CustomInterceptor } from "./custom.interceptor";
import { SummaryModule } from './summary/summary.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [SummaryModule, ReportModule],

  controllers: [AppController],

  // Los proveedores son clases o objetos que se pueden inyectar en otros componentes
  // de la aplicación.
  providers: [
    AppService,
    // Configura un interceptor global para la aplicacion. Los interceptores son clases
    // que se utilizan para manipular las solicitudes y respuestas HTTP en la aplicacion.
    {
      // Proporciona el nombre del interceptor que se utilizará.
      provide: APP_INTERCEPTOR,

      // Especifica la clase del interceptor que se utilizará. En este caso, es
      // "ClassSerializerInterceptor".
      useClass: ClassSerializerInterceptor,

      // Descomentando la linea de abajo uso el interceptor que hice en el
      // en el archivo custom.interceptor.ts
      //useClass: CustomInterceptor,
    },
  ],
})
export class AppModule {}
