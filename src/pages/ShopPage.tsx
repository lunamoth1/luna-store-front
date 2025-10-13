import React, { useEffect } from "react";
// import { SpinnerCircularFixed } from "spinners-react";
import { useProductStore } from "../store/productStore";
import { useCurrency } from "../context/CurrencyContext";
import { useCategory } from "../context/CategoryContext";
import ProductCard from "../components/productCard/ProductCard";
import ProductCardSkeleton from "../components/productCardSceleton/ProductCardSkeleton";
import "../styles/shopPage.css";

const ShopPage: React.FC = () => {
	const { refreshLocation } = useCurrency();
	const { category } = useCategory();
	const { products, isLoading, error } = useProductStore();

	useEffect(() => {
		refreshLocation();
	}, []);

	if (error) {
		return (
			<div className="shopContainer">
				<p className="shopMessageError">{error}</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="shopContainer">
				<section className="shopGrid">
					{[...Array(7)].map((_, index) => (
						<ProductCardSkeleton key={index} />
					))}
				</section>
			</div>
		);
	}

	return (
		<div className="shopContainer">
			<section className="shopGrid">
				{products.map(
					(product) =>
						category &&
						product.categories.includes(category.toLowerCase()) && (
							<ProductCard product={product} key={product.article} />
						)
				)}
			</section>
		</div>
	);
};

export default ShopPage;
