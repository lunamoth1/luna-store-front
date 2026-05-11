import { create } from "zustand";
import { persist } from "zustand/middleware";
import { EU_COUNTRIES, eur, usd } from "../constants";
import { CurrencyStore } from "../types/stores/useCurrencyStore";
import { getLocation } from "../api/helpers/location";

export const useCurrencyStore = create<CurrencyStore>()(
	persist(
		(set, get) => ({
			currency: null,
			countryCode: null,

			setCurrency: (currency) => {
				set({ currency });
				localStorage.setItem("currency", currency);
			},

			initCurrency: async () => {
				const { currency, countryCode } = get();
				if (currency && countryCode) return;

				await get().refreshLocation();
			},

			refreshLocation: async () => {
				try {
					const country = await getLocation();

					const currency =
						country === "US" || country === "CA"
							? usd
							: EU_COUNTRIES.includes(country)
								? eur
								: usd;

					set({ currency, countryCode: country });

					localStorage.setItem("currency", currency);
					localStorage.setItem("countryCode", country);
				} catch (err) {
					console.error("Location detection error:", err);

					set({ currency: usd, countryCode: "US" });
					localStorage.setItem("currency", usd);
					localStorage.setItem("countryCode", "US");
				}
			},
		}),
		{
			name: "currency",
			partialize: (state) => ({
				currency: state.currency,
				countryCode: state.countryCode,
			}),
		},
	),
);
