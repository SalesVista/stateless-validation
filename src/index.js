'use strict'

const isEmail = require('email-addresses').parseOneAddress

// must start with lowercase letter
// must be 3-64 characters
// can only contain lowercase letters, numbers, underscore, or hyphen
// const SLUG_REGEX = /^[a-z]{1}[a-z0-9_-]{2,63}$/
const SLUG_MIN_LENGTH = 3
const SLUG_MAX_LENGTH = 64
const SLUG_REGEX = new RegExp(`^[a-z]{1}[a-z0-9_-]{${SLUG_MIN_LENGTH - 1},${SLUG_MAX_LENGTH - 1}}$`)
const SLUG_REGEX_NO_HYPHEN = new RegExp(`^[a-z]{1}[a-z0-9_]{${SLUG_MIN_LENGTH - 1},${SLUG_MAX_LENGTH - 1}}$`)
const DEFAULT_SLUG_PREFIX = 'abc' // MUST be a valid slug!
const DEFAULT_WHITESPACE_REPLACEMENT = '_'
const DEFAULT_WHITESPACE_REPLACEMENT_RE = new RegExp(DEFAULT_WHITESPACE_REPLACEMENT, 'g')
const DEFAULT_HYPHEN_REPLACEMENT = '_'

function isValidSlug (str, opts) {
  opts = opts || {}
  const allowHyphen = opts.allowHyphen !== false
  const regex = allowHyphen ? SLUG_REGEX : SLUG_REGEX_NO_HYPHEN
  return !!str && regex.test(str)
}

function convertToSlug (str, opts) {
  opts = opts || {}
  const allowHyphen = opts.allowHyphen !== false
  const hyphenReplacement = typeof opts.hyphenReplacement === 'string' ? opts.hyphenReplacement : DEFAULT_HYPHEN_REPLACEMENT

  let slug = String(str).replace(/\s/g, DEFAULT_WHITESPACE_REPLACEMENT)
  if (!allowHyphen) slug = slug.replace(/-/g, hyphenReplacement)
  const cleanRe = allowHyphen ? /[^A-Za-z0-9_-]/g : /[^A-Za-z0-9_]/g
  slug = slug.replace(cleanRe, '').toLowerCase()
  if (
    typeof opts.whitespaceReplacement === 'string' &&
    opts.whitespaceReplacement !== DEFAULT_WHITESPACE_REPLACEMENT &&
    isValidSlug(DEFAULT_SLUG_PREFIX + opts.whitespaceReplacement, { allowHyphen })
  ) {
    slug = slug.replace(DEFAULT_WHITESPACE_REPLACEMENT_RE, opts.whitespaceReplacement)
  }
  slug = slug.slice(0, SLUG_MAX_LENGTH)
  if (isValidSlug(slug, { allowHyphen })) return slug
  const prefix = isValidSlug(opts.prefix, { allowHyphen }) ? opts.prefix : DEFAULT_SLUG_PREFIX
  const pre = opts.scroll ? prefix.slice(0, Math.max(SLUG_MIN_LENGTH - slug.length, 1)) : prefix
  return (pre + slug).slice(0, SLUG_MAX_LENGTH)
}

// can contain any characters
// must be at least 16 characters long
function isValidPassword (str) {
  return !!str && str.length > 15
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
