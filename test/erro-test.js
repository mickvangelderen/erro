var expect = require('chai').expect,
	erro = require('../lib/erro');

describe('erro', function() {

	var er = erro();

	describe('prepare', function() {

		var values = require('./values-helper');

		values.forEach(function(valueObject) {
			var val = valueObject.value;
			it('should escape ' + valueObject.description + ' properly', function() {
				if (val !== val) { // only holds for NaN
					expect(er._prepare(valueObject.value) + '').to.equal('NaN');
				} else {
					expect(er._prepare(valueObject.value)).to.equal(valueObject.natural);
				}
			});
		});
	});

	describe('extract', function() {

		var book;

		beforeEach(function() {
			book = {
				title: 'My Book',
				1: {
					1: 'Paragraph 1.1',
					2: 'Paragraph 1.2'
				},
				2: {
					1: 'Paragraph 2.1'
				}
			};
		});

		it('should extract a single depth key from an object', function() {
			expect(er._extract('title', book)).to.equal('My Book');
		});

		it('should extract a nested key from an object', function() {
			expect(er._extract('1.2', book)).to.equal('Paragraph 1.2');
		});

		it('should return the data if data is not an object', function() {
			expect(function() {
				er._extract('1.2', null)
			}).to.throw();
		});

		it('should throw when quering a key not present in a sub object', function() {
			expect(function() {
				er._extract('1.3', book);
			}).to.throw();
		});

		it('should throw when quering a key in a non object', function() {
			expect(function() {
				er._extract('2.1.2', book);
			}).to.throw();
		});
	});

	describe('interpolate', function() {
		it('should return an empty string when passing no arguments', function() {
			expect(er._interpolate('')).to.equal('');
		});

		it('should return the same string when passing an unformatted format string', function() {
			expect(er._interpolate('Unformatted format string')).to.equal('Unformatted format string');
		});

		it('should replace :key with data.key', function() {
			expect(er._interpolate('Hello :thing!', { thing: 'world' })).to.equal('Hello "world"!');
		});

		it('should replace nested :key.subkey with data.key.subkey', function() {
			expect(er._interpolate('Hello :thing.subthing!', { thing: { subthing: 'world' } })).to.equal('Hello "world"!');
		});

		it('should leave a :key alone when the key is not completely in the data', function() {
			expect(er._interpolate(':a', null)).to.equal(':a');
			expect(er._interpolate(':a', { b: 'b' })).to.equal(':a');
			expect(er._interpolate(':a.b', { a: {} })).to.equal(':a.b');
		});
	});

	describe('create', function() {

		var NotFoundError;

		beforeEach(function() {
			NotFoundError = er.create('NotFoundError', 'not-found');
		});

		it('should be a function', function() {
			expect(er.create).to.be.a('function');
		});

		it('should create a constructor that inherits from Error', function() {
			expect(NotFoundError).to.be.a('function');
			expect(new NotFoundError('msg')).to.be.an.instanceOf(Error);
			expect(new NotFoundError('msg')).to.be.an.instanceOf(NotFoundError);
		});

		it('should return a constructor that creates an error object given name and key and an interpolated message and data', function() {
			var result = new NotFoundError('No user with email address :user.email was found', { user: { email: 'mick@example.com' } });
			expect(result).to.deep.equal({
				type: 'not-found',
				message: 'No user with email address "mick@example.com" was found',
				data: { user: { email: 'mick@example.com' }}
			});
		});

		it('should add the original to the new error if it is passed', function() {
			var original = new Error('Such a standard error');
			var result = new NotFoundError('', {}, original);
			expect(result).to.deep.equal({
				type: 'not-found',
				message: '',
				data: {},
				original: original
			});
		});

		it('should have a stack trace', function() {
			var error = new NotFoundError('');
			expect(error.stack).to.match(/^NotFoundError\n/);
		});
	});

	describe('options', function() {
		it('should allow me to set the key format', function() {
			er = erro({
				keyLocator: /\{([_\w][_\w\d]*(?:\|[_\w][_\w\d]*)*)\}/g,
				keySplitter: '|'
			});

			var NotFoundError = er.create('NotFoundError', 'not-found');

			var result = new NotFoundError('No user with email address {user|email} was found', { user: { email: 'mick@example.com' } });
			expect(result).to.deep.equal({
				type: 'not-found',
				message: 'No user with email address "mick@example.com" was found',
				data: { user: { email: 'mick@example.com' }}
			});
		});
	});
});