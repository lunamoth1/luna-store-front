import { categoriesType } from "../types/context/CategoryContext";
import { Status } from "../types/statusDropDown";
import { DeliveryId } from "../types/stores/useOrderStore";
import { ShippingOption } from "../types/stores/useSettingsStore";

export const apiUrl = import.meta.env.VITE_STRAPI_API_URL;

export const categories: categoriesType[] = [
	"Gothic",
	"Rituals",
	"Wall Art",
	"Vintage",
];

export const taxesPercent = 0.097;

export const usd = "USD";
export const eur = "EUR";
export const americas = ["US", "CA"];
export const europe = ["IE", "FR", "DE", "PT", "NL", "ES", "GB"];

export const US_DELIVERY_ORDER: DeliveryId[] = ["ground", "express"];
export const INTL_DELIVERY_ORDER: DeliveryId[] = ["basic", "shipping"];

export const europeNames: Record<string, string> = {
	IE: "Ireland",
	FR: "France",
	DE: "Germany",
	PT: "Portugal",
	NL: "Netherlands",
	ES: "Spain",
	GB: "United Kingdom",
};
export const americasNames: Record<string, string> = {
	US: "United States",
	CA: "Canada",
};

export const usDeliveryType: ShippingOption[] = [
	{
		id: "ground",
		documentId: "ground",
		label: "USPS Ground Advantage",
		price: 12,
		type: "us",
	},
	{
		id: "express",
		documentId: "express",
		label: "USPS Express Shipping",
		price: 32,
		type: "us",
	},
];

export const internationalDeliveryType: ShippingOption[] = [
	{
		id: "basic",
		documentId: "basic",
		label: "USPS International Basic",
		price: 39,
		type: "international",
	},
	{
		id: "shipping",
		documentId: "shipping",
		label: "USPS Express Shipping International",
		price: 92,
		type: "international",
	},
];

export const deliveryType = [...usDeliveryType, ...internationalDeliveryType];

export const statusColors: Record<Status, string> = {
	Received: "#43E26BFF",
	Shipped: "#007AFF",
	Paid: "#FF9500",
	Issues: "#FF3B30",
};

export const statuses: Status[] = ["Received", "Shipped", "Paid", "Issues"];

export const EU_COUNTRIES = [
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
