import React, { useEffect } from "react";
import { useBasket } from "../context/BasketContext";
import { useOrder } from "../context/OrderContext";
import { OrderData } from "../types/OrderContext";
import "../styles/thanksgivingPage.css";

const apiUrl = import.meta.env.VITE_STRAPI_API_URL;

const ThanksgivingPage: React.FC = () => {
	const { clearBasket } = useBasket();
	const { clearOrder } = useOrder();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get("success") === "true") {
			const savedOrder: OrderData = JSON.parse(
				localStorage.getItem("order") || "{}"
			);

			if (savedOrder) {
				const basketItemsJson = savedOrder.basketItems.map((item) => ({
					id: item.id,
					quantity: item.quantity,
					product: {
						id: item.product.id,
						name: item.product.name,
						priceUS: item.product.priceUS,
						priceEU: item.product.priceEU,
					},
				}));

				const orderPayload = {
					email: savedOrder.form.email,
					firstName: savedOrder.form.firstName,
					lastName: savedOrder.form.lastName,
					address: savedOrder.form.address,
					city: savedOrder.form.city,
					state: savedOrder.form.state,
					postalCode: savedOrder.form.postalCode,
					country: savedOrder.form.country,
					basket: basketItemsJson,
				};

				fetch(`${apiUrl}/api/orders`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: orderPayload }),
				})
					.then((res) => res.json())
					.then(console.log)
					.catch(console.error);

				localStorage.removeItem("order");
				clearBasket();
				clearOrder();
			}
		}
	}, []);

	return (
		<div className="thanksgiving-container">
			<h1 className="thanksgiving-title">Thank you for your purchase!</h1>
			<p className="thanksgiving-text">
				We appreciate your support and hope you enjoy your new items.
			</p>
			<p className="thanksgiving-text">
				If you have any questions or feedback, feel free to reach out to us.
			</p>
			<p className="thanksgiving-text">We are always here to help you.</p>
		</div>
	);
};

export default ThanksgivingPage;
