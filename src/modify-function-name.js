function modifyFunctionName(func, name) {
	const descriptor = Object.getOwnPropertyDescriptor(func, 'name')
	descriptor.value = name
	Object.defineProperty(func, 'name', descriptor)
	return func
}

export default modifyFunctionName
