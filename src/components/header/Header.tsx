import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useBasket } from "../../context/BasketContext";
import Basket from "../../assets/icons/Basket";
import logo from "../../assets/images/logo.png";
import "./header.css";

const Header: React.FC = () => {
	const { basket } = useBasket();
	const itemCount = basket.reduce((sum, item) => sum + item.quantity, 0);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<header className="header">
			<div className="header-container">
				<img src={logo} className="header-logo" alt="Logo" loading="lazy" />

				<div className="header-burger-menu" onClick={toggleMenu}>
					<span />
					<span />
					<span />
				</div>

				<nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
					<button className="header-close-menu" onClick={toggleMenu}>
						<span />
						<span />
					</button>

					<ul className="nav-left">
						<li>
							<NavLink to="/" onClick={toggleMenu} end>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/shop" onClick={toggleMenu}>
								Shop
							</NavLink>
						</li>
						<li>
							<NavLink to="/events" onClick={toggleMenu}>
								Events
							</NavLink>
						</li>
					</ul>

					<ul className="nav-right">
						<li>
							<NavLink to="/contacts" onClick={toggleMenu}>
								Contacts
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/basket"
								onClick={toggleMenu}
								className={({ isActive }) => (isActive ? "active" : "")}
							>
								{({ isActive }) => (
									<div className="header-basket-container">
										<Basket
											className="header-basket-icon"
											isActive={isActive}
										/>
										({itemCount})
									</div>
								)}
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
