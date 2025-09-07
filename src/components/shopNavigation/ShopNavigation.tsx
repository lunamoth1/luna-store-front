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

	const selectCategoryHandler = (category: categoriesType) =>
		setCategory(category);

	return (
		<header className="shop-nav-container">
			<Link
				to="/shop"
				className={`shop-nav-shop-link ${
					isShopActive ? "shop-nav-shop-link-active" : ""
				}`}
				style={{ pointerEvents: isShopActive ? "none" : "auto" }}
			>
				<p
					className={`shop-nav-shop-link-text ${
						isShopActive ? "shop-nav-shop-link-text-active" : ""
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
			<Link to="/basket" className="shop-nav-basket">
				<Basket className="header-basket-icon" />({itemCount})
			</Link>
		</header>
	);
};

export default ShopNavigation;
