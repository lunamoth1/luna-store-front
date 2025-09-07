import React from "react";
import { Link } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";
import { usd } from "../../constants";
import { Product } from "../../types/ProductPage";
import "./productCard.css";

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { currency } = useCurrency();
	const currencySymbol = currency === usd ? "$" : "€";
	const price = currency === usd ? product.priceUS : product.priceEU;

	return (
		<Link
			to={`/product/${product.id}`}
			state={{ product }}
			className="product-card-container"
		>
			<img src={product.image[0].url} alt={product.name} />
			<p className="product-card-price">
				{currencySymbol}
				{price}
			</p>
			<p className="product-card-name">{product.name}</p>
		</Link>
	);
};

export default ProductCard;
