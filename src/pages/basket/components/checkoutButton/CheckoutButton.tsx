import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useBasket } from "../../../../context/BasketContext";
import { useCurrency } from "../../../../context/CurrencyContext";
import { useSettingsStore } from "../../../../store/useSettingsStore";
import { useOrderStore } from "../../../../store/useOrderStore";
import Button from "../../../../components/button/Button";
import { createCheckoutSession } from "../../../../api/checkout";
import {
	taxesPercent,
	usd,
	usDeliveryType,
	internationalDeliveryType,
} from "../../../../constants";

interface CheckoutButtonProps {
	email?: string;
	disabled?: boolean;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ email, disabled }) => {
	const { order } = useOrderStore();
	const { currency } = useCurrency();
	const { basket } = useBasket();
	const { usDelivery, internationalDelivery } = useSettingsStore();

	const deliveryList =
		order.form.country === "" || order.form.country === "US"
			? usDelivery.length > 0
				? usDelivery
				: usDeliveryType
			: internationalDelivery.length > 0
			? internationalDelivery
			: internationalDeliveryType;

	const shippingPrice =
		deliveryList.find((d) => d.id === order.form.delivery)?.price ??
		deliveryList[0]?.price ??
		0;

	const subtotalPrice = basket.reduce(
		(sum, item) =>
			sum + (currency === usd ? item.priceUS : item.priceEU) * item.quantity,
		0
	);

	const taxesPrice = subtotalPrice * taxesPercent;

	const checkoutHandler = async () => {
		try {
			const stripe = await stripePromise;
			if (!stripe) {
				console.error("Stripe failed to initialize");
				return;
			}

			const session = await createCheckoutSession({
				basketItems: basket.map((item) => ({
					id: item.id,
					name: item.name,
					price: currency === usd ? item.priceUS * 100 : item.priceEU * 100,
					quantity: item.quantity,
					image: item.image?.url || "",
				})),

				form: {
					email: order.form.email,
					firstName: order.form.firstName,
					lastName: order.form.lastName,
					delivery: order.form.delivery,
					address: order.form.address,
					city: order.form.city,
					state: order.form.state,
					postalCode: order.form.postalCode,
					country: order.form.country,
				},

				shippingCost: shippingPrice
					? Math.round(Number(shippingPrice) * 100)
					: 0,
				taxAmount: taxesPrice ? Math.round(taxesPrice * 100) : 0,
				currency: currency === usd ? "usd" : "eur",
			});

			if (!session.id) {
				console.error("Failed to create Stripe session:", session);
				return;
			}

			const { error } = await stripe.redirectToCheckout({
				sessionId: session.id,
			});

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
