import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // solo se permiten los parametros que estan definidos en el dto
      // si se llega a agregar un parametro nuevo desde el cliente se ignora
      whitelist: true,

      // permite que ValidationPipe transforme automáticamente los datos de
      // entrada según las reglas de transformación definidas en los DTO
      transform: true,

      // Esta opción se usa para habilitar la conversión implícita.
      // La conversión implícita significa que ValidationPipe intentará
      // realizar conversiones automáticas de tipos de datos para que los
      // valores coincidan con los tipos definidos en el DTO. Por ejemplo,
      // si se espera un valor booleano en el DTO y se recibe una cadena
      // que representa "true" o "false", ValidationPipe intentará
      // convertirla en un valor booleano automáticamente.
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  ); // permite usar las validaciones de los dtos
  await app.listen(3000);
}
bootstrap();
