import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useOrder } from "../../context/OrderContext";
import { useBasket } from "../../context/BasketContext";
import { useCurrency } from "../../context/CurrencyContext";
import Button from "../button/Button";
import { deliveryType, taxesPercent, usd } from "../../constants";

interface CheckoutButtonProps {
	email?: string;
	disabled?: boolean;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ email, disabled }) => {
	const { order, setOrder, initOrderFromBasket } = useOrder();
	const { currency } = useCurrency();
	const { basket } = useBasket();

	const shippingPrice = deliveryType.find(
		(d) => d.id === order?.form.delivery
	)?.price;

	const subtotalPrice = basket.reduce(
		(sum, item) =>
			sum +
			(currency === usd ? item.product.priceUS : item.product.priceEU) *
				item.quantity,
		0
	);

	const taxesPrice = subtotalPrice * taxesPercent;

	const checkoutHandler = async () => {
		try {
			const orderToSave = order ?? initOrderFromBasket(basket);
			setOrder(orderToSave);

			try {
				localStorage.setItem("order", JSON.stringify(orderToSave));
			} catch (e) {
				console.warn("Failed to local-save order before redirect", e);
			}

			const stripe = await stripePromise;
			if (!stripe) {
				console.error("Stripe failed to initialize");
				return;
			}

			const response = await fetch(
				`${import.meta.env.VITE_STRAPI_API_URL}/api/checkout`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						basketItems: basket.map((item) => ({
							name: item.product.name,
							price:
								currency === usd
									? item.product.priceUS * 100
									: item.product.priceEU * 100,
							quantity: item.quantity,
						})),
						email,
						shippingCost: shippingPrice ? shippingPrice * 100 : 0,
						taxAmount: taxesPrice ? Math.round(taxesPrice * 100) : 0,
						currency: currency === usd ? "usd" : "eur",
					}),
				}
			);

			const data = await response.json();

			if (!data.id) {
				console.error("Failed to create Stripe session:", data);
				return;
			}

			const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
			if (error) {
				console.error("Stripe checkout error:", error.message);
			}
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
