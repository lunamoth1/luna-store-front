import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductStoreType } from "../types/ProductStore";

export const useProductStore = create<ProductStoreType>()(
	persist(
		(set, get) => ({
			products: [],
			isLoading: false,
			error: null,

			fetchProducts: async (force = false) => {
				if (!force && get().products.length > 0) return;

				set({ isLoading: true, error: null });
				try {
					const res = await fetch(
						`${import.meta.env.VITE_STRAPI_API_URL}/api/products?populate=image`
					);

					if (!res.ok) throw new Error("Error fetching products");

					const data = await res.json();
					set({ products: data.data ?? [], isLoading: false });
				} catch (err) {
					console.error("Fetch error:", err);
					set({ isLoading: false, error: "Failed to fetch products" });
				}
			},

			clearProducts: () => set({ products: [] }),
		}),
		{
			name: "product-cache",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
