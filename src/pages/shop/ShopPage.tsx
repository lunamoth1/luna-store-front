import React, { useEffect, useState } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import { useProductStore } from "../../store/productStore";
// import { useCategory } from "../context/CategoryContext";
import ProductCardSkeleton from "../../components/productCardSkeleton/ProductCardSkeleton";
import ProductPhoto from "./components/productPhoto/ProductPhoto";
import ProductInfo from "./components/productInfo/ProductInfo";
import productBg from "../../assets/images/productBg.png";
import "./shopPage.css";
import "../product/productPage.css";

const ShopPage: React.FC = () => {
	const { refreshLocation } = useCurrency();
	// const { category } = useCategory();
	const { products, isLoading, error } = useProductStore();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<
		null | (typeof products)[0]
	>(null);

	useEffect(() => {
		refreshLocation();
	}, []);

	useEffect(() => {
		if (isSidebarOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isSidebarOpen]);

	const openProductHandler = () => {
		const product = products[0];
		setSelectedProduct(product);
		setIsSidebarOpen(true);
	};

	const closeSidebar = () => setIsSidebarOpen(false);

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
			<div className="shopImageWrapper">
				<img
					src={productBg}
					alt="Product background image"
					className="shopProductImage"
				/>
				<div className="shopProductSquare" onClick={openProductHandler} />
			</div>

			{/* {isSidebarOpen && (
				<div className="productOverlay" onClick={closeSidebar} />
			)} */}

			<div className={`productSidebar ${isSidebarOpen ? "open" : ""}`}>
				<button className="sidebarCloseBtn" onClick={closeSidebar}>
					×
				</button>

				{selectedProduct && (
					<div className="productSidebarContent">
						<ProductPhoto photo={selectedProduct.image} />
						<ProductInfo product={selectedProduct} />
					</div>
				)}
			</div>
		</div>
	);
};

export default ShopPage;
