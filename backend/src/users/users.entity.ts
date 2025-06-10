import { userRoles } from "src/utils/types/userRoles";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Timestamp } from "typeorm";

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
        nullable: false,
    })
    email: string;

    @Column({
        nullable: false
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
}