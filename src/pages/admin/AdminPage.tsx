import { CSSProperties, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import AdminLineText from "./components2/adminLineText/AdminLineText";
import StatusDropDown from "./components2/statusDropDown/StatusDropDown";
import { americasNames, europeNames } from "../../constants";
import { Order } from "../../types/adminPage";
import { getOrders, updateOrder } from "../../api/orders";
import "./adminPage.css";
import useAdminAuth from "../../store/useAdminAuth";

const AdminPage: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState<Order[]>([]);
	const [changedOrders, setChangedOrders] = useState<{
		[key: string]: { note?: string; orderStatus?: string };
	}>({});
	const [savingOrders, setSavingOrders] = useState<{ [key: string]: boolean }>(
		{}
	);

	const { logoutAdmin } = useAdminAuth();

	const countryNames: Record<string, string> = {
		...europeNames,
		...americasNames,
	};

	useEffect(() => {
		(async () => {
			try {
				const orders = await getOrders();
				setOrders(orders);
			} catch (error) {
				console.error("Failed to load orders:", error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const changeStatusHandler = (orderId: string, status: string) => {
		setChangedOrders((prev) => ({
			...prev,
			[orderId]: { ...prev[orderId], orderStatus: status },
		}));
	};

	const changeNoteHandler = (orderId: string, note: string) => {
		setChangedOrders((prev) => ({
			...prev,
			[orderId]: { ...prev[orderId], note },
		}));
	};

	const buttonPressHandler = async (order: Order) => {
		const changes = changedOrders[order.documentId ?? ""];
		if (!changes) return;

		const id = order.documentId!;
		setSavingOrders((prev) => ({ ...prev, [id]: true }));

		try {
			const updated = await updateOrder(id, changes);

			setOrders((prev) =>
				prev.map((o) => (o.documentId === id ? { ...o, ...updated.data } : o))
			);

			setChangedOrders((prev) => {
				const { [id]: _, ...rest } = prev;
				return rest;
			});
		} catch (error) {
			console.error("Error updating order:", error);
		} finally {
			setSavingOrders((prev) => {
				const { [id]: _, ...rest } = prev;
				return rest;
			});
		}
	};

	if (loading)
		return (
			<div className="adminContainer">
				<p className="adminLightText1">Loading...</p>
			</div>
		);

	if (orders.length === 0)
		return (
			<div className="adminContainer">
				<p className="adminLightText1">No orders found.</p>
			</div>
		);

	return (
		<div className="adminContainer">
			<Button
				text="logout"
				// styles={styles.saveButtonStyles}
				// textStyle={styles.saveButtonTextStyle}

				onClick={logoutAdmin}
			/>
			<div className="adminContainerInner">
				{orders.map((order) => (
					<div key={order.id} className="adminOrder">
						<div className="adminColumnContainer">
							<p className="adminLightText1">Products:</p>

							{order.basket.map((item) => (
								<div key={item.id}>
									<div className="adminOrderContainer">
										<p className="adminMediumText">{item.product.name}</p>
										<p className="adminQuantityText"> ({item.id}) x </p>
										<p className="adminMediumText">{item.quantity} pieces</p>
									</div>
								</div>
							))}

							<AdminLineText text="delivery method" info={order.delivery} />
						</div>

						<div className="adminColumnContainer">
							<p className="adminLightText1">Shipping Info:</p>

							<AdminLineText text="email" info={order.email} />
							<AdminLineText
								text="Name"
								info={`${order.firstName} ${order.lastName}`}
							/>
							<AdminLineText text="address" info={order.address} />
							<AdminLineText text="city" info={order.city} />
							<AdminLineText text="state" info={order.state} />
							<AdminLineText text="postal code" info={order.postalCode} />

							<AdminLineText
								text="country"
								info={countryNames[order.country]}
							/>
						</div>

						<div className="adminColumnContainer">
							<div className="adminRowContainer">
								<Button
									text={
										savingOrders[order.documentId ?? ""]
											? "Loading..."
											: "Save changes"
									}
									styles={styles.saveButtonStyles}
									textStyle={styles.saveButtonTextStyle}
									disabled={
										!changedOrders[order.documentId ?? ""] ||
										savingOrders[order.documentId ?? ""]
									}
									onClick={() => buttonPressHandler(order)}
								/>

								<StatusDropDown
									status={order.orderStatus}
									onStatusChange={(status) =>
										changeStatusHandler(order.documentId ?? "", status)
									}
								/>
							</div>

							<textarea
								className="adminTextarea"
								placeholder="Add a note..."
								defaultValue={order.note || ""}
								onChange={(e) =>
									changeNoteHandler(order.documentId ?? "", e.target.value)
								}
								autoFocus={false}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminPage;

const styles: { [key: string]: CSSProperties } = {
	saveButtonStyles: {
		border: "1px solid #fff",
		padding: "8px",
		width: "100px",
	},
	saveButtonTextStyle: {
		color: "#fff",
		fontSize: "0.8rem",
	},
};
