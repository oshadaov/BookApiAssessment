import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import booksRoutes from './routes/books';
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

setupSwagger(app);

app.use('/books', booksRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}\nAPI Docs: http://localhost:${PORT}/api-docs`));
