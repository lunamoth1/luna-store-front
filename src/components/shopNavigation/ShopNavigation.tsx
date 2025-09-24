import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBasket } from "../../context/BasketContext";
import { useCategory } from "../../context/CategoryContext";
import Basket from "../../assets/icons/Basket";
import { categories } from "../../constants";
import { categoriesType } from "../../types/CategoryContext";
import "./shopNavigation.css";

const ShopNavigation: React.FC = () => {
	const { basket } = useBasket();
	const { category, setCategory } = useCategory();
	const location = useLocation();
	const itemCount = basket.reduce((sum, item) => sum + item.quantity, 0);
	const isShopActive = location.pathname.startsWith("/shop");

	const [isOpen, setIsOpen] = useState(false);

	const selectCategoryHandler = (cat: categoriesType) => {
		setCategory(cat);
		setIsOpen(false);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	return (
		<>
			<button
				className={`shopNavToggle ${isOpen ? "open" : ""}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? "×" : "☰"}
			</button>

			{isOpen && (
				<div className="shopNavOverlay" onClick={() => setIsOpen(false)} />
			)}

			<header className={`shopNavContainer ${isOpen ? "open" : ""}`}>
				<Link
					to="/shop"
					className={`shopNavShopLink ${
						isShopActive ? "shopNavShopLinkActive" : ""
					}`}
					onClick={() => setIsOpen(false)}
					style={{ pointerEvents: isShopActive ? "none" : "auto" }}
				>
					<p
						className={`shopNavShopLinkText ${
							isShopActive ? "shopNavShopLinkTextActive" : ""
						}`}
					>
						shop
					</p>
				</Link>

				<ul>
					{categories.map((cat) => (
						<Link to="/shop" key={cat}>
							<li
								onClick={() => selectCategoryHandler(cat)}
								className={category === cat ? "active" : ""}
							>
								{cat}
							</li>
						</Link>
					))}
				</ul>

				<Link
					to="/basket"
					className="shopNavBasket"
					onClick={() => setIsOpen(false)}
				>
					<Basket className="headerBasketIcon" />({itemCount})
				</Link>
			</header>
		</>
	);
};

export default ShopNavigation;
