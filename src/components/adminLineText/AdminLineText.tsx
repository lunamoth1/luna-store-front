import React from "react";
import "./adminLineText.css";

interface AdminLineTextProps {
	text: string;
	info: string;
}

const AdminLineText: React.FC<AdminLineTextProps> = ({ text, info }) => {
	return (
		<div className="admin-lines-text-container">
			<p className="admin-lines-text-extra-light-text">{text}:</p>
			<p className="admin-lines-text-medium-text">{info}</p>
		</div>
	);
};

export default AdminLineText;
