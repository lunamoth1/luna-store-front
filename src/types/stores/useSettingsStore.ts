export type DeliveryRegion = "us" | "international";

export interface ShippingOption {
	id: string;
	label: string;
	price: number;
	type: DeliveryRegion;
}

export interface SettingsStoreTypes {
	shippingOptions: ShippingOption[];
	usDelivery: ShippingOption[];
	internationalDelivery: ShippingOption[];

	isLoading: boolean;
	error: string | null;

	fetchSettings: () => Promise<void>;
	clearSettings: () => void;
}
