import { BasketItem } from "./BasketContext";
import { OrderForm } from "./OrderContext";
import { Status } from "./statusDropDown";

export type Order = {
	id: number;
	stripeSessionId: string;
	basket: BasketItem[];
	createdAt: string;
	note: string;
	orderStatus: Status;
} & OrderForm;
