import { BasketItem } from "./BasketContext";

export interface OrderForm {
	email: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}

export interface OrderData {
	form: OrderForm;
	basketItems: BasketItem[];
}

export interface OrderContextProps {
	order: OrderData | null;
	setOrder: (data: OrderData) => void;
	clearOrder: () => void;
}
