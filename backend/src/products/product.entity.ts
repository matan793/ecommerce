import { Brand } from 'src/brands/brand.entity';
import { ParfumeGender } from 'src/utils/types/parfumeGender';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn('increment')
    productId: number;

    @Column({
        nullable: false
    })
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Brand, (brand) => brand.products, {
        onDelete: 'CASCADE',
        
    })
    @JoinColumn({ name: 'brand_id' })
    brand: Brand;

    @Column({
        nullable: false
    })
    price: number;

    @Column()
    imageUrl: string;

    @Column({
        nullable: false,
        type: "enum",
        enum: ParfumeGender,
        default: ParfumeGender.unisex,
    })
    gender: ParfumeGender;

    @Column({
        nullable: false
    })
    stockQuantity: number;

    @Column()
    categoryId: number;
} 