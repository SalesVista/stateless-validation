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

### `sv.isValidPassword(string)`

Accepts a single string and returns a boolean indicating if the given string is a valid password.

A password is valid if it meets the following criteria:

- Is at least 6 characters long

### `sv.isValidEmail(string)`

Accepts a single string and returns a boolean indicating if the given string is a valid email.

An email is valid if it meets the following criteria:

- Conforms to the format of _{local-part}@{domain}_


## Releasing

After one or more PRs have been merged to master, you can cut a new release with the following commands:

```bash
# update local master branch
git checkout master && git pull origin master
# make sure tests pass
npm t
# bump version, update changelog, and create git tag
npm run release
# push release to github
git push -u --follow-tags origin master
```

Then you can update the version referenced by any apps/packages that use this as a dependency.
