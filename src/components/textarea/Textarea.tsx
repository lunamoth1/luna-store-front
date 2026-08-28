import React from "react";
import "./textarea.css";

interface TextareaProps {
	label?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	name?: string;
	inputContainerStyle?: React.CSSProperties;
	textareaStyle?: React.CSSProperties;
	autoFocus?: boolean;
	placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({
	label,
	value,
	onChange,
	name,
	inputContainerStyle,
	textareaStyle,
	autoFocus,
	placeholder,
}) => {
	return (
		<div className="textareaContainer" style={inputContainerStyle}>
			{label && <p className="textareaLabel">{label}</p>}
			<textarea
				name={name}
				value={value}
				onChange={onChange}
				className="textareaField"
				style={textareaStyle}
				autoFocus={autoFocus}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Textarea;
