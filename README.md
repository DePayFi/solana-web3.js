# Solana Web3.js SDK browser pre-built

A webpack browser pre-built which can be used in rollup as UMD and ESM.

```
yarn add "@depay/solana-web3.js"
```

```
import {
  Connection,
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
- `fetch`

## Development

```
yarn build
```

```
npm publish --access public
```

