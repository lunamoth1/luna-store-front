import React from "react";
import { useBasket } from "../../context/BasketContext";
import { useCurrency } from "../../context/CurrencyContext";
import { usd } from "../../constants";
import { BasketElement } from "../../types/BasketContext";
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
		<div className="basket-card-container">
			<img src={image[0].url} alt={name} className="basket-card-image" />
			<div className="basket-card-info-container">
				<div className="basket-card-name-price-container">
					<p className="basket-card-medium-text">{name}</p>
					<p className="basket-card-medium-text">
						{currencySymbol}
						{price}
					</p>
				</div>
				<div className="basket-card-quantity-container">
					<p className="basket-card-regular-text">Quantity:</p>

					<div className="basket-card-quantity-button-container">
						<button
							className="basket-card-quantity-button"
							onClick={() => updateQuantity(id, item.quantity - 1)}
						>
							-
						</button>
						<span className="basket-card-quantity">{quantity}</span>
						<button
							className="basket-card-quantity-button"
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
