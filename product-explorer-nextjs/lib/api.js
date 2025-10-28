const BASE = "https://dummyjson.com";

export async function fetchAllProducts(limit = 0, skip = 0) {
  const url = limit ? `${BASE}/products?limit=${limit}&skip=${skip}` : `${BASE}/products`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function searchProducts(q) {
  const res = await fetch(`${BASE}/products/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchProductsByCategory(category) {
  const res = await fetch(`${BASE}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Category fetch failed");
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
