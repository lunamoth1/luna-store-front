import React from "react";
import { useNavigate } from "react-router-dom";
import "./error404.css";

const Error404: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="error404">
			<h1 className="error404__title">404</h1>
			<p className="error404__subtitle">Page not found</p>
			<p className="error404__text">Looks like you took a wrong turn...</p>
			<button className="error404__btn" onClick={() => navigate("/shop")}>
				Better visit our shop
			</button>
		</div>
	);
};

export default Error404;
