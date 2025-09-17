import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useOrder } from "../../context/OrderContext";
import { useBasket } from "../../context/BasketContext";
import Button from "../button/Button";
import { BasketItem } from "../../types/ProductPage";

interface CheckoutButtonProps {
	basketItems: BasketItem[];
	email?: string;
	disabled?: boolean;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
	basketItems,
	email,
	disabled,
}) => {
	const { order, setOrder, initOrderFromBasket } = useOrder();
	const { basket } = useBasket();

	const checkoutHandler = async () => {
		try {
			const orderToSave = order ?? initOrderFromBasket(basket);
			setOrder(orderToSave);

			try {
				localStorage.setItem("order", JSON.stringify(orderToSave));
			} catch (e) {
				console.warn("Failed to local-save order before redirect", e);
			}

			JSON.parse(localStorage.getItem("order") || "{}");

			const stripe = await stripePromise;
			if (!stripe) {
				console.error("Stripe failed to initialize");
				return;
			}

			await stripe.redirectToCheckout({
				lineItems: basketItems.map((item) => ({
					price: item.price,
					quantity: item.quantity,
				})),
				mode: "payment",
				successUrl: `${frontendUrl}/thanksgiving?success=true`,
				cancelUrl: `${frontendUrl}/basket`,
				customerEmail: email,
			});
		} catch (err) {
			console.error("Checkout error:", err);
		}
	};

	return (
		<Button
			text="Pay Now"
			onClick={checkoutHandler}
			styles={{ marginTop: "3rem", alignSelf: "center" }}
			disabled={disabled}
		/>
	);
};

export default CheckoutButton;
