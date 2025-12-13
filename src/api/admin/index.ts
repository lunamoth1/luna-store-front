import { apiUrl } from "../../constants";
import { handleApiResponse } from "../helpers/handleApiResponse";

export async function checkAdminPin(pin: string) {
	const res = await fetch(`${apiUrl}/api/check-pin`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ pin }),
	});

	return handleApiResponse(res);
}

export async function sendTrackingEmail(trackingNumber: string, email: string) {
	const res = await fetch(`${apiUrl}/api/send-tracking`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ trackingNumber, email }),
	});

	return handleApiResponse(res);
}
