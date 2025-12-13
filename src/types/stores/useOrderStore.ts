import { CheckoutBasketItem } from "../adminPage";
import { OrderData, OrderForm } from "../context/OrderContext";

export interface OrderStoreType {
	order: OrderData | null;
	setOrder: (data: OrderData) => void;
	clearOrder: () => void;
	initOrderFromBasket: (
		items: CheckoutBasketItem[],
		form?: Partial<OrderForm>
	) => OrderData;
}
