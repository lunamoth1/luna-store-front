import { apiUrl } from "../../constants";
import { handleApiResponse } from "../helpers/handleApiResponse";
import { OrderAttributes } from "../../types/api";
import { Order } from "../../types/adminPage";

export async function createOrder(payload: OrderAttributes) {
	const res = await fetch(`${apiUrl}/api/orders`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data: payload }),
	});

	return handleApiResponse(res);
}

export async function getOrders() {
	const res = await fetch(`${apiUrl}/api/orders?populate=*`);
	const result = await handleApiResponse(res);

	if (!result.data) return [];

	return result.data.sort(
		(a: Order, b: Order) =>
			new Date(b.createdAt ?? "").getTime() -
			new Date(a.createdAt ?? "").getTime()
	);
}

export async function getOrderById(orderId: string, signal?: AbortSignal) {
	const res = await fetch(`${apiUrl}/api/orders/${orderId}?populate=*`, {
		signal,
	});

	const result = await handleApiResponse(res);

	return result.data;
}

export async function updateOrder(
	documentId: string | number,
	changes: Partial<OrderAttributes>
) {
	const res = await fetch(`${apiUrl}/api/orders/${documentId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data: changes }),
	});

	return handleApiResponse(res);
}

export async function updateOrderArchived(
	orderId: string | number,
	archived: boolean
) {
	const res = await fetch(`${apiUrl}/api/orders/${orderId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data: { archived } }),
	});

	return handleApiResponse(res);
}

export async function updateOrderTrackingNumber(
	documentId: string | number,
	trackingNumber: string
) {
	const res = await fetch(`${apiUrl}/api/orders/${documentId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data: { trackingNumber } }),
	});

	return handleApiResponse(res);
}
