import React, { useState } from "react";
import { statusColors, statuses } from "../../constants";
import { Status } from "../../types/statusDropDown";
import "./statusDropDown.css";

interface StatusDropDownProps {
	status: Status;
	onStatusChange: (status: Status) => void;
}

const StatusDropDown: React.FC<StatusDropDownProps> = ({
	status,
	onStatusChange,
}) => {
	const [orderStatus, setOrderStatus] = useState<Status>(status);
	const [isOpen, setIsOpen] = useState(false);

	const dropDownHandler = () => setIsOpen(!isOpen);
	const statusChangeHandler = (status: Status) => {
		setOrderStatus(status);
		onStatusChange(status);
		setIsOpen(false);
	};

	return (
		<div className="status-dropdown-container">
			<button className="status-dropdown-button" onClick={dropDownHandler}>
				<span
					className="status-dropdown-circle"
					style={{ backgroundColor: statusColors[orderStatus] }}
				/>
				{orderStatus}
			</button>
			{isOpen && (
				<ul className="status-dropdown-list">
					{statuses.map((status) => (
						<li
							key={status}
							className="status-dropdown-item"
							onClick={() => statusChangeHandler(status)}
						>
							<span
								className="status-dropdown-circle"
								style={{ backgroundColor: statusColors[status] }}
							/>
							{status}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default StatusDropDown;
