import { deliveryType } from "../../constants";
import { BasketElement } from "../context/BasketContext";

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
	basketItems: BasketElement[];
}
