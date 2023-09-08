import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { ReportType } from "src/data";
import { Exclude, Expose } from "class-transformer";

/**
 * Creo un DTO para que sea mas facil la verificacion de los datos
 * ingesados por el usuario, aca dentro tambien puedo validar
 * los campos que se van a crear.
 */
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

/**
 * Creo un nuevo dto para poder hacer un update, esto es necesario
 * ya que a diferencia de cuando creo uno, los campos ahora
 * no son necesarios, es decir, puedo modificar el source
 * o el precio o ambos campos a la vez
 */
export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

/**
 * Este dto se va a usar para devolverle la informacion al usuario.
 * El dto anterior era para recibir informacion del body, este es
 * para devolverla
 */
export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;
  type: ReportType;

  // como le quiero cambiar el nombre en el json excluyo este parametro
  // y paso el otro con el nuevo nombre
  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  // De esta forma se le puede cambiar el nombre del parametro
  // en el json del response.
  @Expose({ name: "created_at" })
  transformCreatedAt() {
    return this.createdAt;
  }
  /**
   * Este constructor se utiliza para inicializar la clase 'ReportResponseDto'
   * desde un servicio. Permite recibir como parámetro un objeto de tipo
   * 'Partial<ReportResponseDto>', lo que significa que puede contener algunos o todos los
   * atributos de la clase.
   *
   * @param partial Un objeto parcial que puede incluir algunos o todos los atributos de
   *                'ReportResponseDto'.
   */
  constructor(partial: Partial<ReportResponseDto>) {
    // une las clases, pisa valores si son repetidos o los deja sin modificar
    Object.assign(this, partial);
  }
}
