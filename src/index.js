'use strict'

const isEmail = require('email-addresses').parseOneAddress

// must start with lowercase letter
// must be 3-64 characters
// can only contain lowercase letters, numbers, underscore, or hyphen
// const SLUG_REGEX = /^[a-z]{1}[a-z0-9_-]{2,63}$/
const SLUG_MIN_LENGTH = 3
const SLUG_MAX_LENGTH = 64
const SLUG_REGEX = new RegExp(`^[a-z]{1}[a-z0-9_-]{${SLUG_MIN_LENGTH - 1},${SLUG_MAX_LENGTH - 1}}$`)
const DEFAULT_SLUG_PREFIX = 'abc' // MUST be a valid slug!
const DEFAULT_WHITESPACE_REPLACEMENT = '_'
const DEFAULT_WHITESPACE_REPLACEMENT_RE = new RegExp(DEFAULT_WHITESPACE_REPLACEMENT, 'g')

function isValidSlug (str) {
  return !!str && SLUG_REGEX.test(str)
}

function convertToSlug (str, opts) {
  opts = opts || {}

  let slug = String(str).replace(/\s/g, DEFAULT_WHITESPACE_REPLACEMENT).replace(/\W/g, '').toLowerCase()
  if (
    typeof opts.whitespaceReplacement === 'string' &&
    opts.whitespaceReplacement !== DEFAULT_WHITESPACE_REPLACEMENT &&
    isValidSlug(DEFAULT_SLUG_PREFIX + opts.whitespaceReplacement)
  ) {
    slug = slug.replace(DEFAULT_WHITESPACE_REPLACEMENT_RE, opts.whitespaceReplacement)
  }
  slug = slug.slice(0, SLUG_MAX_LENGTH)
  if (isValidSlug(slug)) return slug

  const prefix = isValidSlug(opts.prefix) ? opts.prefix : DEFAULT_SLUG_PREFIX
  return (prefix.slice(0, Math.max(SLUG_MIN_LENGTH - slug.length, 1)) + slug).slice(0, SLUG_MAX_LENGTH)
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
  convertToSlug,
  isValidPassword,
  isValidEmail
}
