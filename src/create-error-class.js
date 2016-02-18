import camelToSnakeCase from './camel-to-snake-case'
import modifyFunctionName from './modify-function-name'

function createErrorClass(name) {
	class GeneratedErrorClass extends Error {
		constructor(message, context, original) {
			super(message)
			if (arguments.length >= 2) this.context = context
			if (arguments.length >= 3) this.original = original
			Error.captureStackTrace(this, GeneratedErrorClass)
		}

		toJSON() {
			// Pull some additional properties from the prototype. 
			const { message, type, stack } = this
			return Object.assign({ message, type, stack }, this)
		}
	}

	GeneratedErrorClass.prototype.type = camelToSnakeCase(name)
	GeneratedErrorClass.prototype.name = name

	return modifyFunctionName(GeneratedErrorClass, name)
}

export default createErrorClass
