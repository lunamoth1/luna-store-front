import { useCompletedOrdersStore } from "../../../store/useCompletedOrdersStore";
import AdminWrapper from "../components/adminWrapper/AdminWrapper";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminOrderComp from "../components/adminOrderComp/AdminOrderComp";
import "./adminArchivedOrder.css";

const AdminArchivedOrder: React.FC = () => {
	const { orders, loading, error } = useCompletedOrdersStore();
	const archivedOrders = orders.filter((order) => order.archived);

	if (loading) {
		return (
			<AdminWrapper showHeader showBackButton title="Orders">
				<AdminLightText
					text="Loading orders..."
					className="adminArchivedOrderText"
				/>
			</AdminWrapper>
		);
	}

	if (error) {
		return (
			<AdminWrapper showHeader showBackButton title="Orders">
				<AdminLightText
					text="Error loading orders"
					className="adminArchivedOrderText"
				/>
			</AdminWrapper>
		);
	}

	return (
		<AdminWrapper showHeader showBackButton title="Orders">
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
		</AdminWrapper>
	);
};

export default AdminArchivedOrder;
