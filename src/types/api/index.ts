import { CheckoutBasketItem } from "../adminPage";
import { OrderForm } from "../context/OrderContext";
import { Status } from "../statusDropDown";

export interface CreateCheckoutSessionBody {
	basketItems: CheckoutBasketItem[];
	form: OrderForm;
	shippingCost: number;
	taxAmount: number;
	currency: "usd" | "eur";
}

export interface StrapiEntity<T> {
	id: number;
	attributes: T;
}

export interface StrapiListResponse<T> {
	data: StrapiEntity<T>[];
}
export interface OrderAttributes {
	email: string;
	delivery: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;

	basket: CheckoutBasketItem[];

	orderStatus: Status;
	note?: string;
	trackingNumber?: string;
	archived: boolean;

	stripeSessionId?: string;
	stripePaymentStatus?: string;

	createdAt?: string;
}
