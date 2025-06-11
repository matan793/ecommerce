import { Product } from "src/products/product.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryColumn()
    userId: number;
    @PrimaryColumn()
    productId: number;

    @ManyToOne(() => User, user => user.cart, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Product, product => product.cartItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ default: 1, nullable: false })
    quantity: number;
} 