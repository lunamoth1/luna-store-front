import React, { useEffect } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { useProductStore } from "../store/productStore";
import { useCurrency } from "../context/CurrencyContext";
import { useCategory } from "../context/CategoryContext";
import ProductCard from "../components/productCard/ProductCard";
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
				<div className="shopLoadingContainer">
					<SpinnerCircularFixed
						size={60}
						thickness={50}
						speed={100}
						color="#000"
						secondaryColor="#E8E8E8"
					/>
				</div>
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
