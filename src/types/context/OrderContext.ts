import { deliveryType } from "../../constants";
import { CheckoutBasketItem } from "../adminPage";

export type DeliveryId = (typeof deliveryType)[number]["id"];

export interface OrderForm {
	email: string;
	delivery: (typeof deliveryType)[number]["id"];
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
	basketItems: CheckoutBasketItem[];
}
