export interface CurrencyStore {
	currency: string | null;
	countryCode: string | null;
	setCurrency: (currency: string) => void;
	refreshLocation: () => Promise<void>;
	initCurrency: () => Promise<void>;
}
