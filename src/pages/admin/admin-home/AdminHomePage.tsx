import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminAuth from "../../../store/useAdminAuth";
import AdminContainer from "../components/adminContainer/AdminContainer";
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

	if (loading) {
		return (
			<AdminContainer title="Admin Home">
				<AdminLightText
					text="Loading..."
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminContainer>
		);
	}

	if (error) {
		return (
			<AdminContainer title="Admin Home">
				<AdminLightText
					text={`Error: ${error}`}
					style={{ marginTop: "80px", textAlign: "center" }}
				/>
			</AdminContainer>
		);
	}

	return (
		<AdminContainer
			showHeader={true}
			title="Admin Home"
			menuItems={[{ label: "Exit", action: logoutAdmin }]}
		>
			<div className="adminHomeContent">
				<AdminLineLink
					text={`Orders (${orders.length})`}
					onPress={orderHandler}
				/>
			</div>
		</AdminContainer>
	);
};

export default AdminHomePage;
