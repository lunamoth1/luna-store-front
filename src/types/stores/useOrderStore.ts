import { BasketElement } from "../context/BasketContext";
import { OrderData, OrderForm } from "../context/OrderContext";

export interface OrderStoreType {
	order: OrderData | null;
	setOrder: (data: OrderData) => void;
	clearOrder: () => void;
	initOrderFromBasket: (
		items: BasketElement[],
		form?: Partial<OrderForm>
	) => OrderData;
}
