import { BasketElement } from "./BasketContext";
import { OrderForm } from "./OrderContext";
import { Status } from "./statusDropDown";

export type Order = {
	id: number;
	documentId: string;
	basket: BasketElement[];
	createdAt: string;
	note: string;
	orderStatus: Status;
} & OrderForm;
