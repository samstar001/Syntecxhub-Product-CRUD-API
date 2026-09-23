import { products, getNextId } from "../data/products.js";

// POST /products — create a new product
function createProduct(req, res) {
  const { name, price, description, category } = req.body;

  // Basic validation — reject if required fields are missing
  if (!name || price === undefined || !description || !category) {
    return res
      .status(400)
      .json({ error: "name, price, description, and category are required" });
  }

  const newProduct = {
    id: getNextId(),
    name,
    price,
    description,
    category,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
}

// GET /products — list products, with optional filtering + pagination
function getProducts(req, res) {
  let result = [...products]; // copy, so filtering never mutates the original array

  const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

  // Filter by category, if provided
  if (category) {
    result = result.filter((p) => p.category === category);
  }

  // Filter by price bounds — each bound is independent
  if (minPrice !== undefined) {
    result = result.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined) {
    result = result.filter((p) => p.price <= Number(maxPrice));
  }

  const total = result.length; // total AFTER filtering, before pagination

  // Slice out just the requested page
  const start = (Number(page) - 1) * Number(limit);
  const end = start + Number(limit);
  const paginated = result.slice(start, end);

  res.status(200).json({
    data: paginated,
    total,
    page: Number(page),
    limit: Number(limit),
  });
}

// GET /products/:id — fetch a single product
function getProductById(req, res) {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  // 404 if no product matches that ID
  if (!product) {
    return res.status(404).json({ error: `Product with id ${id} not found` });
  }

  res.status(200).json(product);
}

// PUT /products/:id — update an existing product
function updateProduct(req, res) {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: `Product with id ${id} not found` });
  }

  const { name, price, description, category } = req.body;

  // Only overwrite fields that were actually sent — partial updates allowed
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (description !== undefined) product.description = description;
  if (category !== undefined) product.category = category;

  res.status(200).json(product);
}

// DELETE /products/:id — remove a product
function deleteProduct(req, res) {
  const id = Number(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Product with id ${id} not found` });
  }

  const [deleted] = products.splice(index, 1);
  res.status(200).json(deleted);
}

export {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
