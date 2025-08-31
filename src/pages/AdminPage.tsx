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
	const [password, setPassword] = useState("1234");
	const [loading, setLoading] = useState(true);
	const [orders, setOrders] = useState<Order[]>([]);
	const countryNames: Record<string, string> = {
		...europeNames,
		...americasNames,
	};

	useEffect(() => {
		fetch(`${apiUrl}/api/orders`)
			.then((res) => res.json())
			.then((data) => {
				if (data.data) {
					setOrders(data.data);
				}
			})
			.finally(() => setLoading(false));
	}, []);

	const pinHandler = () => {
		if (password === "1234") {
			setAuthorized(true);
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
						{/* <h2 className="font-semibold mb-2">
							Order #{order.id} — {new Date(order.createdAt).toLocaleString()}
						</h2> */}
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
							{shippingContainer("stripe Session ID", order.stripeSessionId)}
						</div>

						<div className="admin-column-container">
							<div className="admin-row-container">
								<Button
									text="Save changes"
									styles={{ border: "1px solid #fff", padding: "8px" }}
									textStyle={{ color: "#fff", fontSize: "0.8rem" }}
									//here disable and save text area and status change
									disabled
								/>
								<StatusDropDown
									status={order.orderStatus}
									//here status change
								/>
							</div>
							<textarea
								className="admin-textarea"
								placeholder="Add a note..."
								defaultValue={order.note || ""}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AdminPage;
