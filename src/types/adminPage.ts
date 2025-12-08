import { BasketElement } from "./context/BasketContext";
import { OrderForm } from "./context/OrderContext";
import { Status } from "./statusDropDown";

export type Order = {
	id?: number;
	documentId?: string;
	basket: BasketElement[];
	createdAt?: string;
	note: string;
	orderStatus: Status;
	archived: boolean;
	trackingNumber?: string;
} & OrderForm;
