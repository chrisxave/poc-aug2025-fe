import { useState, useEffect } from "react";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product_name: "", price: "", description: "" });

  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/table/products/rows`);
    const data = await res.json();
    setProducts(data);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/table/products/rows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: form.product_name,
        price: parseFloat(form.price),
        description: form.description,
      }),
    });
    setForm({ product_name: "", price: "", description: "" });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Inventory</h1>

      <form onSubmit={addProduct} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.product_name}
          onChange={(e) => setForm({ ...form, product_name: e.target.value })}
        />{" "}
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />{" "}
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />{" "}
        <button type="submit">Add Product</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4" align="center">No products</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.product_name}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
