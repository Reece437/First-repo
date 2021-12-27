import { sin, cos, tan, sinInv, cosInv, tanInv, factorial, log, ln, perc} from './mathfuncs.js';
import {del, AC, showAdv, inverse, reverseString, com, change, ans} from './misc.js'; 
function numbers(n) {
	if (n == '.' ) {
		if (current.innerText == '') {
			current.innerText += '0.';
			return;
		} else if (current.innerText.slice(-1) == '.') return;
		else if (opers.includes(current.innerText.slice(-1))) {
			current.innerText += '0.'
			return;
		} else {
			for (let i = current.innerText.length - 1; i >= 0; i--) {
				if (opers.includes(current.innerText.charAt(i))) break;
				else if (current.innerText.charAt(i) == '.') return;
			}
		}
	}
	if (current.innerText == 'Math Error' || current.innerText == 'Syntax Error' || current.innerText == 'NaN') return
	else if (opers.includes(n) && (opers.includes(current.innerText.slice(-1)) || opers.includes(current.innerText.slice(-2)))) return
	else if (n == '-' && current.innerText.slice(-2) == '--') return
	else {
		current.innerText += n;
		calculate()
		current.innerText = com(current.innerText);
	}
}
export function calculate() {
	if (current.innerText == '') {
		answer.innerText = '';
		return
	}
	let equation = change(current.innerText);
	while (equation.split('(').length - 1 > equation.split(')').length - 1) {
		equation += ')';
	}
	try {
		answer.innerText = eval(equation);
		if (answer.innerText.includes('.')) {
			let secondHalf = answer.innerText.split('.')[1];
			if (secondHalf.length > 10 && !(answer.innerText.includes('e+') || answer.innerText.includes('e-'))) {
				answer.innerText = parseFloat(answer.innerText).toFixed(secondHalf.length - 2);
				while ((answer.innerText.slice(-1) == '0' || answer.innerText.slice(-1) == '.') && answer.innerText != '2.7182818284590') {
					answer.innerText = answer.innerText.slice(0, -1);
				}	
			}
		}
		answer.innerText = answer.innerText.replaceAll('NaN', "Math Error")
	} catch(err) {
		answer.innerText = '';
		console.log(err.message)
	}
}
function equals() {
	if (answer.innerText == '' && current.innerText == '') return;
	else if (answer.innerText == '' && current.innerText != '' ) {
		try {
			current.innerText = change(current.innerText)
			eval(current.innerText)
			return;
		} catch(err) {
			current.innerText = 'Syntax Error';
			console.log(err.message)
			return;
		}
	}
	current.innerText = com((answer.innerText).replace('Infinity', 'Math Error').replace('-Infinity', 'Math Error'));
	ANS = current.innerText;
	answers.push(`\n${ANS}`);
	answer.innerText = '';
}
export var answers = [];
export var ANS = null;
export const current = document.getElementById('currentEq');
export const answer = document.getElementById('answer');
const opers = ['+', '^', '×', '÷', '--', '//', '%'];
document.querySelectorAll('[data-number]').forEach(button => {
	button.addEventListener('click', () => numbers(button.innerText))
})
document.querySelectorAll('[data-bOper]').forEach(button =>{
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
				numbers(button.innerText + '(')
				break;
			default:
				numbers(button.innerText)
				break;
		}
	})
})
document.querySelectorAll('[data-oper]').forEach(button =>{
	button.addEventListener('click', () => {
		if (button.innerText != '-') {
			if (current.innerText != '') numbers(button.innerText);
		} else {
			numbers(button.innerText);
		}
	})
})
document.querySelector('[data-AC]').addEventListener('click', () => AC())
document.querySelector('[data-DEL]').addEventListener('click', () => del())
document.querySelector('[data-equals]').addEventListener('click', () => equals())
document.querySelector('[data-equals]').addEventListener('dblclick', () => showAdv())
document.querySelector('[data-inv]').addEventListener('click', () => inverse())