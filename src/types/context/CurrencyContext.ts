export interface CurrencyContextType {
	currency: string | null;
	countryCode: string | null;
	setCurrency: (currency: string) => void;
	refreshLocation: () => void;
}
