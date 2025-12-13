import "./adminLightText.css";

type Props = { text: string; className?: string; style?: React.CSSProperties };

const AdminLightText: React.FC<Props> = ({ text, className, style }) => {
	return (
		<p className={`adminLightText ${className || ""}`} style={style}>
			{text}
		</p>
	);
};

export default AdminLightText;
