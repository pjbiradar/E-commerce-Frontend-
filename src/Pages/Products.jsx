import { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'



const Products = ({ search,addToCart }) => {
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
              addtocart = {addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

// export const Products =({search})=>{
//     const[products,setProducts] = useState([]);
//     const[loading,setLoading]  = useState(true);
//     const[error,setError] = useState("");

//     useEffect(()=>{
//         const fetchProduct = async ()=>{

//             try{

//                 const res = await fetch("https://dummyjson.com/products");

//                 if(!res.ok) throw new Error("data is not fetched");

//                 const data = await res.json();

//                 setProducts(data.products);

//             }
//             catch(err){
//                 setError(err.message)
//             }
//             finally{
//                 setLoading(false)
//             }
                
        

//         }

//         fetchProduct();
//     },[])


   
//     // console.log(products);

//     const filteredProducts = products.filter((product) =>{

//         const searchterm = search ? search.toLowerCase() : ""; 
//         // console.log(product?.title.toLowerCase().includes(searchterm)); 
//         return product?.title.toLowerCase().includes(searchterm);


//     }

    
    
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }
  

//     if(error){
//         return (
//             <p className="text-center mt-10 text-red-500">
//             {error}
//           </p>
//         )

//     }

    
//     return (

//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold tracking-tight">
//         Products
//       </h2>

//       {filteredProducts.length === 0 ? (
//        <p className="text-center text-gray-500">
//        No products found
//      </p>
//       ) :
//       (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product)=>(
//                 <ProductCard key={product.id} product={product}/>

//             ))}
//         </div>
//       )
//     }
//     </div>


    
//     )
// }


// Api integration
// Search handled via API
// Loading + error UI state


