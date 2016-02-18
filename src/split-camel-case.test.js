/* eslint-env mocha */
import expect from 'must'
import relativePath from '../test/relative-path'
import splitCamelCase from './split-camel-case'

describe(relativePath(__filename), () => {
	it('should split a string by camel case', () => {
		// Initial lower case. 
		expect(splitCamelCase('code')).to.eql([ 'code' ])
		expect(splitCamelCase('codeIs')).to.eql([ 'code', 'Is' ])
		expect(splitCamelCase('codeIsFun')).to.eql([ 'code', 'Is', 'Fun' ])
		// Initial upper case.
		expect(splitCamelCase('Code')).to.eql([ 'Code' ])
		expect(splitCamelCase('CodeIs')).to.eql([ 'Code', 'Is' ])
		expect(splitCamelCase('CodeIsFun')).to.eql([ 'Code', 'Is', 'Fun' ])
	})
})
