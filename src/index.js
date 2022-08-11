import {
  Connection,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js"

import {
  Layout,
  blob,
  seq,
} from "@solana/buffer-layout"

const Buffer = require('buffer/').Buffer
const BN = require('bn.js')

import {
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
} from "@project-serum/borsh"

const ACCOUNT_LAYOUT = struct([
  publicKey('mint'),
  publicKey('owner'),
  u64('amount'),
  u32('delegateOption'),
  publicKey('delegate'),
  u8('state'),
  u32('isNativeOption'),
  u64('isNative'),
  u64('delegatedAmount'),
  u32('closeAuthorityOption'),
  publicKey('closeAuthority')
])

class BNLayout extends Layout {

  constructor(span, signed, property) {
    super(span, property)
    this.blob = blob(span)
    this.signed = signed
  }

  decode(b, offset = 0) {
    const num = new BN(this.blob.decode(b, offset), 10, "le")
    if (this.signed) {
      return num.fromTwos(this.span * 8).clone()
    }
    return num;
  }

  encode(src, b, offset = 0) {
    if (typeof src === "number") src = new BN(src)
    if (this.signed) {
      src = src.toTwos(this.span * 8)
    }
    return this.blob.encode(src.toArrayLike(Buffer, "le", this.span), b, offset)
  }
}

export {
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
  blob,
  seq,
  Layout,
  BNLayout,
  Buffer,
  BN
}
