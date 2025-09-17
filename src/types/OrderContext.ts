import { BasketElement } from "./BasketContext";
import { BasketItem } from "./ProductPage";

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
	basketItems: BasketElement[];
}

export interface OrderContextProps {
	order: OrderData | null;
	setOrder: (data: OrderData) => void;
	clearOrder: () => void;
	initOrderFromBasket: (
		items: BasketElement[],
		partialForm?: Partial<OrderForm>
	) => OrderData;
}
