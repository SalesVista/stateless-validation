# stateless-validation

> Reusable validation logic as pure functions

This package allows us to reuse the same validation logic between the UI/frontend and the REST API/backend.

## Install

```console
$ npm i --save github:itenneti/stateless-validation#v1.0.0
```

```js
// with babel
import sv from '@itenneti/stateless-validation'
// without babel
const sv = require('@itenneti/stateless-validation')
```

## API

### `sv.isValidSlug(string)`

Accepts a single string and returns a boolean indicating if the given string is a valid URL-friendly slug (i.e. a username).

A slug is valid if it meets the following criteria:

- Starts with a lowercase letter
- Is 3 to 64 characters long
- Consists of only lowercase letters, numbers, underscores, or hyphens
