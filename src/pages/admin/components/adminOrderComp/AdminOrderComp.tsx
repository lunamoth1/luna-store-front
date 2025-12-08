import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../../../store/useProductStore";
import { formatDate } from "../../../../utils";
import { Order } from "../../../../types/adminPage";
import { Product } from "../../../../types/ProductPage";
import "./adminOrderComp.css";

type Props = {
	order: Order;
};

const AdminOrderComp: React.FC<Props> = ({ order }) => {
	const { products } = useProductStore();
	const navigate = useNavigate();

	const getProductImage = (productFromOrder: Product): string => {
		if (!productFromOrder?.documentId) return "/images/placeholder.webp";

		const found = products.find(
			(p) => p.documentId === productFromOrder.documentId
		);

		if (found?.image?.[0]?.url) {
			return found.image[0].url;
		}

		return "/images/placeholder.webp";
	};

	const navigationHandler = () =>
		navigate(`/admin/actual-order/${order.documentId}`, { state: { order } });

	return (
		<div className="adminOrderCompContainer" onClick={navigationHandler}>
			<div className="adminOrderCompHorizontalContainer">
				<p className="adminOrderCompIdText">#{order.id}</p>

				<p className="adminOrderCompNameText">
					{order.firstName} {order.lastName}
				</p>
			</div>

			<div className="adminOrderCompHorizontalContainer">
				<p className="adminOrderCompDateText">
					{/* @ts-ignore */}
					{formatDate(order.createdAt as string, "monthName")?.slice(0, 3)}{" "}
					{formatDate(order.createdAt as string, "day")} –{" "}
					{order.basket.reduce((acc, item) => acc + item.quantity, 0)} items
				</p>

				<p className="adminOrderCompCityText">{order.city}</p>
			</div>

			<div className="adminOrderCompHorizontalContainer adminOrderCompItemGap">
				<div className="adminOrderCompProductImagesContainer">
					{order.basket.map((item) => (
						<img
							key={item.id}
							src={getProductImage(item.product)}
							alt={item.product.name}
							className="adminOrderCompProductImage"
						/>
					))}
				</div>

				<p className="adminOrderCompTotalText">
					$
					{order.basket
						.map((item) => {
							const price = Number(item.product.priceUS);
							return price * item.quantity;
						})
						.reduce((sum, subtotal) => sum + subtotal, 0)
						.toFixed(2)}
				</p>
			</div>
		</div>
	);
};

export default AdminOrderComp;
