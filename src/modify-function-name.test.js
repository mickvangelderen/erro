/* eslint-env mocha */
import expect from 'must'
import modifyFunctionName from './modify-function-name'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	it('should export a function', () => {
		expect(modifyFunctionName).to.be.a.function()
	})

	it('should modify the name of a function', () => {
		function hello() {
			return null
		}
		expect(hello).to.have.ownProperty('name', 'hello')
		const bye = modifyFunctionName(hello, 'bye')
		expect(bye).to.equal(hello)
		expect(bye).to.have.ownProperty('name', 'bye')
	})
})
