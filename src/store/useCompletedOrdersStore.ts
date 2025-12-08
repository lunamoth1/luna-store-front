import { create } from "zustand";
import { getOrders, updateOrder as apiUpdateOrder } from "../api/orders";
import { completedOrdersStoreTypes } from "../types/stores/useCompletedOrdersStore";

export const useCompletedOrdersStore = create<completedOrdersStoreTypes>(
	(set, get) => ({
		orders: [],
		loading: false,
		error: null,

		fetchOrders: async () => {
			set({ loading: true, error: null });

			try {
				const orders = await getOrders();
				set({ orders, loading: false });
			} catch (err) {
				set({
					error: err instanceof Error ? err.message : "Failed to load orders",
					loading: false,
				});
			}
		},

		updateOrder: async (id, changes) => {
			try {
				const updated = await apiUpdateOrder(id, changes);

				set({
					orders: get().orders.map((o) =>
						o.documentId === id ? { ...o, ...updated.data } : o
					),
				});
			} catch (err) {
				set({
					error: err instanceof Error ? err.message : "Failed to update order",
				});
			}
		},

		clearOrders: () => set({ orders: [] }),
	})
);
