import { Address } from "src/addresses/addresses.entity";
import { OrderItem } from "src/orderItems/orderItems.entity";
import { Payment } from "src/payments/payments.entity";
import { User } from "src/users/users.entity";
import { OrderStatus } from "src/utils/types/orderStatust";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.pending, nullable: false })
    status: OrderStatus;

    @Column({ nullable: false })
    totalAmount: number

    @ManyToOne(() => User, (user: User) => user.orders)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Address, (address: Address) => address.orders)
    @JoinColumn({ name: "address_id" })
    address: Address;

    @Column({ default: Date.now() })
    createdAt: Date;

    @OneToMany(() => Payment, (payment: Payment) => payment.order, { cascade: true })
    payments: Payment[];

    @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
    items: OrderItem[];

}