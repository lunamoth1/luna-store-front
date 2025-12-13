import { Product } from "../ProductPage";

export interface ProductStoreType {
	products: Product[];
	isLoading: boolean;
	error: string | null;
	fetchProducts: (force?: boolean) => Promise<void>;
	clearProducts: () => void;
}
