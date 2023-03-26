import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn()
    productId!: number;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column({ default: 0 })
    price: number;

    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn()
    updatedAt: string;
}
