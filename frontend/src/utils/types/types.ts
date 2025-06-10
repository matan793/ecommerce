export interface UserType {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    createdAt: Date;
}
export interface BrandType {
    id: number;
    name: string;
    description?: string;
    poducts: ProductType[];
}

export enum ParfumeGenderType {
    male="male",
    female="female",
    unisex="unisex"
}
export interface ProductType {
    id: string;
    name: string;
    brand: BrandType;
    price: number;
    imageUrl: string;
    description?: string;
}