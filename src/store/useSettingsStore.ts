import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getShippingOptions } from "../api/shippingOptions";
import { usDeliveryType, internationalDeliveryType } from "../constants";
import type {
	SettingsStoreTypes,
	ShippingOption,
} from "../types/stores/useSettingsStore";

const normalizeShipping = (list: ShippingOption[]) =>
	list.map((opt) => {
		const rawType = String(opt.type ?? "")
			.trim()
			.toLowerCase();

		return {
			id: String(opt.uid ?? opt.id),
			label: opt.label,
			price: Number(opt.price) || 0,
			type: rawType.includes("us") ? "us" : "international",
		};
	});

export const useSettingsStore = create<SettingsStoreTypes>()(
	persist(
		(set, get) => ({
			shippingOptions: [],
			usDelivery: usDeliveryType as any,
			internationalDelivery: internationalDeliveryType as any,

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

					console.log("🚚 backend US:", backendUS);
					console.log("🌍 backend INTL:", backendIntl);

					set({
						shippingOptions: normalized as any,
						usDelivery:
							backendUS.length > 0 ? backendUS : (usDeliveryType as any),
						internationalDelivery:
							backendIntl.length > 0
								? backendIntl
								: (internationalDeliveryType as any),
						isLoading: false,
					});
				} catch (err) {
					console.error("❌ Error fetching shipping options:", err);
					set({
						shippingOptions: [],
						usDelivery: usDeliveryType as any,
						internationalDelivery: internationalDeliveryType as any,
						isLoading: false,
						error: "Failed to load shipping options",
					});
				}
			},

			clearSettings: () =>
				set({
					shippingOptions: [],
					usDelivery: usDeliveryType as any,
					internationalDelivery: internationalDeliveryType as any,
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
