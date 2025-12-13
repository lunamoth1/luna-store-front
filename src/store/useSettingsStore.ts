import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getShippingOptions } from "../api/shippingOptions";
import {
	SettingsStoreTypes,
	ShippingOption,
} from "../types/stores/useSettingsStore";

export const useSettingsStore = create<SettingsStoreTypes>()(
	persist(
		(set, get) => ({
			shippingOptions: [],
			usDelivery: [],
			internationalDelivery: [],

			isLoading: false,
			error: null,

			fetchSettings: async (force = false) => {
				const state = get();

				if (!force && state.shippingOptions.length > 0) {
					console.log("✅ Using cached shipping options");
					return;
				}

				set({ isLoading: true, error: null });

				try {
					const shippingList = await getShippingOptions();

					const usDelivery = shippingList.filter(
						(opt: ShippingOption) => opt.type === "US"
					);

					const internationalDelivery = shippingList.filter(
						(opt: ShippingOption) => opt.type === "International"
					);

					set({
						shippingOptions: shippingList,
						usDelivery,
						internationalDelivery,
						isLoading: false,
					});
				} catch (err) {
					console.error("❌ Error fetching shipping settings:", err);
					set({
						isLoading: false,
						error: "Failed to load shipping options",
					});
				}
			},

			clearSettings: () =>
				set({
					shippingOptions: [],
					usDelivery: [],
					internationalDelivery: [],
					error: null,
				}),
		}),
		{
			name: "settings-cache",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
