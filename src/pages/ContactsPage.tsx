import React from "react";
import "../styles/contactsPage.css";
import { Link } from "react-router-dom";

const ContactsPage: React.FC = () => {
	return (
		<div className="contacts-container">
			<p className={`contacts-medium  contacts-margin`}>Contact Us</p>

			<p className={`contacts-light contacts-margin`}>
				We’d love to hear from you! Whether you have questions about our
				products, orders, or collaborations, feel free to reach out.
			</p>

			<p>
				<span className="contacts-medium">📧 Email: </span>
				<a href="mailto:lunamoth.store@gmail.com" className="contacts-link">
					lunamoth.store@gmail.com
				</a>
			</p>
			<p className="contacts-margin">
				<span className="contacts-medium">📞 Phone:</span>{" "}
				<a href="tel:+12136767634" className="contacts-link">
					+1 (213) 676-7634
				</a>
			</p>

			<p className="contacts-medium">✨ Stay connected:</p>
			<p className="contacts-light">
				Follow us on Instagram for updates and new arrivals:
			</p>
			<p className="contacts-margin">
				<Link
					to="https://www.instagram.com/LM.gothshop"
					target="_blank"
					className={`contacts-link `}
				>
					@LM.gothshop
				</Link>
			</p>

			<p className="contacts-medium">🕒 Customer Support Hours</p>
			<p className="contacts-light">Tuesday – Friday: 11:00 AM – 6:00 PM</p>
			<p className="contacts-light">Saturday – Monday: Closed</p>
		</div>
	);
};

export default ContactsPage;
