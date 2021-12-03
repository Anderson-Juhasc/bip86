# BIP86

Derives taproot addresses from seed, xprv/xpub and tprv/tpub in javascript

## Installing

Run - `npm install bip86 --save`

## Using

```javascript
const BIP86 = require('bip86')

var mnemonic = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
var root = new BIP86.fromMnemonic(mnemonic)
var child0 = root.deriveAccount(0)

console.log('mnemonic:', mnemonic)
console.log('rootpriv:', root.getRootPrivateKey())
console.log('rootpub:', root.getRootPublicKey())
console.log('\n');

var account0 = new BIP86.fromXPrv(child0)

console.log("Account 0, root = m/86'/0'/0'");
console.log('Account 0 xprv:', account0.getAccountPrivateKey())
console.log('Account 0 xpub:', account0.getAccountPublicKey())
console.log('\n');

console.log("Account 0, first receiving address = m/86'/0'/0'/0/0");
console.log('Prvkey:', account0.getPrivateKey(0))
console.log('Pubkey:', account0.getPublicKey(0))
console.log('Address:', account0.getAddress(0))
console.log('\n');

console.log("Account 0, second receiving address = m/86'/0'/0'/0/1");
console.log('Prvkey:', account0.getPrivateKey(1))
console.log('Pubkey:', account0.getPublicKey(1))
console.log('Address:', account0.getAddress(1))
console.log('\n');

console.log("Account 0, first change address = m/86'/0'/0'/1/0");
console.log('Prvkey:', account0.getPrivateKey(0, true))
console.log('Pubkey:', account0.getPublicKey(0, true))
console.log('Address:', account0.getAddress(0, true))
console.log('\n');

var xpub = 'tpubDE9d2eQdaQrwREoNYVm63BH1TQz5XYizB3rMxeJpFsfxxzXzNGCrguxaip9shs9TLahkfvgQPNWdKXvWqCqWgKk5SxT9wuFtLQg7RQvRsTV'
var account1 = new BIP86.fromXPub(xpub)

console.log("Account 1, root = m/86'/1'/0'");
console.log('Account 1 xpub:', account1.getAccountPublicKey());
console.log('\n');

console.log("Account 1, first receiving address = m/86'/1'/0'/0/0");
console.log('Pubkey:', account1.getPublicKey(0))
console.log('Address:', account1.getAddress(0))
console.log('\n');

console.log("Account 1, second receiving address = m/86'/1'/0'/0/1");
console.log('Pubkey:', account1.getPublicKey(1))
console.log('Address:', account1.getAddress(1))
console.log('\n');

console.log("Account 1, first change address = m/86'/1'/0'/1/0");
console.log('Pubkey:', account1.getPublicKey(0, true))
console.log('Address:', account1.getAddress(0, true))
console.log('\n');

console.log("Account 1, second change address = m/86'/1'/0'/1/1");
console.log('Pubkey:', account1.getPublicKey(1, true))
console.log('Address:', account1.getAddress(1, true))
console.log('\n');
```

## Reference

[BIP 86](https://github.com/bitcoin/bips/blob/master/bip-0086.mediawiki)
[SLIP 44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)

## License terms

Copyright 2021 Anderson Juhasc

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

