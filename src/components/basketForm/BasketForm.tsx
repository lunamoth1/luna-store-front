import React, { useState } from "react";
import Input from "../input/Input";
import InputDropDown from "../inputDropDown/InputDropDown";
import { useOrder } from "../../context/OrderContext";
import { useBasket } from "../../context/BasketContext";
import { useCurrency } from "../../context/CurrencyContext";
import CheckoutButton from "../checkoutButton/CheckoutButton";
import {
	americas,
	americasNames,
	europe,
	europeNames,
	usd,
} from "../../constants";
import "./basketForm.css";

interface BasketFormProps {}

const BasketForm: React.FC<BasketFormProps> = () => {
	const { basket } = useBasket();
	const { currency } = useCurrency();
	const { setOrder } = useOrder();
	const shippedCountries = currency === usd ? americas : europe;
	const countryNames = currency === usd ? americasNames : europeNames;

	const [form, setForm] = useState({
		email: "",
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		state: "",
		postalCode: "",
		country: "",
	});

	const basketItems = basket.map((item) => {
		const quantity = item.quantity;
		const priceID =
			currency === usd ? item.product.priceIdUs : item.product.priceIdEu;
		return { price: priceID, quantity };
	});

	const changeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const updatedForm = { ...form, [e.target.name]: e.target.value };
		setForm(updatedForm);
		setOrder({ form: updatedForm, basketItems: basket });
	};

	return (
		<div className="basket-form-container">
			<p className="basket-form-title">Contact Information</p>
			<Input
				label="Email address"
				type="email"
				name="email"
				value={form.email}
				onChange={changeHandler}
			/>

			<p className="basket-form-title">Shipping Information</p>
			<div className="basket-form-double-container">
				<Input
					label="First Name"
					name="firstName"
					value={form.firstName}
					onChange={changeHandler}
				/>
				<Input
					label="Last Name"
					name="lastName"
					value={form.lastName}
					onChange={changeHandler}
				/>
			</div>

			<Input
				label="Address"
				name="address"
				value={form.address}
				onChange={changeHandler}
			/>

			<div className="basket-form-double-container">
				<Input
					label="City"
					name="city"
					value={form.city}
					onChange={changeHandler}
				/>
				<Input
					label="State"
					name="state"
					value={form.state}
					onChange={changeHandler}
				/>
			</div>

			<div className="basket-form-double-container">
				<Input
					label="Postal Code"
					name="postalCode"
					value={form.postalCode}
					onChange={changeHandler}
				/>
				<InputDropDown
					label="Country"
					value={form.country}
					onChange={changeHandler}
					optionValues={shippedCountries}
					countryNames={countryNames}
				/>
			</div>
			<CheckoutButton
				basketItems={basketItems}
				email={form.email}
				disabled={
					!form.email ||
					!form.firstName ||
					!form.lastName ||
					!form.address ||
					!form.city ||
					!form.state ||
					!form.postalCode ||
					!form.country
				}
			/>
		</div>
	);
};

export default BasketForm;
