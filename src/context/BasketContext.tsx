import React, { createContext, useContext, useEffect, useState } from "react";
import { checkProductUpdates } from "../api/products";
import { Product } from "../types/ProductPage";
import {
	BasketContextType,
	BasketElement,
} from "../types/context/BasketContext";

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [basket, setBasket] = useState<BasketElement[]>(() => {
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
						: item,
				);
			}

			const newItem: BasketElement = {
				id: itemId,
				quantity,
				name: product.name,
				priceUS: product.priceUS,
				priceEU: product.priceEU,
				image: product.image[0],
				soldOut: product.soldOut,
			};

			return [...prev, newItem];
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
			prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
		);
	};

	const clearBasket = () => {
		setBasket([]);
	};

	const updateBasketWithLatestData = async () => {
		try {
			const latestProducts = await checkProductUpdates();

			setBasket((prev) =>
				prev.map((basketItem) => {
					const updatedProduct = latestProducts.find(
						(product) => product.article === basketItem.id,
					);

					if (updatedProduct) {
						return {
							...basketItem,
							name: updatedProduct.name,
							priceUS: updatedProduct.priceUS,
							priceEU: updatedProduct.priceEU,
							image: updatedProduct.image[0],
							soldOut: updatedProduct.soldOut,
						};
					}

					return basketItem;
				}),
			);
		} catch (error) {
			console.error("Failed to update basket with latest data:", error);
		}
	};

	return (
		<BasketContext.Provider
			value={{
				basket,
				addToBasket,
				removeFromBasket,
				updateQuantity,
				clearBasket,
				updateBasketWithLatestData,
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
