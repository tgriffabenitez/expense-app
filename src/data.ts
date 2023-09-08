import { v4 as uuid } from "uuid";

/**
 * Defino una interfaz llamada Data.
 * Las interfaces se utilizan para definir la estructura que debe seguir un objeto.
 * En este caso, la interfaz Data define un objeto que contiene una propiedad llamada
 * report, que es una lista de objetos con ciertas propiedades especificas.
 */
interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    type: ReportType; // solo estos valores son validos
  }[];
}

/**
 * se define un enumerado llamado ReportType. Los enumerados son una forma de definir
 * un conjunto fijo de valores constantes. En este caso, se definen dos valores
 * posibles: INCOME y EXPENSE, que representan los tipos de informes.
 */
export enum ReportType {
  INCOME = "income",
  EXPENSE = "expense",
}

/**
 * Se crea una constante llamada data que sigue la estructura definida en la
 * interfaz Data. Esto significa que data debe tener una propiedad report, que es
 * una lista de objetos. Por defecto, se inicializa con una lista vacia ([]).
 */
export const data: Data = {
  report: [
    {
      id: uuid(),
      source: "Salary",
      amount: 7500,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: uuid(),
      source: "Expense",
      amount: 5500,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.EXPENSE,
    },
    {
      id: "uuid3",
      source: "Youtube",
      amount: 10000,
      createdAt: new Date(),
      updatedAt: new Date(),
      type: ReportType.INCOME,
    },
  ],
};
