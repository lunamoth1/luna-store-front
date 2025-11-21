import React, { useEffect, useState } from "react";
import { useCurrency } from "../../context/CurrencyContext";
import { useCategory } from "../../context/CategoryContext";
import { useProductStore } from "../../store/productStore";
import ProductCardSkeleton from "../../components/productCardSkeleton/ProductCardSkeleton";
import ProductPhoto from "./components/productPhoto/ProductPhoto";
import ProductInfo from "./components/productInfo/ProductInfo";
import gothicBg from "../../assets/images/gothicBg.png";
import ritualsBg from "../../assets/images/ritualsBg.png";
import wallartBg from "../../assets/images/wallartBg.png";
import vintageBg from "../../assets/images/vintageBg.png";
import "./shopPage.css";

const backgrounds = {
	Gothic: gothicBg,
	Rituals: ritualsBg,
	"Wall Art": wallartBg,
	Vintage: vintageBg,
};

const ShopPage: React.FC = () => {
	const { refreshLocation } = useCurrency();
	const { category, isSidebarOpen, setIsSidebarOpen } = useCategory();
	const { products, isLoading, error } = useProductStore();
	const [lockBodyScroll, setLockBodyScroll] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<
		null | (typeof products)[0]
	>(null);

	useEffect(() => {
		refreshLocation();
	}, []);

	useEffect(() => {
		document.body.style.overflow = lockBodyScroll ? "hidden" : "";
	}, [lockBodyScroll]);

	const openProductHandler = (product: (typeof products)[0]) => {
		setSelectedProduct(product);
		setIsSidebarOpen(true);
	};

	const closeSidebar = () => {
		setIsSidebarOpen(false);
		setLockBodyScroll(false);
	};

	const filteredProducts = products.filter((p) => {
		if (!category) return false;
		if (!p.categories) return false;

		const categoryList = p.categories
			.split("-")
			.map((c) => c.trim().toLowerCase())
			.filter(Boolean);

		return categoryList.includes(category.toLowerCase());
	});

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
					src={backgrounds[category as keyof typeof backgrounds]}
					alt={`${category} background`}
					className="shopProductImage"
				/>

				{filteredProducts.map((product) => (
					<div
						key={product.id}
						className="productPin"
						style={{
							top: `${product.y}%`,
							left: `${product.x}%`,
						}}
						onClick={() => openProductHandler(product)}
					>
						<img
							src={product.previewImage.url}
							alt={product.name}
							className="productPinImage"
						/>
					</div>
				))}
			</div>

			<div
				className={`productSidebar ${isSidebarOpen ? "open" : ""}`}
				onMouseEnter={() => setLockBodyScroll(true)}
				onMouseLeave={() => setLockBodyScroll(false)}
			>
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
