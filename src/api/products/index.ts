import { apiUrl } from "../../constants";
import { Product } from "../../types/ProductPage";
import { handleApiResponse } from "../helpers/handleApiResponse";

export async function getProducts() {
	const res = await fetch(`${apiUrl}/api/products?populate=*`);

	const result = await handleApiResponse(res);

	return result.data.sort(
		(a: Product, b: Product) =>
			new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
	);
}
