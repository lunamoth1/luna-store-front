import { create } from "zustand";
import { categories } from "../constants";
import { CategoryStore } from "../types/useCategoryStore";

export const useCategoryStore = create<CategoryStore>((set, get) => ({
	category: null,
	isSidebarOpen: false,

	setCategory: (category) => set({ category }),

	setSidebarOpen: (open) => set({ isSidebarOpen: open }),

	handleRouteChange: (pathname) => {
		if (!pathname.startsWith("/shop")) {
			set({ category: null });
			return;
		}

		if (!get().category) {
			set({ category: categories[0] });
		}
	},
}));
