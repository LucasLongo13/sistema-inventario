import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
    name!: string;

    @IsNotEmpty({ message: 'El stock del producto es obligatorio' })
    @IsInt({ message: 'El stock del producto no es válido' })
    @Type(() => Number)
    stock!: number;

    @IsNotEmpty({ message: 'El precio unitario del producto es obligatorio' })
    @Type(() => Number)
    @IsPositive({ message: 'El precio unitario del producto debe ser un número entero positivo o cero' })
    priceUnit!: number;

    @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
    @Type(() => Number)
    @IsPositive({ message: 'El ID de la categoría debe ser un número entero positivo o cero' })
    categoryId!: number;
}
