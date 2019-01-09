'use strict'

const isEmail = require('email-addresses').parseOneAddress

// must start with letter
// must be 3-64 characters
// can only contain letters, numbers, underscore, or hyphen
const SLUG_REGEX = /^[A-Za-z]{1}[A-Za-z0-9_-]{2,63}$/

function isValidSlug (str) {
  return !!str && SLUG_REGEX.test(str)
}

// can contain any characters
// must be at least 6 characters long
function isValidPassword (str) {
  return !!str && str.length > 5
}

// just re-use this other person's work
function isValidEmail (str) {
  return !!str && isEmail(str)
}

module.exports = {
  isValidSlug,
  isValidPassword,
  isValidEmail
}
