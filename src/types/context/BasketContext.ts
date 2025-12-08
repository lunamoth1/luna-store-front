import { Product } from "../ProductPage";

export interface BasketElement {
	id: string;
	quantity: number;
	product: Product;
}

export interface BasketContextType {
	basket: BasketElement[];
	addToBasket: (product: Product, quantity: number) => void;
	removeFromBasket: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearBasket: () => void;
}
