import React from "react";

const ProductCard = ({product,addtocart})=>{
   
    return (
        <>
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
            <img src={product.thumbnail} alt={product.title} className="w-full h-52 object-contain p-6 group-hover:scale-105 transition-transform duration-300"/>
        

        <div className="p-4">
            <h2 className="p-5 flex flex-col h-full">{product.title}</h2>
            <p className="text-lg font-bold text-gray-900">{product.price}</p>

            <button onClick={()=> addtocart(product)} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl
                     hover:bg-indigo-700 transition font-medium">Add to cart</button>
            </div>
        </div>


        </>
    )

}

export default ProductCard;