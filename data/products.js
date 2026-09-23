// In-memory "database": array of products + ID counter
let products = [];

// Never reused, even after deletion — keeps IDs unique for the life of the app
let nextId = 1;

// Hands out the next ID and advances the counter
function getNextId() {
  const id = nextId;
  nextId += 1;
  return id;
}

export { products, getNextId };
