import { useEffect } from "react";
import { useCompletedOrdersStore } from "../../../../store/useCompletedOrdersStore";
import AdminHeader from "../adminHeader/AdminHeader";
import "./adminContainer.css";

type MenuItem = {
	label: string;
	action: () => void;
};
interface AdminContainerProps {
	showHeader?: boolean;
	title?: string;
	showBackButton?: boolean;
	menuItems?: MenuItem[];
	children: React.ReactNode;
}

const AdminContainer: React.FC<AdminContainerProps> = ({
	showHeader,
	title,
	showBackButton = false,
	menuItems,
	children,
}) => {
	const { fetchOrders } = useCompletedOrdersStore();

	useEffect(() => {
		fetchOrders();
	}, []);

	return (
		<div className="adminScreensContainer">
			<div className="adminScreenContainerInner">
				{showHeader && title ? (
					<AdminHeader
						title={title}
						showBackButton={showBackButton}
						menuItems={menuItems}
					/>
				) : null}
				{children}
			</div>
		</div>
	);
};

export default AdminContainer;
