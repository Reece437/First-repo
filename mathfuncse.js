export function sin(degrees) {return Math.sin((degrees * Math.PI) / 180);}
export function cos(degrees) {
	if (degrees == '90') return 0;
	return Math.cos((degrees * Math.PI) / 180);
}
export function tan(degrees) {
	if (degrees == 90) return 'Math Error';
	return Math.tan((degrees * Math.PI) / 180);
}
export function sinInv(value) {return Math.asin(value) * 360 / (2 * Math.PI);}
export function cosInv(value) {return Math.acos(value) * 360 / (2 * Math.PI);}
export function tanInv(value) {return Math.atan(value) * 360 / (2 * Math.PI);}
export function log(value) {return Math.log10(value);}
export function ln(value) {return Math.log(value);}
export function sqrt(value) {return value ** 0.5;}
export function factorial(num) {
	if (num > 170) return 'NaN';
	if (isNaN(num)) return 'NaN';
	else if (!(Number.isInteger(parseFloat(num)))) return 'NaN';
	else if (num == 1 || num == 0) return 1;
	else if (x < 0) {
		num = num * -1;
		for (let i = num - 1; i > 1; i--) {
			num *= i
		}
		return num * -1;
	}
	for (let i = num - 1; i >= 1; i--) num *= i
	return num;
}
export function perc(value) {return value / 100;}