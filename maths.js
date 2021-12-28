export default class Mathfuncs {
	static sin(x) {return Math.sin((x * Math.PI) / 180)}
	static cos(x) {
		if (x == 90) return 0;
		return Math.cos((x * Math.PI) / 180);
	}
	static tan(x) {
		if (x == 90) return 'undefined';
		return Math.tan((x * Math.PI) / 180);
	} 
	static sinInv(x) {return Math.asin(x) * 360 / (2 * Math.PI)}
	static cosInv(x) {return Math.acos(x) * 360 / (2 * Math.PI)}
	static tanInv(x) {return Math.atan(x) * 360 / (2 * Math.PI)}
	static perc(x) {return x / 100}
	static factorial(x) {
		if (x > 170 || isNaN(x) || !(Number.isInteger(parseFloat(x)))) return 'NaN';
		else if (x == 1 || x == 0) return 1;
		if (x < 0) {
			x *= -1;
			for (let i = x - 1; i > 1; i--) {
				x *= i;
			}
		return - (x);
		}
		for (let i = x - 1; i > 1; i--) {
			x *= i;
		}
		return x;
	}
}