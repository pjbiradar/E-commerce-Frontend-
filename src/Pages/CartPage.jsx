import { useDispatch, useSelector } from "react-redux"
import {removeTheItemfromCart,IncreaseTheITemQty,DecreaseTheItemQty} from "../cart/CartSlice"
import { Link, useNavigate } from "react-router-dom";


const CartPage =()=>{

    const dispatch =  useDispatch();
    const Items = useSelector((state) => state.cart.items)
    const navigate = useNavigate();

    const totalPrice = Items.reduce((total,curItem)=>
    total+curItem.price * curItem.quantity,0
    )


  if (Items.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Your cart is empty
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

    {Items.map((item) => (
      <div
        key={item.id}
        className="flex items-center justify-between border-b py-4"
      >
        <div className="flex items-center gap-4">
          <img
            src={item.thumbnail}
            className="w-20 h-20 object-contain"
          />
          <div>
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-gray-600">₹{item.price}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(DecreaseTheItemQty(item.id))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => dispatch(IncreaseTheITemQty(item.id))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>

          <button
            onClick={() => dispatch(removeTheItemfromCart(item.id))}
            className="text-red-500 ml-4"
          >
            ❌
          </button>

          

        </div>
      </div>
    ))}

    <div className="text-right mt-6">
      <h3 className="text-xl font-bold">
        Total: ₹{totalPrice}
      </h3>
    </div>
    
    <div>
    <button 
            onClick={() => navigate("/checkout")} 
            className="px-4 py-2 bg-blue-500 text-white rounded">
           Checkout
           </button>
    </div>
  </div>
);

}

export default CartPage;