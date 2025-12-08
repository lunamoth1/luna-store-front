export async function handleApiResponse<T>(res: Response): Promise<T> {
	if (!res.ok) {
		let message = `Request failed with status ${res.status}`;

		try {
			const errorData = await res.json();
			message =
				errorData?.error?.message ||
				errorData?.message ||
				JSON.stringify(errorData);
		} catch {
			// ignore json parsing errors
		}

		throw new Error(message);
	}

	return res.json() as Promise<T>;
}
