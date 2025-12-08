import { apiUrl } from "../../constants";
import { Product } from "../../types/ProductPage";
import { handleApiResponse } from "../helpers/handleApiResponse";

export async function getProducts(): Promise<Product[]> {
	const res = await fetch(`${apiUrl}/api/products?populate=*`);

	const data = await handleApiResponse<any>(res);

	return data.data.sort(
		(a: Product, b: Product) =>
			new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	);
}
