import { Order } from "../adminPage";

export interface completedOrdersStoreTypes {
	orders: Order[];
	loading: boolean;
	error: string | null;

	fetchOrders: () => Promise<void>;
	updateOrder: (id: string, changes: Partial<Order>) => Promise<void>;
	clearOrders: () => void;
}
