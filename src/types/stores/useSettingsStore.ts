export type DeliveryRegion = "US" | "International";

export interface ShippingOption {
	id: string;
	documentId: string;
	label: string;
	price: number;
	type: DeliveryRegion;
	uid: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}

export interface SettingsStoreTypes {
	shippingOptions: ShippingOption[];
	usDelivery: ShippingOption[];
	internationalDelivery: ShippingOption[];

	isLoading: boolean;
	error: string | null;

	fetchSettings: (force?: boolean) => Promise<void>;
	clearSettings: () => void;
}
