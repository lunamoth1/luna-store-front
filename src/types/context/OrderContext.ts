import { deliveryType } from "../../constants";
import { BasketElement } from "./BasketContext";

export type DeliveryId = (typeof deliveryType)[number]["id"];

export interface OrderForm {
	email: string;
	// fix-here
	delivery: any;
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
