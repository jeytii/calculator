import setState from './state';
import operate from './operate';

function clearInput() {
	setState({
		input: null,
		chars: []
	})
}

function clearScreen() {
	setState({
		input: null,
		operator: null,
		output: null,
		chars: []
	})
}

function inputNumberOrDot(states, char) {
	const ifButtonIsDotAndInputIsNull = (!states.input || !states.chars.length) && char === '.';

	if(
		(char === '.' && states.input) &&
		(/\.$/.test(states.input) || states.input.includes('.'))
	) return;

	setState({
		chars: states.chars.concat(ifButtonIsDotAndInputIsNull ? ['0', '.'] : char)
	}, () => {
		setState({
			input: states.chars.join('')
		})
	})
}

function toggleNegativeValue(states) {
	if(!states.input || /^0\.?$/.test(states.input)) return;

	if(!states.chars.length) {
		if(states.input > 0) {
			const negativeValue = states.input.includes('.') ? parseFloat(states.input) * -1 : Number(states.input) * -1;
			setState({ input: String(negativeValue) })
		} else {
			setState({ input: String(Math.abs(states.input)) })
		}
		return;
	}

	setState({
		chars: (states.input > 0) ? ['-'].concat(states.chars) : states.chars.slice(1)
	}, () => {
		setState({
			input: states.chars.join('')
		})
	})
}

function defineOperator(states, operatorData) {
	if(!states.input && !states.output) return;
	
	if(operatorData !== '=') {
		if(states.input) {
			setState({
				input: null,
				operator: operatorData,
				output: states.input.replace(/\.$/, ''),
				chars: []
			})

			if(states.output) {
				setState({
					input: null,
					operator: states.operator,
					output: String(operate(states.operator, states.input, states.output)),
					chars: []
				})
			}
		}

		setState({ operator: operatorData })

		return;
	}

	if(states.input && states.output) {
		setState({
			input: String(operate(states.operator, states.input, states.output)),
			operator: null,
			output: null,
			chars: []
		})
	}
}

function erase(state) {
	if(!state.input || !state.chars) return;

	setState({
		input: state.input.slice(0, -1),
		chars: state.chars.slice(0, -1)
	})

	if(
		/^\-0\.?$/.test(state.chars) ||
		/^\-0\.?$/.test(state.input) ||
		/^\-[1-9]$/.test(state.chars) ||
		/^\-[1-9]$/.test(state.input)
	) {
		clearInput()
	}
}

export { clearInput, clearScreen, inputNumberOrDot, toggleNegativeValue, defineOperator, erase }