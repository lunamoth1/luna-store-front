import { CSSProperties, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminContainer from "../components/adminContainer/AdminContainer";
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
import { Order } from "../../../types/adminPage";
import "./adminOrderPage.css";

const AdminOrderPage = () => {
	const location = useLocation();
	const { orderId } = useParams();

	const [order, setOrder] = useState<Order | null>(
		location.state?.order ?? null
	);
	const [loading, setLoading] = useState(!location.state?.order);
	const [error, setError] = useState<string | null>(null);
	const [invoiceNumber, setInvoiceNumber] = useState("");
	const [sending, setSending] = useState(false);

	const handleArchiveToggle = async (archived: boolean) => {
		if (!order) return;

		const orderDocId = order.documentId || order.id;
		try {
			const updated = await updateOrderArchived(
				orderDocId as string | number,
				archived
			);

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
			console.error("Error while updating archive status:", err);
			alert("Failed to update order");
		}
	};

	const handleSendInvoice = async () => {
		try {
			setSending(true);
			await sendTrackingEmail(invoiceNumber, order!.email);
			await updateOrderTrackingNumber(
				order!.documentId as string,
				invoiceNumber
			);
			const updated = await getOrderById(order!.documentId as string);
			setOrder(updated);

			alert("✅ Email sent successfully!");
			setInvoiceNumber("");
		} catch (err) {
			console.error(err);
			alert(
				`❌ Failed to send email: ${
					err instanceof Error ? err.message : String(err)
				}`
			);
		} finally {
			setSending(false);
		}
	};

	useEffect(() => {
		if (order) return;

		if (!orderId) {
			setError("Order ID is missing in the URL");
			setLoading(false);
			return;
		}

		const controller = new AbortController();

		const loadOrder = async () => {
			try {
				setLoading(true);
				setError(null);

				const data = await getOrderById(orderId, controller.signal);
				setOrder(data);
			} catch (err: any) {
				if (err.name === "AbortError") return;
				console.error("❌ Fetch error:", err);
				setError(err.message || "Unknown error");
			} finally {
				setLoading(false);
			}
		};

		loadOrder();
		return () => controller.abort();
	}, [orderId]);

	useEffect(() => {
		getOrderById(orderId as string).then((data) => setOrder(data));
	}, [orderId]);

	if (loading) {
		return (
			<AdminContainer showBackButton showHeader title="Order detail">
				<AdminLightText
					text="Loading..."
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminContainer>
		);
	}

	if (error) {
		return (
			<AdminContainer showBackButton showHeader title="Order detail">
				<AdminLightText
					text={`Error: ${error}`}
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminContainer>
		);
	}

	if (!order) {
		return (
			<AdminContainer showBackButton showHeader title="Order detail">
				<AdminLightText
					text="No order details available"
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminContainer>
		);
	}

	return (
		<AdminContainer
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
				<AdminOrderLineText label="Delivery type" value={order?.delivery} />
				{order!.trackingNumber ? (
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
		</AdminContainer>
	);
};

export default AdminOrderPage;

const styles: { [key: string]: CSSProperties } = {
	pinInputContainer: { display: "flex", flexDirection: "column" },
	pinInputStyle: {
		backgroundColor: "transparent",
		border: "1px solid #000",
		color: "#000",
	},
	pinButtonStyle: {
		border: "1px solid #000",
		minWidth: "120px",
		height: "40px",
		padding: "0",
	},
	pinButtonTextStyle: { color: "#000", fontSize: "14px" },
};
