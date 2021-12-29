console.log('Hello World');
import Mathfuncs from './maths.js';
class Calculator {
	constructor(current, answer, errorNames, opers, map) {
		this.current = current, this.answer = answer;
		this.errorNames = errorNames, this.opers = opers;
		this.map = map;
	} bigReplace(string) {
		let New = "" + string;
		for (let value in this.map) {
			if (!this.map.hasOwnProperty(value)) continue;
			New = New.replaceAll(value, this.map[value]);
		}
		return New;
	} appNum(num) {
		if (this.errorNames.includes(this.current.innerText)) return;
		if (num == '.') {
			if (this.current.innerText == '' || 
			this.opers.includes(this.current.innerText.slice(-1))) {
				this.current.innerText += '0.';
				return;
			} else {
				for (let i = this.current.innerText.length - 1; i >= 0; i--) {
					if (this.opers.includes(this.current.innerText.charAt(i))) break;
					else if (this.current.innerText.charAt(i) == '.') return;
				}
			}
		}
		if (this.opers.includes(this.current.innerText.slice(-1)) && 
		this.opers.includes(num)) {
			return;
		} else if ((this.opers.includes(num) || num == '-') && 
		this.current.innerText.slice(-2) == '--') {
			return;
		} else {
			this.current.innerText += num;
			this.compute();
		}
	} inverse() {
		let inv = document.getElementsByClassName('inverse');
		let len = inv.length;
		for (let i = 0; i < len; i++) {
			switch (inv[i].innerText) {
				case 'sin':
				case 'cos':
				case 'tan':
					inv[i].innerText += '-1';
					break;
				case 'sin-1':
				case 'cos-1':
				case 'tan-1':
					inv[i].innerText = inv[i].innerText.slice(0, -2);
					break;
				case 'log':
					inv[i].innerText = '10^';
					break;
				case '10^':
					inv[i].innerText = 'log';
					break;
				case 'ln':
					inv[i].innerText = 'e^';
					break;
				case 'e^':
					inv[i].innerText = 'ln';
					break;
				case '√':
					inv[i].innerText = '^2';
					break;
				case '^2':
					inv[i].innerText = '√';
					break;
				case 'MOD':
					inv[i].innerText = '%';
					break;
				default:
					inv[i].innerText = 'MOD';
					break;
			}
		}
	} com(num) {
		if (isNaN(num) || 
		num == '' || 
		(num.includes('e+') || 
		num.includes('e-'))) { 
			return num;
		}
		if (num.includes('.')) {
			let integer = parseFloat(num.split('.')[0]).toLocaleString('en');
			let decimal = num.split('.')[1];
			return integer + '.' + decimal;
		} else {
			return parseFloat(num).toLocaleString('en');
		}
	} comNums(string) {
		string = string.replaceAll(',', '');
		let num = ''; 
		let len = string.length;
		for (let i = 0; i < len; i++) {
			if (Number.isInteger(parseFloat(string[i]))) {
				num += string[i];
				for (let x = 1; x < len; x++) {
					if (Number.isInteger(parseFloat(string.charAt(i + x))) ||
					string[i + x] == '.') {
						num += string[i + x];
					} else {
						break;
					}
				}
				string = string.replace(num, this.com(num));
				i +=  num.length + Math.floor((num.length) / 4);
				num = '';
			}
		}
		return string;
	}
	AC() {this.current.innerText = '', this.answer.innerText = ''}
	DEL() {
		if (this.errorNames.includes(this.current.innerText)) this.AC();
		else {
			this.current.innerText = this.current.innerText.slice(0, -1);
			this.compute();
		}
	} showAdv() {
		let adv = document.getElementsByClassName('grid-small');
		let exp = document.getElementById('exp');
		let len = adv.length;
		if (exp.style.visibility == 'hidden') {
			for (let i = 0; i < len; i++) {
				adv[i].style.visibility = 'visible';
			}
			document.getElementById('grid-equals').style.borderBottomRightRadius = '0px';
			document.getElementById('grid-point').style.borderBottomLeftRadius = '0px';
		} else {
			for (let i = 0; i < len; i++) {
				adv[i].style.visibility = 'hidden';
			}
			document.getElementById('grid-equals').style.borderBottomRightRadius = '10px';
			document.getElementById('grid-point').style.borderBottomLeftRadius = '10px';
		}
	} reverseString(string) {
		let newString = '';
		for (let i = string.length - 1; i >= 0; i--) newString += string[i];
		return newString;
	} equals() {
		if (this.current.innerText == '') return;
		if (this.answer.innerText == '') {
				this.current.innerText = 'Syntax Error';
				return;
		}
		this.current.innerText = this.answer.innerText; 
		this.answer.innerText = '';
	} change(eq) {
		eq = this.bigReplace(eq);
		var nums;
		while (eq.includes('!') || eq.includes('%')) {
			let len = eq.length;
			for (let i = 0; i < len; i++) {
				if (eq[i] == "%") {
					nums = '';
					for (let x = 1; x <= i; x++) {
						if (isNaN(parseFloat(eq.charAt(i - x))) &&
						eq[i - x] != ('.' || '-'))
						{
							break;
						}
						nums += eq[i - x];
					}
					nums = this.reverseString(nums);
					eq = eq.replace(nums + '%', Mathfuncs.perc(nums));
				} else if (eq[i] == '!') {
					nums = '';
					for (let x = 1; x <= i; x++) {
						if (isNaN(parseFloat(eq[i - x])) && 
						eq[i - x] != ('.' || '-')) 
						{
							break;
						}
						nums += eq[i - x];
					}
					nums = this.reverseString(nums);
					eq = eq.replace(`${nums}!`, Mathfuncs.factorial(nums));
					break;
				}
			}
		}
		eq = eq.replaceAll('MOD', '%');
		return eq;
	} compute() {
		if (this.current.innerText == '') return;
		try {
			let equation = this.change(this.current.innerText);
			while (equation.split('(').length - 1 > 
			equation.split(')').length - 1) 
			{
				equation += ')';
			}
			this.answer.innerText = eval(equation);
			if (this.answer.innerText.includes('.') &&
			this.answer.innerText.split('.')[1].length - 1 > 10 &&
			!(this.answer.innerText.includes('e+') ||
			this.answer.innerText.includes('e-'))) 
			{
				let secondHalf = this.answer.innerText.split('.')[1];
				this.answer.innerText = parseFloat(this.answer.innerText)
				.toFixed(secondHalf.length - 2);
				while (this.answer.innerText.slice(-1) == '0' || 
				this.answer.innerText.slice(-1) == '.') 
				{
					this.answer.innerText = this.answer.innerText.slice(0, -1);
				}
			}
			this.current.innerText = this.comNums(this.current.innerText);
			this.answer.innerText = this.com(this.answer.innerText);
		} catch (err) {
			console.log(err.message);
			if (!this.opers.includes(this.current.innerText.slice(-1))) this.answer.innerText = '';
		}
	}
}
const current = document.getElementById('currentEq');
const answer = document.getElementById('answer');
const errorNames = ['Syntax Error', 'NaN', 'undefined', 'Math Error'];
const opers = ['+', '^', '×', '÷', '--', '//', '%'];
const map = {
	'^': '**',
	'×': '*', 
	'÷': '/', 
	'--': '+',
	'√': 'Math.sqrt',
	'sin(': 'Mathfuncs.sin(',
	'cos(': 'Mathfuncs.cos(',
	'tan(': 'Mathfuncs.tan(',
	'sin-1': 'Mathfuncs.sinInv',
	'cos-1': 'Mathfuncs.cosInv',
	'tan-1': 'Mathfuncs.tanInv',
	'log': 'Math.log10',
	'ln': 'Math.log',
	'π': 'Math.PI',
	'e': 'Math.E',
	',': ''
};
const calc = new Calculator(current, answer, errorNames, opers, map);
document.querySelectorAll('[data-number]').forEach(button => {
	button.addEventListener('click', () => {
		if (current.innerText == '0' &&
		button.innerText != '.') 
		{
			current.innerText = button.innerText;
			calc.compute();
		} else {
			calc.appNum(button.innerText);
		}
	});
});
document.querySelectorAll('[data-oper]').forEach(button => {
	button.addEventListener('click', () => calc.appNum(button.innerText));
});
document.querySelector('[data-AC]').addEventListener('click', () => calc.AC());
document.querySelector('[data-DEL]').addEventListener('click', () => calc.DEL());
document.querySelector('[data-equals]').addEventListener('click', () => calc.equals());
document.querySelector('[data-equals]').addEventListener('dblclick', () => calc.showAdv());
document.querySelectorAll('[data-bOper]').forEach(button => {
	button.addEventListener('click', () => {
		switch (button.innerText) {
			case 'sin':
			case 'sin-1':
			case 'cos':
			case 'cos-1':
			case 'tan':
			case 'tan-1':
			case 'log':
			case 'ln':
			case '√':
				calc.appNum(button.innerText + '(');
				break;
			default:
				calc.appNum(button.innerText);
				break;
		}
	});
});
document.querySelector('[data-inv]').addEventListener('click', () => calc.inverse());