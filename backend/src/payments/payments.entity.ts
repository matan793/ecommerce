import { Order } from "src/orders/orders.entity";
import { PaymentMethod } from "src/utils/types/paymentMethod";
import { PaymentStatus } from "src/utils/types/paymentStatus";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payments')
export class Payment{
    @PrimaryGeneratedColumn()
    paymentId: number

    @Column({type: 'enum', enum: PaymentMethod, nullable: false})
    paymentMethod: PaymentMethod;

    @Column({type: 'enum', enum: PaymentStatus, nullable: false, default: PaymentStatus.pending})
    paymentStatus: PaymentStatus;

    @Column({nullable: false})
    amount: number;

    @Column({default: Date.now()})
    paidAt: Date

    @ManyToOne(() => Order, (order: Order) => order.payments)
    @JoinColumn({name: "order_id"})
    order: Order;
}