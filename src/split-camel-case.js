function splitCamelCase(string) {
	const upper = string.toUpperCase()
	const length = string.length
	const parts = []
	let lastIndex = 0
	for (let i = 1; i < length; i++) {
		if (string[i] === upper[i]) {
			parts.push(string.substring(lastIndex, i))
			lastIndex = i
		}
	}
	if (length > 0) parts.push(string.substring(lastIndex, length))
	return parts
}

export default splitCamelCase
