Erro
====

Create `lib/er.js` in your module with the following contents:

```js
var erro = require('erro');

/* This method allows multiple parts of a module use different error objects with different parsers */
var er = module.exports = erro();

/* er.create returns a function that creates error objects with the given key. Here we attach those functions to the er object but you can do whatever you want with them. */
er.notFound = er.create('not-found');
er.invalidArguments = er.create('invalid-arguments');
```

Include `lib/er.js` when you need to create error objects: 

```js
var er = require('./er');

module.exports = function divide(a, b) {
    if (b === 0) {
        throw er.invalidArguments('Cannot divide :a by :b', { a: a, b: b };
    }
    return a/b;
}
```

You can use nested objects just as easily:

```js
var er = require('./er');

var user = { name: mick, id: 5 };

module.exports = function getUserProperty(prop) {
    if (!(prop in user)) {
        throw er.notFound('Property :p is not found for user :u.name', {
            p: prop, u: user
        });
    }
    return user[prop];
}
```

You can also specify your own key pattern by providing options to the `erro` function. Check the [tests](https://github.com/mickvangelderen/erro/blob/master/test/erro-test.js) to see how this and other things work. 