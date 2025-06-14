import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from 'src/orders/orders.entity';
import { Product } from 'src/products/product.entity';

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.orderItems)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ type: 'integer' })
    quantity: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    unitPrice: number;
}