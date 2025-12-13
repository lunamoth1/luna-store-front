import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getProducts } from "../api/products";
import { ProductStoreType } from "../types/stores/useProductStore";

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
					const products = await getProducts();
					set({ products, isLoading: false });
				} catch (err) {
					console.error("Failed to fetch products:", err);

					set({
						isLoading: false,
						error:
							err instanceof Error
								? err.message
								: "Unknown product fetch error",
					});
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
