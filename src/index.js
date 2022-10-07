import {
  Connection,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Keypair,
} from "@solana/web3.js"

import {
  seq,
  blob,
} from "buffer-layout"

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
  seq,
  blob,
  Buffer,
  BN,
  Keypair,
}
