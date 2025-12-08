import React, { useEffect } from "react";
import { useBasket } from "../../context/BasketContext";
import { useOrder } from "../../context/OrderContext";
import { statuses } from "../../constants";
import { createOrder } from "../../api/orders";
import { Order } from "../../types/adminPage";
import { BasketElement } from "../../types/context/BasketContext";
import "./thanksgivingPage.css";

const ThanksgivingPage: React.FC = () => {
	const { clearBasket } = useBasket();
	const { clearOrder } = useOrder();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.get("success") === "true") {
			const savedOrder = JSON.parse(localStorage.getItem("order") || "{}");

			if (!savedOrder || !savedOrder.basketItems?.length) return;

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
				archived: false,
				trackingNumber: "",
			};

			(async () => {
				try {
					await createOrder(orderPayload);
					console.log("Order successfully submitted");
				} catch (err) {
					console.error("Failed to submit order:", err);
				} finally {
					localStorage.removeItem("order");
					clearBasket();
					clearOrder();
				}
			})();
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
