import { DataSource } from 'typeorm';
import env from '../../config.env';
import * as entities from '../entities';

export const connection = new DataSource({
    type: 'mysql',
    host: env.DB_HOST,
    port: 3306,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    entities,
    synchronize: env.DB_SYNCHRONIZE,
    dropSchema: env.DB_DROPSCHEMA,
});
