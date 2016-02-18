# Erro migration guide

## From v2 to v3

Because of the template string feature added in es2015 I saw the need to remove the templating behaviour from erro. There is no point in migrating old code to v3 as far as I know. The new implementation just suits es2015 better. 

## From v1 to v2

Migration and rationale guide for transitioning from version 1 to version 2. 

### .name
Added a .name property because normal errors have it too. I thought about renaming .key to .name but I liked having .name as a specific error name for printing and keep .key as a way to decide what to do with an error. .key was too vague so I renamed it to .type. 

### .key becomes .type
Key was too vague and we added the .name property so not .type is the new .key. This property should be used to discern between types of errors. 

```js
var NotFoundError = erro.create('NotFoundError', 'not-found');
var data = { user: { id: 5, name: 'Bert' } };
var error = new NotFoundError('User :user.name with id :user.id was not found', data);
/*
    error now equals {
        name: 'NotFoundError',
        type: 'not-found',
        message: 'User "Bert" with id 5 was not found',
        data: { user: { id: 5, name: 'Bert' } };
    }
*/
```

### erro.create(name, type)
The create function now takes two arguments, the error name and type (group/class). 
Also it now returns a constructor function instead of a regular function so call it with `new`. 
The object created by the constructor is an instance of Error. 

### Hiding functions that are not ment to be used
Some functions are not really ment to be used so I adopted the convention to prefix them with a underscore '_' character. The properties can still be accessed for testing puposes. 

The function `erro.interpolate` became `erro._interpolate`. 
The function `erro.extract` became `erro._extract`. 
The function `erro.prepare` became `erro._prepare`. 
The regex `erro.keyLocator` became `erro._keyLocator`. 
The regex/string `erro.keySplitter` became `erro._keySplitter`. 

### Recommended form
I liked:

```js
NotFoundError = require('./errors/not-found');

throw new NotFoundError('User with id :user.id was not found', { user: user });
```

better than:

```js
erro = require('./erro');

throw erro.notFound('User with id :user.id was not found', { user: user });
```

because you are actually creating an object. 

Also we would expect:

```js
(new NotFoundError('message')) instanceof Error // true
```

to be true which wasn't the case in v1. 
