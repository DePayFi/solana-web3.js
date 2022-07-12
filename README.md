# Solana Web3.js SDK browser pre-built

A webpack browser pre-built which can be used in rollup as UMD and ESM.

```
yarn add "@depay/solana-web3.js"
```

```
import {
  Connection,
  LAMPORTS_PER_SOL,
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
} from "@depay/solana-web3.js"
```

## Development

```
yarn build
```

```
npm publish --access public
```
