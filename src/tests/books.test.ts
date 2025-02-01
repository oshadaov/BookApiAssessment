// books-api/src/tests/books.test.ts
import request from 'supertest';
import express from 'express';
import booksRoutes from '../routes/books';

const app = express();
app.use(express.json());
app.use('/books', booksRoutes);

describe('Books API Endpoints', () => {
    let bookId: number;

    it("GET /books should return an empty array initially", async () => {
        const res = await request(app).get("/books");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.books)).toBe(true);
        expect(res.body.books.length).toBe(0);
    });

    it('POST /should add a new book', async () => {
        const res = await request(app)
            .post('/books')
            .send({ name: 'Test Book', author: 'Test Author', publishedYear: 2023 });
        
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        bookId = res.body.id;
    });

    

    it('should get all books', async () => {
        const res = await request(app).get('/books');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.books)).toBe(true);
    });

   
    it("POST /books should reject invalid input", async () => {
        const res = await request(app)
          .post("/books")
          .send({ name: "", author: "", publishedYear: "" });
    
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty("errors");
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors.length).toBeGreaterThan(0);
        expect(res.body.errors[0]).toHaveProperty("msg", "Name is required");
        expect(res.body.errors[1]).toHaveProperty("msg", "Author is required");
        expect(res.body.errors[2]).toHaveProperty("msg", "Valid year required");
    });
    

    it('should get book details by ID', async () => {
        const res = await request(app).get(`/books/${bookId}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', bookId);
    });


    it("GET /books/:id should return 404 if book not found", async () => {
        const response = await request(app).get("/books/999");
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("error", "Book not found");
    });


    it('should update an existing book', async () => {
        const res = await request(app)
            .put(`/books/${bookId}`)
            .send({ name: 'Updated Test Book' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('name', 'Updated Test Book');
    });

    it("PUT /books/:id should return 404 if book not found", async () => {
        const nonExistentId = "9999";
        const res = await request(app)
          .put(`/books/${nonExistentId}`)
          .send({ name: "Updated Title" });
    
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty("error", "Book not found");
    });

    it('should delete a book', async () => {
        const res = await request(app).delete(`/books/${bookId}`);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("message", "Book deleted successfully");
    });

    it('should return 404 for a deleted book', async () => {
        const res = await request(app).get(`/books/${bookId}`);
        expect(res.status).toBe(404);
    });
});

export {};
