import React from "react";
import { useBasket } from "../../../../context/BasketContext";
import { useCurrency } from "../../../../context/CurrencyContext";
import { useSettingsStore } from "../../../../store/useSettingsStore";
import { useOrderStore } from "../../../../store/useOrderStore";
import BasketCard from "../backetCard/BasketCard";
import {
	taxesPercent,
	usd,
	usDeliveryType,
	internationalDeliveryType,
} from "../../../../constants";
import "./basketItems.css";

const BasketItems: React.FC = () => {
	const { basket } = useBasket();
	const { order } = useOrderStore();
	const { currency } = useCurrency();
	const { usDelivery, internationalDelivery } = useSettingsStore();

	const currencySymbol = currency === usd ? "$" : "€";

	const subtotalPrice = basket.reduce(
		(sum, item) =>
			sum + (currency === usd ? item.priceUS : item.priceEU) * item.quantity,
		0
	);

	const deliveryList =
		order.form.country === "" || order.form.country === "US"
			? usDelivery.length > 0
				? usDelivery
				: usDeliveryType
			: internationalDelivery.length > 0
			? internationalDelivery
			: internationalDeliveryType;

	const shippingPrice =
		deliveryList.find((d: any) => d.id === order.form.delivery)?.price ??
		deliveryList[0]?.price ??
		0;

	const taxesPrice = subtotalPrice * taxesPercent;
	const totalPrice = subtotalPrice + taxesPrice + shippingPrice;

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
					{currencySymbol}
					{Number(shippingPrice).toFixed(2)}
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
