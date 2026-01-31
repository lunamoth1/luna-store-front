import { CSSProperties, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminWrapper from "../components/adminWrapper/AdminWrapper";
import AdminOrderProduct from "../components/adminOrderProduct/AdminOrderProduct";
import AdminOrderLineText from "../components/adminOrderLineText/AdminOrderLineText";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import { sendTrackingEmail } from "../../../api/admin";
import {
	getOrderById,
	updateOrderArchived,
	updateOrderTrackingNumber,
} from "../../../api/orders";
import { internationalDeliveryType, usDeliveryType } from "../../../constants";
import { Order } from "../../../types/adminPage";
import "./adminOrderPage.css";

interface LocationState {
	order?: Order;
}
const AdminOrderPage = () => {
	const location = useLocation() as { state?: LocationState };
	const { orderId } = useParams<{ orderId: string }>();

	const [order, setOrder] = useState<Order | null>(
		location.state?.order ?? null
	);
	const [loading, setLoading] = useState(!location.state?.order);
	const [error, setError] = useState<string | null>(null);
	const [invoiceNumber, setInvoiceNumber] = useState("");
	const [sending, setSending] = useState(false);

	const deliveryLabelMap: Record<string, string> = [
		...usDeliveryType,
		...internationalDeliveryType,
	].reduce<Record<string, string>>((acc, option) => {
		acc[option.id] = option.label;
		return acc;
	}, {});

	const handleArchiveToggle = async (archived: boolean) => {
		if (!order) return;

		const orderDocId: string | number = order.documentId ?? order.id;

		try {
			const updated = await updateOrderArchived(orderDocId, archived);
			setOrder(updated.data);

			window.dispatchEvent(
				new CustomEvent("orderUpdated", {
					detail: { id: orderDocId, archived },
				})
			);

			alert(
				archived
					? "✅ Order moved to archive"
					: "♻️ Order returned to active list"
			);
		} catch (err) {
			console.error("❌ Archive update failed:", err);
			alert("Failed to update order");
		}
	};

	const handleSendInvoice = async () => {
		if (!order) return;

		try {
			setSending(true);

			await sendTrackingEmail(invoiceNumber, order.email);

			if (order.documentId) {
				await updateOrderTrackingNumber(order.documentId, invoiceNumber);
				const updated = await getOrderById(order.documentId);
				setOrder(updated);
			}

			alert("✅ Email sent successfully!");
			setInvoiceNumber("");
		} catch (err) {
			console.error("❌ Send invoice error:", err);
			alert(
				`❌ Failed to send email: ${
					err instanceof Error ? err.message : "Unknown error"
				}`
			);
		} finally {
			setSending(false);
		}
	};

	useEffect(() => {
		if (order || !orderId) return;

		const controller = new AbortController();

		const loadOrder = async () => {
			try {
				setLoading(true);
				setError(null);

				const data = await getOrderById(orderId, controller.signal);
				setOrder(data);
			} catch (err) {
				if (err instanceof DOMException && err.name === "AbortError") return;

				console.error("❌ Fetch error:", err);
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		loadOrder();
		return () => controller.abort();
	}, [order, orderId]);

	if (loading) {
		return (
			<AdminWrapper showBackButton showHeader title="Order detail">
				<AdminLightText
					text="Loading..."
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminWrapper>
		);
	}

	if (error) {
		return (
			<AdminWrapper showBackButton showHeader title="Order detail">
				<AdminLightText
					text={`Error: ${error}`}
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminWrapper>
		);
	}

	if (!order) {
		return (
			<AdminWrapper showBackButton showHeader title="Order detail">
				<AdminLightText
					text="No order details available"
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminWrapper>
		);
	}

	return (
		<AdminWrapper
			title="Order detail"
			showBackButton
			showHeader
			menuItems={[
				{
					label: "Copy Email",
					action: () => navigator.clipboard.writeText(order.email),
				},
				{
					label: order.archived ? "Return to Orders" : "Move to Archive",
					action: () => handleArchiveToggle(!order.archived),
				},
			]}
		>
			{order.basket?.map((item, index) => (
				<AdminOrderProduct key={item.id + index} item={item} />
			))}

			<div className="adminOrderDeliveryContainer">
				<AdminOrderLineText
					label="Delivery type"
					value={deliveryLabelMap[order.delivery] ?? order.delivery}
				/>

				{order.trackingNumber ? (
					<AdminOrderLineText
						label="Tracking Number"
						value={order.trackingNumber}
					/>
				) : (
					<div className="adminOrderEmailContainer">
						<Input
							value={invoiceNumber}
							onChange={(e) => setInvoiceNumber(e.target.value)}
							type="text"
							placeholder="Add tracking number"
							inputContainerStyle={styles.pinInputContainer}
							inputStyle={styles.pinInputStyle}
						/>
						<Button
							text={sending ? "Sending..." : "Send Invoice"}
							onClick={handleSendInvoice}
							disabled={sending}
							styles={styles.pinButtonStyle}
							textStyle={styles.pinButtonTextStyle}
						/>
					</div>
				)}
			</div>

			<AdminLightText
				text="Shipping Info:"
				style={{ fontWeight: 400, marginBottom: 20 }}
			/>
			<AdminOrderLineText label="email" value={order.email} />
			<AdminOrderLineText
				label="name"
				value={`${order.firstName ?? ""} ${order.lastName ?? ""}`.trim()}
			/>
			<AdminOrderLineText label="address" value={order.address} />
			<AdminOrderLineText label="city" value={order.city} />
			<AdminOrderLineText label="state" value={order.state} />
			<AdminOrderLineText label="postal code" value={order.postalCode} />
			<AdminOrderLineText label="country" value={order.country} />
		</AdminWrapper>
	);
};

export default AdminOrderPage;

const styles: Record<string, CSSProperties> = {
	pinInputContainer: {
		display: "flex",
		flexDirection: "column",
	},
	pinInputStyle: {
		backgroundColor: "transparent",
		border: "1px solid #000",
		color: "#000",
	},
	pinButtonStyle: {
		border: "1px solid #000",
		minWidth: "120px",
		height: "40px",
		padding: 0,
	},
	pinButtonTextStyle: {
		color: "#000",
		fontSize: "14px",
	},
};
