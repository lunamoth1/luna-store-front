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
	const { products, fetchProducts, isLoading, error } = useProductStore();

	useEffect(() => {
		refreshLocation();
	}, []);

	if (error) {
		return (
			<div className="shop-container">
				<p className="shop-message-error">{error}</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="shop-container">
				<div className="shop-loading-container">
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
		<div className="shop-container">
			<section className="shop-grid">
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
