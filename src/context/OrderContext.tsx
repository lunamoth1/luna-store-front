import React, { createContext, useContext, useState } from "react";
import { OrderContextProps, OrderData } from "../types/OrderContext";

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [order, setOrderState] = useState<OrderData | null>(null);

	const setOrder = (data: OrderData) => setOrderState(data);
	const clearOrder = () => setOrderState(null);

	return (
		<OrderContext.Provider value={{ order, setOrder, clearOrder }}>
			{children}
		</OrderContext.Provider>
	);
};

export const useOrder = () => {
	const ctx = useContext(OrderContext);
	if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
	return ctx;
};
