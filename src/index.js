import {
  AddressLookupTableProgram,
  Connection,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
  TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Keypair,
} from "@solana/web3.js"

import {
  seq,
  blob,
  nu64,
  offset,
} from "buffer-layout"

const Web3MobileWallet = require("@solana-mobile/mobile-wallet-adapter-protocol-web3js").Web3MobileWallet
const transact = require("@solana-mobile/mobile-wallet-adapter-protocol-web3js").transact

const Buffer = require('buffer/').Buffer
const BN = require('bn.js')
const bs58 = require('bs58')

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
  deserialize,
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
  AddressLookupTableProgram,
  Connection,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
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
  nu64,
  u128,
  i128,
  publicKey,
  struct,
  option,
  offset,
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
  transact,
  Web3MobileWallet,
  bs58,
  deserialize,
}
