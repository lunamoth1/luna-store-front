import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../../../store/useAdminAuth";
import AdminWrapper from "../components/adminWrapper/AdminWrapper";
import AdminLineLink from "../components/adminLineLink/AdminLineLink";
import AdminLightText from "../components/adminLightText/AdminLightText";
import { getOrders } from "../../../api/orders";
import { Order } from "../../../types/adminPage";
import "./adminHomePage.css";

const AdminHomePage: React.FC = () => {
	const { logoutAdmin } = useAdminAuth();
	const navigate = useNavigate();

	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const activeOrders = orders.filter((order) => !order.archived);

	useEffect(() => {
		(async () => {
			try {
				const orders = await getOrders();
				setOrders(orders);
			} catch (error) {
				setError(`Failed to load orders: ${(error as Error).message}`);
				console.error("Failed to load orders:", error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const orderHandler = () => navigate("/admin/actual-order");
	const archivedOrderHandler = () => navigate("/admin/archived-order");
	const deliverySettingsHandler = () => navigate("/admin/delivery-settings");

	if (loading) {
		return (
			<AdminWrapper title="Admin Home">
				<AdminLightText
					text="Loading..."
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminWrapper>
		);
	}

	if (error) {
		return (
			<AdminWrapper title="Admin Home">
				<AdminLightText
					text={`Error: ${error}`}
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminWrapper>
		);
	}

	return (
		<AdminWrapper
			showHeader={true}
			title="Admin Home"
			menuItems={[{ label: "Exit", action: logoutAdmin }]}
		>
			<div className="adminHomeContent">
				<AdminLineLink
					text={`Orders (${activeOrders.length})`}
					onPress={orderHandler}
				/>
				<AdminLineLink
					text={`Archived Orders (${orders.length - activeOrders.length})`}
					onPress={archivedOrderHandler}
				/>
				<AdminLineLink
					text="Delivery Price"
					onPress={deliverySettingsHandler}
				/>
			</div>
		</AdminWrapper>
	);
};

export default AdminHomePage;
