import React, { useState } from "react";
import Button from "../button/Button";
import { useBasket } from "../../context/BasketContext";
import { useCurrency } from "../../context/CurrencyContext";
import { usd } from "../../constants";
import { Product } from "../../types/ProductPage";
import "./productInfo.css";

interface ProductInfoProps {
	product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
	const { currency } = useCurrency();
	const { addToBasket } = useBasket();
	const [quantity, setQuantity] = useState<number>(1);

	const currencySymbol = currency === usd ? "$" : "€";
	const price = currency === usd ? product.priceUS : product.priceEU;

	const increaseQuantityHandler = () => setQuantity((prev) => prev + 1);
	const decreaseQuantityHandler = () =>
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

	const handleAddToBasket = () => addToBasket(product, quantity);

	return (
		<div>
			<p className="product-info-name">{product.name}</p>
			<p className="product-info-description">{product.description}</p>
			<p className="product-info-price">
				{currencySymbol}
				{price.toFixed(2)}
			</p>

			<div className="product-info-buy-container">
				<div className="product-info-quantity">
					<label htmlFor="quantity">Quantity:</label>
					<p
						className="product-info-quantity-symbol"
						onClick={decreaseQuantityHandler}
					>
						-
					</p>
					<input
						type="number"
						id="quantity"
						min="1"
						value={quantity}
						onChange={(e) => setQuantity(Number(e.target.value))}
					/>
					<p
						className="product-info-quantity-symbol"
						onClick={increaseQuantityHandler}
					>
						+
					</p>
				</div>
				<Button text="Add to basket" onClick={handleAddToBasket} />
			</div>

			{product.ingredients && (
				<p className="product-info-ingredients">
					Ingredients: {product.ingredients}
				</p>
			)}
			{product.additional && (
				<p className="product-info-additional">{product.additional}</p>
			)}
		</div>
	);
};

export default ProductInfo;
