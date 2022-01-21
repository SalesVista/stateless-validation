'use strict'

const tap = require('tap')

const sv = require('./lib/index')

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
  t.notOk(sv.isValidSlug('SalesVista'))
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

tap.test('convertToSlug > no opts', t => {
  t.strictEqual(sv.convertToSlug('One Two Three, LLC'), 'one_two_three_llc')
  t.strictEqual(sv.convertToSlug('1.2.3 ABC Corp'), 'abc123_abc_corp')
  t.strictEqual(sv.convertToSlug('1@gmail.com'), 'abc1gmailcom')
  t.strictEqual(sv.convertToSlug('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante leo'), 'lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_vestibulu')
  t.strictEqual(sv.convertToSlug('包'), 'abc')
  t.strictEqual(sv.convertToSlug(), 'undefined')
  t.strictEqual(sv.convertToSlug(null), 'null')
  t.strictEqual(sv.convertToSlug(''), 'abc')
  t.strictEqual(sv.convertToSlug(' '), 'abc_')
  t.strictEqual(sv.convertToSlug('  '), 'abc__')
  t.strictEqual(sv.convertToSlug('   '), 'abc___')
  t.strictEqual(sv.convertToSlug(1), 'abc1')
  t.strictEqual(sv.convertToSlug(12), 'abc12')
  t.strictEqual(sv.convertToSlug(1.2), 'abc12')
  t.strictEqual(sv.convertToSlug(1.2345), 'abc12345')
  t.strictEqual(sv.convertToSlug(true), 'true')
  t.strictEqual(sv.convertToSlug(false), 'false')
  t.strictEqual(sv.convertToSlug(/x/), 'abcx')
  t.strictEqual(sv.convertToSlug({}), 'object_object')
  t.strictEqual(sv.convertToSlug([]), 'abc')
  t.strictEqual(sv.convertToSlug([1]), 'abc1')
  t.strictEqual(sv.convertToSlug([1, 'x']), 'abc1x')
  t.strictEqual(sv.convertToSlug(function x () {}), 'function_x__')
  t.strictEqual(sv.convertToSlug(() => {}), 'abc__')
  t.ok(sv.isValidSlug(sv.convertToSlug(new Date())))
  t.end()
})

tap.test('convertToSlug > scroll', t => {
  const scroll = { scroll: true }
  t.strictEqual(sv.convertToSlug('One Two Three, LLC', scroll), 'one_two_three_llc')
  t.strictEqual(sv.convertToSlug('1.2.3 ABC Corp', scroll), 'a123_abc_corp')
  t.strictEqual(sv.convertToSlug('1@gmail.com', scroll), 'a1gmailcom')
  t.strictEqual(sv.convertToSlug('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante leo', scroll), 'lorem_ipsum_dolor_sit_amet_consectetur_adipiscing_elit_vestibulu')
  t.strictEqual(sv.convertToSlug('包', scroll), 'abc')
  let u
  t.strictEqual(sv.convertToSlug(u, scroll), 'undefined')
  t.strictEqual(sv.convertToSlug(null, scroll), 'null')
  t.strictEqual(sv.convertToSlug('', scroll), 'abc')
  t.strictEqual(sv.convertToSlug(' ', scroll), 'ab_')
  t.strictEqual(sv.convertToSlug('  ', scroll), 'a__')
  t.strictEqual(sv.convertToSlug('   ', scroll), 'a___')
  t.strictEqual(sv.convertToSlug(1, scroll), 'ab1')
  t.strictEqual(sv.convertToSlug(12, scroll), 'a12')
  t.strictEqual(sv.convertToSlug(1.2, scroll), 'a12')
  t.strictEqual(sv.convertToSlug(1.2345, scroll), 'a12345')
  t.strictEqual(sv.convertToSlug(true, scroll), 'true')
  t.strictEqual(sv.convertToSlug(false, scroll), 'false')
  t.strictEqual(sv.convertToSlug(/x/, scroll), 'abx')
  t.strictEqual(sv.convertToSlug({}, scroll), 'object_object')
  t.strictEqual(sv.convertToSlug([], scroll), 'abc')
  t.strictEqual(sv.convertToSlug([1], scroll), 'ab1')
  t.strictEqual(sv.convertToSlug([1, 'x'], scroll), 'a1x')
  t.strictEqual(sv.convertToSlug(function x () {}, scroll), 'function_x__')
  t.strictEqual(sv.convertToSlug(() => {}, scroll), 'a__')
  t.ok(sv.isValidSlug(sv.convertToSlug(new Date(), scroll)))
  t.end()
})

