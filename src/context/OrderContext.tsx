import React, { createContext, useContext, useState, useEffect } from "react";
import { OrderContextProps, OrderData, OrderForm } from "../types/OrderContext";
import { BasketElement } from "../types/BasketContext";
import { BasketItem } from "../types/ProductPage";

const STORAGE_KEY = "order";

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [order, setOrderState] = useState<OrderData | null>(null);

	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as OrderData;
				setOrderState(parsed);
			}
		} catch (err) {
			console.warn("Ошибка при загрузке order из localStorage", err);
		}
	}, []);

	useEffect(() => {
		try {
			if (order) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
			} else {
				localStorage.removeItem(STORAGE_KEY);
			}
		} catch (err) {
			console.warn("Ошибка при сохранении order в localStorage", err);
		}
	}, [order]);

	const setOrder = (data: OrderData) => setOrderState(data);

	const clearOrder = () => setOrderState(null);

	const initOrderFromBasket = (
		items: BasketElement[],
		form?: Partial<OrderForm>
	): OrderData => {
		return {
			form: {
				email: form?.email ?? "",
				firstName: form?.firstName ?? "",
				lastName: form?.lastName ?? "",
				address: form?.address ?? "",
				city: form?.city ?? "",
				state: form?.state ?? "",
				postalCode: form?.postalCode ?? "",
				country: form?.country ?? "",
			},
			basketItems: items,
		};
	};

	return (
		<OrderContext.Provider
			value={{ order, setOrder, clearOrder, initOrderFromBasket }}
		>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrder = () => {
	const ctx = useContext(OrderContext);
	if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
	return ctx;
};
