import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ search, page, limit, mode }) => {
    const skip = (page - 1) * limit;

    const url = search
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
      : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const hasMore = skip + data.products.length < data.total;

    return { products: data.products, hasMore, mode };
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    resetProducts: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },

    // desktop uses this — just sets page number, no fetch side effect
    setPage: (state, action) => {
      state.page = action.payload;
    },

    // mobile uses this — increments page, triggers fetch useEffect
    nextPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const { products, mode, hasMore } = action.payload;

        if (mode === "replace") {
          state.items = products;
        } else {
          // deduplicate by id — safety net against observer firing twice
          const existingIds = new Set(state.items.map((p) => p.id));
          const newItems = products.filter((p) => !existingIds.has(p.id));
          state.items = [...state.items, ...newItems];
        }

        state.hasMore = hasMore;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { resetProducts, setPage, nextPage } = productSlice.actions;
export default productSlice.reducer;