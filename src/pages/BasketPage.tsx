import React from "react";
import { useBasket } from "../context/BasketContext";
import BasketForm from "../components/basketForm/BasketForm";
import BasketItems from "../components/basketItems/BasketItems";
import "../styles/basketPage.css";

const BasketPage: React.FC = () => {
	const { basket } = useBasket();

	if (basket.length === 0) {
		return (
			<div className="basket-container">
				<p className="basket-empty-text">Your basket is empty</p>
			</div>
		);
	}

	return (
		<div className="basket-container">
			<div className="basket-container-inner">
				<BasketForm />
				<BasketItems />
			</div>
		</div>
	);
};

export default BasketPage;
