import { Product } from "src/products/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column({nullable: false, unique: true})
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}