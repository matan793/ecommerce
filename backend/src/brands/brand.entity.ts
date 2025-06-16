import { Product } from "src/products/product.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'brands' })
export class Brand {

    @PrimaryGeneratedColumn()
    brandId: number;
    
    @Column({nullable: false})
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];

    @Column()
    imageUrl: string;

}