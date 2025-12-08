import React, { useState } from "react";
import { statusColors, statuses } from "../../../../constants";
import { Status } from "../../../../types/statusDropDown";
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
		<div className="statusDropdownContainer">
			<button className="statusDropdownButton" onClick={dropDownHandler}>
				<span
					className="statusDropdownCircle"
					style={{ backgroundColor: statusColors[orderStatus] }}
				/>
				{orderStatus}
			</button>
			{isOpen && (
				<ul className="statusDropdownList">
					{statuses.map((status) => (
						<li
							key={status}
							className="statusDropdownItem"
							onClick={() => statusChangeHandler(status)}
						>
							<span
								className="statusDropdownCircle"
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
