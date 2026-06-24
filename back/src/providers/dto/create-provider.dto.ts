import { IsNotEmpty, IsString } from "class-validator";

export class CreateProviderDto {
    @IsNotEmpty({ message: 'El nombre del proveedor es obligatorio' })
    @IsString({ message: 'El nombre del proveedor debe ser una cadena de texto' })
    name!: string;
}
