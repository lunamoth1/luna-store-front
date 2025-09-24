import React, { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { useBasket } from "../../context/BasketContext";
import { useCurrency } from "../../context/CurrencyContext";
import Input from "../input/Input";
import InputDropDown from "../inputDropDown/InputDropDown";
import CheckoutButton from "../checkoutButton/CheckoutButton";
import {
	americas,
	americasNames,
	deliveryType,
	europe,
	europeNames,
	usd,
} from "../../constants";
import { DeliveryId, OrderForm } from "../../types/OrderContext";
import "./basketForm.css";

const defaultForm: OrderForm = {
	email: "",
	delivery: "standard",
	firstName: "",
	lastName: "",
	address: "",
	city: "",
	state: "",
	postalCode: "",
	country: "",
};

const BasketForm: React.FC = () => {
	const { basket } = useBasket();
	const { currency } = useCurrency();
	const { order, setOrder } = useOrder();
	const shippedCountries = currency === usd ? americas : europe;
	const countryNames = currency === usd ? americasNames : europeNames;

	const [clickCounter, setClickCounter] = useState(0);
	const [form, setForm] = useState<OrderForm>(() => {
		let savedForm: Partial<OrderForm> | null = null;
		try {
			const saved = localStorage.getItem("order");
			if (saved) savedForm = JSON.parse(saved)?.form ?? null;
		} catch {}

		return {
			...defaultForm,
			...savedForm,
			...order?.form,
			delivery:
				(savedForm?.delivery as DeliveryId) ??
				(order?.form?.delivery as DeliveryId) ??
				"standard",
		};
	});

	useEffect(() => {
		if (order?.form) {
			setForm((prev) => ({
				...prev,
				...order.form,
				delivery:
					(order.form.delivery as DeliveryId) ?? prev.delivery ?? "standard",
			}));
		}
	}, [order]);

	const changeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		const updatedForm: OrderForm = {
			...form,
			[name]: name === "delivery" ? (value as DeliveryId) : value,
		} as OrderForm;

		setForm(updatedForm);

		const newOrder = { form: updatedForm, basketItems: basket };
		setOrder(newOrder);

		try {
			localStorage.setItem("order", JSON.stringify(newOrder));
		} catch {}
	};

	const clickHandler = () => {
		setClickCounter((prev) => prev + 1);
		if (clickCounter === 1) {
			setClickCounter(0);
			clearForm();
		}
		setTimeout(() => {
			setClickCounter(0);
		}, 3000);
	};

	const clearForm = () => {
		setForm(defaultForm);
		setOrder({ form: defaultForm, basketItems: [] });
		localStorage.removeItem("order");
	};

	return (
		<div className="basketFormContainer">
			<p className="basketFormTitle">Contact Information</p>
			<Input
				label="Email address"
				type="email"
				name="email"
				value={form.email}
				onChange={changeHandler}
			/>

			<p className="basketFormTitle">Delivery Options</p>
			<div className="basketFormRadioContainer">
				{deliveryType.map((option) => (
					<div key={option.id} className="basketFormRadioOption">
						<input
							type="radio"
							id={option.id}
							name="delivery"
							value={option.id}
							checked={form.delivery === option.id}
							onChange={changeHandler}
							className="basketFormRadioInput"
						/>
						<label htmlFor={option.id} className="basketFormRadioLabel">
							{option.label} –{" "}
							{currency === usd ? `$${option.price}` : `€${option.price}`}
						</label>
					</div>
				))}
			</div>

			<p className="basketFormTitle">Shipping Information</p>
			<div className="basketFormDoubleContainer">
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

			<div className="basketFormDoubleContainer">
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

			<div className="basketFormDoubleContainer">
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

			<p onClick={clickHandler} className="clearFormButton">
				{clickCounter === 0 && "Clear Form"}
				{clickCounter === 1 && "Are you sure?"}
			</p>

			<CheckoutButton
				email={form.email}
				disabled={
					!form.email ||
					!form.delivery ||
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
