// books-api/src/controllers/booksController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import books, { Book } from '../models/bookModel';

const getAllBooks = (req: Request, res: Response): void => {
    
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedBooks = books.slice(startIndex, endIndex);
    
    res.status(200).json({
        totalBooks: books.length,
        totalPages: Math.ceil(books.length / limit),
        currentPage: page,
        books: paginatedBooks
    });
};

const getBookById = (req: Request, res: Response): void => {
    const book = books.find(b => b.id === parseInt(req.params.id, 10));
    if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    res.status(200).json(book);
};

const addBook = (req: Request, res: Response): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const newBook: Book = { id: books.length + 1, ...req.body };
    books.push(newBook);
    res.status(201).json(newBook);
};

const updateBook = (req: Request, res: Response): void => {
    const book = books.find(b => b.id === parseInt(req.params.id, 10));
    if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    Object.assign(book, req.body);
    res.status(200).json(book);
};

const deleteBook = (req: Request, res: Response): void => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id, 10));
    if (bookIndex === -1) {
        res.status(404).json({ error: 'Book not found' });
        return;
    }
    books.splice(bookIndex, 1);
    res.status(201).json({ message: "Book deleted successfully" });
};

export default { getAllBooks, getBookById, addBook, updateBook, deleteBook };
