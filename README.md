# Solana Web3.js SDK browser pre-built

A webpack browser pre-built which can be used in rollup as UMD and ESM.

```
yarn add "@depay/solana-web3.js"
```

```
import {
  Connection,
  VersionedTransaction,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  ACCOUNT_LAYOUT,
  PublicKey,
  u8,
  i8,
  u16,
  i16,
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  publicKey,
  struct,
  option,
  bool,
  vec,
  vecU8,
  tagged,
  str,
  rustEnum,
  array,
  map,
  seq,
  blob,
  Buffer,
  BN,
  Keypair
} from "@depay/solana-web3.js"
```

## Polyfills

Ships with polyfills for missing:

- `XMLHttpRequest`
- `location`
- `crypto`

### polyfill fetch

If you see the following error:

```
Please polyfill .fetch | See: https://github.com/DePayFi/solana-web3.js#polyfill-fetch
```

You will need to add `node-fetch` to your environment and make sure `global.fetch` is polyfilled before executing this library:

https://github.com/node-fetch/node-fetch

Example: https://github.com/DePayFi/web3-mock/blob/main/tests/setup.js


## Development

```
yarn build
```

```
npm publish --access public
```

