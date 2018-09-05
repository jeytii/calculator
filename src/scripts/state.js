import { state, applyStatesAndStyles } from './main';

const iterateStates = obj => {
	const keys = Object.keys(obj);
	const values = Object.values(obj);

	keys.forEach((key, i) => {
		state[key] = values[i]
	})
}


export default (obj, callback = null) => (
	new Promise((resolve, reject) => {
		resolve(obj)
	})
	.then(states => {
		iterateStates(states)
		applyStatesAndStyles()

		if(callback !== null) {
			return new Promise((resolve, reject) => {
				callback()
			})
		}
	})
	.then(cb => cb)
)