import React, { useEffect, useState } from "react";
import { SpinnerCircularFixed } from "spinners-react";
import { useProductStore } from "../store/productStore";
import { useCurrency } from "../context/CurrencyContext";
import Category from "../components/category/Category";
import ProductCard from "../components/productCard/ProductCard";
import { categories } from "../constants";
import "../styles/shopPage.css";

const ShopPage: React.FC = () => {
	const { refreshLocation } = useCurrency();
	const { products, fetchProducts, isLoading, error } = useProductStore();
	const [category, setCategory] = useState<string>(categories[0].toLowerCase());

	useEffect(() => {
		refreshLocation();
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	if (error) {
		return (
			<div className="shop-container">
				<div className="shop-message-container">
					<p className="shop-message-error">{error}</p>
				</div>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className="shop-container">
				<div className="shop-message-container">
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
			<Category category={category.toLowerCase()} setCategory={setCategory} />
			<section className="shop-grid">
				{products.map(
					(product) =>
						product.categories.includes(category.toLowerCase()) && (
							<ProductCard product={product} key={product.article} />
						)
				)}
			</section>
		</div>
	);
};

export default ShopPage;
