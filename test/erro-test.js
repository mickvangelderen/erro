var expect = require('chai').expect,
    erro = require('../lib/erro');

describe('vali', function() {

	describe('erro', function() {

    	var interpolate = erro.interpolate,
        	values = [
				{
					value: undefined,
					natural: 'undefined'
				},{
					value: null,
					natural: 'null'
				},{
					value: 3,
					natural: '3'
				},{
					value: 3.1415,
					natural: '3.1415'
				},{
					value: NaN,
					natural: 'NaN'
				},{
					value: Infinity,
					natural: 'Infinity'
				},{
					value: '"h"ello \'w\'orld',
					natural: '"\\"h\\"ello \'w\'orld"'
				},{
					value: ['hello', 'world'],
					natural: '["hello","world"]'
				},{
					value: { hello: 'world' },
					natural: '{"hello":"world"}'
				},{
					value: function hello() { return 'world'; },
					natural: "function hello() { return 'world'; }"
				}
			];

		it('should return an error', function() {
			expect(erro()).to.be.an.instanceof(Error);
			expect(erro('format string')).to.be.an.instanceof(Error);
			expect(erro('{0}')).to.be.an.instanceof(Error);
			expect(erro('{prop}', { prop: true })).to.be.an.instanceof(Error);
		});

		it('should expose the interpolation function', function() {
			expect(erro.interpolate).to.be.a.function;
		});

		it('should pass the arguments to the interpolation function', function() {
			expect(erro('before {} after', { hello: 'world' }).message).to.equal('before {"hello":"world"} after');
		});

		describe('interpolate', function() {

			it('should return an empty string when passing no arguments', function() {
				expect(interpolate('', [])).to.equal('');
			});

			it('should return the same string when passing an unformatted format string', function() {
				expect(interpolate('Unformatted format string', [])).to.equal('Unformatted format string');
			});

			it('should replace {} with any value', function() {
				values.forEach(function(example) {
					expect(interpolate('before {} after', [example.value])).to.equal('before ' + example.natural + ' after');
				});
			});

			it('should replace multiple {}\'s with any value', function() {
				values.forEach(function(o) {
					expect(interpolate('before {} {} after', [values[0].value, o.value])).to.equal('before ' + values[0].natural + ' ' + o.natural + ' after');
				});
			});

			it('should replace {number} with the number-th argument', function() {
				expect(interpolate('{0}', [null])).to.equal('null');
			});

			it('should replace multiple {number} with the number-th argument', function() {
				expect(interpolate('{0} {1} {0}', [0, 1])).to.equal('0 1 0');
			});

			it('should replace {propertyName} with the value of the property in the first argument', function() {
				expect(interpolate('{hello}', [{ hello: 'world' }])).to.equal('"world"');
			});

			it('should leave a {key} alone when the key cannot be found', function() {
				expect(interpolate('{}', [])).to.equal('{}');
				expect(interpolate('{0}', [])).to.equal('{0}');
				expect(interpolate('{hello}', [{ other: 'world' }])).to.equal('{hello}');
			});

			it('should allow combinations of all {key} forms', function() {
				expect(interpolate('{} {0} {} {} {2} {hello} {} {}', [{hello: 'world'}, 'two', 'three', 4])).to.equal('{"hello":"world"} {"hello":"world"} "two" "three" "three" "world" 4 {}');
			});

		});

	});

});