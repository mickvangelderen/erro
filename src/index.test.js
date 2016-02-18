/* eslint-env mocha */
import createErrorClass from './create-error-class'
import createErrorFactory from './create-error-factory'
import erro from './'
import expect from 'must'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	it('should export an object', () => {
		expect(erro).to.be.an.object()
	})

	it('should export createErrorClass', () => {
		expect(erro).to.have.property('createErrorClass', createErrorClass)
	})

	it('should export createErrorFactory', () => {
		expect(erro).to.have.property('createErrorFactory', createErrorFactory)
	})
})
