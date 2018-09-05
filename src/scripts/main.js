import validate from './validate';

const buttons = document.querySelectorAll('.js-button');

let state = {
	input: null,
	operator: null,
	output: null,
	chars: []
};



function applyStatesAndStyles() {
	const input = document.querySelector('.js-input');
	const operator = document.querySelector('.js-operator');
	const output = document.querySelector('.js-output');

	input.style.color = !state.input ? '#afafaf' : '#4eb4e7';

	input.textContent = !state.input ? '0' : state.input;
	operator.textContent = !state.operator ? null : state.operator;
	output.textContent = !state.output ? null : state.output;

	document.styleSheets[0].insertRule(`#wrapper {height: ${window.innerHeight}px}`, 2);
}



function input(e) {
	validate(state, e.key);
}



window.addEventListener('load', applyStatesAndStyles);
window.addEventListener('keyup', input);
buttons.forEach( button => button.addEventListener('click', validate.bind(null, state, button.textContent)) );

export { state, applyStatesAndStyles }