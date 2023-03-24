import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
import productRoutes from './routes';
import mongoose from 'mongoose';

mongoose
    .connect(process.env.MONGO_DB_URL!)
    .then(() => console.log('MongoDb Connected...'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: error.message });
});

export default app;
