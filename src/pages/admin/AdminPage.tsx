import { CSSProperties, useEffect, useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import AdminLineText from "./components/adminLineText/AdminLineText";
import StatusDropDown from "./components/statusDropDown/StatusDropDown";
import { americasNames, europeNames } from "../../constants";
import { Order } from "../../types/adminPage";
import "./adminPage.css";

const apiUrl = import.meta.env.VITE_STRAPI_API_URL;

const AdminPage: React.FC = () => {
	const [authorized, setAuthorized] = useState(false);
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState<Order[]>([]);
	const [changedOrders, setChangedOrders] = useState<{
		[key: string]: { note?: string; orderStatus?: string };
	}>({});
	const [savingOrders, setSavingOrders] = useState<{ [key: string]: boolean }>(
		{}
	);
	const countryNames: Record<string, string> = {
		...europeNames,
		...americasNames,
	};

	useEffect(() => {
		fetch(`${apiUrl}/api/orders?populate=*`)
			.then((res) => res.json())
			.then((data) => {
				if (data.data) {
					const sortedOrders = data.data.sort(
						(a: Order, b: Order) =>
							new Date(b.createdAt || "").getTime() -
							new Date(a.createdAt || "").getTime()
					);
					setOrders(sortedOrders);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const pinSubmitHandler = () => {
		if (password === password) {
			setAuthorized(true);
		}
	};

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
		const changes = changedOrders[order.documentId || ""];
		if (!changes) return;

		setSavingOrders((prev) => ({ ...prev, [order.documentId || ""]: true }));
		try {
			const response = await fetch(`${apiUrl}/api/orders/${order.documentId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: changes }),
			});
			if (response.ok) {
				const updatedOrder = await response.json();
				setOrders((prev) =>
					prev.map((o) =>
						o.documentId === order.documentId
							? { ...o, ...updatedOrder.data }
							: o
					)
				);
				setChangedOrders((prev) => {
					const { [order.documentId || ""]: _, ...rest } = prev;
					return rest;
				});
			} else {
				console.error("Error while saving:", await response.json());
			}
		} catch (error) {
			console.error("Error while saving changes:", error);
		} finally {
			setSavingOrders((prev) => {
				const { [order.documentId || ""]: _, ...rest } = prev;
				return rest;
			});
		}
	};

	if (!authorized)
		return (
			<div className="adminContainer">
				<div className="adminContainerInner" style={styles.adminContainerInner}>
					<p className="adminLightText">Enter admin password:</p>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						inputContainerStyle={styles.pinInputContainer}
						inputStyle={styles.pinInputStyle}
						autoFocus={false}
					/>
					<Button
						text="Submit"
						onClick={pinSubmitHandler}
						styles={styles.pinButtonStyle}
						textStyle={styles.pinButtonTextStyle}
					/>
				</div>
			</div>
		);

	if (loading)
		return (
			<div className="adminContainer">
				<p className="adminLightText">Loading...</p>
			</div>
		);

	if (orders.length === 0)
		return (
			<div className="adminContainer">
				<p className="adminLightText">No orders found.</p>
			</div>
		);

	return (
		<div className="adminContainer">
			<div className="adminContainerInner">
				{orders.map((order) => (
					<div key={order.id} className="adminOrder">
						{/* <p className="admin-light-text">
							Order #{order.id} — {new Date(order.createdAt).toLocaleString()}
						</p> */}
						<div className="adminColumnContainer">
							<p className="adminLightText">Products:</p>
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
							<p className="adminLightText">Shipping Info:</p>

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
										savingOrders[order.documentId || ""]
											? "Loading..."
											: "Save changes"
									}
									styles={styles.saveButtonStyles}
									textStyle={styles.saveButtonTextStyle}
									disabled={
										!changedOrders[order.documentId || ""] ||
										savingOrders[order.documentId || ""]
									}
									onClick={() => buttonPressHandler(order)}
								/>
								<StatusDropDown
									status={order.orderStatus}
									onStatusChange={(status) =>
										changeStatusHandler(order.documentId || "", status)
									}
								/>
							</div>
							<textarea
								className="adminTextarea"
								placeholder="Add a note..."
								defaultValue={order.note || ""}
								onChange={(e) =>
									changeNoteHandler(order.documentId || "", e.target.value)
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
	adminContainerInner: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
	},
	pinInputContainer: {
		display: "flex",
		flexDirection: "column",
		width: "180px",
		alignSelf: "center",
		marginTop: "0.5rem",
	},
	pinInputStyle: {
		backgroundColor: "transparent",
		border: "1px solid #fff",
		color: "#fff",
		textAlign: "center",
	},
	pinButtonStyle: {
		border: "1px solid #fff",
		marginTop: "1rem",
		width: "180px",
	},
	pinButtonTextStyle: { color: "#fff" },
	saveButtonStyles: {
		border: "1px solid #fff",
		padding: "8px",
		width: "100px",
	},
	saveButtonTextStyle: { color: "#fff", fontSize: "0.8rem" },
};
