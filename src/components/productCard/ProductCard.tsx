import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";
import Skeleton from "../skeleton/Skeleton";
import { usd } from "../../constants";
import { Product } from "../../types/ProductPage";
import "./productCard.css";

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { currency } = useCurrency();
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const currencySymbol = currency === usd ? "$" : "€";
	const price = currency === usd ? product.priceUS : product.priceEU;

	return (
		<Link
			to={`/product/${product.id}`}
			state={{ product }}
			className="productCardContainer"
		>
			{product.soldOut && (
				<div className="productCardSoldOutContainer">
					<p className="productCardSoldOutText">Sold Out</p>
				</div>
			)}

			<div className="productCardImageWrapper">
				{!isImageLoaded && <Skeleton width="100%" height="100%" />}
				<img
					src={product.image[0].url}
					alt={product.name}
					onLoad={() => setIsImageLoaded(true)}
					style={{ display: isImageLoaded ? "block" : "none" }}
				/>
			</div>

			<p className="productCardPrice">
				{currencySymbol}
				{price}
			</p>
			<p className="productCardName">{product.name}</p>
		</Link>
	);
};

export default ProductCard;
