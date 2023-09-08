import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from "rxjs";
import { data } from "./data";

// Define una clase llamada "CustomInterceptor" que implementa la interfaz "NestInterceptor".
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    /**
     * Intercepta las solicitudes HTTP antes de que lleguen a los controladores.
     * Todo lo que esté fuera del método pipe() en esta función manejará las
     * solicitudes entrantes.
     */
    console.log("Intercepto el request");
    console.log({ context });

    /**
     * Intercepta las respuestas HTTP antes de que se envíen al cliente.
     * Todo lo que esté dentro del método pipe() en esta función manejará
     * las respuestas salientes.
     *
     * En este caso quiero por ejemplo modificar el json de salida cambiando
     * el nombre del parametro createdAt por created_at y eliminando
     * el campo udatedAt.
     */
    return handler.handle().pipe(
      map((data) => {
        console.log("Intercepto el response");
        console.log({ data });

        const response = {
          ...data,
          created_at: data.createdAt,
        };
        delete response.updatedAt;
        delete response.createdAt;

        return response;
      })
    );
  }
}
