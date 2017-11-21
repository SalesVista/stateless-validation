'use strict'

const isEmail = require('email-addresses').parseOneAddress

// must start with letter
// must be 3-64 characters
// can only contain lowercase letters, numbers, underscore, or hyphen
const SLUG_REGEX = /^[a-z]{1}[a-z0-9_-]{2,63}$/

function isValidSlug (str) {
  return !!str && SLUG_REGEX.test(str)
}

// can contain any characters
// must be 6-64 characters
const PASSWORD_REGEX = /^.{6,64}$/
function isValidPassword (str) {
  return !!str && PASSWORD_REGEX.test(str)
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
