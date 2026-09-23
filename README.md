# Product Inventory API

A simple Express.js REST API for managing products, built as Task 2 of the SYNTECXHUB Virtual Internship Program (Backend Development). Data is stored in memory (no database) and resets when the server restarts.

**Author:** Michael Samuel Oche
**Internship:** SYNTECXHUB — Backend Development, Virtual Internship Program

## Features

- Full CRUD for a `Product` resource (`name`, `price`, `description`, `category`)
- Filtering by category and/or price range
- Pagination on the product list
- Consistent error handling (404 for missing resources, 400 for invalid input)

## Getting started

```bash
npm install
npm start
```

The server runs on `http://localhost:3000` by default (override with a `PORT` environment variable).

## Endpoints

| Method | Path            | Description                                                 |
| ------ | --------------- | ----------------------------------------------------------- |
| POST   | `/products`     | Create a new product                                        |
| GET    | `/products`     | List products (supports filtering & pagination — see below) |
| GET    | `/products/:id` | Get a single product by ID                                  |
| PUT    | `/products/:id` | Update a product (partial updates allowed)                  |
| DELETE | `/products/:id` | Delete a product                                            |

## Product shape

```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "price": 15.99,
  "description": "Compact wireless mouse with USB receiver",
  "category": "electronics"
}
```

`id` is assigned automatically (auto-incrementing) and should not be sent when creating a product.

## Filtering

Add any of these query params to `GET /products`:

| Param      | Example                 | Effect                                |
| ---------- | ----------------------- | ------------------------------------- |
| `category` | `?category=electronics` | Only products in that category        |
| `minPrice` | `?minPrice=10`          | Only products priced at or above this |
| `maxPrice` | `?maxPrice=50`          | Only products priced at or below this |

Filters can be combined, e.g. `?category=electronics&minPrice=10&maxPrice=50`.

## Pagination

`GET /products` returns 10 products per page by default. Use `page` and `limit` to move through the rest:

```
GET /products?page=2&limit=10
```

Response shape:

```json
{
  "data": [
    /* up to `limit` products */
  ],
  "total": 14,
  "page": 2,
  "limit": 10
}
```

`total` reflects the count **after filtering**, so `Math.ceil(total / limit)` gives the correct number of pages even when filters are applied.

## Error responses

| Status | When                                            |
| ------ | ----------------------------------------------- |
| 400    | Required fields missing when creating a product |
| 404    | Product ID doesn't exist (GET/PUT/DELETE by ID) |
| 404    | Route doesn't exist at all                      |
| 500    | Unexpected server error                         |

## Project structure

```
product-inventory-api/
├── data/
│   └── products.js        # In-memory store + ID counter
├── controllers/
│   └── productController.js  # Request/response logic
├── routes/
│   └── productRoutes.js   # Maps HTTP verbs/paths to controllers
├── server.js               # App setup and entry point
└── package.json
```
