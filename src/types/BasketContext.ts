import { Product } from "./ProductPage";

export interface BasketItem {
	id: string;
	quantity: number;
	product: Product;
}

export interface BasketContextType {
	basket: BasketItem[];
	addToBasket: (product: Product, quantity: number) => void;
	removeFromBasket: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearBasket: () => void;
}
