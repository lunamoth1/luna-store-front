import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/ProductPage";
import "./adminProductItem.css";

type Props = {
	product: Product;
};

const AdminProductItem: React.FC<Props> = ({ product }) => {
	const navigate = useNavigate();

	const navigationHandler = () =>
		navigate(`/admin/admin-selected-product/${product.documentId}`, {
			state: { product },
		});

	return (
		<div className="adminProductItemContainer" onClick={navigationHandler}>
			<div className="adminProductItemHorizontalContainer">
				<div className="adminProductItemImageContainer">
					<img
						key={product.id}
						src={product.image[0].url}
						alt={product.name}
						className="adminProductItemImage"
					/>

					<p className="adminProductItemNameText">{product.name}</p>
				</div>

				<div className="adminProductItemPriceContainer">
					<p className="adminProductItemPriceText">
						${product.priceUS.toFixed(2)} / €{product.priceEU.toFixed(2)}
					</p>
					{product.soldOut && (
						<p className="adminProductItemSoldOutText">Sold Out</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminProductItem;
