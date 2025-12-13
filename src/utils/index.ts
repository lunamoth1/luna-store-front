export const formatDate = (
	dateString: string,
	options:
		| "year"
		| "month"
		| "day"
		| "hour"
		| "minute"
		| "second"
		| "weekday"
		| "monthName"
		| "full"
		| "short"
		| "time"
		| "iso",
	locale: string = "en-US"
) => {
	if (!dateString) return null;

	const date = new Date(dateString);

	switch (options) {
		case "year":
			return date.getFullYear();

		case "month":
			return date.getMonth() + 1;

		case "day":
			return date.getDate();

		case "hour":
			return date.getHours();

		case "minute":
			return date.getMinutes();

		case "second":
			return date.getSeconds();

		case "weekday":
			return date.toLocaleDateString(locale, { weekday: "long" });

		case "monthName":
			return date.toLocaleDateString(locale, { month: "long" });

		case "time":
			return date.toLocaleTimeString(locale, {
				hour: "2-digit",
				minute: "2-digit",
			});

		case "short":
			return date.toLocaleDateString(locale, {
				day: "2-digit",
				month: "2-digit",
				year: "2-digit",
			});

		case "full":
			return date.toLocaleDateString(locale, {
				day: "numeric",
				month: "long",
				year: "numeric",
			});

		case "iso":
			return date.toISOString();

		default:
			return date.toString();
	}
};
