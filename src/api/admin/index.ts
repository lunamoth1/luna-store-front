import { apiUrl } from "../../constants";
import { handleApiResponse } from "../helpers/handleApiResponse";

interface CheckPinResponse {
	success: boolean;
	valid?: boolean;
}

export async function checkAdminPin(pin: string): Promise<CheckPinResponse> {
	const res = await fetch(`${apiUrl}/api/check-pin`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ pin }),
	});

	console.log(res);

	return handleApiResponse<CheckPinResponse>(res);
}
