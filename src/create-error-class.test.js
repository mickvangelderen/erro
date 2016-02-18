/* eslint-env mocha */
import createErrorClass from './create-error-class'
import expect from 'must'
import relativePath from '../test/relative-path'

describe(relativePath(__filename), () => {
	it('should export a function', () => {
		expect(createErrorClass).to.be.a.function()
	})

	describe(`createErrorClass('NotFoundError')`, () => {
		let NotFoundError = null
		
		beforeEach(() => {
			NotFoundError = createErrorClass('NotFoundError')
		})

		it('should be a function', () => {
			expect(NotFoundError).to.be.a.function()
		})
		
		it('should have the right name', () => {
			expect(NotFoundError).to.have.ownProperty('name', 'NotFoundError')
		})

		describe(`new NotFoundError()`, () => {
			let error = null

			beforeEach(() => {
				error = new NotFoundError()
			})

			it('should be an instance of Error', () => {
				expect(error).to.be.an.instanceOf(Error)
			})

			it('should be an instance of NotFoundError', () => {
				expect(error).to.be.an.instanceOf(NotFoundError)
			})

			it('should have the right name', () => {
				expect(error).to.have.property('name', 'NotFoundError')
			})

			it('should have the right type', () => {
				expect(error).to.have.property('type', 'not-found-error')
			})

			it('should convert to a string nicely', () => {
				expect(error.toString()).to.equal('NotFoundError')
			})

			it('should convert to JSON nicely', () => {
				const result = JSON.parse(JSON.stringify(error))
				expect(result).to.have.property('type', 'not-found-error')
				expect(result).to.have.property('message', '')
				expect(result).to.have.property('stack')
			})

			it('should accept message, context and original parameters', () => {
				const message = 'User was not found!'
				const context = { user: { id: 1 } }
				const original = new Error('404 not found')
				let error = new NotFoundError(message)
				expect(error).to.have.ownProperty('message', message)
				expect(error).to.not.have.ownProperty('context', context)
				expect(error).to.not.have.ownProperty('original', original)
				error = new NotFoundError(message, context)
				expect(error).to.have.ownProperty('message', message)
				expect(error).to.have.ownProperty('context', context)
				expect(error).to.not.have.ownProperty('original', original)
				error = new NotFoundError(message, context, original)
				expect(error).to.have.ownProperty('message', message)
				expect(error).to.have.ownProperty('context', context)
				expect(error).to.have.ownProperty('original', original)
			})
		})
	})
})
