import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { clearCart } from "../cart/CartSlice";

 const Checkout = ()=>{
    const dispatch = useDispatch();
    const cartItems = useSelector((state)=>state.cart.items);
    const navigate = useNavigate();

    const totalAmount = cartItems.reduce((total,item)=> total + item.price * item.quantity ,0)

    const handlePlaceOrder = ()=>{
        alert("order placed successfully");
        dispatch(clearCart());
        navigate('/');
    }

    if(cartItems.length === 0){
        return (
            <p className="text-center mt-10 text-gray-500">
              Your cart is empty
            </p>
          );
    }

    return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6">
    <h2 className="text-2xl font-bold mb-6">
      Checkout
    </h2>

    <div className="space-y-4">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border-b pb-2"
        >
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.quantity}
            </p>
          </div>
          <p>₹{item.price * item.quantity}</p>
        </div>
      ))}
    </div>

    <div className="flex justify-between mt-6 text-lg font-bold">
      <span>Total</span>
      <span>₹{totalAmount}</span>
    </div>

    <button
      onClick={handlePlaceOrder}
      className="w-full mt-6 bg-green-600 text-white py-3 rounded hover:bg-green-700" > Place Order </button>
  </div>
);
}


export default Checkout;