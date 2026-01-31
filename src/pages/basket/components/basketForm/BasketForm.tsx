import React, { useEffect, useState } from "react";
import { useBasket } from "../../../../context/BasketContext";
import { useCurrencyStore } from "../../../../store/useCurrencyStore";
import { useSettingsStore } from "../../../../store/useSettingsStore";
import { useOrderStore } from "../../../../store/useOrderStore";
import Input from "../../../../components/input/Input";
import InputDropDown from "../inputDropDown/InputDropDown";
import CheckoutButton from "../checkoutButton/CheckoutButton";
import {
	americas,
	americasNames,
	europe,
	europeNames,
	internationalDeliveryType,
	INTL_DELIVERY_ORDER,
	US_DELIVERY_ORDER,
	usd,
	usDeliveryType,
} from "../../../../constants";
import { DeliveryId, OrderForm } from "../../../../types/stores/useOrderStore";
import "./basketForm.css";

const BasketForm: React.FC = () => {
	const { basket } = useBasket();
	const { currency } = useCurrencyStore();
	const { usDelivery, internationalDelivery } = useSettingsStore();
	const { order, setForm, setBasket, clear } = useOrderStore();

	const form = order.form;

	const shippedCountries = currency === usd ? americas : europe;
	const countryNames = currency === usd ? americasNames : europeNames;

	const [clickCounter, setClickCounter] = useState(0);

	useEffect(() => {
		setBasket(basket);
	}, [basket, setBasket]);

	const isUS = form.country === "" || form.country === "US";

	const rawDelivery = isUS
		? usDelivery.length > 0
			? usDelivery
			: usDeliveryType
		: internationalDelivery.length > 0
			? internationalDelivery
			: internationalDeliveryType;

	const delivery = [...rawDelivery].sort((a, b) => {
		const order = isUS ? US_DELIVERY_ORDER : INTL_DELIVERY_ORDER;
		return (
			order.indexOf(a.id as DeliveryId) - order.indexOf(b.id as DeliveryId)
		);
	});

	useEffect(() => {
		if (!delivery.some((opt) => opt.id === form.delivery)) {
			setForm({ delivery: delivery[0].id as DeliveryId });
		}
	}, [form.country, usDelivery, internationalDelivery]);

	const changeHandler = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target;

		setForm({
			[name]: name === "delivery" ? (value as DeliveryId) : value,
		} as Partial<OrderForm>);
	};

	const clickHandler = () => {
		setClickCounter((prev) => prev + 1);

		if (clickCounter === 1) {
			setClickCounter(0);
			clear();
		}

		setTimeout(() => setClickCounter(0), 3000);
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
				{delivery.map((option) => (
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
