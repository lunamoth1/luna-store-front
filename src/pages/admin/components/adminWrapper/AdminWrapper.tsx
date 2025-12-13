import { useEffect } from "react";
import { useCompletedOrdersStore } from "../../../../store/useCompletedOrdersStore";
import AdminHeader from "../adminHeader/AdminHeader";
import "./adminWrapper.css";

type MenuItem = {
	label: string;
	action: () => void;
};
interface AdminWrapperProps {
	showHeader?: boolean;
	title?: string;
	showBackButton?: boolean;
	menuItems?: MenuItem[];
	children: React.ReactNode;
}

const AdminWrapper: React.FC<AdminWrapperProps> = ({
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
		<div className="adminWrapperContainer">
			<div className="adminWrapperContainerInner">
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

export default AdminWrapper;
