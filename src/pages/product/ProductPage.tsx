import React, { useEffect } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { SpinnerCircularFixed } from "spinners-react";
import { useProductStore } from "../../store/useProductStore";
import ProductPhoto from "../shop/components/productPhoto/ProductPhoto";
import ProductInfo from "../shop/components/productInfo/ProductInfo";
import "./productPage.css";

const ProductPage: React.FC = () => {
	const location = useLocation();
	const { id } = useParams<{ id: string }>();
	const { products, isLoading, error } = useProductStore();

	const product =
		location.state?.product ||
		products.find((p) => p.id === parseInt(id || "")) ||
		null;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading) {
		return (
			<div className="productPageCenterContainer">
				<SpinnerCircularFixed
					size={60}
					thickness={50}
					speed={100}
					color="#000"
					secondaryColor="#E8E8E8"
				/>
			</div>
		);
	}
	if (error) return <div className="productPageCenterContainer">{error}</div>;
	if (!product)
		return (
			<div className="productPageCenterContainer">Error loading product</div>
		);

	return (
		<div className="productPageContainer">
			<p className="productPageNav">
				<Link className="productPageNavLink" to="/shop">
					shop
				</Link>{" "}
				{">"} {product.name}
			</p>
			<div className="productPageProduct">
				<ProductPhoto photo={product.image} />
				<ProductInfo product={product} />
			</div>
		</div>
	);
};

export default ProductPage;
