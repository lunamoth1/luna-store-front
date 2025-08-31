import React from "react";
import { useBasket } from "../../context/BasketContext";
import { useCurrency } from "../../context/CurrencyContext";
import BasketCard from "../backetCard/BasketCard";
import { usd } from "../../constants";
import "./basketItems.css";

const BasketItems: React.FC = () => {
	const { basket } = useBasket();
	const { currency } = useCurrency();
	const currencySymbol = currency === usd ? "$" : "€";

	const subtotalPrice = basket.reduce(
		(sum, item) =>
			sum +
			(currency === usd
				? item.product.priceUS
				: item.product.priceEU * item.quantity),
		0
	);
	const priceWithTaxes = subtotalPrice * 0.097;
	const totalPrice = subtotalPrice + priceWithTaxes;

	return (
		<div className="basket-items-container">
			{basket.map((item) => (
				<BasketCard key={item.id} item={item} />
			))}
			<div className="basket-items-info-container">
				<p className="basket-items-regular-text">Subtotal:</p>
				<p className="basket-items-regular-text">
					{currencySymbol}
					{subtotalPrice.toFixed(2)}
				</p>
			</div>
			<div className="basket-items-info-container">
				<p className="basket-items-regular-text">Shipping:</p>
				<p className="basket-items-regular-text">-</p>
			</div>
			<div className="basket-items-info-container">
				<p className="basket-items-regular-text">Taxes:</p>
				<p className="basket-items-regular-text">
					{currencySymbol}
					{priceWithTaxes.toFixed(2)}
				</p>
			</div>
			<div className="basket-items-info-container">
				<p className="basket-items-medium-text">Total:</p>
				<p className="basket-items-medium-text">
					{currencySymbol}
					{totalPrice.toFixed(2)}
				</p>
			</div>
		</div>
	);
};

export default BasketItems;
