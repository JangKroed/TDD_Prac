import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import env from '../../config.env'

@Entity({ name: 'products', database: env.DB_NAME })
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
