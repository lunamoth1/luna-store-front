import { Product, ProductImage } from "../ProductPage";

export interface BasketElement {
	id: string;
	quantity: number;
	name: string;
	priceUS: number;
	priceEU: number;
	image: ProductImage;
	soldOut: boolean;
}

export interface BasketContextType {
	basket: BasketElement[];
	addToBasket: (product: Product, quantity: number) => void;
	removeFromBasket: (id: string) => void;
	updateQuantity: (id: string, quantity: number) => void;
	clearBasket: () => void;
	updateBasketWithLatestData: () => Promise<void>;
}
