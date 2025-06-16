import { IsInt, IsNumber, IsString, Min } from "class-validator";

export class ProductDTO {

    @IsString()
    name: string;

    @IsString()
    description;

    @IsInt()
    brandId: number;

    @IsNumber()
    price: number;

    imageUrl: string;

    @IsInt()
    @Min(0)
    stockQuantity: number;

    @IsInt()
    categoryId: number;
}