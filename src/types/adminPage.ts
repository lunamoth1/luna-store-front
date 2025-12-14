import { OrderForm } from "./stores/useOrderStore";
import { Status } from "./statusDropDown";

export interface CheckoutBasketItem {
	id: string;
	quantity: number;
	name: string;
	price: number;
	image: string;
}

export type Order = {
	id?: number;
	documentId: string;
	basket: CheckoutBasketItem[];
	createdAt?: string;
	note: string;
	orderStatus: Status;
	archived: boolean;
	trackingNumber?: string;
} & OrderForm;
