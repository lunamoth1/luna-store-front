import { apiUrl } from "../../constants";
import { ShippingOption } from "../../types/stores/useSettingsStore";
import { handleApiResponse } from "../helpers/handleApiResponse";

export async function getShippingOptions() {
	const res = await fetch(`${apiUrl}/api/shipping-options`);
	const result = await handleApiResponse(res);

	if (!result.data) return [];

	return result.data.map((item: ShippingOption) => ({
		id: item.id,
		documentId: item.documentId,
		uid: item.uid,
		label: item.label,
		price: item.price,
		type: item.type,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt,
		publishedAt: item.publishedAt,
	}));
}

export async function updateShippingOption(
	documentId: string,
	data: Partial<ShippingOption>
) {
	const res = await fetch(`${apiUrl}/api/shipping-options/${documentId}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ data }),
	});

	return handleApiResponse(res);
}
