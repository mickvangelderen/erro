import camelToSnakeCase from './camel-to-snake-case'
import modifyFunctionName from './modify-function-name'

function createErrorFactory(name) {
	const prototype = {
		name,
		type: camelToSnakeCase(name),
		toString() {
			const append = this.message ? `: ${this.message}` : ''
			return `${this.name}${append}`
		},
		toJSON() {
			// Pull some additional properties from the prototype. 
			const { type, stack } = this
			return Object.assign({ type, stack }, this)
		}
	}

	function GeneratedErrorFactory(message, context, original) {
		const instance = Object.create(prototype)
		instance.message = message || ''
		if (arguments.length >= 2) instance.context = context
		if (arguments.length >= 3) instance.original = original
		Error.captureStackTrace(instance, GeneratedErrorFactory)
		return instance
	}

	return modifyFunctionName(GeneratedErrorFactory, name)
}

export default createErrorFactory
