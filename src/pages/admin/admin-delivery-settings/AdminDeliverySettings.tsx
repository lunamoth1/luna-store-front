import { useEffect, useState } from "react";
import { useSettingsStore } from "../../../store/useSettingsStore";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminWrapper from "../components/adminWrapper/AdminWrapper";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { updateShippingOption } from "../../../api/shippingOptions";
import "./adminDeliverySettings.css";

const ORDERED_UIDS = ["ground", "express", "basic", "shipping"];

const sortShippingOptions = <
	T extends { documentId: string; label: string; price: number },
>(
	options: T[],
): T[] => {
	return [...options].sort((a, b) => {
		const uidA = (a as { uid?: string }).uid;
		const uidB = (b as { uid?: string }).uid;

		const indexA = uidA ? ORDERED_UIDS.indexOf(uidA) : -1;
		const indexB = uidB ? ORDERED_UIDS.indexOf(uidB) : -1;

		const orderA = indexA === -1 ? 999 : indexA;
		const orderB = indexB === -1 ? 999 : indexB;

		return orderA - orderB;
	});
};

const AdminDeliverySettingsPage: React.FC = () => {
	const { shippingOptions, isLoading, error, fetchSettings } =
		useSettingsStore();

	const [message, setMessage] = useState("");

	const [localOptions, setLocalOptions] = useState(() =>
		sortShippingOptions(shippingOptions).map((o) => ({
			documentId: o.documentId,
			label: o.label,
			priceStr: o.price.toString(),
		})),
	);

	useEffect(() => {
		if (shippingOptions.length) {
			setLocalOptions(
				sortShippingOptions(shippingOptions).map((o) => ({
					documentId: o.documentId,
					label: o.label,
					priceStr: o.price.toString(),
				})),
			);
		}
	}, [shippingOptions]);

	const updateOptionField = (
		documentId: string,
		field: "label" | "priceStr",
		value: string,
	) => {
		setLocalOptions((prev) =>
			prev.map((opt) =>
				opt.documentId === documentId ? { ...opt, [field]: value } : opt,
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
						price: parseFloat(opt.priceStr) || 0,
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
						value={opt.priceStr}
						onChange={(e) =>
							updateOptionField(opt.documentId, "priceStr", e.target.value)
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
