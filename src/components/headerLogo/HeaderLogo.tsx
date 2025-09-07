import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./headerLogo.css";

const HeaderLogo: React.FC = () => {
	return (
		<header className="header-logo-container">
			<NavLink to="/">
				<img src={logo} className="header-logo-img" alt="Logo" loading="lazy" />
			</NavLink>
		</header>
	);
};

export default HeaderLogo;
