import React from "react";
import { useBasket } from "../../../../context/BasketContext";
import { useCurrency } from "../../../../context/CurrencyContext";
import { usd } from "../../../../constants";
import { BasketElement } from "../../../../types/BasketContext";
import "./basketCard.css";

interface BasketCardProps {
	item: BasketElement;
}

const BasketCard: React.FC<BasketCardProps> = ({ item }) => {
	const { updateQuantity } = useBasket();
	const { currency } = useCurrency();
	const currencySymbol = currency === usd ? "$" : "€";
	const { id, product, quantity } = item;
	const { name, priceUS, priceEU, image } = product;
	const price = currency === usd ? priceUS : priceEU;

	return (
		<div className="basketCardContainer">
			<img src={image[0].url} alt={name} className="basketCardImage" />
			<div className="basketCardInfoContainer">
				<div className="basketCardNamePriceContainer">
					<p className="basketCardMediumText">{name}</p>
					<p className="basketCardMediumText">
						{currencySymbol}
						{price}
					</p>
				</div>
				<div className="basketCardQuantityContainer">
					<p className="basketCardRegularText">Quantity:</p>

					<div className="basketCardQuantityButtonContainer">
						<button
							className="basketCardQuantityButton"
							onClick={() => updateQuantity(id, item.quantity - 1)}
						>
							-
						</button>
						<span className="basketCardQuantity">{quantity}</span>
						<button
							className="basketCardQuantityButton"
							onClick={() => updateQuantity(id, item.quantity + 1)}
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BasketCard;
