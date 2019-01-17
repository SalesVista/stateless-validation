# stateless-validation

> Reusable validation logic as pure functions

[![Build Status](https://travis-ci.org/SalesVista/stateless-validation.svg?branch=master)](https://travis-ci.org/SalesVista/stateless-validation)
[![Coverage Status](https://coveralls.io/repos/github/SalesVista/stateless-validation/badge.svg?branch=master)](https://coveralls.io/github/SalesVista/stateless-validation?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

This package allows us to reuse the same validation logic between the UI/frontend and the REST API/backend.

## Install

```console
$ npm i --save @salesvista/stateless-validation
```

```js
// with babel
import sv from '@salesvista/stateless-validation'
// without babel
const sv = require('@salesvista/stateless-validation')
```

## API

### `sv.isValidSlug(string)`

Accepts a single string and returns a boolean indicating if the given string is a valid URL-friendly slug (i.e. a username).

A slug is valid if it meets the following criteria:

- Starts with a lowercase letter
- Is 3 to 64 characters long
- Consists of only lowercase letters, numbers, underscores, or hyphens

### `sv.convertToSlug(string, opts)`

Convert the given string into a valid slug.

Accepts a single string (and an optional object) and returns a string.

The conversion process includes:

- coercing the argument into a string
- replacing whitespace with either `'_'` or a given `opts.whitespaceReplacement`
- removing non-alphanumeric characters
- converting to lower-case
- truncating to first 64 characters
- potentially prepending a portion of `'abc'` or a given `opts.prefix` to make the slug valid

Options accepted:

- `opts.whitespaceReplacement`: string, default `'_'`

    What to replace any whitespace with. Must make a valid slug to be used. An empty string will remove whitespace.

- `opts.prefix`: string, default `'abc'`

    Used to turn an invalid slug (one not starting with a letter) into a valid slug, by prepending up to 3 characters of this string to the converted value.

- `opts.scroll`: boolean, default `false`

    Use a "scroll from right" algorithm when using the prefix to make the slug valid. The default algorithm prepends the entire prefix (when necessary), whereas the "scroll" algorithm only prepends a minimal number of characters from the prefix to make the slug valid (i.e. only uses 1 to 3 characters of the prefix instead of the whole thing).

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
npm it
# bump version, update changelog, and create git tag
npm run release
# push release to github
git push -u --follow-tags origin master
npm publish --access public
```

Then you can update the version referenced by any apps/packages that use this as a dependency.
