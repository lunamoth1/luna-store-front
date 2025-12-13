import { useCompletedOrdersStore } from "../../../store/useCompletedOrdersStore";
import AdminContainer from "../components/adminContainer/AdminContainer";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminOrderComp from "../components/adminOrderComp/AdminOrderComp";
import "./adminArchivedOrder.css";

const AdminArchivedOrder: React.FC = () => {
	const { orders, loading, error } = useCompletedOrdersStore();
	const archivedOrders = orders.filter((order) => order.archived);

	if (loading) {
		return (
			<AdminContainer showHeader showBackButton title="Orders">
				<AdminLightText
					text="Loading orders..."
					className="adminArchivedOrderText"
				/>
			</AdminContainer>
		);
	}

	if (error) {
		return (
			<AdminContainer showHeader showBackButton title="Orders">
				<AdminLightText
					text="Error loading orders"
					className="adminArchivedOrderText"
				/>
			</AdminContainer>
		);
	}

	return (
		<AdminContainer showHeader showBackButton title="Orders">
			{archivedOrders.length > 0 ? (
				archivedOrders.map((order) => (
					<AdminOrderComp key={order.id} order={order} />
				))
			) : (
				<AdminLightText
					text="No new orders"
					className="adminArchivedOrderText"
				/>
			)}
		</AdminContainer>
	);
};

export default AdminArchivedOrder;
