// // Api integration
// // Search handled via API
// // Loading + error UI state

import { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'

const Products = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const LIMIT = 9;
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const skip = (page - 1) * LIMIT;
        const url = debouncedSearch
          ? `https://dummyjson.com/products/search?q=${debouncedSearch}&limit=${LIMIT}&skip=${skip}`
          : `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

        const res = await fetch(url, { signal: controller.signal });

        if (!res.ok) {
          if (res.status === 429) {
            throw new Error("Too many requests. Please wait...");
          }
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort(); // cancel previous request
  }, [debouncedSearch, page]);

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">Page {page}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

