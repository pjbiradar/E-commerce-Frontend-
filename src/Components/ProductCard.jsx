import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/CartSlice";
import { memo } from "react";
import { Link } from "react-router-dom";


const ProductCard = ({product})=>{
    const dispatch = useDispatch();
   
    return (
        <>
     


        <div className="group border rounded-xl bg-white hover:shadow-lg transition cursor-pointer">
        <Link to={`/products/${product.id}`}>
            <img src={product.thumbnail} alt={product.title} className="w-full h-40 sm:h-48 object-contain p-4 group-hover:scale-105 transition-transform"/>
            </Link>
        <div className="p-4">
           
            <h2 className="text-sm sm:text-base font-medium line-clamp-2">{product.title}</h2>
            <p className="text-base sm:text-lg font-bold text-gray-900">₹{product.price}</p>
            <button onClick={()=> dispatch(addToCart(product))} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl
                     hover:bg-indigo-700 transition font-medium">Add to cart</button>
            </div>
        </div>
       


    </>
    )

}

export default memo(ProductCard);