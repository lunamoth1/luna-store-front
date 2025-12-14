import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getShippingOptions } from "../api/shippingOptions";
import { usDeliveryType, internationalDeliveryType } from "../constants";
import { ShippingOptionApi } from "../types/api";
import type {
	SettingsStoreTypes,
	ShippingOption,
} from "../types/stores/useSettingsStore";

const normalizeShipping = (list: ShippingOptionApi[]): ShippingOption[] =>
	list.map((opt) => {
		const rawType = String(opt.type ?? "")
			.trim()
			.toLowerCase();

		return {
			id: String(opt.uid ?? opt.id ?? crypto.randomUUID()),
			label: opt.label,
			price: Number(opt.price) || 0,
			type: rawType.includes("us") ? "us" : "international",
		};
	});

export const useSettingsStore = create<SettingsStoreTypes>()(
	persist(
		(set) => ({
			shippingOptions: [],
			usDelivery: usDeliveryType,
			internationalDelivery: internationalDeliveryType,

			isLoading: false,
			error: null,

			fetchSettings: async () => {
				set({ isLoading: true, error: null });

				try {
					const backendList = await getShippingOptions();
					const normalized = normalizeShipping(backendList);

					const backendUS = normalized.filter((o) => o.type === "us");
					const backendIntl = normalized.filter(
						(o) => o.type === "international"
					);

					set({
						shippingOptions: normalized,
						usDelivery: backendUS.length > 0 ? backendUS : usDeliveryType,
						internationalDelivery:
							backendIntl.length > 0 ? backendIntl : internationalDeliveryType,
						isLoading: false,
					});
				} catch (err) {
					console.error("❌ Error fetching shipping options:", err);
					set({
						shippingOptions: [],
						usDelivery: usDeliveryType,
						internationalDelivery: internationalDeliveryType,
						isLoading: false,
						error: "Failed to load shipping options",
					});
				}
			},

			clearSettings: () =>
				set({
					shippingOptions: [],
					usDelivery: usDeliveryType,
					internationalDelivery: internationalDeliveryType,
					error: null,
				}),
		}),
		{
			name: "settings-cache",
			storage: createJSONStorage(() => sessionStorage),
			onRehydrateStorage: () => (state) => {
				state?.fetchSettings();
			},
		}
	)
);
