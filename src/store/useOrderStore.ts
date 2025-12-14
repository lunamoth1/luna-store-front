import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrderData, OrderForm } from "../types/stores/useOrderStore";
import type { BasketElement } from "../types/context/BasketContext";

interface OrderStore {
	order: OrderData;
	setForm: (patch: Partial<OrderForm>) => void;
	setBasket: (items: BasketElement[]) => void;
	clear: () => void;
}

const createDefaultForm = (): OrderForm => ({
	email: "",
	delivery: "ground",
	firstName: "",
	lastName: "",
	address: "",
	city: "",
	state: "",
	postalCode: "",
	country: "",
});

export const useOrderStore = create<OrderStore>()(
	persist(
		(set, get) => ({
			order: {
				form: createDefaultForm(),
				basketItems: [],
			},

			setForm: (patch) => {
				const { order } = get();
				set({
					order: {
						...order,
						form: { ...order.form, ...patch },
					},
				});
			},

			setBasket: (items) => {
				const { order } = get();
				set({
					order: { ...order, basketItems: items },
				});
			},

			clear: () =>
				set({
					order: {
						form: createDefaultForm(),
						basketItems: [],
					},
				}),
		}),
		{ name: "order" }
	)
);
