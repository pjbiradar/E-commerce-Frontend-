import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  resetProducts,
  setPage,
  nextPage,
} from "../Product/ProductSlice";
import ProductCard from "../Components/ProductCard";

const LIMIT = 8;

// matches exactly what Tailwind's md: breakpoint uses
// window.innerWidth can lie — matchMedia is what the browser
// actually uses to evaluate CSS breakpoints
const isMobile = () => !window.matchMedia("(min-width: 768px)").matches;

const Products = ({ search = "" }) => {
  const dispatch = useDispatch();
  const { items, loading, error, page, hasMore } = useSelector(
    (state) => state.products
  );

  const isFetchingRef = useRef(false);
  const observerRef = useRef(null);
  const hasMoreRef = useRef(hasMore);
  const loadingRef = useRef(loading);

  hasMoreRef.current = hasMore;
  loadingRef.current = loading;

  /* -------- INITIAL LOAD / SEARCH CHANGE -------- */
  useEffect(() => {
    isFetchingRef.current = false;
    dispatch(resetProducts());
    dispatch(
      fetchProducts({ search, page: 1, limit: LIMIT, mode: "replace" })
    );
  }, [search, dispatch]);

  /* -------- MOBILE: fetch when page increments -------- */
  useEffect(() => {
  
    if (page === 1) return;
    if (!isMobile()) return; //uses matchMedia, not innerWidth
    if (!hasMore) return;

    console.log("mobile fetch firing for page", page); // you'll see this only on real mobile width now

    dispatch(
      fetchProducts({ search, page, limit: LIMIT, mode: "append" })
    ).then(() => {
      isFetchingRef.current = false;
    });
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

useEffect(() => {
  let observer = null;

  const attachObserver = () => {
    if (observer) return;
    if (!observerRef.current) return;

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        if (isFetchingRef.current) return;
        if (!hasMoreRef.current) return;
        if (loadingRef.current) return;

        isFetchingRef.current = true;
        dispatch(nextPage());
      },
      { threshold: 0.1 }
    );

    observer.observe(observerRef.current);
  };

  const detachObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  };

  const mediaQuery = window.matchMedia("(max-width: 767px)");

  const handleMediaChange = (e) => {
    if (e.matches) {
      // switched to mobile — attach observer
      attachObserver();
    } else {
      // switched to desktop — detach observer AND clean up
      // mobile appended multiple pages into items, so we reset
      // and re-fetch only page 1 in replace mode so desktop
      // starts from a clean single-page state
      detachObserver();
      isFetchingRef.current = false;
      dispatch(resetProducts());
      dispatch(
        fetchProducts({ search, page: 1, limit: LIMIT, mode: "replace" })
      );
    }
  };

  if (mediaQuery.matches) {
    attachObserver();
  }

  mediaQuery.addEventListener("change", handleMediaChange);

  return () => {
    detachObserver();
    mediaQuery.removeEventListener("change", handleMediaChange);
  };
}, [search]); // search in deps so if search changes the listener
              //    is rebuilt with the latest search value
  /* -------- DESKTOP: Prev / Next -------- */
  const handlePrev = () => {
    if (page <= 1 || loading) return;
    const targetPage = page - 1;
    dispatch(setPage(targetPage));
    dispatch(
      fetchProducts({ search, page: targetPage, limit: LIMIT, mode: "replace" })
    );
  };

  const handleNext = () => {
    if (!hasMore || loading) return;
    const targetPage = page + 1;
    dispatch(setPage(targetPage));
    dispatch(
      fetchProducts({ search, page: targetPage, limit: LIMIT, mode: "replace" })
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Products</h2>

      {error && (
        <p className="text-center text-red-500 mt-6">{error}</p>
      )}

      {!loading && items.length === 0 && (
        <p className="text-center text-gray-500">No products found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {loading && (
        <p className="text-center mt-6">Loading products...</p>
      )}

      {/* DESKTOP PAGINATION */}
      <div className="hidden md:flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrev}
          disabled={page === 1 || loading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-medium">Page {page}</span>
        <button
          onClick={handleNext}
          disabled={!hasMore || loading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* MOBILE SCROLL TRIGGER */}
      <div ref={observerRef} className="h-1 md:hidden" />
    </div>
  );
};

export default Products;