import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./headerLogo.css";

const HeaderLogo: React.FC = () => {
	return (
		<header className="headerLogoContainer">
			<NavLink to="/">
				<img src={logo} className="headerLogoImg" alt="Logo" loading="lazy" />
			</NavLink>
		</header>
	);
};

export default HeaderLogo;
