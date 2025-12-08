import { useState, useEffect, CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAdminAuth from "../../../store/useAdminAuth";
import AdminContainer from "../components/adminContainer/AdminContainer";
import AdminLightText from "../components/adminLightText/AdminLightText";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import { checkAdminPin } from "../../../api/admin";
import "./adminPinPage.css";

const AdminPinPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { loginAdmin } = useAdminAuth();

	const [pin, setPin] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const state = location.state as { from?: string } | undefined;
	const from = state?.from || "/admin";

	useEffect(() => {
		const loggedIn = localStorage.getItem("isLogged");
		if (loggedIn === "true") {
			loginAdmin();
			navigate(from, { replace: true });
		}
	}, []);

	const loginHandler = async () => {
		if (!pin.trim()) return;

		setLoading(true);

		try {
			const result = await checkAdminPin(pin);

			const isValid = result.valid ?? result.success ?? false;

			if (isValid) {
				setPin("");

				localStorage.setItem("isLogged", "true");
				loginAdmin();
				navigate(from, { replace: true });
			} else {
				alert("Wrong PIN");
				setPin("");
			}
		} catch (error) {
			console.error("PIN verification error:", error);
			alert(
				error instanceof Error
					? error.message
					: "Server error. Please try again."
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AdminContainer>
			<div className="adminPinContainer" style={styles.adminContainerInner}>
				<AdminLightText text="Enter admin password:" />

				<Input
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					inputContainerStyle={styles.pinInputContainer}
					inputStyle={styles.pinInputStyle}
					autoFocus
				/>

				<Button
					text={loading ? "Checking..." : "Submit"}
					onClick={loginHandler}
					disabled={loading}
					styles={styles.pinButtonStyle}
					textStyle={styles.pinButtonTextStyle}
				/>
			</div>
		</AdminContainer>
	);
};

export default AdminPinPage;

const styles: { [key: string]: CSSProperties } = {
	adminContainerInner: {
		alignItems: "center",
		display: "flex",
		flexDirection: "column",
	},
	pinInputContainer: {
		display: "flex",
		flexDirection: "column",
		width: "180px",
		alignSelf: "center",
		marginTop: "1.5rem",
	},
	pinInputStyle: {
		backgroundColor: "transparent",
		border: "1px solid #000",
		color: "#000",
		textAlign: "center",
	},
	pinButtonStyle: {
		border: "1px solid #000",
		marginTop: "1rem",
		width: "180px",
	},
	pinButtonTextStyle: { color: "#000" },
};
