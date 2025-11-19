import React from "react";
import { useOrder } from "../../../../context/OrderContext";
import { useBasket } from "../../../../context/BasketContext";
import { useCurrency } from "../../../../context/CurrencyContext";
import BasketCard from "../backetCard/BasketCard";
import { deliveryType, taxesPercent, usd } from "../../../../constants";
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
	const shippingPrice =
		deliveryType.find((d) => d.id === order?.form.delivery)?.price ||
		deliveryType[0].price;
	const taxesPrice = subtotalPrice * taxesPercent;
	const totalPrice = subtotalPrice + taxesPrice + (shippingPrice || 0);

	return (
		<div className="basketItemsContainer">
			{basket.map((item) => (
				<BasketCard key={item.id} item={item} />
			))}
			<div className="basketItemsInfoContainer">
				<p className="basketItemsRegularText">Subtotal:</p>
				<p className="basketItemsRegularText">
					{currencySymbol}
					{subtotalPrice.toFixed(2)}
				</p>
			</div>
			<div className="basketItemsInfoContainer">
				<p className="basketItemsRegularText">Shipping:</p>
				<p className="basketItemsRegularText">
					{currencySymbol} {shippingPrice}
				</p>
			</div>
			<div className="basketItemsInfoContainer">
				<p className="basketItemsRegularText">Taxes:</p>
				<p className="basketItemsRegularText">
					{currencySymbol}
					{taxesPrice.toFixed(2)}
				</p>
			</div>
			<div className="basketItemsInfoContainer">
				<p className="basketItemsMediumText">Total:</p>
				<p className="basketItemsMediumText">
					{currencySymbol}
					{totalPrice.toFixed(2)}
				</p>
			</div>
		</div>
	);
};

export default BasketItems;
