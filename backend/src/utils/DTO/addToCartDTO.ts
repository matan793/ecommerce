import { isInt, IsInt } from "class-validator";

export class AddToCartDTO {
    @IsInt()
    productId: number;
    @IsInt()
    quantity: number;
}