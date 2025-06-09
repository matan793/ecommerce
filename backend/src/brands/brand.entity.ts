import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'brands' })
export class Brand {

    @PrimaryGeneratedColumn()
    brandId: number;
    
    @Column({nullable: false})
    name: string;

    @Column()
    description: string;
}