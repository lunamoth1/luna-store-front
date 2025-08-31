import { createContext, useContext, useEffect, useState } from "react";
import { eur, usd } from "../constants";
import { CurrencyContextType } from "../types/CurrencyContext";

const CurrencyContext = createContext<CurrencyContextType>({
	currency: null,
	countryCode: null,
	setCurrency: () => {},
	refreshLocation: () => {},
});

export const CurrencyProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [currency, setCurrency] = useState<string | null>(null);
	const [countryCode, setCountryCode] = useState<string | null>(null);

	const getCurrency = async () => {
		try {
			const response = await fetch("https://ipwho.is/");
			const data = await response.json();
			const country = data.country_code;
			const euCountries = [
				"AT",
				"BE",
				"BG",
				"HR",
				"CY",
				"CZ",
				"DK",
				"EE",
				"FI",
				"FR",
				"DE",
				"GR",
				"HU",
				"IE",
				"IT",
				"LV",
				"LT",
				"LU",
				"MT",
				"NL",
				"PL",
				"PT",
				"RO",
				"SK",
				"SI",
				"ES",
				"SE",
			];

			const newCurrency =
				country === "US" || country === "CA"
					? usd
					: euCountries.includes(country)
					? eur
					: usd;

			setCurrency(newCurrency);
			setCountryCode(country);
			localStorage.setItem("currency", newCurrency);
			localStorage.setItem("countryCode", country);
		} catch (error) {
			console.error("IP API error:", error);
			setCurrency(usd);
			setCountryCode("US");
			localStorage.setItem("currency", usd);
			localStorage.setItem("countryCode", "US");
		}
	};

	const refreshLocation = () => {
		localStorage.removeItem("currency");
		localStorage.removeItem("countryCode");
		getCurrency();
	};

	useEffect(() => {
		const savedCurrency = localStorage.getItem("currency");
		const savedCountry = localStorage.getItem("countryCode");
		if (savedCurrency && savedCountry) {
			setCurrency(savedCurrency);
			setCountryCode(savedCountry);
		} else {
			getCurrency();
		}
	}, []);

	return (
		<CurrencyContext.Provider
			value={{ currency, countryCode, setCurrency, refreshLocation }}
		>
			{children}
		</CurrencyContext.Provider>
	);
};

export const useCurrency = () => useContext(CurrencyContext);
