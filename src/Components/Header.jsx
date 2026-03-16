import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch }) => {
  // Read cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
      
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-indigo-600">
          <Link to="/" className="text-2xl font-bold tracking-tight text-indigo-600">
            Nessesity
          </Link>
        </h1>

    

        {/* Navigation + Search */}
        <div className="w-full sm:w-auto space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          {/* Search */}
          <input
                 type="text"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 placeholder="Search products..."
                 className="border border-gray-300 rounded-xl px-4 py-2 w-full sm:w-72 text-sm sm:text-base
                focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
          {/* Actions row */}

          <div className="flex items-center justify-between sm:justify-start gap-6">
            <Link to="/" className="text-sm sm:text-base font-medium">
               Home
            </Link>


            {/* Cart */}
            <Link to="/cart" className="relative shrink-0">
              <div className="relative w-9 h-9 flex items-center justify-center">
                <span className="text-xl leading-none">🛒</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full">
                    {cartCount}
                    </span>
                   )}
              </div>
            </Link>

            <Link to="/checkout" className="text-sm sm:text-base font-medium">
              Checkout
            </Link>

          </div>
        </div>


      </div>
    </header>
  );
};

export default Header;