import { categoriesType } from "../types/CategoryContext";
import { Status } from "../types/statusDropDown";

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

export const deliveryType = [
	{
		id: "standard",
		label: "Standard Delivery",
		price: 0,
	},
	{
		id: "express",
		label: "Express Delivery",
		price: 1,
	},
] as const;

export const statusColors: Record<Status, string> = {
	Received: "#43E26BFF",
	Shipped: "#007AFF",
	Paid: "#FF9500",
	Issues: "#FF3B30",
};

export const statuses: Status[] = ["Received", "Shipped", "Paid", "Issues"];
