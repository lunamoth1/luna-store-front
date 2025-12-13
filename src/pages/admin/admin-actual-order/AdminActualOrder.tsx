import { useCompletedOrdersStore } from "../../../store/useCompletedOrdersStore";
import AdminWrapper from "../components/adminWrapper/AdminWrapper";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminOrderComp from "../components/adminOrderComp/AdminOrderComp";
import "./adminActualOrder.css";

const AdminActualOrder: React.FC = () => {
	const { orders, loading, error } = useCompletedOrdersStore();
	const activeOrders = orders.filter((order) => !order.archived);

	if (loading) {
		return (
			<AdminWrapper showHeader showBackButton title="Orders">
				<AdminLightText
					text="Loading orders..."
					className="adminActualOrderText"
				/>
			</AdminWrapper>
		);
	}

	if (error) {
		return (
			<AdminWrapper showHeader showBackButton title="Orders">
				<AdminLightText
					text="Error loading orders"
					className="adminActualOrderText"
				/>
			</AdminWrapper>
		);
	}

	return (
		<AdminWrapper showHeader showBackButton title="Orders">
			{activeOrders.length > 0 ? (
				activeOrders.map((order) => (
					<AdminOrderComp key={order.id} order={order} />
				))
			) : (
				<AdminLightText text="No new orders" className="adminActualOrderText" />
			)}
		</AdminWrapper>
	);
};

export default AdminActualOrder;
