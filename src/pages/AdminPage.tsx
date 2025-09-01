import { useEffect, useState } from "react";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import StatusDropDown from "../components/statusDropDown/StatusDropDown";
import { americasNames, europeNames } from "../constants";
import { Order } from "../types/adminPage";
import "../styles/adminPage.css";

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
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
					setOrders(sortedOrders);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const pinHandler = () => {
		if (password === password) {
			setAuthorized(true);
		}
	};

	const handleNoteChange = (orderId: string, note: string) => {
		setChangedOrders((prev) => ({
			...prev,
			[orderId]: { ...prev[orderId], note },
		}));
	};

	const handleStatusChange = (orderId: string, status: string) => {
		setChangedOrders((prev) => ({
			...prev,
			[orderId]: { ...prev[orderId], orderStatus: status },
		}));
	};

	const saveChanges = async (order: Order) => {
		const changes = changedOrders[order.documentId];
		if (!changes) return;

		setSavingOrders((prev) => ({ ...prev, [order.documentId]: true }));
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
					const { [order.documentId]: _, ...rest } = prev;
					return rest;
				});
			} else {
				console.error("Ошибка при сохранении:", await response.json());
			}
		} catch (error) {
			console.error("Ошибка при сохранении изменений:", error);
		} finally {
			setSavingOrders((prev) => {
				const { [order.documentId]: _, ...rest } = prev;
				return rest;
			});
		}
	};

	const shippingContainer = (text: string, info: string) => {
		return (
			<div className="admin-lines-container">
				<p className="admin-extra-light-text">{text}:</p>
				<p className="admin-medium-text">{info}</p>
			</div>
		);
	};

	if (!authorized)
		return (
			<div className="admin-container">
				<div
					className="admin-container-inner"
					style={{
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<p className="admin-light-text">Enter admin password:</p>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						inputContainerStyle={{
							display: "flex",
							flexDirection: "column",
							width: "180px",
							alignSelf: "center",
							marginTop: "0.5rem",
						}}
						inputStyle={{
							backgroundColor: "transparent",
							border: "1px solid #fff",
							color: "#fff",
							textAlign: "center",
						}}
					/>
					<Button
						text="Submit"
						onClick={pinHandler}
						styles={{
							border: "1px solid #fff",
							marginTop: "1rem",
							width: "180px",
						}}
						textStyle={{ color: "#fff" }}
					/>
				</div>
			</div>
		);

	if (loading)
		return (
			<div className="admin-container">
				<p className="admin-light-text">Loading...</p>
			</div>
		);

	if (orders.length === 0)
		return (
			<div className="admin-container">
				<p className="admin-light-text">No orders found.</p>
			</div>
		);

	return (
		<div className="admin-container">
			<div className="admin-container-inner">
				{orders.map((order) => (
					<div key={order.id} className="admin-order">
						{/* <p className="admin-light-text">
							Order #{order.id} — {new Date(order.createdAt).toLocaleString()}
						</p> */}
						<div className="admin-column-container">
							<p className="admin-light-text">Products:</p>
							{order.basket.map((item) => (
								<div key={item.id}>
									<div className="admin-order-container">
										<p className="admin-medium-text">{item.product.name}</p>
										<p className="admin-quantity-text"> ({item.id}) x </p>
										<p className="admin-medium-text">{item.quantity} pieces</p>
									</div>
								</div>
							))}
						</div>

						<div className="admin-column-container">
							<p className="admin-light-text">Shipping Info:</p>
							{shippingContainer("email", order.email)}
							{shippingContainer(
								"name",
								`${order.firstName} ${order.lastName}`
							)}
							{shippingContainer("address", order.address)}
							{shippingContainer("city", order.city)}
							{shippingContainer("state", order.state)}
							{shippingContainer("postal code", order.postalCode)}
							{shippingContainer("country", countryNames[order.country])}
						</div>

						<div className="admin-column-container">
							<div className="admin-row-container">
								<Button
									text={
										savingOrders[order.documentId]
											? "Loading..."
											: "Save changes"
									}
									styles={{
										border: "1px solid #fff",
										padding: "8px",
										width: "100px",
									}}
									textStyle={{ color: "#fff", fontSize: "0.8rem" }}
									disabled={
										!changedOrders[order.documentId] ||
										savingOrders[order.documentId]
									}
									onClick={() => saveChanges(order)}
								/>
								<StatusDropDown
									status={order.orderStatus}
									onStatusChange={(status) =>
										handleStatusChange(order.documentId, status)
									}
								/>
							</div>
							<textarea
								className="admin-textarea"
								placeholder="Add a note..."
								defaultValue={order.note || ""}
								onChange={(e) =>
									handleNoteChange(order.documentId, e.target.value)
								}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminPage;
