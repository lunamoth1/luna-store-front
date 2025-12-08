import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdminAuth from "../../../store/useAdminAuth";

interface ProtectedAdminRouteProps {
	children: React.ReactNode;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
	children,
}) => {
	const { isAdminAuthed } = useAdminAuth();
	const location = useLocation();

	if (!isAdminAuthed) {
		return (
			<Navigate to="/admin-pin" replace state={{ from: location.pathname }} />
		);
	}

	return <>{children}</>;
};

export default ProtectedAdminRoute;
