import React from "react";
import "./inputDropDown.css";

interface InputDropDownProps {
	label?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	optionValues: string[];
	countryNames: { [key: string]: string };
}

const InputDropDown: React.FC<InputDropDownProps> = ({
	label,
	value,
	onChange,
	optionValues,
	countryNames,
}) => {
	return (
		<div className="input-dd-container">
			{label && <p className="input-dd-label">{label}</p>}
			<select
				id="country"
				name="country"
				value={value}
				onChange={onChange}
				className="input-dd-input"
			>
				<option value="" disabled>
					Select a country
				</option>
				{optionValues.map((code) => (
					<option key={code} value={code}>
						{countryNames[code]}
					</option>
				))}
			</select>
		</div>
	);
};

export default InputDropDown;
