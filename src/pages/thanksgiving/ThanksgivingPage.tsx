import React, { useEffect } from "react";
import { useBasket } from "../../context/BasketContext";
import { useOrderStore } from "../../store/useOrderStore";
import { statuses } from "../../constants";
import { createOrder } from "../../api/orders";
import { Order } from "../../types/adminPage";
// import { BasketElement } from "../../types/context/BasketContext";
import "./thanksgivingPage.css";

const ThanksgivingPage: React.FC = () => {
	const { clearBasket } = useBasket();
	const { order, clear } = useOrderStore();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const isSuccess = urlParams.get("success") === "true";
		if (!isSuccess) return;

		if (import.meta.env.DEV) {
			if (!order || !order.basketItems?.length) return;

			const basketItemsJson = order.basketItems.map(
				(item: any) =>
					({
						id: item.id,
						quantity: item.quantity,
						name: item.name,
						priceUS: item.priceUS,
						priceEU: item.priceEU,
						image: item.image?.url || "",
					} as any)
			);

			const orderPayload: Order = {
				email: order.form.email,
				delivery: order.form.delivery,
				firstName: order.form.firstName,
				lastName: order.form.lastName,
				address: order.form.address,
				city: order.form.city,
				state: order.form.state,
				postalCode: order.form.postalCode,
				country: order.form.country,

				basket: basketItemsJson,
				note: "",
				orderStatus: statuses[2],
				archived: false,
				trackingNumber: "",
			};

			(async () => {
				try {
					await createOrder(orderPayload);
					console.log("DEV: Order successfully submitted");
				} catch (err) {
					console.error("DEV: Failed to submit order:", err);
				}
			})();
		}

		clearBasket();
		clear();
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
