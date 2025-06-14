import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { JoinColumn } from 'typeorm';
import { Order } from 'src/orders/orders.entity';


@Entity({ name: 'addresses' })
export class Address {
    @PrimaryGeneratedColumn({ name: 'address_id' })
    addressId: number;

    @Column({ type: 'text' })
    street: string;

    @Column({ type: 'text' })
    city: string;

    @Column({ type: 'text' })
    country: string;

    @Column({ type: 'text', name: 'postal_code' }) 
    postalCode: string;

    @OneToOne(() => User,)
    user: User; 

    @OneToMany(() => Order, (order: Order) => order.address)
    orders: Order[]
}