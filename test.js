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

tap.test('isValidPassword', t => {
  // invalid passwords
  t.notOk(sv.isValidPassword(null))
  t.notOk(sv.isValidPassword('12345'))
  t.notOk(sv.isValidPassword('this is over 64 characters this is over 64 characters this is ove'))

  // valid passwords
  t.ok(sv.isValidPassword('password'))
  t.ok(sv.isValidPassword('!@#$%$^'))
  t.ok(sv.isValidPassword('undefined'))
  t.ok(sv.isValidPassword('   some super cool long password that nobody knows'))
  t.ok(sv.isValidPassword('      '))
  t.end()
})

tap.test('isValidEmail', t => {
  // invalid emails
  t.notOk(sv.isValidEmail())
  t.notOk(sv.isValidEmail('Hello, World'))
  t.notOk(sv.isValidEmail(''))
  t.notOk(sv.isValidEmail('null'))
  t.notOk(sv.isValidEmail('a@'))
  t.notOk(sv.isValidEmail('@'))
  t.notOk(sv.isValidEmail('@a'))
  t.notOk(sv.isValidEmail('“(),:;<>[\\]@example.com'))
  t.notOk(sv.isValidEmail('just"not"right@example.com'))
  t.notOk(sv.isValidEmail('just"not"right@example.com'))

  // somewhat valid but considered invalid for our purposes
  t.notOk(sv.isValidEmail('much.“more\\ unusual”@example.com'))
  t.notOk(sv.isValidEmail('very.unusual.“@”.unusual.com@example.com'))
  t.notOk(sv.isValidEmail('very.“(),:;<>[]”.VERY.“very@\\ "very”.unusual@strange.example.com'))

  // valid emails
  t.ok(sv.isValidEmail('email@example.com'))
  t.ok(sv.isValidEmail('firstname.lastname@example.com'))
  t.ok(sv.isValidEmail('email@subdomain.example.com'))
  t.ok(sv.isValidEmail('firstname+lastname@example.com'))
  t.ok(sv.isValidEmail('email@123.123.123.123'))
  t.ok(sv.isValidEmail('email@[123.123.123.123]'))
  t.ok(sv.isValidEmail('“email”@example.com'))
  t.ok(sv.isValidEmail('1234567890@example.com'))
  t.ok(sv.isValidEmail('email@example-one.com'))
  t.ok(sv.isValidEmail('_______@example.com'))
  t.ok(sv.isValidEmail('email@example.name'))
  t.ok(sv.isValidEmail('email@example.museum'))
  t.ok(sv.isValidEmail('email@example.co.jp'))
  t.ok(sv.isValidEmail('firstname-lastname@example.com'))
  t.ok(sv.isValidEmail('test@example'))
  t.ok(sv.isValidEmail('br@d'))
  t.end()
})
