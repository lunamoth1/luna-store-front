import { useCompletedOrdersStore } from "../../../store/useCompletedOrdersStore";
import AdminContainer from "../components/adminContainer/AdminContainer";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminOrderComp from "../components/adminOrderComp/AdminOrderComp";
import "./adminActualOrder.css";

const AdminActualOrder: React.FC = () => {
	const { orders, loading, error } = useCompletedOrdersStore();

	if (loading) {
		return (
			<AdminContainer showHeader showBackButton title="Orders">
				<AdminLightText text="Loading orders..." />
			</AdminContainer>
		);
	}

	if (error) {
		return (
			<AdminContainer showHeader showBackButton title="Orders">
				<AdminLightText text="Error loading orders" />
			</AdminContainer>
		);
	}

	return (
		<AdminContainer showHeader showBackButton title="Orders">
			{orders.length > 0 ? (
				orders.map((order) => <AdminOrderComp key={order.id} order={order} />)
			) : (
				<AdminLightText text="No new orders" style={{ textAlign: "center" }} />
			)}
		</AdminContainer>
	);
};

export default AdminActualOrder;
