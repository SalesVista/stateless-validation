'use strict'

const tap = require('tap')

const sv = require('./')

tap.test('isValidSlug > invalid slugs', t => {
  // invalid strings
  t.notOk(sv.isValidSlug())
  t.notOk(sv.isValidSlug(''))
  t.notOk(sv.isValidSlug(' '))
  t.notOk(sv.isValidSlug('   '))
  // must be between 3 and 64 chars long
  t.notOk(sv.isValidSlug('a'))
  t.notOk(sv.isValidSlug('ab'))
  t.notOk(sv.isValidSlug('abc45678901234567890123456789012345678901234567890123456789012345'))
  // must start with letter
  t.notOk(sv.isValidSlug('1aa'))
  t.notOk(sv.isValidSlug('_aa'))
  t.notOk(sv.isValidSlug('-aa'))
  // uppercase not allowed
  t.notOk(sv.isValidSlug('BOB'))
  t.notOk(sv.isValidSlug('Bob'))
  t.notOk(sv.isValidSlug('boB'))
  // invalid characters
  t.notOk(sv.isValidSlug('a b'))
  t.notOk(sv.isValidSlug('a`b'))
  t.notOk(sv.isValidSlug('a~b'))
  t.notOk(sv.isValidSlug('a!b'))
  t.notOk(sv.isValidSlug('a@b'))
  t.notOk(sv.isValidSlug('a#b'))
  t.notOk(sv.isValidSlug('a$b'))
  t.notOk(sv.isValidSlug('a%b'))
  t.notOk(sv.isValidSlug('a^b'))
  t.notOk(sv.isValidSlug('a&b'))
  t.notOk(sv.isValidSlug('a*b'))
  t.notOk(sv.isValidSlug('a(b)'))
  t.notOk(sv.isValidSlug('a+b'))
  t.notOk(sv.isValidSlug('a=b'))
  t.notOk(sv.isValidSlug('a{b}'))
  t.notOk(sv.isValidSlug('a[b]'))
  t.notOk(sv.isValidSlug('a|b'))
  t.notOk(sv.isValidSlug('a\\b'))
  t.notOk(sv.isValidSlug('a;b'))
  t.notOk(sv.isValidSlug('a:b'))
  t.notOk(sv.isValidSlug('a"b"'))
  t.notOk(sv.isValidSlug(`a'b'`))
  t.notOk(sv.isValidSlug(`a<b>`))
  t.notOk(sv.isValidSlug('a,b'))
  t.notOk(sv.isValidSlug('a.b'))
  t.notOk(sv.isValidSlug(`a?b`))
  t.notOk(sv.isValidSlug(`a/b`))
  t.end()
})

tap.test('isValidSlug > valid slugs', t => {
  t.ok(sv.isValidSlug('abc'))
  t.ok(sv.isValidSlug('a1b'))
  t.ok(sv.isValidSlug('a_b'))
  t.ok(sv.isValidSlug('a-b'))
  t.ok(sv.isValidSlug('abc_110ec58a-a0f2-4ac4-8393-c866d813b8d1_23456789012345678901234'))
  t.end()
})
