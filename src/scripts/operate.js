export default (op, input, output) => {
	output = (output.includes('.')) ? parseFloat(output) : Number(output);
	input = (input.includes('.')) ? parseFloat(input) : Number(input);
	let formula;

	switch (op) {
		case '+':
			formula = output + input;
			break;
		case '-':
			formula = output - input;
			break;
		case '*':
			formula = output * input;
			break;
		case '/':
			formula = output / input;
			break;
		default:
			break;
	}

	return formula;
}