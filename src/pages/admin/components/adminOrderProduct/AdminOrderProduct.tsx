import { useProductStore } from "../../../../store/useProductStore";
import { BasketElement } from "../../../../types/context/BasketContext";
import "./adminOrderProduct.css";

type Props = {
	item: BasketElement;
};

const AdminOrderProduct: React.FC<Props> = ({ item }) => {
	const { products } = useProductStore();

	const getProductImage = (productFromOrder: any): string => {
		if (!productFromOrder?.documentId) return "/images/placeholder.webp";

		const found = products.find(
			(p) => p.documentId === productFromOrder.documentId
		);

		if (found?.image?.[0]?.url) {
			return found.image[0].url;
		}

		return "/images/placeholder.webp";
	};

	return (
		<div className="adminOrderProductContainer">
			<img
				src={getProductImage(item.product)}
				alt={item.product.name}
				className="adminOrderProductImage"
			/>

			<div className="adminOrderProductInfoContainer">
				<div className="adminOrderProductInfoDetails">
					<p className="adminOrderProductRegularText">{item.product.name}</p>
				</div>

				<div className="adminOrderProductInfoPrice">
					<p className="adminOrderProductRegularText adminOrderProductEndText">
						{item.quantity} pcs
					</p>

					<p className="adminOrderProductLightText adminOrderProductEndText">
						${item.product.priceUS.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AdminOrderProduct;
