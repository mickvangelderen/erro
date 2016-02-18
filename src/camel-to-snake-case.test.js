/* eslint-env mocha */
import camelToSnakeCase from './camel-to-snake-case'
import expect from 'must'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	it('should convert camel case to snake case', () => {
		// Initial lower case. 
		expect(camelToSnakeCase('code')).to.eql('code')
		expect(camelToSnakeCase('codeIs')).to.eql('code-is')
		expect(camelToSnakeCase('codeIsFun')).to.eql('code-is-fun')
		// Initial upper case.
		expect(camelToSnakeCase('Code')).to.eql('code')
		expect(camelToSnakeCase('CodeIs')).to.eql('code-is')
		expect(camelToSnakeCase('CodeIsFun')).to.eql('code-is-fun')
	})
})
