import { apiUrl } from "../../constants";
import { handleApiResponse } from "../helpers/handleApiResponse";

async function getUserIP(): Promise<string> {
	try {
		const res = await fetch("https://api.ipify.org?format=json");
		const data = await res.json();
		return data.ip || "";
	} catch (error) {
		console.error("Failed to get IP:", error);
		return "";
	}
}

export async function getLocation() {
	try {
		const userIP = await getUserIP();
		const url = userIP
			? `${apiUrl}/api/location?ip=${userIP}`
			: `${apiUrl}/api/location`;

		const res = await fetch(url);
		const result = await handleApiResponse(res);
		return result.data.countryCode || "US";
	} catch (error) {
		console.error("Location detection error:", error);
		return "US";
	}
}
