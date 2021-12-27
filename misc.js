import {calculate, current, answer, ANS, answers} from './calc.js';
import {factorial} from './mathfuncs.js'
function com(num) {
	if (num == '') return num;
	num = num.replaceAll(',', '')
	if (isNaN(num)) return num;
	else if (num.includes('e+') || num.includes('e-')) return num;
	else if (num.includes('.')) {
		var integer = parseFloat(num.split('.')[0])
		var decimal = num.split('.')[1];
		integer = integer.toLocaleString('en');
		return integer + '.' + decimal;
	} else {
		num = parseFloat(num).toLocaleString('en')
		return num
	}
}
function change(eq) {
	eq = eq.replaceAll('×','*').replaceAll('//', 'MOD').replaceAll('÷','/').replaceAll('^','**').replaceAll('√','sqrt').replaceAll("π",'Math.PI').replaceAll('sin-1', 'sinInv').replaceAll('cos-1', 'cosInv').replaceAll('tan-1', 'tanInv').replaceAll(',', '').replaceAll('ANS', ANS).replaceAll('--', '+').replaceAll('e', 'Math.E');
	var len = eq.length;
	/*for (let i = 0; i < len; i++) {
		if (eq.charAt(i) == 'e' && eq.charAt(i+1) != "+" && eq.charAt(i+1) != "-") eq = eq.replace('e', 'Math.E')
	}*/
	while (eq.includes('!') || eq.includes('%')) {
		len = eq.length;
		for (let i = 0; i < len; i++) {
			if (eq.charAt(i) == "%") {
				let fact = '';
				for (let x = 1; x <= i; x++) {
					if (isNaN(parseFloat(eq.charAt(i-x))) && eq.charAt(i-x) != ('.' || '-')) break;
					fact += eq.charAt(i-x);
				}
				fact = reverseString(fact);
				eq = eq.replace(fact + '%', perc(fact));
			} else if (eq.charAt(i) == '!') {
				let fact = '';
				for (let x = 1; x <= i; x++) {
					if (isNaN(parseFloat(eq.charAt(i-x))) && eq.charAt(i-x) != ('.' || '-')) break;
					fact += eq.charAt(i-x);
				}
				fact = reverseString(fact)
				eq = eq.replace(`${fact}!`, factorial(fact));
				break;
			}
		}
	}
	eq = eq.replaceAll('MOD', '%')
	return eq
}
function reverseString(string) {
	let newString = '';
	for (let i = string.length - 1; i >= 0; i--) newString += string[i]
	return newString;
}
function AC() {current.innerText = '', answer.innerText = ''}
function showAdv() {
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
}
function inverse() {
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
}
function del() {
	if (current.innerText == 'Syntax Error' || current.innerText == 'Math Error' || current.innerText == 'NaN') AC();
	else {
		current.innerText = com(current.innerText.slice(0, -1));
		calculate();
	}
}
function ans() {
	if (answers == '') return;
	let x = window.prompt(`this is your answer history: ${answers.toString()}\nWhich answer would you like?`, `${answers[answers.length - 1]}`);
	if (x == null || x == '') {
		alert("You didn't select an answer, defaulted to the most recent answer")
		ANS = answers[answers.length - 1];
		console.log(ANS);
		return;
	} try {
		ANS = answers[parseInt(x) - 1];
		console.log(ANS);
	} catch(err) {
		alert('Out of range, defaulted to most recent answer')
		ANS = answers[answers.length - 1];
		console.log(err.message);
	}
}
export {del, ans, AC, showAdv, inverse, reverseString, com, change};