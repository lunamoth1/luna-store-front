import { Link } from "react-router-dom";
import Tiktok from "../../assets/icons/Tiktok";
import Instagram from "../../assets/icons/Instagram";
import "./footer.css";

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footerLine" />
			<div className="footerContainer">
				<ul>
					<li>
						<Link to="/events">Events</Link>
					</li>
					<li>
						<Link to="/contacts">Contacts</Link>
					</li>
					<li>
						<Link to="/partners">Partners</Link>
					</li>
					<li>
						<Link to="/shipping">Shipping</Link>
					</li>
				</ul>
				<div className="footerSocialContainer">
					<Link
						to="https://www.instagram.com/lunamothxx"
						className="footerSocialIcon"
					>
						<Instagram fill={"#fff"} />
					</Link>
					<Link to="#" className="footerSocialIcon">
						<Tiktok fill={"#fff"} />
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
