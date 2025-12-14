import { CheckoutBasketItem } from "../../../../types/adminPage";
import "./adminOrderProduct.css";

type Props = {
	item: CheckoutBasketItem;
};

const AdminOrderProduct: React.FC<Props> = ({ item }) => {
	return (
		<div className="adminOrderProductContainer">
			<img
				src={item.image}
				alt={item.name}
				className="adminOrderProductImage"
			/>

			<div className="adminOrderProductInfoContainer">
				<div className="adminOrderProductInfoDetails">
					<p className="adminOrderProductRegularText">{item.name}</p>
				</div>

				<div className="adminOrderProductInfoPrice">
					<p className="adminOrderProductRegularText adminOrderProductEndText">
						{item.quantity} pcs
					</p>

					<p className="adminOrderProductLightText adminOrderProductEndText">
						${item.price.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AdminOrderProduct;
