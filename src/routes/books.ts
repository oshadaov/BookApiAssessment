import express from 'express';
import {getAllBooks ,getBookById,addBook,updateBook ,  deleteBook} from '../controllers/booksController';
import { validateBookId, validateBook, validateBookUpdate } from '../validations/bookValidation';

const router = express.Router();


router.get('/', getAllBooks);

router.get('/:id', validateBookId,getBookById);

router.post('/', validateBook, addBook);

router.put('/:id', validateBookUpdate, updateBook);

router.delete('/:id', validateBookId, deleteBook);

export default router;
