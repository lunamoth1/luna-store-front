import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useOrder } from "../../../../context/OrderContext";
import { useBasket } from "../../../../context/BasketContext";
import { useCurrency } from "../../../../context/CurrencyContext";
import Button from "../../../../components/button/Button";
import { createCheckoutSession } from "../../../../api/checkout";
import { deliveryType, taxesPercent, usd } from "../../../../constants";

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
			sum + (currency === usd ? item.priceUS : item.priceEU) * item.quantity,
		0
	);

	const taxesPrice = subtotalPrice * taxesPercent;

	// here errors
	const checkoutHandler = async () => {
		try {
			const orderToSave = order ?? initOrderFromBasket(basket);
			setOrder(orderToSave);

			try {
				localStorage.setItem("order", JSON.stringify(orderToSave));
			} catch {
				console.warn("Failed to local-save order before redirect");
			}

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
					email: orderToSave.form.email,
					firstName: orderToSave.form.firstName,
					lastName: orderToSave.form.lastName,
					delivery: orderToSave.form.delivery,
					address: orderToSave.form.address,
					city: orderToSave.form.city,
					state: orderToSave.form.state,
					postalCode: orderToSave.form.postalCode,
					country: orderToSave.form.country,
				},

				shippingCost: shippingPrice ? shippingPrice * 100 : 0,
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
