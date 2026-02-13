 const Header =({search,setSearch,CartCount})=>{

    return(
        <>
        <header className="bg-white/80 backdrop-blur border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
                <h1 className="text-2xl font-bold tracking-tight text-indigo-600">Euro Vintage</h1>

                <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search products.." className="border border-gray-300 rounded-xl px-4 py-2 w-full sm:w-72
                     focus:ring-2 focus:ring-indigo-500 focus:outline-none
                     transition"/>

            <div className="relative">
            🛒
            <span className="absolute -top-2 -right-3 bg-indigo-600 text-white text-xs rounded-full px-2">
              {CartCount}
            </span>
            </div>         

            
            </div>

        </header>
        </>
    )

}
export default Header;
