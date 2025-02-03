# Books API

## 📌 Overview

This is a simple Books API built using Node.js, Express, and TypeScript. It provides CRUD operations for managing books, including list, add, update, delete, and supports pagination and validation.

## 🚀 Features

- 📄 CRUD operations (Create, Read, Update, Delete)
- ✅ Validation using express-validator
- 🔒 Security with input sanitization & CORS support
- 📖 Swagger API Documentation (/api-docs)
- 📌 Pagination for GET /books
- 🎯 Unit Tests with Jest & Supertest
- 📦 TypeScript for type safety

## ⚙️ Installation & Setup

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Run the API in development mode

```
npm run dev
```

### 3️⃣ Run tests

```
npm test
```

### 4️⃣ View API Documentation

Open your browser and go to:

```
http://localhost:3000/api-docs
```

## 📌 API Endpoints

### 📖 Get All Books (with Pagination)

`GET /books?page=1&limit=5`

Response:

```json
{
  "totalBooks": 10,
  "totalPages": 2,
  "currentPage": 1,
  "books": [{ "id": 1, "name": "Book One", "author": "Author One", "publishedYear": 2020 }]
}
```

### 📘 Get a Book by ID

`GET /books/:id`

Response (200 OK):

```json
{ "id": 1, "name": "Book One", "author": "Author One", "publishedYear": 2020 }
```

Response (404 Not Found):

```json
{ "error": "Book not found" }
```

### ➕ Add a Book

`POST /books`

Request Body:

```json
{
  "name": "New Book",
  "author": "New Author",
  "publishedYear": 2023
}
```

Response:

```json
{ "id": 2, "name": "New Book", "author": "New Author", "publishedYear": 2023 }
```

### ✏️ Update a Book

`PUT /books/:id`

Request Body:

```json
{
  "name": "Updated Title",
  "author": "Updated Author",
  "publishedYear": 2022
}
```

Response:

```json
{ "id": 1, "name": "Updated Title", "author": "Updated Author", "publishedYear": 2022 }
```

### 🗑️ Delete a Book

`DELETE /books/:id`

Response (200 OK):

```json
{ "message": "Book deleted successfully" }
```

Response (404 Not Found):

```json
{ "error": "Book not found" }
```

## 🎯 Assumptions

- The API uses an in-memory array (no database).
- publishedYear must be a 4-digit integer between 1000 and 9999.
- All fields are required when adding or updating a book.
- Pagination defaults to page=1 and limit=5.

## 📜 License

This project is open-source and free to use.

## 🚀 Happy Coding! 🎉
