import { apiUrl } from "../../constants";
import { CreateCheckoutSessionBody } from "../../types/api";
import { handleApiResponse } from "../helpers/handleApiResponse";

export async function createCheckoutSession(body: CreateCheckoutSessionBody) {
	const res = await fetch(`${apiUrl}/api/checkout`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	return handleApiResponse(res);
}
