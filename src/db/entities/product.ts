import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn()
    productId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ default: 0 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;
}
