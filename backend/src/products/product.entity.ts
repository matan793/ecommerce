import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("products")
export class Product{
    @PrimaryGeneratedColumn()
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