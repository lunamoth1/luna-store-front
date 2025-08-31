import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ProductPhoto from "../components/productPhoto/ProductPhoto";
import ProductInfo from "../components/productInfo/ProductInfo";
import { Product } from "../types/ProductPage";
import "../styles/productPage.css";

const ProductPage: React.FC = () => {
	const location = useLocation();
	const product: Product = location.state?.product;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (!product) return <div>Error</div>;

	return (
		<div className="product-page-container">
			<p className="product-page-nav">
				<Link className="product-page-nav-link" to="/shop">
					shop
				</Link>{" "}
				{">"} {product.name}
			</p>
			<div className="product-page-product">
				<ProductPhoto photo={product.image} />
				<ProductInfo product={product} />
			</div>
		</div>
	);
};

export default ProductPage;