tap.test('convertToSlug > other opts', t => {
  // valid opts
  t.strictEqual(
    sv.convertToSlug('One Two Three, LLC', { whitespaceReplacement: '-' }),
    'one-two-three-llc'
  )
  t.strictEqual(
    sv.convertToSlug('One Two Three, LLC', { whitespaceReplacement: '' }),
    'onetwothreellc'
  )
  t.strictEqual(
    sv.convertToSlug('One Two Three, LLC', { whitespaceReplacement: 'salesvista' }),
    'onesalesvistatwosalesvistathreesalesvistallc'
  )
  t.strictEqual(
    sv.convertToSlug('1.2.3 ABC Corp', { whitespaceReplacement: '', prefix: 'salesvista' }),
    'salesvista123abccorp'
  )
  t.strictEqual(
    sv.convertToSlug('1.2.3 ABC Corp', { whitespaceReplacement: '', prefix: 'salesvista', scroll: true }),
    's123abccorp'
  )
  t.strictEqual(sv.convertToSlug('', { prefix: 'luvmuffin' }), 'luvmuffin')
  t.strictEqual(sv.convertToSlug('1 2', { prefix: 'luvmuffin' }), 'luvmuffin1_2')
  t.strictEqual(sv.convertToSlug('', { prefix: 'luvmuffin', scroll: true }), 'luv')
  t.strictEqual(sv.convertToSlug('1 2', { prefix: 'luvmuffin', scroll: true }), 'l1_2')

  // invalid/ignored opts
  t.strictEqual(
    sv.convertToSlug('One Two Three', { whitespaceReplacement: false }), // must be a string
    'one_two_three'
  )
  t.strictEqual(
    sv.convertToSlug('One Two Three', { whitespaceReplacement: '@' }), // must make valid slug
    'one_two_three'
  )
  t.strictEqual(sv.convertToSlug('', { prefix: '123' }), 'abc') // prefix must be valid slug
  t.strictEqual(sv.convertToSlug('1 2', { prefix: '123' }), 'abc1_2')
  t.strictEqual(sv.convertToSlug('1 2', { prefix: '123', scroll: true }), 'a1_2')
  t.strictEqual(sv.convertToSlug('', { prefix: 'x' }), 'abc')
  t.strictEqual(sv.convertToSlug('1 2', { prefix: 'x' }), 'abc1_2')
  t.strictEqual(sv.convertToSlug('1 2', { prefix: 'x', scroll: true }), 'a1_2')
  t.strictEqual(sv.convertToSlug('', { prefix: 'XYZ' }), 'abc')
  t.strictEqual(sv.convertToSlug('1 2', { prefix: 'XYZ' }), 'abc1_2')
  t.strictEqual(sv.convertToSlug('1 2', { prefix: 'XYZ', scroll: true }), 'a1_2')

  t.end()
})

tap.test('isValidPassword', t => {
  // invalid passwords
  t.notOk(sv.isValidPassword())
  t.notOk(sv.isValidPassword(null))
  t.notOk(sv.isValidPassword('123456'))

  // valid passwords
  t.ok(sv.isValidPassword('password1234'))
  t.ok(sv.isValidPassword('!@#$%$^&*()#'))
  t.ok(sv.isValidPassword('undefinedabcd'))
  t.ok(sv.isValidPassword('   some super cool long password that nobody knows'))
  t.ok(sv.isValidPassword('           '))
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
  t.notOk(sv.isValidEmail('plainaddress'))
  t.notOk(sv.isValidEmail('#@%^%#$@#$@#.com'))
  t.notOk(sv.isValidEmail('@example.com'))
  t.notOk(sv.isValidEmail('email.example.com'))
  t.notOk(sv.isValidEmail('email@example@example.com'))
  t.notOk(sv.isValidEmail('.email@example.com'))
  t.notOk(sv.isValidEmail('email.@example.com'))
  t.notOk(sv.isValidEmail('email..email@example.com'))
  t.notOk(sv.isValidEmail('email@example..com'))
  t.notOk(sv.isValidEmail('Abc..123@example.com'))
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
  t.ok(sv.isValidEmail('Joe Smith <email@example.com>'))
  t.ok(sv.isValidEmail('あいうえお@example.com'))
  t.ok(sv.isValidEmail('email@example.com (Joe Smith)'))
  t.ok(sv.isValidEmail('email@-example.com'))
  t.ok(sv.isValidEmail('email@example.web'))
  t.ok(sv.isValidEmail('email@111.222.333.44444'))
  t.end()
})
