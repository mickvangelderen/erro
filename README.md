# Erro

Check the [migration guide](https://github.com/mickvangelderen/erro/blob/master/migration.md) if you are upgrading to a new major version. 

## Advantages

Erro was created with two things in mind: usability and cross-computer usage. 

### Detailed error messages

Error classes created with erro allow you to write detailed error messages. You can provide a data object when constructing an error that is interpolated into the message. The interpolation supports nested objects. 

### Error identification

To check what type of error we are dealing with you should use the `error.type` property. Checking the type with `instanceof` or `error.name` should be avoided. `instanceof` will not work when you receive errors over a network. `error.name` is not necessarily unique. 

`error.type` is a new property that should discriminate errors based on how to deal with them. For example, you can make a `InvalidEmailError` and an `InvalidUsernameError` but they will be handled in a very similar fashion. Both could have the type `invalid-field`. Errors with type `invalid-field` can then be expected to have properties `field` and `value` in the error data. It is up to you to properly design your errors to be consistent and helpful. 

## How to use

```bash
npm install --save erro
```

### Initialize erro

Erro allows you to tweak how the interpolation is performed. Therefore you should initialize erro as shown in the example below. 

```js
var erro = require('erro')({
    // _keyLocator: /* regex to locate keys with in message string */
    // _keySplitter: /* regex/string to split those keys with */
});
```

### Create a class

Creating a new error class is easy, just call `erro.create(name, type)`. 

```js
var InvalidArgumentError = erro.create('InvalidArgumentError', 'invalid-argument');
```

### Construct an error

Constructing an error with an interpolated message like so:

```js
function divide(a, b) {
    if (b === 0) {
        throw new InvalidArgumentError(
            'Cannot divide :numerator by :denominator', 
            { numerator: a, denominator: b }
        );
    }
    return a/b;
}
```

Calling `divide(5, 0)` will throw an `InvalidArgumentError` with the following properties:

```js
{
    message: 'Cannot divide 5 by 0',
    type: 'invalid-argument',
    data: { numerator: 5, denominator: 0 }
}
```

### Identifying an error

As explained previously, erro suggests you use `error.type` to determine what to do when handling an error. The data from `error.data` can be used in the resulting action. 

```js
function onError(error) {
    // Determine the type of error using error.type
    if (error.type === 'invalid-field') {
        // Do something using the error data as an example.
        var f = getField(error.data.field);
        f.setErrorMessage(error.message);
    } else if (error.type === 'not-found') {
        // ...
    } else {
        throw error;
    }
}
```

## Advanced usage

### Nested data properties

The default interpolation supports nested data objects:

```js
throw new InvalidArgumentError(
    'Expected username :user.username to start with a letter', 
    { user: { username: '0' } }
);
```

### Your very own interpolation scheme

You can define your own interpolation regex:

```js
erro({
    keyLocator: /\{([_\w][_\w\d]*(?:\|[_\w][_\w\d]*)*)\}/g,
    keySplitter: '|'
});
```

Now you would write error messages like so:

```js
'Expected username {user|username} to start with a letter'
```

### Rewriting errors

You can pass the original error when creating an error. Nothing special is done (yet) with the original, it is just attached to the error as `error.original` to provide extra information when debugging. 

```js
original = new InvalidArgumentError('');
throw new MoreDetailedError('More detailed message', null, original);
```

### Other
Check the [tests](https://github.com/mickvangelderen/erro/blob/master/test/erro-test.js) for more examples. 