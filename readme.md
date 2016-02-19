# Erro guide

This guide explains how to use erro and why you should. 

The following guides are also available:
* [Migration guide](migration.md)
* [Development guide](development.md)

## Installation

```bash
npm install --save erro
```

## Usage

You can erro in two ways depending on your preference. It can create custom error classes for you or factory functions. 

```js
// file: errors/not-found-error.js
import erro from 'erro'

export default erro.createErrorFactories('NotFoundError')
// or 
export default erro.createErrorClass('NotFoundError')
```

```js
// file: index.js
import NotFoundError from './errors/not-found-error'

const user = { id: 5, name: 'Mick' }

const message = `User ${user.id} could not be found!`
const context = { user } // Optional context for error handling. 
const original = new Error('404 not found') // Optional original error. 

const error = NotFoundError(message, context, original)
// or 
const error = new NotFoundError(message, context, original)
```

## Benefits

### Serialization

Errors constructed with erro have a custom `toJSON` function that will expose the `message`, `stack` and `type` properties as opposed to standard errors. 

### Consistency

Errors constructed with erro have a `type` property that can be used to identify the type of error. 

### Rethrowing

You can pass the original error when creating an error. Nothing special is done (yet) with the original, it is just attached to the error as `error.original` to provide extra information when debugging. 

```js
try {
    const user = fetchUser(5)
    // ...
} catch (error) {
    throw RequestError('Failed to fetch user.', null, error)
}
```

## Requirements

Version 3 of erro has been compiled for node 5. I could compile a browser version but I need help with how to test erro in all common browsers. 

## Configuration

There is nothing to configure anymore because message string interpolation is left to the user. 

## Thanks

This project uses [node-package-skeleton](https://github.com/mickvangelderen/node-package-skeleton) as a starting point for package development.
