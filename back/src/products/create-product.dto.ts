import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive, IsString, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'priceUnit must be a number' })
  @IsPositive()
  priceUnit!: number;

  @Type(() => Number)
  @IsInt()
  stock!: number;

  @Type(() => Number)
  @IsInt()
  categoryId!: number;
}
