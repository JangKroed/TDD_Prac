import express, { NextFunction, Request, Response } from 'express';
import productRoutes from './routes';

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello World');
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: error.message });
});

export default app;
