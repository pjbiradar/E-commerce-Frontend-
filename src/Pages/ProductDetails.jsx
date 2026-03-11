import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/CartSlice";


const ProductDetails =()=>{

    const {id} = useParams();
    const navigate = useNavigate();

    const[product,setProduct] = useState({})
    const[loader,setLoader] = useState(true)
    const[error,setError] = useState(null)

    const dispatch = useDispatch()

    const handleAddtoCart =()=>{
        dispatch(addToCart(product))
    }



    useEffect(()=>{
        const controller = new AbortController();

        const fetchProduct = async()=>{

            try{

                setError(null);
                setLoader(true);

                const res = await fetch(`https://dummyjson.com/products/${id}`,{signal:controller.signal})

                if(!res.ok){
                    throw new Error ("failed to fetch the error")
                }

                const data =  await res.json();
                setProduct(data)
                
            }
            catch(err){
                if(err.name !== "AbortError"){
                    setError(err.message);
                }
            }
            finally{
                setLoader(false)
            }
        }

        fetchProduct();

        return ()=>controller.abort();

    },[id])

    if(loader){
        return <p className="text-center mt-10">Loading product...</p>;
    }

    if(error){
        return(
            <p className="text-center mt-10 text-red-500">{error}</p>
        )
    }




    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-blue-500"
        >
          Back
        </button>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded"
          />
      
          {/* Make this column flex and center vertically */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold mb-2">
              {product.title}
            </h1>
      
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>
      
            <p className="text-xl font-semibold mb-2">
              ₹{product.price}
            </p>
      
            <p className="text-sm text-gray-500 mb-4">
              Rating: {product.rating}
            </p>

            <p className="text-sm text-gray-500 mb-1">
                Brand: {product.brand}
            </p>
            <p className="text-sm text-gray-500 mb-1">
                  Category: {product.category}
            </p>
            <p className="text-sm text-gray-500 mb-4">
                Stock: {product.stock > 0 ? "In stock" : "Out of stock"}
            </p>
      
            <button className="px-6 py-2 bg-black text-white rounded disabled:opacity-50" onClick={handleAddtoCart} 
            disabled={product.stock === 0}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>        
    )
}

export default ProductDetails;