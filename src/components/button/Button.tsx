import React from "react";
import "./button.css";

type Props = {
	text: string;
	onClick?: () => void;
	styles?: React.CSSProperties;
	disabled?: boolean;
	textStyle?: React.CSSProperties;
};

const Button: React.FC<Props> = ({
	text,
	onClick,
	styles,
	disabled,
	textStyle,
}) => {
	return (
		<button
			className="button-container"
			onClick={onClick}
			style={styles}
			disabled={disabled}
		>
			<p className="button-text" style={textStyle}>
				{text}
			</p>
		</button>
	);
};

export default Button;
