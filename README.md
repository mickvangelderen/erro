Erro
====

Check the [migration guide](https://github.com/mickvangelderen/erro/blob/master/migration.md) if you are upgrading to a new major version. 

Create `lib/erro.js` in your module with the following contents:

```js
var erro = module.exports = require('erro')({
    // _keyLocator: /* regex to locate keys with in message string */
    // _keySplitter: /* regex/string to split those keys with */
});
```

Create `lib/erro/invalid-argument.js` and other errors like so:

```js
/* erro.create returns a constructor that creates error objects inheriting from Error with the given name and key. Here we attach those functions to the er object but you can do whatever you want with them. */
module.exports = require('../erro').create('InvalidArgumentError', 'invalid-argument');
```

Instead of creating individual files for each error you may prefer to put them all in one file. It is up to you to decide, the constructors are standalone. 

Include errors where you need them:

```js
var InvalidArgumentError = require('./errors/invalid-argument');

module.exports = function divide(a, b) {
    if (b === 0) {
        var data = { numerator: a, denominator: b };
        throw new InvalidArgumentError(
            'Cannot divide :numerator by :denominator', data);
    }
    return a/b;
}
```

You can use nested objects just as easily:

```js
var NotFoundError = require('./errors/not-found');

var user = { name: mick, id: 5 };

module.exports = function getUserProperty(prop) {
    if (!(prop in user)) {
        throw new NotFoundError('Property :p is not found for user :u.name', {
            p: prop, u: user
        });
    }
    return user[prop];
}
```

You can also specify your own key pattern by providing options to the `erro` function. Check the [tests](https://github.com/mickvangelderen/erro/blob/master/test/erro-test.js) to see how this and other things work. 