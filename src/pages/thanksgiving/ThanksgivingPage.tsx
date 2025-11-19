import React, { useEffect } from "react";
import { useBasket } from "../../context/BasketContext";
import { useOrder } from "../../context/OrderContext";
import { statuses } from "../../constants";
import { Order } from "../../types/adminPage";
import { BasketElement } from "../../types/BasketContext";
import "./thanksgivingPage.css";

const apiUrl = import.meta.env.VITE_STRAPI_API_URL;

const ThanksgivingPage: React.FC = () => {
	const { clearBasket } = useBasket();
	const { clearOrder } = useOrder();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get("success") === "true") {
			const savedOrder = JSON.parse(localStorage.getItem("order") || "{}");
			if (savedOrder && savedOrder.basketItems?.length) {
				const basketItemsJson = savedOrder.basketItems.map(
					(item: BasketElement) => ({
						id: item.id,
						quantity: item.quantity,
						product: {
							id: item.product.id,
							name: item.product.name,
							priceUS: item.product.priceUS,
							priceEU: item.product.priceEU,
						},
					})
				);
				const orderPayload: Order = {
					email: savedOrder.form.email,
					delivery: savedOrder.form.delivery,
					firstName: savedOrder.form.firstName,
					lastName: savedOrder.form.lastName,
					address: savedOrder.form.address,
					city: savedOrder.form.city,
					state: savedOrder.form.state,
					postalCode: savedOrder.form.postalCode,
					country: savedOrder.form.country,
					basket: basketItemsJson,
					note: "",
					orderStatus: statuses[2],
				};
				fetch(`${apiUrl}/api/orders`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ data: orderPayload }),
				})
					.then((res) => {
						if (!res.ok) throw new Error(`Error: ${res.status}`);
						return res.json();
					})
					.then((data) => console.log("Order submitted"))
					.catch((err) => console.error("Failed:", err));
				localStorage.removeItem("order");
				clearBasket();
				clearOrder();
			}
		}
	}, []);

	return (
		<div className="thanksgivingContainer">
			<h1 className="thanksgivingTitle">Thank you for your purchase!</h1>
			<p className="thanksgivingText">
				We appreciate your support and hope you enjoy your new items.
			</p>
			<p className="thanksgivingText">
				If you have any questions or feedback, feel free to reach out to us.
			</p>
			<p className="thanksgivingText">We are always here to help you.</p>
		</div>
	);
};

export default ThanksgivingPage;
