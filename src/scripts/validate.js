import {
	inputNumberOrDot,
	clearInput,
	clearScreen,
	toggleNegativeValue,
	defineOperator,
	erase
} from './executions';


export default (states, character) => {
	const charIs = char => character === char;

	if(/^[0-9.]$/.test(character)) {
		inputNumberOrDot(states, character);
	}

	if(charIs('CE')) {
		clearInput();
	}

	if(charIs('C') || charIs('Escape')) {
		clearScreen();
	}

	if(charIs('±')) {
		toggleNegativeValue(states);
	}

	if(charIs('+') || charIs('-') || charIs('*') || charIs('/') || charIs('=')) {
		defineOperator(states, character);
	}

	if(charIs('Backspace')) {
		erase(states);
	}

}