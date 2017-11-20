'use strict'

// must start with letter
// must be 3-64 characters
// can only contain lowercase letters, numbers, underscore, or hyphen
const SLUG_REGEX = /^[a-z]{1}[a-z0-9_-]{2,63}$/

function isValidSlug (str) {
  return !!str && SLUG_REGEX.test(str)
}

module.exports = {
  isValidSlug
}
