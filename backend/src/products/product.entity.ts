import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity("products")
export class Product{
    @PrimaryColumn()
    productId: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column()
    description: string;

    @Column()
    brandId: number;

    @Column({
        nullable: false
    })
    price: number;

    @Column()
    imageUrl: string;

    @Column({
        nullable: false
    })
    stockQuantity: number;

    @Column()
    categoryId: number
} 