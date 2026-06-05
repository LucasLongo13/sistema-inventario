import { IsEnum } from "class-validator";
import { MovementType } from "@prisma/client";

export class CreateCategoryDto {

    @IsEnum (MovementType, {message: 'movementType must be either "IN" or "OUT"'})
    type: MovementType;
}
