Erro
====

Simple error message generation

```js
var erro = require('erro'),
    value = 'mrbiggles',
    max = 4;

if (value.length > max) {
	throw erro('Expected the length of {} to be smaller than {}', value, max);
	// message: Expected the length of "mrbiggles" to be smaller than 4
}
```

You can reuse values passed to `erro` by using an index

```js
var erro = require('erro'),
    value = 'mrbiggles',
    max = 4;

if (value.length > max) {
	throw erro('Expected the length of {0} to be smaller than {1}, make sure {0} becomes smaller!', value, max);
	// message: 'Expected the length of "mrbiggles" to be smaller than 4, make sure "mrbiggles" becomes smaller!'
}
```

If you want to make the error messages even more readable you can use an object like so:

```js
var erro = require('erro'),
    value = 'mrbiggles',
    max = 4;

if (value.length > max) {
	throw erro('Expected the length of {value} to be smaller than {max}, make sure {value} becomes smaller!', {value: value, max: max});
	// message: 'Expected the length of "mrbiggles" to be smaller than 4, make sure "mrbiggles" becomes smaller!'
}
```

Combining all of the above is possible. The {} substring will take the next argument starting after the format string, each time it is used (`arguments[i++]` with initially `i = 1`). The {number} will pick the number-th argument after the format string (`arguments[number + 1]`). The {property} will always try to read the property from the first argument after the format string (`arguments[1][property]`). If the value for a {...} can't be found, it will be left as is.

With this information we can construct the following erro:

```js
erro('{} {0} {} {} {2} {hello} {} {}', {hello: 'world'}, 'two', 'three', 4)
// message: '{"hello":"world"} {"hello":"world"} "two" "three" "three" "world" 4 {}'
```

Check the [tests](https://github.com/mickvangelderen/erro/blob/master/test/erro-test.js) for more examples