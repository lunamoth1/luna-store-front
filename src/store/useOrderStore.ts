import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { OrderStoreType } from "../types/stores/useOrderStore";
import { OrderData, OrderForm } from "../types/context/OrderContext";
import { BasketElement } from "../types/context/BasketContext";

const STORAGE_KEY = "order";

export const useOrderStore = create<OrderStoreType>()(
	persist(
		(set) => ({
			order: null,
			loading: false,
			error: null,

			setOrder: (data: OrderData) => set({ order: data }),
			clearOrder: () => set({ order: null }),

			initOrderFromBasket: (
				items: BasketElement[],
				form?: Partial<OrderForm>
			) => ({
				form: {
					email: form?.email ?? "",
					delivery: form?.delivery ?? "ground",
					firstName: form?.firstName ?? "",
					lastName: form?.lastName ?? "",
					address: form?.address ?? "",
					city: form?.city ?? "",
					state: form?.state ?? "",
					postalCode: form?.postalCode ?? "",
					country: form?.country ?? "",
				},
				basketItems: items,
			}),
		}),
		{
			name: STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
