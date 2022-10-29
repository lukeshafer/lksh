export function getDateStr(dateStr: string, yearOnly = false) {
	if (dateStr === "") return "Present";
	const date = new Date(dateStr).toDateString();
	const [_day, month, _date, year] = date.split(" ");

	if (yearOnly) return year;

	return `${month} ${year}`;
}
