import { deliveryType } from "../constants";
import { BasketElement } from "./BasketContext";

export type DeliveryId = (typeof deliveryType)[number]["id"];

export interface OrderForm {
	email: string;
	delivery: DeliveryId;
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
