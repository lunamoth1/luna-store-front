import { useEffect, useState } from "react";
import { useSettingsStore } from "../../../store/useSettingsStore";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminWrapper from "../components/adminWrapper/AdminWrapper";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { updateShippingOption } from "../../../api/shippingOptions";
import "./adminDeliverySettings.css";

const AdminDeliverySettingsPage: React.FC = () => {
	// here1 fetchSettings
	const { shippingOptions, isLoading, error, fetchSettings } =
		useSettingsStore();

	const [message, setMessage] = useState("");
	const [localOptions, setLocalOptions] = useState(() =>
		shippingOptions.map((o) => ({
			documentId: o.documentId,
			label: o.label,
			price: o.price,
		})),
	);

	useEffect(() => {
		if (shippingOptions.length) {
			setLocalOptions(
				shippingOptions.map((o) => ({
					documentId: o.documentId,
					label: o.label,
					price: o.price,
				})),
			);
		}
	}, [shippingOptions]);

	const updateOptionField = (
		documentId: string,
		field: string,
		value: string,
	) => {
		setLocalOptions((prev) =>
			prev.map((opt) =>
				opt.documentId === documentId
					? { ...opt, [field]: field === "price" ? Number(value) : value }
					: opt,
			),
		);
	};

	const saveChangesHandler = async () => {
		try {
			setMessage("Saving...");

			await Promise.all(
				localOptions.map((opt) =>
					updateShippingOption(opt.documentId, {
						label: opt.label,
						price: opt.price,
					}),
				),
			);

			await fetchSettings();

			setMessage("Saved successfully ✔");
			setTimeout(() => setMessage(""), 2000);
		} catch (err) {
			console.error(err);
			setMessage("Failed to save ❌");
			setTimeout(() => setMessage(""), 3000);
		}
	};

	if (isLoading) {
		return (
			<AdminWrapper showHeader showBackButton title="Settings">
				<AdminLightText text="Loading..." />
			</AdminWrapper>
		);
	}

	if (error) {
		return (
			<AdminWrapper showHeader showBackButton title="Settings">
				<AdminLightText text={`Error: ${error}`} />
			</AdminWrapper>
		);
	}

	if (!localOptions.length) {
		return (
			<AdminWrapper showHeader showBackButton title="Settings">
				<AdminLightText text="No delivery settings available" />
			</AdminWrapper>
		);
	}

	return (
		<AdminWrapper showHeader showBackButton title="Settings">
			{localOptions.map((opt) => (
				<div key={opt.documentId} className="adminDeliverySettingsContainer">
					<Input
						inputContainerStyle={{ marginTop: 0 }}
						label="Name"
						value={opt.label}
						onChange={(e) =>
							updateOptionField(opt.documentId, "label", e.target.value)
						}
					/>

					<Input
						label="Price"
						value={opt.price.toString()}
						onChange={(e) =>
							updateOptionField(opt.documentId, "price", e.target.value)
						}
					/>
				</div>
			))}

			<div className="adminDeliverySettingsButtonContainer">
				<Button text={message || "Save Changes"} onClick={saveChangesHandler} />
			</div>
		</AdminWrapper>
	);
};

export default AdminDeliverySettingsPage;
