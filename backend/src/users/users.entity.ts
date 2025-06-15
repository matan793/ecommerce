import { Address } from "src/addresses/addresses.entity";
import { Cart } from "src/cart/cart.entity";
import { Order } from "src/orders/orders.entity";
import { userRoles } from "src/utils/types/userRoles";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    userId: number;

    @Column({
        nullable: false
    })
    firstName: string;

    @Column({
        nullable: false
    })
    lastName: string;

    @Column({
        nullable: false
    })
    birthdate: Date;

    @Column({
        unique: true,
        nullable: true,
    })
    email: string;

    @Column({
        nullable: true
    })
    password: string;

    @Column({
        type: 'enum',
        enum: userRoles,
        default: userRoles.user
    })
    role: userRoles;

    @Column()
    phoneNumber: string;

    @Column({
        default: Date.now()
    })
    createdAt: Date

    @OneToMany(() => Cart, cart => cart.user)
    cart: Cart[];

    @OneToOne(() => Address, address => address.user, { cascade: true, eager: true, nullable: true })
    @JoinColumn({ name: "address_id" })
    address: Address;

    @OneToMany(() => Order, (order: Order) => order.user)
    orders: Order[];

    @Column({ nullable: true, unique: true }) 
    googleId: string;
}