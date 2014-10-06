module.exports = [
	{
		description: 'special value undefined',
		value: undefined,
		natural: 'undefined'
	},{
		description: 'special value null',
		value: null,
		natural: 'null'
	},{
		description: 'integer 3',
		value: 3,
		natural: '3'
	},{
		description: 'floating point 3.1415',
		value: 3.1415,
		natural: '3.1415'
	},{
		description: 'special value NaN',
		value: NaN,
		natural: 'NaN'
	},{
		description: 'special value Infinity',
		value: Infinity,
		natural: 'Infinity'
	},{
		description: 'string "\\"h\\"ello \'w\'orld"',
		value: '"h"ello \'w\'orld',
		natural: '"\\"h\\"ello \'w\'orld"'
	},{
		description: 'array ["hello","world"]',
		value: ['hello', 'world'],
		natural: '["hello","world"]'
	},{
		description: 'object {"hello":"world"}',
		value: { hello: 'world' },
		natural: '{"hello":"world"}'
	},{
		description: 'function hello() { return \'world\'; }',
		value: function hello() { return 'world'; },
		natural: 'function hello() { return \'world\'; }'
	}
];