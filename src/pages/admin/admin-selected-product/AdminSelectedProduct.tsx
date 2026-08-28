import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { updateProduct } from "../../../api/products";
import Input from "../../../components/input/Input";
import Textarea from "../../../components/textarea/Textarea";
import Button from "../../../components/button/Button";
import { useProductStore } from "../../../store/useProductStore";
import { Product } from "../../../types/ProductPage";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminWrapper from "../components/adminWrapper/AdminWrapper";
import "./adminSelectedProduct.css";

type LocationState = {
	product?: Product;
};

const AdminSelectedProduct: React.FC = () => {
	const params = useParams<{ id?: string; documentId?: string }>();
	const productId = params.documentId || params.id;

	const location = useLocation();
	const { products, fetchProducts } = useProductStore();
	const state = location.state as LocationState;

	const storeProduct = products.find(
		(p) => p.documentId === productId || String(p.id) === productId,
	);

	const currentProduct = storeProduct || state?.product;

	const [productForm, setProductForm] = useState<Product | null>(
		currentProduct ?? null,
	);
	const [priceUSStr, setPriceUSStr] = useState<string>(
		currentProduct?.priceUS?.toString() || "0",
	);
	const [priceEUStr, setPriceEUStr] = useState<string>(
		currentProduct?.priceEU?.toString() || "0",
	);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (currentProduct) {
			setProductForm(currentProduct);
			setPriceUSStr(currentProduct.priceUS?.toString() || "0");
			setPriceEUStr(currentProduct.priceEU?.toString() || "0");
		}
	}, [currentProduct]);

	const updateField = <K extends keyof Product>(
		field: K,
		value: Product[K],
	) => {
		setProductForm((prev) => (prev ? { ...prev, [field]: value } : prev));
	};

	const saveChangesHandler = async () => {
		if (!productForm) return;

		try {
			setMessage("Saving...");

			const updatedFields = {
				name: productForm.name,
				description: productForm.description || "",
				ingredients: productForm.ingredients || "",
				additional: productForm.additional || "",
				priceUS: parseFloat(priceUSStr) || 0,
				priceEU: parseFloat(priceEUStr) || 0,
				soldOut: Boolean(productForm.soldOut),
			};

			const targetId = productForm.documentId || String(productForm.id);

			await updateProduct(targetId, updatedFields);

			setProductForm((prev) => (prev ? { ...prev, ...updatedFields } : prev));

			await fetchProducts(true);

			setMessage("Saved successfully ✔");
			setTimeout(() => setMessage(""), 2000);
		} catch (err) {
			console.error(err);
			setMessage("Failed to save ❌");
			setTimeout(() => setMessage(""), 3000);
		}
	};

	if (!productForm) {
		return (
			<AdminWrapper showHeader showBackButton title="Products">
				<AdminLightText text="Error: Product not found" />
			</AdminWrapper>
		);
	}

	return (
		<AdminWrapper showHeader showBackButton title="Products">
			<div className="adminSelectedProductContainer">
				<Input
					label="Product Name"
					value={productForm.name || ""}
					onChange={(e) => updateField("name", e.target.value)}
				/>
			</div>

			<div className="adminSelectedProductContainer">
				<Textarea
					label="Product Description"
					value={productForm.description || ""}
					onChange={(e) => updateField("description", e.target.value)}
				/>
			</div>

			<div className="adminSelectedProductContainer">
				<Textarea
					label="Product Ingredients"
					value={productForm.ingredients || ""}
					onChange={(e) => updateField("ingredients", e.target.value)}
				/>
			</div>

			<div className="adminSelectedTwoProductContainer">
				<Input
					label="Product Price (USD)"
					value={priceUSStr}
					onChange={(e) => setPriceUSStr(e.target.value)}
				/>
				<Input
					label="Product Price (EUR)"
					value={priceEUStr}
					onChange={(e) => setPriceEUStr(e.target.value)}
				/>
			</div>

			<div className="adminSelectedProductRadioContainer">
				<p>Sold Out</p>
				<input
					type="checkbox"
					checked={Boolean(productForm.soldOut)}
					onChange={(e) => updateField("soldOut", e.target.checked)}
					className="adminSelectedProductRadioInput"
				/>
			</div>

			<div className="adminSelectedProductContainer">
				<Textarea
					label="Product Additional Information"
					value={productForm.additional || ""}
					onChange={(e) => updateField("additional", e.target.value)}
				/>
			</div>

			<div className="adminSelectedButtonContainer">
				<Button text={message || "Save Changes"} onClick={saveChangesHandler} />
			</div>
		</AdminWrapper>
	);
};

export default AdminSelectedProduct;
