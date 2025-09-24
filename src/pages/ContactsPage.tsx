import React from "react";
import { Link } from "react-router-dom";
import "../styles/contactsPage.css";

const ContactsPage: React.FC = () => {
	return (
		<div className="contactsContainer">
			<p className={`contactsMedium  contactsMargin`}>Contact Us</p>

			<p className={`contactsLight contactsMargin`}>
				We’d love to hear from you! Whether you have questions about our
				products, orders, or collaborations, feel free to reach out.
			</p>

			<p>
				<span className="contactsMedium">📧 Email: </span>
				<a href="mailto:lunamoth.store@gmail.com" className="contactsLink">
					lunamoth.store@gmail.com
				</a>
			</p>
			<p className="contactsMargin">
				<span className="contactsMedium">📞 Phone:</span>{" "}
				<a href="tel:+12136767634" className="contactsLink">
					+1 (213) 676-7634
				</a>
			</p>

			<p className="contactsMedium">✨ Stay connected:</p>
			<p className="contactsLight">
				Follow us on Instagram for updates and new arrivals:
			</p>
			<p className="contactsMargin">
				<Link
					to="https://www.instagram.com/LM.gothshop"
					target="_blank"
					className="contactsLink"
				>
					@LM.gothshop
				</Link>
			</p>

			<p className="contactsMedium">🕒 Customer Support Hours</p>
			<p className="contactsLight">Tuesday – Friday: 11:00 AM – 6:00 PM</p>
			<p className="contactsLight">Saturday – Monday: Closed</p>
		</div>
	);
};

export default ContactsPage;
