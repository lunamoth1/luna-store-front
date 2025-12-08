import "./adminLightText.css";

type Props = { text: string; style?: React.CSSProperties };

const AdminLightText: React.FC<Props> = ({ text, style }) => {
	return (
		<p className="adminLightText" style={style}>
			{text}
		</p>
	);
};

export default AdminLightText;
