var expect = require('chai').expect,
	erro = require('../lib/erro');

describe('erro', function() {

	var er = erro();

	describe('prepare', function() {

		var values = require('./values-helper');

		values.forEach(function(valueObject) {
			it('should escape ' + valueObject.description + ' properly', function() {
				expect(er.prepare(valueObject.value)).to.equal(valueObject.natural);
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
			expect(er.extract('title', book)).to.deep.equal({ found: true, value: 'My Book' });
		});

		it('should extract a nested key from an object', function() {
			expect(er.extract('1.2', book)).to.deep.equal({ found: true, value: 'Paragraph 1.2' });
		});

		it('should return the data if data is not an object', function() {
			expect(er.extract('1.2', null)).to.deep.equal({ found: false, value: null });
		});

		it('should the deepest value that the key can reach', function() {
			expect(er.extract('1.3', book)).to.deep.equal({ found: false, value: book[1] });
			expect(er.extract('2.1.2', book)).to.deep.equal({ found: false, value: 'Paragraph 2.1'});
		});
	});

	describe('interpolate', function() {
		it('should return an empty string when passing no arguments', function() {
			expect(er.interpolate('')).to.equal('');
		});

		it('should return the same string when passing an unformatted format string', function() {
			expect(er.interpolate('Unformatted format string')).to.equal('Unformatted format string');
		});

		it('should replace :key with data.key', function() {
			expect(er.interpolate('Hello :thing!', { thing: 'world' })).to.equal('Hello "world"!');
		});

		it('should leave a :key alone when the key is not completely in the data', function() {
			expect(er.interpolate(':a', null)).to.equal(':a');
			expect(er.interpolate(':a', { b: 'b' })).to.equal(':a');
			expect(er.interpolate(':a.b', { a: {} })).to.equal(':a.b');
		});
	});

	describe('create', function() {
		it('should return a function that returns an object with the given key and an interpolated message and data', function() {
			expect(er.create).to.be.a('function');

			var notFound = er.create('not-found');
			expect(notFound).to.be.a('function');

			var result = notFound('No user with email address :user.email was found', { user: { email: 'mick@example.com' } });
			expect(result).to.deep.equal({
				key: 'not-found',
				message: 'No user with email address "mick@example.com" was found',
				data: { user: { email: 'mick@example.com' }}
			});
		});

		it('should add the original to the new error if it is passed', function() {
			var notFound = er.create('not-found');
			var original = new Error('Such a standard error');
			var result = notFound('', {}, original);
			expect(result).to.deep.equal({
				key: 'not-found',
				message: '',
				data: {},
				original: original
			});
		});
	});

	describe('options', function() {
		it('should allow me to set the key format', function() {
			er = erro({
				keyLocator: /\{([_\w][_\w\d]*(\|[_\w][_\w\d]*)*)\}/g,
				keySplitter: '|'
			});

			var notFound = er.create('not-found');

			var result = notFound('No user with email address {user|email} was found', { user: { email: 'mick@example.com' } });
			expect(result).to.deep.equal({
				key: 'not-found',
				message: 'No user with email address "mick@example.com" was found',
				data: { user: { email: 'mick@example.com' }}
			});
		});
	});
});