// Api integration
// Search handled via API
// Loading + error UI state
import { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'

const Products = ({ search}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const url = search
          ? `https://dummyjson.com/products/search?q=${search}`
          : "https://dummyjson.com/products";

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data.products);

        // console.log(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">
        Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
             
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;







