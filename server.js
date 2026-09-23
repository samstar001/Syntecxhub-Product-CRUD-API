import express from "express";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Parses incoming JSON request bodies into req.body
app.use(express.json());

// Mount all product routes under /products
app.use("/products", productRoutes);

// Catch-all for unmatched routes — anything not handled above lands here
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler — catches anything thrown or passed to next(err)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
