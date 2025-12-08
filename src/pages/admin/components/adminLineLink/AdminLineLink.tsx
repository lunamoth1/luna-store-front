import AdminLightText from "../adminLightText/AdminLightText";
import "./adminLineLink.css";

type Props = {
	text: string;
	onPress: () => void;
};

const AdminLineLink: React.FC<Props> = ({ text, onPress }) => {
	return (
		<div className="adminLineLinkContainer" onClick={onPress}>
			<AdminLightText text={text} />
			<div className="adminLineLinkArrowContainer">
				<div className="adminLineLinkArrowLine" />
				<div className="adminLineLinkArrowLine" />
			</div>
		</div>
	);
};

export default AdminLineLink;
