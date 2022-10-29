export type HEX = `#${string}`;

const getValue = (color: HEX) => {
	if (color.length < 7) return -1;
	const R = parseInt(color.substring(1, 3), 16);
	const G = parseInt(color.substring(3, 5), 16);
	const B = parseInt(color.substring(5, 7), 16);

	return 0.3 * R + 0.59 * G + 0.11 * B;
};

const getBetterContrast = (value1: number, value2: number) => {
	if (Math.abs(127 - value1) > Math.abs(127 - value2)) return value1;
	else return value2;
};

export const getBestTextColor = (...colors: HEX[]) => {
	let currentValue = 127;

	colors.forEach((color) => {
		if (color.length < 7) return;
		const value = getValue(color);
		currentValue = getBetterContrast(value, currentValue);
	});

	const returnText = currentValue > 127 ? "black" : "white";

	return returnText;
};
