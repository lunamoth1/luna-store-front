import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/ProductPage";
import { BasketContextType, BasketItem } from "../types/BasketContext";

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [basket, setBasket] = useState<BasketItem[]>(() => {
		const savedBasket = localStorage.getItem("basket");
		return savedBasket ? JSON.parse(savedBasket) : [];
	});

	useEffect(() => {
		localStorage.setItem("basket", JSON.stringify(basket));
	}, [basket]);

	const addToBasket = (product: Product, quantity: number = 1) => {
		const itemId = product.article;
		setBasket((prev) => {
			const existingItem = prev.find((item) => item.id === itemId);
			if (existingItem) {
				return prev.map((item) =>
					item.id === itemId
						? { ...item, quantity: item.quantity + quantity }
						: item
				);
			}
			return [...prev, { id: itemId, quantity, product }];
		});
	};

	const removeFromBasket = (id: string) => {
		setBasket((prev) => prev.filter((item) => item.id !== id));
	};

	const updateQuantity = (id: string, quantity: number) => {
		if (quantity < 1) {
			removeFromBasket(id);
			return;
		}
		setBasket((prev) =>
			prev.map((item) => (item.id === id ? { ...item, quantity } : item))
		);
	};

	const clearBasket = () => {
		setBasket([]);
	};

	return (
		<BasketContext.Provider
			value={{
				basket,
				addToBasket,
				removeFromBasket,
				updateQuantity,
				clearBasket,
			}}
		>
			{children}
		</BasketContext.Provider>
	);
};

export const useBasket = () => {
	const context = useContext(BasketContext);
	if (!context) {
		throw new Error("useBasket must be used within a BasketProvider");
	}
	return context;
};
