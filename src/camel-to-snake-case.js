import splitCamelCase from './split-camel-case'

function camelToSnakeCase(string) {
	return splitCamelCase(string)
	.map(part => part.toLowerCase())
	.join('-')
}

export default camelToSnakeCase
