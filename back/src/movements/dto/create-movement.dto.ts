import { MovementType } from "@generated";
import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsPositive, Min } from "class-validator";

export class CreateMovementDto {
    @IsEnum(MovementType, { message: 'El tipo de movimiento no es válido' })
    type!: MovementType;

    @IsDateString({strict: true }, { message: 'La fecha no es válida' })
    date!: string;

    @Type(() => Number)
    @IsPositive({ message: 'El cantidad debe ser un número entero positivo o cero' })
    amount!: number;

    @IsNotEmpty({ message: 'El precio unitario es obligatorio' })
    @Type(() => Number)
    @IsPositive({ message: 'El precio unitario debe ser un número entero positivo o cero' })
    priceUnit!: number;

    @IsNotEmpty({ message: 'El producto es obligatorio' })
    @Type(() => Number)
    @IsInt({ message: 'El ID del producto no es válido' })
    @Min(0, { message: 'El ID del producto no puede ser negativo' })
    productId!: number;

    @IsNotEmpty({ message: 'El usuario es obligatorio' })
    @Type(() => Number)
    @IsInt({ message: 'El ID del usuario no es válido' })
    @Min(0, { message: 'El ID del usuario no puede ser negativo' })
    userId!: number;
}
