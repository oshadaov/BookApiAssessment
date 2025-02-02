import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";

export const validateBookId = [
    param('id').isInt().withMessage('ID must be an integer')
];

export const validateBook = [
    body('name').notEmpty().withMessage('Name is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('publishedYear').isInt({ min: 1000, max: 9999 }).withMessage('Valid year required')
];

export const validateBookUpdate = [
    param('id').isInt().withMessage('ID must be an integer'),
    body('name').notEmpty().withMessage('Name is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('publishedYear').isInt({ min: 1000, max: 9999 }).withMessage('Valid year required'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];


// Separate function to handle validation results
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({  message: "All fields are required"  });
    }
    next();
};
