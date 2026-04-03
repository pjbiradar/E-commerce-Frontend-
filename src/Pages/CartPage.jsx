import { useDispatch, useSelector } from "react-redux"
import { removeTheItemfromCart, IncreaseTheITemQty, DecreaseTheItemQty } from "../cart/CartSlice"
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

const CartPage = () => {
  const dispatch = useDispatch();
  const Items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return Items.reduce((total, curItem) =>
      total + curItem.price * curItem.quantity, 0
    );
  }, [Items]);

  if (Items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4">
        <p className="text-gray-500 text-lg">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>

      {/* Cart Items */}
      <div className="flex flex-col gap-3">
        {Items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-white border rounded-xl p-3 shadow-sm"
          >
            {/* Thumbnail */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-16 h-16 object-contain rounded-lg flex-shrink-0 bg-gray-50 p-1"
            />

            {/* Name + Price */}
            <div className="flex-1 min-w-0">
              {/* min-w-0 prevents text overflow breaking layout */}
              <p className="font-medium text-sm leading-tight line-clamp-2">
                {item.title}
              </p>
              <p className="text-blue-600 font-semibold text-sm mt-1">
                ₹{item.price}
              </p>
            </div>

            {/* Qty controls + remove */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              {/* Remove button top right */}
              <button
                onClick={() => dispatch(removeTheItemfromCart(item.id))}
                className="text-red-400 hover:text-red-600 text-xs"
              >
                ✕ Remove
              </button>

              {/* Qty row */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(DecreaseTheItemQty(item.id))}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 
                             flex items-center justify-center font-bold text-gray-600"
                >
                  −
                </button>
                <span className="w-5 text-center font-medium text-sm">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(IncreaseTheITemQty(item.id))}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 
                             flex items-center justify-center font-bold text-gray-600"
                >
                  +
                </button>
              </div>

              {/* Subtotal for this item */}
              <p className="text-xs text-gray-400">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Checkout — sticky at bottom on mobile */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-sm">
            {Items.length} item{Items.length > 1 ? "s" : ""}
          </span>
          <span className="text-xl font-bold">
            Total: ₹{totalPrice.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 
                     text-white font-semibold rounded-xl transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;