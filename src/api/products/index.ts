import { apiUrl } from "../../constants";
import { Product } from "../../types/ProductPage";
import { handleApiResponse } from "../helpers/handleApiResponse";

const token = import.meta.env.VITE_BACKEND_TOKEN;

export async function getProducts() {
	const res = await fetch(`${apiUrl}/api/products?populate=*`);

	const result = await handleApiResponse(res);

	return result.data.sort(
		(a: Product, b: Product) =>
			new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
	);
}

export async function updateProduct(
	documentId: string,
	data: Partial<Product>,
) {
	const res = await fetch(`${apiUrl}/api/products/${documentId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			...{ Authorization: `Bearer ${token}` },
		},
		body: JSON.stringify({ data }),
	});

	return handleApiResponse(res);
}

export async function checkProductUpdates() {
	const res = await fetch(`${apiUrl}/api/products?populate=*`);
	const result = await handleApiResponse(res);

	return result.data as Product[];
}
