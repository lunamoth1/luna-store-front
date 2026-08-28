import { useProductStore } from "../../../store/useProductStore";
import AdminLightText from "../components/adminLightText/AdminLightText";
import AdminWrapper from "../components/adminWrapper/AdminWrapper";
import AdminProductItem from "../components/adminProductItem/AdminProductItem";

const AdminProductsPage: React.FC = () => {
	const { products, isLoading, error } = useProductStore();

	if (isLoading) {
		return (
			<AdminWrapper showHeader showBackButton title="Products">
				<AdminLightText text="Loading..." />
			</AdminWrapper>
		);
	}

	if (error) {
		return (
			<AdminWrapper showHeader showBackButton title="Products">
				<AdminLightText text={`Error: ${error}`} />
			</AdminWrapper>
		);
	}

	return (
		<AdminWrapper showHeader showBackButton title="Products">
			{products.map((item) => (
				<AdminProductItem key={item.id} product={item} />
			))}
		</AdminWrapper>
	);
};

export default AdminProductsPage;
