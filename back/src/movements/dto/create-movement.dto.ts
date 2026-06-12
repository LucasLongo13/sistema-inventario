import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsPositive,
} from 'class-validator';

export enum MovementType {
  INGRESO = 'INGRESO',
  EGRESO = 'EGRESO',
}

export class CreateMovementDto {
  @IsEnum(MovementType)
  @IsNotEmpty()
  type!: MovementType;

  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  amount!: number;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  priceUnit!: number;

  @Type(() => Number)
  @IsInt()
  userId!: number;

  @Type(() => Number)
  @IsInt()
  productId!: number;
}
