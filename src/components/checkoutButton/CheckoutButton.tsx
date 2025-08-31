import { loadStripe } from "@stripe/stripe-js";
import { useOrder } from "../../context/OrderContext";
import Button from "../button/Button";
import { BasketItem } from "../../types/ProductPage";

interface CheckoutButtonProps {
	basketItems: BasketItem[];
	email?: string;
	disabled?: boolean;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

const CheckoutButton = ({
	basketItems,
	email,
	disabled,
}: CheckoutButtonProps) => {
	const { order } = useOrder();

	const checkoutHandler = async () => {
		localStorage.setItem("order", JSON.stringify(order));

		const stripe = await stripePromise;
		await stripe?.redirectToCheckout({
			lineItems: basketItems.map((item) => ({
				price: item.price,
				quantity: item.quantity,
			})),
			mode: "payment",
			successUrl: `${frontendUrl}/thanksgiving?success=true`,
			cancelUrl: `${frontendUrl}/basket`,
			customerEmail: email,
		});
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
