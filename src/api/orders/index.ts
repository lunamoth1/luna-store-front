import { apiUrl } from "../../constants";
import { Order } from "../../types/adminPage";
import { handleApiResponse } from "../helpers/handleApiResponse";

export async function createOrder(payload: Order) {
	const res = await fetch(`${apiUrl}/api/orders`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data: payload }),
	});

	return handleApiResponse<any>(res);
}

export async function getOrders(): Promise<Order[]> {
	const res = await fetch(`${apiUrl}/api/orders?populate=*`);
	const result = await handleApiResponse<any>(res);

	if (!result.data) return [];

	return result.data.sort(
		(a: Order, b: Order) =>
			new Date(b.createdAt || "").getTime() -
			new Date(a.createdAt || "").getTime()
	);
}

export async function getOrderById(
	orderId: string,
	signal?: AbortSignal
): Promise<Order> {
	const res = await fetch(`${apiUrl}/api/orders/${orderId}?populate=*`, {
		signal,
	});

	const result = await handleApiResponse<any>(res);

	if (!result?.data) {
		throw new Error("Order data is missing in the response");
	}

	return result.data as Order;
}

export async function updateOrder(documentId: string, changes: Partial<Order>) {
	const res = await fetch(`${apiUrl}/api/orders/${documentId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data: changes }),
	});

	return handleApiResponse<any>(res);
}
