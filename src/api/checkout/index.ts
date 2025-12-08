import { apiUrl } from "../../constants";
import { Order } from "../../types/adminPage";
import { handleApiResponse } from "../helpers/handleApiResponse";

export async function createCheckoutSession(body: any) {
	const res = await fetch(`${apiUrl}/api/checkout`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	return handleApiResponse<any>(res);
}

export async function finalizeOrder(order: Order) {
	const res = await fetch(`${apiUrl}/api/orders`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data: order }),
	});

	return handleApiResponse<any>(res);
}
