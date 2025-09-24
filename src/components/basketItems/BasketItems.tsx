import React from "react";
import { useOrder } from "../../context/OrderContext";
import { useBasket } from "../../context/BasketContext";
import { useCurrency } from "../../context/CurrencyContext";
import BasketCard from "../backetCard/BasketCard";
import { deliveryType, taxesPercent, usd } from "../../constants";
import "./basketItems.css";

const BasketItems: React.FC = () => {
	const { basket } = useBasket();
	const { order } = useOrder();
	const { currency } = useCurrency();

	const currencySymbol = currency === usd ? "$" : "€";

	const subtotalPrice = basket.reduce(
		(sum, item) =>
			sum +
			(currency === usd ? item.product.priceUS : item.product.priceEU) *
				item.quantity,
		0
	);
	const shippingPrice = deliveryType.find(
		(d) => d.id === order?.form.delivery
	)?.price;
	const taxesPrice = subtotalPrice * taxesPercent;
	const totalPrice = subtotalPrice + taxesPrice + (shippingPrice || 0);

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
				<p className="basket-items-regular-text">
					{currencySymbol} {shippingPrice}
				</p>
			</div>
			<div className="basket-items-info-container">
				<p className="basket-items-regular-text">Taxes:</p>
				<p className="basket-items-regular-text">
					{currencySymbol}
					{taxesPrice.toFixed(2)}
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
