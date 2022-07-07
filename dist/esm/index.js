import { serialize, deserialize, deserializeUnchecked } from 'borsh';
import { toBigIntLE, toBufferLE } from 'bigint-buffer';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  var f = n.default;
	if (typeof f == "function") {
		var a = function () {
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var naclFast = {exports: {}};

var _polyfillNode_crypto = {};

var _polyfillNode_crypto$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': _polyfillNode_crypto
});

var require$$0$3 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_crypto$1);

(function (module) {
	(function(nacl) {

	// Ported in 2014 by Dmitry Chestnykh and Devi Mandiri.
	// Public domain.
	//
	// Implementation derived from TweetNaCl version 20140427.
	// See for details: http://tweetnacl.cr.yp.to/

	var gf = function(init) {
	  var i, r = new Float64Array(16);
	  if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
	  return r;
	};

	//  Pluggable, initialized in high-level API below.
	var randombytes = function(/* x, n */) { throw new Error('no PRNG'); };

	var _0 = new Uint8Array(16);
	var _9 = new Uint8Array(32); _9[0] = 9;

	var gf0 = gf(),
	    gf1 = gf([1]),
	    _121665 = gf([0xdb41, 1]),
	    D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
	    D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
	    X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
	    Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
	    I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

	function ts64(x, i, h, l) {
	  x[i]   = (h >> 24) & 0xff;
	  x[i+1] = (h >> 16) & 0xff;
	  x[i+2] = (h >>  8) & 0xff;
	  x[i+3] = h & 0xff;
	  x[i+4] = (l >> 24)  & 0xff;
	  x[i+5] = (l >> 16)  & 0xff;
	  x[i+6] = (l >>  8)  & 0xff;
	  x[i+7] = l & 0xff;
	}

	function vn(x, xi, y, yi, n) {
	  var i,d = 0;
	  for (i = 0; i < n; i++) d |= x[xi+i]^y[yi+i];
	  return (1 & ((d - 1) >>> 8)) - 1;
	}

	function crypto_verify_16(x, xi, y, yi) {
	  return vn(x,xi,y,yi,16);
	}

	function crypto_verify_32(x, xi, y, yi) {
	  return vn(x,xi,y,yi,32);
	}

	function core_salsa20(o, p, k, c) {
	  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
	      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
	      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
	      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
	      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
	      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
	      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
	      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
	      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
	      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
	      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
	      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
	      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
	      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
	      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
	      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

	  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
	      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
	      x15 = j15, u;

	  for (var i = 0; i < 20; i += 2) {
	    u = x0 + x12 | 0;
	    x4 ^= u<<7 | u>>>(32-7);
	    u = x4 + x0 | 0;
	    x8 ^= u<<9 | u>>>(32-9);
	    u = x8 + x4 | 0;
	    x12 ^= u<<13 | u>>>(32-13);
	    u = x12 + x8 | 0;
	    x0 ^= u<<18 | u>>>(32-18);

	    u = x5 + x1 | 0;
	    x9 ^= u<<7 | u>>>(32-7);
	    u = x9 + x5 | 0;
	    x13 ^= u<<9 | u>>>(32-9);
	    u = x13 + x9 | 0;
	    x1 ^= u<<13 | u>>>(32-13);
	    u = x1 + x13 | 0;
	    x5 ^= u<<18 | u>>>(32-18);

	    u = x10 + x6 | 0;
	    x14 ^= u<<7 | u>>>(32-7);
	    u = x14 + x10 | 0;
	    x2 ^= u<<9 | u>>>(32-9);
	    u = x2 + x14 | 0;
	    x6 ^= u<<13 | u>>>(32-13);
	    u = x6 + x2 | 0;
	    x10 ^= u<<18 | u>>>(32-18);

	    u = x15 + x11 | 0;
	    x3 ^= u<<7 | u>>>(32-7);
	    u = x3 + x15 | 0;
	    x7 ^= u<<9 | u>>>(32-9);
	    u = x7 + x3 | 0;
	    x11 ^= u<<13 | u>>>(32-13);
	    u = x11 + x7 | 0;
	    x15 ^= u<<18 | u>>>(32-18);

	    u = x0 + x3 | 0;
	    x1 ^= u<<7 | u>>>(32-7);
	    u = x1 + x0 | 0;
	    x2 ^= u<<9 | u>>>(32-9);
	    u = x2 + x1 | 0;
	    x3 ^= u<<13 | u>>>(32-13);
	    u = x3 + x2 | 0;
	    x0 ^= u<<18 | u>>>(32-18);

	    u = x5 + x4 | 0;
	    x6 ^= u<<7 | u>>>(32-7);
	    u = x6 + x5 | 0;
	    x7 ^= u<<9 | u>>>(32-9);
	    u = x7 + x6 | 0;
	    x4 ^= u<<13 | u>>>(32-13);
	    u = x4 + x7 | 0;
	    x5 ^= u<<18 | u>>>(32-18);

	    u = x10 + x9 | 0;
	    x11 ^= u<<7 | u>>>(32-7);
	    u = x11 + x10 | 0;
	    x8 ^= u<<9 | u>>>(32-9);
	    u = x8 + x11 | 0;
	    x9 ^= u<<13 | u>>>(32-13);
	    u = x9 + x8 | 0;
	    x10 ^= u<<18 | u>>>(32-18);

	    u = x15 + x14 | 0;
	    x12 ^= u<<7 | u>>>(32-7);
	    u = x12 + x15 | 0;
	    x13 ^= u<<9 | u>>>(32-9);
	    u = x13 + x12 | 0;
	    x14 ^= u<<13 | u>>>(32-13);
	    u = x14 + x13 | 0;
	    x15 ^= u<<18 | u>>>(32-18);
	  }
	   x0 =  x0 +  j0 | 0;
	   x1 =  x1 +  j1 | 0;
	   x2 =  x2 +  j2 | 0;
	   x3 =  x3 +  j3 | 0;
	   x4 =  x4 +  j4 | 0;
	   x5 =  x5 +  j5 | 0;
	   x6 =  x6 +  j6 | 0;
	   x7 =  x7 +  j7 | 0;
	   x8 =  x8 +  j8 | 0;
	   x9 =  x9 +  j9 | 0;
	  x10 = x10 + j10 | 0;
	  x11 = x11 + j11 | 0;
	  x12 = x12 + j12 | 0;
	  x13 = x13 + j13 | 0;
	  x14 = x14 + j14 | 0;
	  x15 = x15 + j15 | 0;

	  o[ 0] = x0 >>>  0 & 0xff;
	  o[ 1] = x0 >>>  8 & 0xff;
	  o[ 2] = x0 >>> 16 & 0xff;
	  o[ 3] = x0 >>> 24 & 0xff;

	  o[ 4] = x1 >>>  0 & 0xff;
	  o[ 5] = x1 >>>  8 & 0xff;
	  o[ 6] = x1 >>> 16 & 0xff;
	  o[ 7] = x1 >>> 24 & 0xff;

	  o[ 8] = x2 >>>  0 & 0xff;
	  o[ 9] = x2 >>>  8 & 0xff;
	  o[10] = x2 >>> 16 & 0xff;
	  o[11] = x2 >>> 24 & 0xff;

	  o[12] = x3 >>>  0 & 0xff;
	  o[13] = x3 >>>  8 & 0xff;
	  o[14] = x3 >>> 16 & 0xff;
	  o[15] = x3 >>> 24 & 0xff;

	  o[16] = x4 >>>  0 & 0xff;
	  o[17] = x4 >>>  8 & 0xff;
	  o[18] = x4 >>> 16 & 0xff;
	  o[19] = x4 >>> 24 & 0xff;

	  o[20] = x5 >>>  0 & 0xff;
	  o[21] = x5 >>>  8 & 0xff;
	  o[22] = x5 >>> 16 & 0xff;
	  o[23] = x5 >>> 24 & 0xff;

	  o[24] = x6 >>>  0 & 0xff;
	  o[25] = x6 >>>  8 & 0xff;
	  o[26] = x6 >>> 16 & 0xff;
	  o[27] = x6 >>> 24 & 0xff;

	  o[28] = x7 >>>  0 & 0xff;
	  o[29] = x7 >>>  8 & 0xff;
	  o[30] = x7 >>> 16 & 0xff;
	  o[31] = x7 >>> 24 & 0xff;

	  o[32] = x8 >>>  0 & 0xff;
	  o[33] = x8 >>>  8 & 0xff;
	  o[34] = x8 >>> 16 & 0xff;
	  o[35] = x8 >>> 24 & 0xff;

	  o[36] = x9 >>>  0 & 0xff;
	  o[37] = x9 >>>  8 & 0xff;
	  o[38] = x9 >>> 16 & 0xff;
	  o[39] = x9 >>> 24 & 0xff;

	  o[40] = x10 >>>  0 & 0xff;
	  o[41] = x10 >>>  8 & 0xff;
	  o[42] = x10 >>> 16 & 0xff;
	  o[43] = x10 >>> 24 & 0xff;

	  o[44] = x11 >>>  0 & 0xff;
	  o[45] = x11 >>>  8 & 0xff;
	  o[46] = x11 >>> 16 & 0xff;
	  o[47] = x11 >>> 24 & 0xff;

	  o[48] = x12 >>>  0 & 0xff;
	  o[49] = x12 >>>  8 & 0xff;
	  o[50] = x12 >>> 16 & 0xff;
	  o[51] = x12 >>> 24 & 0xff;

	  o[52] = x13 >>>  0 & 0xff;
	  o[53] = x13 >>>  8 & 0xff;
	  o[54] = x13 >>> 16 & 0xff;
	  o[55] = x13 >>> 24 & 0xff;

	  o[56] = x14 >>>  0 & 0xff;
	  o[57] = x14 >>>  8 & 0xff;
	  o[58] = x14 >>> 16 & 0xff;
	  o[59] = x14 >>> 24 & 0xff;

	  o[60] = x15 >>>  0 & 0xff;
	  o[61] = x15 >>>  8 & 0xff;
	  o[62] = x15 >>> 16 & 0xff;
	  o[63] = x15 >>> 24 & 0xff;
	}

	function core_hsalsa20(o,p,k,c) {
	  var j0  = c[ 0] & 0xff | (c[ 1] & 0xff)<<8 | (c[ 2] & 0xff)<<16 | (c[ 3] & 0xff)<<24,
	      j1  = k[ 0] & 0xff | (k[ 1] & 0xff)<<8 | (k[ 2] & 0xff)<<16 | (k[ 3] & 0xff)<<24,
	      j2  = k[ 4] & 0xff | (k[ 5] & 0xff)<<8 | (k[ 6] & 0xff)<<16 | (k[ 7] & 0xff)<<24,
	      j3  = k[ 8] & 0xff | (k[ 9] & 0xff)<<8 | (k[10] & 0xff)<<16 | (k[11] & 0xff)<<24,
	      j4  = k[12] & 0xff | (k[13] & 0xff)<<8 | (k[14] & 0xff)<<16 | (k[15] & 0xff)<<24,
	      j5  = c[ 4] & 0xff | (c[ 5] & 0xff)<<8 | (c[ 6] & 0xff)<<16 | (c[ 7] & 0xff)<<24,
	      j6  = p[ 0] & 0xff | (p[ 1] & 0xff)<<8 | (p[ 2] & 0xff)<<16 | (p[ 3] & 0xff)<<24,
	      j7  = p[ 4] & 0xff | (p[ 5] & 0xff)<<8 | (p[ 6] & 0xff)<<16 | (p[ 7] & 0xff)<<24,
	      j8  = p[ 8] & 0xff | (p[ 9] & 0xff)<<8 | (p[10] & 0xff)<<16 | (p[11] & 0xff)<<24,
	      j9  = p[12] & 0xff | (p[13] & 0xff)<<8 | (p[14] & 0xff)<<16 | (p[15] & 0xff)<<24,
	      j10 = c[ 8] & 0xff | (c[ 9] & 0xff)<<8 | (c[10] & 0xff)<<16 | (c[11] & 0xff)<<24,
	      j11 = k[16] & 0xff | (k[17] & 0xff)<<8 | (k[18] & 0xff)<<16 | (k[19] & 0xff)<<24,
	      j12 = k[20] & 0xff | (k[21] & 0xff)<<8 | (k[22] & 0xff)<<16 | (k[23] & 0xff)<<24,
	      j13 = k[24] & 0xff | (k[25] & 0xff)<<8 | (k[26] & 0xff)<<16 | (k[27] & 0xff)<<24,
	      j14 = k[28] & 0xff | (k[29] & 0xff)<<8 | (k[30] & 0xff)<<16 | (k[31] & 0xff)<<24,
	      j15 = c[12] & 0xff | (c[13] & 0xff)<<8 | (c[14] & 0xff)<<16 | (c[15] & 0xff)<<24;

	  var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7,
	      x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14,
	      x15 = j15, u;

	  for (var i = 0; i < 20; i += 2) {
	    u = x0 + x12 | 0;
	    x4 ^= u<<7 | u>>>(32-7);
	    u = x4 + x0 | 0;
	    x8 ^= u<<9 | u>>>(32-9);
	    u = x8 + x4 | 0;
	    x12 ^= u<<13 | u>>>(32-13);
	    u = x12 + x8 | 0;
	    x0 ^= u<<18 | u>>>(32-18);

	    u = x5 + x1 | 0;
	    x9 ^= u<<7 | u>>>(32-7);
	    u = x9 + x5 | 0;
	    x13 ^= u<<9 | u>>>(32-9);
	    u = x13 + x9 | 0;
	    x1 ^= u<<13 | u>>>(32-13);
	    u = x1 + x13 | 0;
	    x5 ^= u<<18 | u>>>(32-18);

	    u = x10 + x6 | 0;
	    x14 ^= u<<7 | u>>>(32-7);
	    u = x14 + x10 | 0;
	    x2 ^= u<<9 | u>>>(32-9);
	    u = x2 + x14 | 0;
	    x6 ^= u<<13 | u>>>(32-13);
	    u = x6 + x2 | 0;
	    x10 ^= u<<18 | u>>>(32-18);

	    u = x15 + x11 | 0;
	    x3 ^= u<<7 | u>>>(32-7);
	    u = x3 + x15 | 0;
	    x7 ^= u<<9 | u>>>(32-9);
	    u = x7 + x3 | 0;
	    x11 ^= u<<13 | u>>>(32-13);
	    u = x11 + x7 | 0;
	    x15 ^= u<<18 | u>>>(32-18);

	    u = x0 + x3 | 0;
	    x1 ^= u<<7 | u>>>(32-7);
	    u = x1 + x0 | 0;
	    x2 ^= u<<9 | u>>>(32-9);
	    u = x2 + x1 | 0;
	    x3 ^= u<<13 | u>>>(32-13);
	    u = x3 + x2 | 0;
	    x0 ^= u<<18 | u>>>(32-18);

	    u = x5 + x4 | 0;
	    x6 ^= u<<7 | u>>>(32-7);
	    u = x6 + x5 | 0;
	    x7 ^= u<<9 | u>>>(32-9);
	    u = x7 + x6 | 0;
	    x4 ^= u<<13 | u>>>(32-13);
	    u = x4 + x7 | 0;
	    x5 ^= u<<18 | u>>>(32-18);

	    u = x10 + x9 | 0;
	    x11 ^= u<<7 | u>>>(32-7);
	    u = x11 + x10 | 0;
	    x8 ^= u<<9 | u>>>(32-9);
	    u = x8 + x11 | 0;
	    x9 ^= u<<13 | u>>>(32-13);
	    u = x9 + x8 | 0;
	    x10 ^= u<<18 | u>>>(32-18);

	    u = x15 + x14 | 0;
	    x12 ^= u<<7 | u>>>(32-7);
	    u = x12 + x15 | 0;
	    x13 ^= u<<9 | u>>>(32-9);
	    u = x13 + x12 | 0;
	    x14 ^= u<<13 | u>>>(32-13);
	    u = x14 + x13 | 0;
	    x15 ^= u<<18 | u>>>(32-18);
	  }

	  o[ 0] = x0 >>>  0 & 0xff;
	  o[ 1] = x0 >>>  8 & 0xff;
	  o[ 2] = x0 >>> 16 & 0xff;
	  o[ 3] = x0 >>> 24 & 0xff;

	  o[ 4] = x5 >>>  0 & 0xff;
	  o[ 5] = x5 >>>  8 & 0xff;
	  o[ 6] = x5 >>> 16 & 0xff;
	  o[ 7] = x5 >>> 24 & 0xff;

	  o[ 8] = x10 >>>  0 & 0xff;
	  o[ 9] = x10 >>>  8 & 0xff;
	  o[10] = x10 >>> 16 & 0xff;
	  o[11] = x10 >>> 24 & 0xff;

	  o[12] = x15 >>>  0 & 0xff;
	  o[13] = x15 >>>  8 & 0xff;
	  o[14] = x15 >>> 16 & 0xff;
	  o[15] = x15 >>> 24 & 0xff;

	  o[16] = x6 >>>  0 & 0xff;
	  o[17] = x6 >>>  8 & 0xff;
	  o[18] = x6 >>> 16 & 0xff;
	  o[19] = x6 >>> 24 & 0xff;

	  o[20] = x7 >>>  0 & 0xff;
	  o[21] = x7 >>>  8 & 0xff;
	  o[22] = x7 >>> 16 & 0xff;
	  o[23] = x7 >>> 24 & 0xff;

	  o[24] = x8 >>>  0 & 0xff;
	  o[25] = x8 >>>  8 & 0xff;
	  o[26] = x8 >>> 16 & 0xff;
	  o[27] = x8 >>> 24 & 0xff;

	  o[28] = x9 >>>  0 & 0xff;
	  o[29] = x9 >>>  8 & 0xff;
	  o[30] = x9 >>> 16 & 0xff;
	  o[31] = x9 >>> 24 & 0xff;
	}

	function crypto_core_salsa20(out,inp,k,c) {
	  core_salsa20(out,inp,k,c);
	}

	function crypto_core_hsalsa20(out,inp,k,c) {
	  core_hsalsa20(out,inp,k,c);
	}

	var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
	            // "expand 32-byte k"

	function crypto_stream_salsa20_xor(c,cpos,m,mpos,b,n,k) {
	  var z = new Uint8Array(16), x = new Uint8Array(64);
	  var u, i;
	  for (i = 0; i < 16; i++) z[i] = 0;
	  for (i = 0; i < 8; i++) z[i] = n[i];
	  while (b >= 64) {
	    crypto_core_salsa20(x,z,k,sigma);
	    for (i = 0; i < 64; i++) c[cpos+i] = m[mpos+i] ^ x[i];
	    u = 1;
	    for (i = 8; i < 16; i++) {
	      u = u + (z[i] & 0xff) | 0;
	      z[i] = u & 0xff;
	      u >>>= 8;
	    }
	    b -= 64;
	    cpos += 64;
	    mpos += 64;
	  }
	  if (b > 0) {
	    crypto_core_salsa20(x,z,k,sigma);
	    for (i = 0; i < b; i++) c[cpos+i] = m[mpos+i] ^ x[i];
	  }
	  return 0;
	}

	function crypto_stream_salsa20(c,cpos,b,n,k) {
	  var z = new Uint8Array(16), x = new Uint8Array(64);
	  var u, i;
	  for (i = 0; i < 16; i++) z[i] = 0;
	  for (i = 0; i < 8; i++) z[i] = n[i];
	  while (b >= 64) {
	    crypto_core_salsa20(x,z,k,sigma);
	    for (i = 0; i < 64; i++) c[cpos+i] = x[i];
	    u = 1;
	    for (i = 8; i < 16; i++) {
	      u = u + (z[i] & 0xff) | 0;
	      z[i] = u & 0xff;
	      u >>>= 8;
	    }
	    b -= 64;
	    cpos += 64;
	  }
	  if (b > 0) {
	    crypto_core_salsa20(x,z,k,sigma);
	    for (i = 0; i < b; i++) c[cpos+i] = x[i];
	  }
	  return 0;
	}

	function crypto_stream(c,cpos,d,n,k) {
	  var s = new Uint8Array(32);
	  crypto_core_hsalsa20(s,n,k,sigma);
	  var sn = new Uint8Array(8);
	  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
	  return crypto_stream_salsa20(c,cpos,d,sn,s);
	}

	function crypto_stream_xor(c,cpos,m,mpos,d,n,k) {
	  var s = new Uint8Array(32);
	  crypto_core_hsalsa20(s,n,k,sigma);
	  var sn = new Uint8Array(8);
	  for (var i = 0; i < 8; i++) sn[i] = n[i+16];
	  return crypto_stream_salsa20_xor(c,cpos,m,mpos,d,sn,s);
	}

	/*
	* Port of Andrew Moon's Poly1305-donna-16. Public domain.
	* https://github.com/floodyberry/poly1305-donna
	*/

	var poly1305 = function(key) {
	  this.buffer = new Uint8Array(16);
	  this.r = new Uint16Array(10);
	  this.h = new Uint16Array(10);
	  this.pad = new Uint16Array(8);
	  this.leftover = 0;
	  this.fin = 0;

	  var t0, t1, t2, t3, t4, t5, t6, t7;

	  t0 = key[ 0] & 0xff | (key[ 1] & 0xff) << 8; this.r[0] = ( t0                     ) & 0x1fff;
	  t1 = key[ 2] & 0xff | (key[ 3] & 0xff) << 8; this.r[1] = ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
	  t2 = key[ 4] & 0xff | (key[ 5] & 0xff) << 8; this.r[2] = ((t1 >>> 10) | (t2 <<  6)) & 0x1f03;
	  t3 = key[ 6] & 0xff | (key[ 7] & 0xff) << 8; this.r[3] = ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
	  t4 = key[ 8] & 0xff | (key[ 9] & 0xff) << 8; this.r[4] = ((t3 >>>  4) | (t4 << 12)) & 0x00ff;
	  this.r[5] = ((t4 >>>  1)) & 0x1ffe;
	  t5 = key[10] & 0xff | (key[11] & 0xff) << 8; this.r[6] = ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
	  t6 = key[12] & 0xff | (key[13] & 0xff) << 8; this.r[7] = ((t5 >>> 11) | (t6 <<  5)) & 0x1f81;
	  t7 = key[14] & 0xff | (key[15] & 0xff) << 8; this.r[8] = ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
	  this.r[9] = ((t7 >>>  5)) & 0x007f;

	  this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
	  this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
	  this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
	  this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
	  this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
	  this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
	  this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
	  this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
	};

	poly1305.prototype.blocks = function(m, mpos, bytes) {
	  var hibit = this.fin ? 0 : (1 << 11);
	  var t0, t1, t2, t3, t4, t5, t6, t7, c;
	  var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;

	  var h0 = this.h[0],
	      h1 = this.h[1],
	      h2 = this.h[2],
	      h3 = this.h[3],
	      h4 = this.h[4],
	      h5 = this.h[5],
	      h6 = this.h[6],
	      h7 = this.h[7],
	      h8 = this.h[8],
	      h9 = this.h[9];

	  var r0 = this.r[0],
	      r1 = this.r[1],
	      r2 = this.r[2],
	      r3 = this.r[3],
	      r4 = this.r[4],
	      r5 = this.r[5],
	      r6 = this.r[6],
	      r7 = this.r[7],
	      r8 = this.r[8],
	      r9 = this.r[9];

	  while (bytes >= 16) {
	    t0 = m[mpos+ 0] & 0xff | (m[mpos+ 1] & 0xff) << 8; h0 += ( t0                     ) & 0x1fff;
	    t1 = m[mpos+ 2] & 0xff | (m[mpos+ 3] & 0xff) << 8; h1 += ((t0 >>> 13) | (t1 <<  3)) & 0x1fff;
	    t2 = m[mpos+ 4] & 0xff | (m[mpos+ 5] & 0xff) << 8; h2 += ((t1 >>> 10) | (t2 <<  6)) & 0x1fff;
	    t3 = m[mpos+ 6] & 0xff | (m[mpos+ 7] & 0xff) << 8; h3 += ((t2 >>>  7) | (t3 <<  9)) & 0x1fff;
	    t4 = m[mpos+ 8] & 0xff | (m[mpos+ 9] & 0xff) << 8; h4 += ((t3 >>>  4) | (t4 << 12)) & 0x1fff;
	    h5 += ((t4 >>>  1)) & 0x1fff;
	    t5 = m[mpos+10] & 0xff | (m[mpos+11] & 0xff) << 8; h6 += ((t4 >>> 14) | (t5 <<  2)) & 0x1fff;
	    t6 = m[mpos+12] & 0xff | (m[mpos+13] & 0xff) << 8; h7 += ((t5 >>> 11) | (t6 <<  5)) & 0x1fff;
	    t7 = m[mpos+14] & 0xff | (m[mpos+15] & 0xff) << 8; h8 += ((t6 >>>  8) | (t7 <<  8)) & 0x1fff;
	    h9 += ((t7 >>> 5)) | hibit;

	    c = 0;

	    d0 = c;
	    d0 += h0 * r0;
	    d0 += h1 * (5 * r9);
	    d0 += h2 * (5 * r8);
	    d0 += h3 * (5 * r7);
	    d0 += h4 * (5 * r6);
	    c = (d0 >>> 13); d0 &= 0x1fff;
	    d0 += h5 * (5 * r5);
	    d0 += h6 * (5 * r4);
	    d0 += h7 * (5 * r3);
	    d0 += h8 * (5 * r2);
	    d0 += h9 * (5 * r1);
	    c += (d0 >>> 13); d0 &= 0x1fff;

	    d1 = c;
	    d1 += h0 * r1;
	    d1 += h1 * r0;
	    d1 += h2 * (5 * r9);
	    d1 += h3 * (5 * r8);
	    d1 += h4 * (5 * r7);
	    c = (d1 >>> 13); d1 &= 0x1fff;
	    d1 += h5 * (5 * r6);
	    d1 += h6 * (5 * r5);
	    d1 += h7 * (5 * r4);
	    d1 += h8 * (5 * r3);
	    d1 += h9 * (5 * r2);
	    c += (d1 >>> 13); d1 &= 0x1fff;

	    d2 = c;
	    d2 += h0 * r2;
	    d2 += h1 * r1;
	    d2 += h2 * r0;
	    d2 += h3 * (5 * r9);
	    d2 += h4 * (5 * r8);
	    c = (d2 >>> 13); d2 &= 0x1fff;
	    d2 += h5 * (5 * r7);
	    d2 += h6 * (5 * r6);
	    d2 += h7 * (5 * r5);
	    d2 += h8 * (5 * r4);
	    d2 += h9 * (5 * r3);
	    c += (d2 >>> 13); d2 &= 0x1fff;

	    d3 = c;
	    d3 += h0 * r3;
	    d3 += h1 * r2;
	    d3 += h2 * r1;
	    d3 += h3 * r0;
	    d3 += h4 * (5 * r9);
	    c = (d3 >>> 13); d3 &= 0x1fff;
	    d3 += h5 * (5 * r8);
	    d3 += h6 * (5 * r7);
	    d3 += h7 * (5 * r6);
	    d3 += h8 * (5 * r5);
	    d3 += h9 * (5 * r4);
	    c += (d3 >>> 13); d3 &= 0x1fff;

	    d4 = c;
	    d4 += h0 * r4;
	    d4 += h1 * r3;
	    d4 += h2 * r2;
	    d4 += h3 * r1;
	    d4 += h4 * r0;
	    c = (d4 >>> 13); d4 &= 0x1fff;
	    d4 += h5 * (5 * r9);
	    d4 += h6 * (5 * r8);
	    d4 += h7 * (5 * r7);
	    d4 += h8 * (5 * r6);
	    d4 += h9 * (5 * r5);
	    c += (d4 >>> 13); d4 &= 0x1fff;

	    d5 = c;
	    d5 += h0 * r5;
	    d5 += h1 * r4;
	    d5 += h2 * r3;
	    d5 += h3 * r2;
	    d5 += h4 * r1;
	    c = (d5 >>> 13); d5 &= 0x1fff;
	    d5 += h5 * r0;
	    d5 += h6 * (5 * r9);
	    d5 += h7 * (5 * r8);
	    d5 += h8 * (5 * r7);
	    d5 += h9 * (5 * r6);
	    c += (d5 >>> 13); d5 &= 0x1fff;

	    d6 = c;
	    d6 += h0 * r6;
	    d6 += h1 * r5;
	    d6 += h2 * r4;
	    d6 += h3 * r3;
	    d6 += h4 * r2;
	    c = (d6 >>> 13); d6 &= 0x1fff;
	    d6 += h5 * r1;
	    d6 += h6 * r0;
	    d6 += h7 * (5 * r9);
	    d6 += h8 * (5 * r8);
	    d6 += h9 * (5 * r7);
	    c += (d6 >>> 13); d6 &= 0x1fff;

	    d7 = c;
	    d7 += h0 * r7;
	    d7 += h1 * r6;
	    d7 += h2 * r5;
	    d7 += h3 * r4;
	    d7 += h4 * r3;
	    c = (d7 >>> 13); d7 &= 0x1fff;
	    d7 += h5 * r2;
	    d7 += h6 * r1;
	    d7 += h7 * r0;
	    d7 += h8 * (5 * r9);
	    d7 += h9 * (5 * r8);
	    c += (d7 >>> 13); d7 &= 0x1fff;

	    d8 = c;
	    d8 += h0 * r8;
	    d8 += h1 * r7;
	    d8 += h2 * r6;
	    d8 += h3 * r5;
	    d8 += h4 * r4;
	    c = (d8 >>> 13); d8 &= 0x1fff;
	    d8 += h5 * r3;
	    d8 += h6 * r2;
	    d8 += h7 * r1;
	    d8 += h8 * r0;
	    d8 += h9 * (5 * r9);
	    c += (d8 >>> 13); d8 &= 0x1fff;

	    d9 = c;
	    d9 += h0 * r9;
	    d9 += h1 * r8;
	    d9 += h2 * r7;
	    d9 += h3 * r6;
	    d9 += h4 * r5;
	    c = (d9 >>> 13); d9 &= 0x1fff;
	    d9 += h5 * r4;
	    d9 += h6 * r3;
	    d9 += h7 * r2;
	    d9 += h8 * r1;
	    d9 += h9 * r0;
	    c += (d9 >>> 13); d9 &= 0x1fff;

	    c = (((c << 2) + c)) | 0;
	    c = (c + d0) | 0;
	    d0 = c & 0x1fff;
	    c = (c >>> 13);
	    d1 += c;

	    h0 = d0;
	    h1 = d1;
	    h2 = d2;
	    h3 = d3;
	    h4 = d4;
	    h5 = d5;
	    h6 = d6;
	    h7 = d7;
	    h8 = d8;
	    h9 = d9;

	    mpos += 16;
	    bytes -= 16;
	  }
	  this.h[0] = h0;
	  this.h[1] = h1;
	  this.h[2] = h2;
	  this.h[3] = h3;
	  this.h[4] = h4;
	  this.h[5] = h5;
	  this.h[6] = h6;
	  this.h[7] = h7;
	  this.h[8] = h8;
	  this.h[9] = h9;
	};

	poly1305.prototype.finish = function(mac, macpos) {
	  var g = new Uint16Array(10);
	  var c, mask, f, i;

	  if (this.leftover) {
	    i = this.leftover;
	    this.buffer[i++] = 1;
	    for (; i < 16; i++) this.buffer[i] = 0;
	    this.fin = 1;
	    this.blocks(this.buffer, 0, 16);
	  }

	  c = this.h[1] >>> 13;
	  this.h[1] &= 0x1fff;
	  for (i = 2; i < 10; i++) {
	    this.h[i] += c;
	    c = this.h[i] >>> 13;
	    this.h[i] &= 0x1fff;
	  }
	  this.h[0] += (c * 5);
	  c = this.h[0] >>> 13;
	  this.h[0] &= 0x1fff;
	  this.h[1] += c;
	  c = this.h[1] >>> 13;
	  this.h[1] &= 0x1fff;
	  this.h[2] += c;

	  g[0] = this.h[0] + 5;
	  c = g[0] >>> 13;
	  g[0] &= 0x1fff;
	  for (i = 1; i < 10; i++) {
	    g[i] = this.h[i] + c;
	    c = g[i] >>> 13;
	    g[i] &= 0x1fff;
	  }
	  g[9] -= (1 << 13);

	  mask = (c ^ 1) - 1;
	  for (i = 0; i < 10; i++) g[i] &= mask;
	  mask = ~mask;
	  for (i = 0; i < 10; i++) this.h[i] = (this.h[i] & mask) | g[i];

	  this.h[0] = ((this.h[0]       ) | (this.h[1] << 13)                    ) & 0xffff;
	  this.h[1] = ((this.h[1] >>>  3) | (this.h[2] << 10)                    ) & 0xffff;
	  this.h[2] = ((this.h[2] >>>  6) | (this.h[3] <<  7)                    ) & 0xffff;
	  this.h[3] = ((this.h[3] >>>  9) | (this.h[4] <<  4)                    ) & 0xffff;
	  this.h[4] = ((this.h[4] >>> 12) | (this.h[5] <<  1) | (this.h[6] << 14)) & 0xffff;
	  this.h[5] = ((this.h[6] >>>  2) | (this.h[7] << 11)                    ) & 0xffff;
	  this.h[6] = ((this.h[7] >>>  5) | (this.h[8] <<  8)                    ) & 0xffff;
	  this.h[7] = ((this.h[8] >>>  8) | (this.h[9] <<  5)                    ) & 0xffff;

	  f = this.h[0] + this.pad[0];
	  this.h[0] = f & 0xffff;
	  for (i = 1; i < 8; i++) {
	    f = (((this.h[i] + this.pad[i]) | 0) + (f >>> 16)) | 0;
	    this.h[i] = f & 0xffff;
	  }

	  mac[macpos+ 0] = (this.h[0] >>> 0) & 0xff;
	  mac[macpos+ 1] = (this.h[0] >>> 8) & 0xff;
	  mac[macpos+ 2] = (this.h[1] >>> 0) & 0xff;
	  mac[macpos+ 3] = (this.h[1] >>> 8) & 0xff;
	  mac[macpos+ 4] = (this.h[2] >>> 0) & 0xff;
	  mac[macpos+ 5] = (this.h[2] >>> 8) & 0xff;
	  mac[macpos+ 6] = (this.h[3] >>> 0) & 0xff;
	  mac[macpos+ 7] = (this.h[3] >>> 8) & 0xff;
	  mac[macpos+ 8] = (this.h[4] >>> 0) & 0xff;
	  mac[macpos+ 9] = (this.h[4] >>> 8) & 0xff;
	  mac[macpos+10] = (this.h[5] >>> 0) & 0xff;
	  mac[macpos+11] = (this.h[5] >>> 8) & 0xff;
	  mac[macpos+12] = (this.h[6] >>> 0) & 0xff;
	  mac[macpos+13] = (this.h[6] >>> 8) & 0xff;
	  mac[macpos+14] = (this.h[7] >>> 0) & 0xff;
	  mac[macpos+15] = (this.h[7] >>> 8) & 0xff;
	};

	poly1305.prototype.update = function(m, mpos, bytes) {
	  var i, want;

	  if (this.leftover) {
	    want = (16 - this.leftover);
	    if (want > bytes)
	      want = bytes;
	    for (i = 0; i < want; i++)
	      this.buffer[this.leftover + i] = m[mpos+i];
	    bytes -= want;
	    mpos += want;
	    this.leftover += want;
	    if (this.leftover < 16)
	      return;
	    this.blocks(this.buffer, 0, 16);
	    this.leftover = 0;
	  }

	  if (bytes >= 16) {
	    want = bytes - (bytes % 16);
	    this.blocks(m, mpos, want);
	    mpos += want;
	    bytes -= want;
	  }

	  if (bytes) {
	    for (i = 0; i < bytes; i++)
	      this.buffer[this.leftover + i] = m[mpos+i];
	    this.leftover += bytes;
	  }
	};

	function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
	  var s = new poly1305(k);
	  s.update(m, mpos, n);
	  s.finish(out, outpos);
	  return 0;
	}

	function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
	  var x = new Uint8Array(16);
	  crypto_onetimeauth(x,0,m,mpos,n,k);
	  return crypto_verify_16(h,hpos,x,0);
	}

	function crypto_secretbox(c,m,d,n,k) {
	  var i;
	  if (d < 32) return -1;
	  crypto_stream_xor(c,0,m,0,d,n,k);
	  crypto_onetimeauth(c, 16, c, 32, d - 32, c);
	  for (i = 0; i < 16; i++) c[i] = 0;
	  return 0;
	}

	function crypto_secretbox_open(m,c,d,n,k) {
	  var i;
	  var x = new Uint8Array(32);
	  if (d < 32) return -1;
	  crypto_stream(x,0,32,n,k);
	  if (crypto_onetimeauth_verify(c, 16,c, 32,d - 32,x) !== 0) return -1;
	  crypto_stream_xor(m,0,c,0,d,n,k);
	  for (i = 0; i < 32; i++) m[i] = 0;
	  return 0;
	}

	function set25519(r, a) {
	  var i;
	  for (i = 0; i < 16; i++) r[i] = a[i]|0;
	}

	function car25519(o) {
	  var i, v, c = 1;
	  for (i = 0; i < 16; i++) {
	    v = o[i] + c + 65535;
	    c = Math.floor(v / 65536);
	    o[i] = v - c * 65536;
	  }
	  o[0] += c-1 + 37 * (c-1);
	}

	function sel25519(p, q, b) {
	  var t, c = ~(b-1);
	  for (var i = 0; i < 16; i++) {
	    t = c & (p[i] ^ q[i]);
	    p[i] ^= t;
	    q[i] ^= t;
	  }
	}

	function pack25519(o, n) {
	  var i, j, b;
	  var m = gf(), t = gf();
	  for (i = 0; i < 16; i++) t[i] = n[i];
	  car25519(t);
	  car25519(t);
	  car25519(t);
	  for (j = 0; j < 2; j++) {
	    m[0] = t[0] - 0xffed;
	    for (i = 1; i < 15; i++) {
	      m[i] = t[i] - 0xffff - ((m[i-1]>>16) & 1);
	      m[i-1] &= 0xffff;
	    }
	    m[15] = t[15] - 0x7fff - ((m[14]>>16) & 1);
	    b = (m[15]>>16) & 1;
	    m[14] &= 0xffff;
	    sel25519(t, m, 1-b);
	  }
	  for (i = 0; i < 16; i++) {
	    o[2*i] = t[i] & 0xff;
	    o[2*i+1] = t[i]>>8;
	  }
	}

	function neq25519(a, b) {
	  var c = new Uint8Array(32), d = new Uint8Array(32);
	  pack25519(c, a);
	  pack25519(d, b);
	  return crypto_verify_32(c, 0, d, 0);
	}

	function par25519(a) {
	  var d = new Uint8Array(32);
	  pack25519(d, a);
	  return d[0] & 1;
	}

	function unpack25519(o, n) {
	  var i;
	  for (i = 0; i < 16; i++) o[i] = n[2*i] + (n[2*i+1] << 8);
	  o[15] &= 0x7fff;
	}

	function A(o, a, b) {
	  for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
	}

	function Z(o, a, b) {
	  for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
	}

	function M(o, a, b) {
	  var v, c,
	     t0 = 0,  t1 = 0,  t2 = 0,  t3 = 0,  t4 = 0,  t5 = 0,  t6 = 0,  t7 = 0,
	     t8 = 0,  t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0,
	    t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0,
	    t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0,
	    b0 = b[0],
	    b1 = b[1],
	    b2 = b[2],
	    b3 = b[3],
	    b4 = b[4],
	    b5 = b[5],
	    b6 = b[6],
	    b7 = b[7],
	    b8 = b[8],
	    b9 = b[9],
	    b10 = b[10],
	    b11 = b[11],
	    b12 = b[12],
	    b13 = b[13],
	    b14 = b[14],
	    b15 = b[15];

	  v = a[0];
	  t0 += v * b0;
	  t1 += v * b1;
	  t2 += v * b2;
	  t3 += v * b3;
	  t4 += v * b4;
	  t5 += v * b5;
	  t6 += v * b6;
	  t7 += v * b7;
	  t8 += v * b8;
	  t9 += v * b9;
	  t10 += v * b10;
	  t11 += v * b11;
	  t12 += v * b12;
	  t13 += v * b13;
	  t14 += v * b14;
	  t15 += v * b15;
	  v = a[1];
	  t1 += v * b0;
	  t2 += v * b1;
	  t3 += v * b2;
	  t4 += v * b3;
	  t5 += v * b4;
	  t6 += v * b5;
	  t7 += v * b6;
	  t8 += v * b7;
	  t9 += v * b8;
	  t10 += v * b9;
	  t11 += v * b10;
	  t12 += v * b11;
	  t13 += v * b12;
	  t14 += v * b13;
	  t15 += v * b14;
	  t16 += v * b15;
	  v = a[2];
	  t2 += v * b0;
	  t3 += v * b1;
	  t4 += v * b2;
	  t5 += v * b3;
	  t6 += v * b4;
	  t7 += v * b5;
	  t8 += v * b6;
	  t9 += v * b7;
	  t10 += v * b8;
	  t11 += v * b9;
	  t12 += v * b10;
	  t13 += v * b11;
	  t14 += v * b12;
	  t15 += v * b13;
	  t16 += v * b14;
	  t17 += v * b15;
	  v = a[3];
	  t3 += v * b0;
	  t4 += v * b1;
	  t5 += v * b2;
	  t6 += v * b3;
	  t7 += v * b4;
	  t8 += v * b5;
	  t9 += v * b6;
	  t10 += v * b7;
	  t11 += v * b8;
	  t12 += v * b9;
	  t13 += v * b10;
	  t14 += v * b11;
	  t15 += v * b12;
	  t16 += v * b13;
	  t17 += v * b14;
	  t18 += v * b15;
	  v = a[4];
	  t4 += v * b0;
	  t5 += v * b1;
	  t6 += v * b2;
	  t7 += v * b3;
	  t8 += v * b4;
	  t9 += v * b5;
	  t10 += v * b6;
	  t11 += v * b7;
	  t12 += v * b8;
	  t13 += v * b9;
	  t14 += v * b10;
	  t15 += v * b11;
	  t16 += v * b12;
	  t17 += v * b13;
	  t18 += v * b14;
	  t19 += v * b15;
	  v = a[5];
	  t5 += v * b0;
	  t6 += v * b1;
	  t7 += v * b2;
	  t8 += v * b3;
	  t9 += v * b4;
	  t10 += v * b5;
	  t11 += v * b6;
	  t12 += v * b7;
	  t13 += v * b8;
	  t14 += v * b9;
	  t15 += v * b10;
	  t16 += v * b11;
	  t17 += v * b12;
	  t18 += v * b13;
	  t19 += v * b14;
	  t20 += v * b15;
	  v = a[6];
	  t6 += v * b0;
	  t7 += v * b1;
	  t8 += v * b2;
	  t9 += v * b3;
	  t10 += v * b4;
	  t11 += v * b5;
	  t12 += v * b6;
	  t13 += v * b7;
	  t14 += v * b8;
	  t15 += v * b9;
	  t16 += v * b10;
	  t17 += v * b11;
	  t18 += v * b12;
	  t19 += v * b13;
	  t20 += v * b14;
	  t21 += v * b15;
	  v = a[7];
	  t7 += v * b0;
	  t8 += v * b1;
	  t9 += v * b2;
	  t10 += v * b3;
	  t11 += v * b4;
	  t12 += v * b5;
	  t13 += v * b6;
	  t14 += v * b7;
	  t15 += v * b8;
	  t16 += v * b9;
	  t17 += v * b10;
	  t18 += v * b11;
	  t19 += v * b12;
	  t20 += v * b13;
	  t21 += v * b14;
	  t22 += v * b15;
	  v = a[8];
	  t8 += v * b0;
	  t9 += v * b1;
	  t10 += v * b2;
	  t11 += v * b3;
	  t12 += v * b4;
	  t13 += v * b5;
	  t14 += v * b6;
	  t15 += v * b7;
	  t16 += v * b8;
	  t17 += v * b9;
	  t18 += v * b10;
	  t19 += v * b11;
	  t20 += v * b12;
	  t21 += v * b13;
	  t22 += v * b14;
	  t23 += v * b15;
	  v = a[9];
	  t9 += v * b0;
	  t10 += v * b1;
	  t11 += v * b2;
	  t12 += v * b3;
	  t13 += v * b4;
	  t14 += v * b5;
	  t15 += v * b6;
	  t16 += v * b7;
	  t17 += v * b8;
	  t18 += v * b9;
	  t19 += v * b10;
	  t20 += v * b11;
	  t21 += v * b12;
	  t22 += v * b13;
	  t23 += v * b14;
	  t24 += v * b15;
	  v = a[10];
	  t10 += v * b0;
	  t11 += v * b1;
	  t12 += v * b2;
	  t13 += v * b3;
	  t14 += v * b4;
	  t15 += v * b5;
	  t16 += v * b6;
	  t17 += v * b7;
	  t18 += v * b8;
	  t19 += v * b9;
	  t20 += v * b10;
	  t21 += v * b11;
	  t22 += v * b12;
	  t23 += v * b13;
	  t24 += v * b14;
	  t25 += v * b15;
	  v = a[11];
	  t11 += v * b0;
	  t12 += v * b1;
	  t13 += v * b2;
	  t14 += v * b3;
	  t15 += v * b4;
	  t16 += v * b5;
	  t17 += v * b6;
	  t18 += v * b7;
	  t19 += v * b8;
	  t20 += v * b9;
	  t21 += v * b10;
	  t22 += v * b11;
	  t23 += v * b12;
	  t24 += v * b13;
	  t25 += v * b14;
	  t26 += v * b15;
	  v = a[12];
	  t12 += v * b0;
	  t13 += v * b1;
	  t14 += v * b2;
	  t15 += v * b3;
	  t16 += v * b4;
	  t17 += v * b5;
	  t18 += v * b6;
	  t19 += v * b7;
	  t20 += v * b8;
	  t21 += v * b9;
	  t22 += v * b10;
	  t23 += v * b11;
	  t24 += v * b12;
	  t25 += v * b13;
	  t26 += v * b14;
	  t27 += v * b15;
	  v = a[13];
	  t13 += v * b0;
	  t14 += v * b1;
	  t15 += v * b2;
	  t16 += v * b3;
	  t17 += v * b4;
	  t18 += v * b5;
	  t19 += v * b6;
	  t20 += v * b7;
	  t21 += v * b8;
	  t22 += v * b9;
	  t23 += v * b10;
	  t24 += v * b11;
	  t25 += v * b12;
	  t26 += v * b13;
	  t27 += v * b14;
	  t28 += v * b15;
	  v = a[14];
	  t14 += v * b0;
	  t15 += v * b1;
	  t16 += v * b2;
	  t17 += v * b3;
	  t18 += v * b4;
	  t19 += v * b5;
	  t20 += v * b6;
	  t21 += v * b7;
	  t22 += v * b8;
	  t23 += v * b9;
	  t24 += v * b10;
	  t25 += v * b11;
	  t26 += v * b12;
	  t27 += v * b13;
	  t28 += v * b14;
	  t29 += v * b15;
	  v = a[15];
	  t15 += v * b0;
	  t16 += v * b1;
	  t17 += v * b2;
	  t18 += v * b3;
	  t19 += v * b4;
	  t20 += v * b5;
	  t21 += v * b6;
	  t22 += v * b7;
	  t23 += v * b8;
	  t24 += v * b9;
	  t25 += v * b10;
	  t26 += v * b11;
	  t27 += v * b12;
	  t28 += v * b13;
	  t29 += v * b14;
	  t30 += v * b15;

	  t0  += 38 * t16;
	  t1  += 38 * t17;
	  t2  += 38 * t18;
	  t3  += 38 * t19;
	  t4  += 38 * t20;
	  t5  += 38 * t21;
	  t6  += 38 * t22;
	  t7  += 38 * t23;
	  t8  += 38 * t24;
	  t9  += 38 * t25;
	  t10 += 38 * t26;
	  t11 += 38 * t27;
	  t12 += 38 * t28;
	  t13 += 38 * t29;
	  t14 += 38 * t30;
	  // t15 left as is

	  // first car
	  c = 1;
	  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
	  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
	  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
	  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
	  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
	  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
	  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
	  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
	  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
	  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
	  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
	  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
	  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
	  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
	  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
	  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
	  t0 += c-1 + 37 * (c-1);

	  // second car
	  c = 1;
	  v =  t0 + c + 65535; c = Math.floor(v / 65536);  t0 = v - c * 65536;
	  v =  t1 + c + 65535; c = Math.floor(v / 65536);  t1 = v - c * 65536;
	  v =  t2 + c + 65535; c = Math.floor(v / 65536);  t2 = v - c * 65536;
	  v =  t3 + c + 65535; c = Math.floor(v / 65536);  t3 = v - c * 65536;
	  v =  t4 + c + 65535; c = Math.floor(v / 65536);  t4 = v - c * 65536;
	  v =  t5 + c + 65535; c = Math.floor(v / 65536);  t5 = v - c * 65536;
	  v =  t6 + c + 65535; c = Math.floor(v / 65536);  t6 = v - c * 65536;
	  v =  t7 + c + 65535; c = Math.floor(v / 65536);  t7 = v - c * 65536;
	  v =  t8 + c + 65535; c = Math.floor(v / 65536);  t8 = v - c * 65536;
	  v =  t9 + c + 65535; c = Math.floor(v / 65536);  t9 = v - c * 65536;
	  v = t10 + c + 65535; c = Math.floor(v / 65536); t10 = v - c * 65536;
	  v = t11 + c + 65535; c = Math.floor(v / 65536); t11 = v - c * 65536;
	  v = t12 + c + 65535; c = Math.floor(v / 65536); t12 = v - c * 65536;
	  v = t13 + c + 65535; c = Math.floor(v / 65536); t13 = v - c * 65536;
	  v = t14 + c + 65535; c = Math.floor(v / 65536); t14 = v - c * 65536;
	  v = t15 + c + 65535; c = Math.floor(v / 65536); t15 = v - c * 65536;
	  t0 += c-1 + 37 * (c-1);

	  o[ 0] = t0;
	  o[ 1] = t1;
	  o[ 2] = t2;
	  o[ 3] = t3;
	  o[ 4] = t4;
	  o[ 5] = t5;
	  o[ 6] = t6;
	  o[ 7] = t7;
	  o[ 8] = t8;
	  o[ 9] = t9;
	  o[10] = t10;
	  o[11] = t11;
	  o[12] = t12;
	  o[13] = t13;
	  o[14] = t14;
	  o[15] = t15;
	}

	function S(o, a) {
	  M(o, a, a);
	}

	function inv25519(o, i) {
	  var c = gf();
	  var a;
	  for (a = 0; a < 16; a++) c[a] = i[a];
	  for (a = 253; a >= 0; a--) {
	    S(c, c);
	    if(a !== 2 && a !== 4) M(c, c, i);
	  }
	  for (a = 0; a < 16; a++) o[a] = c[a];
	}

	function pow2523(o, i) {
	  var c = gf();
	  var a;
	  for (a = 0; a < 16; a++) c[a] = i[a];
	  for (a = 250; a >= 0; a--) {
	      S(c, c);
	      if(a !== 1) M(c, c, i);
	  }
	  for (a = 0; a < 16; a++) o[a] = c[a];
	}

	function crypto_scalarmult(q, n, p) {
	  var z = new Uint8Array(32);
	  var x = new Float64Array(80), r, i;
	  var a = gf(), b = gf(), c = gf(),
	      d = gf(), e = gf(), f = gf();
	  for (i = 0; i < 31; i++) z[i] = n[i];
	  z[31]=(n[31]&127)|64;
	  z[0]&=248;
	  unpack25519(x,p);
	  for (i = 0; i < 16; i++) {
	    b[i]=x[i];
	    d[i]=a[i]=c[i]=0;
	  }
	  a[0]=d[0]=1;
	  for (i=254; i>=0; --i) {
	    r=(z[i>>>3]>>>(i&7))&1;
	    sel25519(a,b,r);
	    sel25519(c,d,r);
	    A(e,a,c);
	    Z(a,a,c);
	    A(c,b,d);
	    Z(b,b,d);
	    S(d,e);
	    S(f,a);
	    M(a,c,a);
	    M(c,b,e);
	    A(e,a,c);
	    Z(a,a,c);
	    S(b,a);
	    Z(c,d,f);
	    M(a,c,_121665);
	    A(a,a,d);
	    M(c,c,a);
	    M(a,d,f);
	    M(d,b,x);
	    S(b,e);
	    sel25519(a,b,r);
	    sel25519(c,d,r);
	  }
	  for (i = 0; i < 16; i++) {
	    x[i+16]=a[i];
	    x[i+32]=c[i];
	    x[i+48]=b[i];
	    x[i+64]=d[i];
	  }
	  var x32 = x.subarray(32);
	  var x16 = x.subarray(16);
	  inv25519(x32,x32);
	  M(x16,x16,x32);
	  pack25519(q,x16);
	  return 0;
	}

	function crypto_scalarmult_base(q, n) {
	  return crypto_scalarmult(q, n, _9);
	}

	function crypto_box_keypair(y, x) {
	  randombytes(x, 32);
	  return crypto_scalarmult_base(y, x);
	}

	function crypto_box_beforenm(k, y, x) {
	  var s = new Uint8Array(32);
	  crypto_scalarmult(s, x, y);
	  return crypto_core_hsalsa20(k, _0, s, sigma);
	}

	var crypto_box_afternm = crypto_secretbox;
	var crypto_box_open_afternm = crypto_secretbox_open;

	function crypto_box(c, m, d, n, y, x) {
	  var k = new Uint8Array(32);
	  crypto_box_beforenm(k, y, x);
	  return crypto_box_afternm(c, m, d, n, k);
	}

	function crypto_box_open(m, c, d, n, y, x) {
	  var k = new Uint8Array(32);
	  crypto_box_beforenm(k, y, x);
	  return crypto_box_open_afternm(m, c, d, n, k);
	}

	var K = [
	  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
	  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
	  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
	  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
	  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
	  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
	  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
	  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
	  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
	  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
	  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
	  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
	  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
	  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
	  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
	  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
	  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
	  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
	  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
	  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
	  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
	  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
	  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
	  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
	  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
	  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
	  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
	  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
	  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
	  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
	  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
	  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
	  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
	  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
	  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
	  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
	  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
	  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
	  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
	  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
	];

	function crypto_hashblocks_hl(hh, hl, m, n) {
	  var wh = new Int32Array(16), wl = new Int32Array(16),
	      bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7,
	      bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7,
	      th, tl, i, j, h, l, a, b, c, d;

	  var ah0 = hh[0],
	      ah1 = hh[1],
	      ah2 = hh[2],
	      ah3 = hh[3],
	      ah4 = hh[4],
	      ah5 = hh[5],
	      ah6 = hh[6],
	      ah7 = hh[7],

	      al0 = hl[0],
	      al1 = hl[1],
	      al2 = hl[2],
	      al3 = hl[3],
	      al4 = hl[4],
	      al5 = hl[5],
	      al6 = hl[6],
	      al7 = hl[7];

	  var pos = 0;
	  while (n >= 128) {
	    for (i = 0; i < 16; i++) {
	      j = 8 * i + pos;
	      wh[i] = (m[j+0] << 24) | (m[j+1] << 16) | (m[j+2] << 8) | m[j+3];
	      wl[i] = (m[j+4] << 24) | (m[j+5] << 16) | (m[j+6] << 8) | m[j+7];
	    }
	    for (i = 0; i < 80; i++) {
	      bh0 = ah0;
	      bh1 = ah1;
	      bh2 = ah2;
	      bh3 = ah3;
	      bh4 = ah4;
	      bh5 = ah5;
	      bh6 = ah6;
	      bh7 = ah7;

	      bl0 = al0;
	      bl1 = al1;
	      bl2 = al2;
	      bl3 = al3;
	      bl4 = al4;
	      bl5 = al5;
	      bl6 = al6;
	      bl7 = al7;

	      // add
	      h = ah7;
	      l = al7;

	      a = l & 0xffff; b = l >>> 16;
	      c = h & 0xffff; d = h >>> 16;

	      // Sigma1
	      h = ((ah4 >>> 14) | (al4 << (32-14))) ^ ((ah4 >>> 18) | (al4 << (32-18))) ^ ((al4 >>> (41-32)) | (ah4 << (32-(41-32))));
	      l = ((al4 >>> 14) | (ah4 << (32-14))) ^ ((al4 >>> 18) | (ah4 << (32-18))) ^ ((ah4 >>> (41-32)) | (al4 << (32-(41-32))));

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      // Ch
	      h = (ah4 & ah5) ^ (~ah4 & ah6);
	      l = (al4 & al5) ^ (~al4 & al6);

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      // K
	      h = K[i*2];
	      l = K[i*2+1];

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      // w
	      h = wh[i%16];
	      l = wl[i%16];

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      b += a >>> 16;
	      c += b >>> 16;
	      d += c >>> 16;

	      th = c & 0xffff | d << 16;
	      tl = a & 0xffff | b << 16;

	      // add
	      h = th;
	      l = tl;

	      a = l & 0xffff; b = l >>> 16;
	      c = h & 0xffff; d = h >>> 16;

	      // Sigma0
	      h = ((ah0 >>> 28) | (al0 << (32-28))) ^ ((al0 >>> (34-32)) | (ah0 << (32-(34-32)))) ^ ((al0 >>> (39-32)) | (ah0 << (32-(39-32))));
	      l = ((al0 >>> 28) | (ah0 << (32-28))) ^ ((ah0 >>> (34-32)) | (al0 << (32-(34-32)))) ^ ((ah0 >>> (39-32)) | (al0 << (32-(39-32))));

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      // Maj
	      h = (ah0 & ah1) ^ (ah0 & ah2) ^ (ah1 & ah2);
	      l = (al0 & al1) ^ (al0 & al2) ^ (al1 & al2);

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      b += a >>> 16;
	      c += b >>> 16;
	      d += c >>> 16;

	      bh7 = (c & 0xffff) | (d << 16);
	      bl7 = (a & 0xffff) | (b << 16);

	      // add
	      h = bh3;
	      l = bl3;

	      a = l & 0xffff; b = l >>> 16;
	      c = h & 0xffff; d = h >>> 16;

	      h = th;
	      l = tl;

	      a += l & 0xffff; b += l >>> 16;
	      c += h & 0xffff; d += h >>> 16;

	      b += a >>> 16;
	      c += b >>> 16;
	      d += c >>> 16;

	      bh3 = (c & 0xffff) | (d << 16);
	      bl3 = (a & 0xffff) | (b << 16);

	      ah1 = bh0;
	      ah2 = bh1;
	      ah3 = bh2;
	      ah4 = bh3;
	      ah5 = bh4;
	      ah6 = bh5;
	      ah7 = bh6;
	      ah0 = bh7;

	      al1 = bl0;
	      al2 = bl1;
	      al3 = bl2;
	      al4 = bl3;
	      al5 = bl4;
	      al6 = bl5;
	      al7 = bl6;
	      al0 = bl7;

	      if (i%16 === 15) {
	        for (j = 0; j < 16; j++) {
	          // add
	          h = wh[j];
	          l = wl[j];

	          a = l & 0xffff; b = l >>> 16;
	          c = h & 0xffff; d = h >>> 16;

	          h = wh[(j+9)%16];
	          l = wl[(j+9)%16];

	          a += l & 0xffff; b += l >>> 16;
	          c += h & 0xffff; d += h >>> 16;

	          // sigma0
	          th = wh[(j+1)%16];
	          tl = wl[(j+1)%16];
	          h = ((th >>> 1) | (tl << (32-1))) ^ ((th >>> 8) | (tl << (32-8))) ^ (th >>> 7);
	          l = ((tl >>> 1) | (th << (32-1))) ^ ((tl >>> 8) | (th << (32-8))) ^ ((tl >>> 7) | (th << (32-7)));

	          a += l & 0xffff; b += l >>> 16;
	          c += h & 0xffff; d += h >>> 16;

	          // sigma1
	          th = wh[(j+14)%16];
	          tl = wl[(j+14)%16];
	          h = ((th >>> 19) | (tl << (32-19))) ^ ((tl >>> (61-32)) | (th << (32-(61-32)))) ^ (th >>> 6);
	          l = ((tl >>> 19) | (th << (32-19))) ^ ((th >>> (61-32)) | (tl << (32-(61-32)))) ^ ((tl >>> 6) | (th << (32-6)));

	          a += l & 0xffff; b += l >>> 16;
	          c += h & 0xffff; d += h >>> 16;

	          b += a >>> 16;
	          c += b >>> 16;
	          d += c >>> 16;

	          wh[j] = (c & 0xffff) | (d << 16);
	          wl[j] = (a & 0xffff) | (b << 16);
	        }
	      }
	    }

	    // add
	    h = ah0;
	    l = al0;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[0];
	    l = hl[0];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[0] = ah0 = (c & 0xffff) | (d << 16);
	    hl[0] = al0 = (a & 0xffff) | (b << 16);

	    h = ah1;
	    l = al1;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[1];
	    l = hl[1];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[1] = ah1 = (c & 0xffff) | (d << 16);
	    hl[1] = al1 = (a & 0xffff) | (b << 16);

	    h = ah2;
	    l = al2;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[2];
	    l = hl[2];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[2] = ah2 = (c & 0xffff) | (d << 16);
	    hl[2] = al2 = (a & 0xffff) | (b << 16);

	    h = ah3;
	    l = al3;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[3];
	    l = hl[3];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[3] = ah3 = (c & 0xffff) | (d << 16);
	    hl[3] = al3 = (a & 0xffff) | (b << 16);

	    h = ah4;
	    l = al4;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[4];
	    l = hl[4];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[4] = ah4 = (c & 0xffff) | (d << 16);
	    hl[4] = al4 = (a & 0xffff) | (b << 16);

	    h = ah5;
	    l = al5;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[5];
	    l = hl[5];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[5] = ah5 = (c & 0xffff) | (d << 16);
	    hl[5] = al5 = (a & 0xffff) | (b << 16);

	    h = ah6;
	    l = al6;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[6];
	    l = hl[6];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[6] = ah6 = (c & 0xffff) | (d << 16);
	    hl[6] = al6 = (a & 0xffff) | (b << 16);

	    h = ah7;
	    l = al7;

	    a = l & 0xffff; b = l >>> 16;
	    c = h & 0xffff; d = h >>> 16;

	    h = hh[7];
	    l = hl[7];

	    a += l & 0xffff; b += l >>> 16;
	    c += h & 0xffff; d += h >>> 16;

	    b += a >>> 16;
	    c += b >>> 16;
	    d += c >>> 16;

	    hh[7] = ah7 = (c & 0xffff) | (d << 16);
	    hl[7] = al7 = (a & 0xffff) | (b << 16);

	    pos += 128;
	    n -= 128;
	  }

	  return n;
	}

	function crypto_hash(out, m, n) {
	  var hh = new Int32Array(8),
	      hl = new Int32Array(8),
	      x = new Uint8Array(256),
	      i, b = n;

	  hh[0] = 0x6a09e667;
	  hh[1] = 0xbb67ae85;
	  hh[2] = 0x3c6ef372;
	  hh[3] = 0xa54ff53a;
	  hh[4] = 0x510e527f;
	  hh[5] = 0x9b05688c;
	  hh[6] = 0x1f83d9ab;
	  hh[7] = 0x5be0cd19;

	  hl[0] = 0xf3bcc908;
	  hl[1] = 0x84caa73b;
	  hl[2] = 0xfe94f82b;
	  hl[3] = 0x5f1d36f1;
	  hl[4] = 0xade682d1;
	  hl[5] = 0x2b3e6c1f;
	  hl[6] = 0xfb41bd6b;
	  hl[7] = 0x137e2179;

	  crypto_hashblocks_hl(hh, hl, m, n);
	  n %= 128;

	  for (i = 0; i < n; i++) x[i] = m[b-n+i];
	  x[n] = 128;

	  n = 256-128*(n<112?1:0);
	  x[n-9] = 0;
	  ts64(x, n-8,  (b / 0x20000000) | 0, b << 3);
	  crypto_hashblocks_hl(hh, hl, x, n);

	  for (i = 0; i < 8; i++) ts64(out, 8*i, hh[i], hl[i]);

	  return 0;
	}

	function add(p, q) {
	  var a = gf(), b = gf(), c = gf(),
	      d = gf(), e = gf(), f = gf(),
	      g = gf(), h = gf(), t = gf();

	  Z(a, p[1], p[0]);
	  Z(t, q[1], q[0]);
	  M(a, a, t);
	  A(b, p[0], p[1]);
	  A(t, q[0], q[1]);
	  M(b, b, t);
	  M(c, p[3], q[3]);
	  M(c, c, D2);
	  M(d, p[2], q[2]);
	  A(d, d, d);
	  Z(e, b, a);
	  Z(f, d, c);
	  A(g, d, c);
	  A(h, b, a);

	  M(p[0], e, f);
	  M(p[1], h, g);
	  M(p[2], g, f);
	  M(p[3], e, h);
	}

	function cswap(p, q, b) {
	  var i;
	  for (i = 0; i < 4; i++) {
	    sel25519(p[i], q[i], b);
	  }
	}

	function pack(r, p) {
	  var tx = gf(), ty = gf(), zi = gf();
	  inv25519(zi, p[2]);
	  M(tx, p[0], zi);
	  M(ty, p[1], zi);
	  pack25519(r, ty);
	  r[31] ^= par25519(tx) << 7;
	}

	function scalarmult(p, q, s) {
	  var b, i;
	  set25519(p[0], gf0);
	  set25519(p[1], gf1);
	  set25519(p[2], gf1);
	  set25519(p[3], gf0);
	  for (i = 255; i >= 0; --i) {
	    b = (s[(i/8)|0] >> (i&7)) & 1;
	    cswap(p, q, b);
	    add(q, p);
	    add(p, p);
	    cswap(p, q, b);
	  }
	}

	function scalarbase(p, s) {
	  var q = [gf(), gf(), gf(), gf()];
	  set25519(q[0], X);
	  set25519(q[1], Y);
	  set25519(q[2], gf1);
	  M(q[3], X, Y);
	  scalarmult(p, q, s);
	}

	function crypto_sign_keypair(pk, sk, seeded) {
	  var d = new Uint8Array(64);
	  var p = [gf(), gf(), gf(), gf()];
	  var i;

	  if (!seeded) randombytes(sk, 32);
	  crypto_hash(d, sk, 32);
	  d[0] &= 248;
	  d[31] &= 127;
	  d[31] |= 64;

	  scalarbase(p, d);
	  pack(pk, p);

	  for (i = 0; i < 32; i++) sk[i+32] = pk[i];
	  return 0;
	}

	var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);

	function modL(r, x) {
	  var carry, i, j, k;
	  for (i = 63; i >= 32; --i) {
	    carry = 0;
	    for (j = i - 32, k = i - 12; j < k; ++j) {
	      x[j] += carry - 16 * x[i] * L[j - (i - 32)];
	      carry = Math.floor((x[j] + 128) / 256);
	      x[j] -= carry * 256;
	    }
	    x[j] += carry;
	    x[i] = 0;
	  }
	  carry = 0;
	  for (j = 0; j < 32; j++) {
	    x[j] += carry - (x[31] >> 4) * L[j];
	    carry = x[j] >> 8;
	    x[j] &= 255;
	  }
	  for (j = 0; j < 32; j++) x[j] -= carry * L[j];
	  for (i = 0; i < 32; i++) {
	    x[i+1] += x[i] >> 8;
	    r[i] = x[i] & 255;
	  }
	}

	function reduce(r) {
	  var x = new Float64Array(64), i;
	  for (i = 0; i < 64; i++) x[i] = r[i];
	  for (i = 0; i < 64; i++) r[i] = 0;
	  modL(r, x);
	}

	// Note: difference from C - smlen returned, not passed as argument.
	function crypto_sign(sm, m, n, sk) {
	  var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
	  var i, j, x = new Float64Array(64);
	  var p = [gf(), gf(), gf(), gf()];

	  crypto_hash(d, sk, 32);
	  d[0] &= 248;
	  d[31] &= 127;
	  d[31] |= 64;

	  var smlen = n + 64;
	  for (i = 0; i < n; i++) sm[64 + i] = m[i];
	  for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];

	  crypto_hash(r, sm.subarray(32), n+32);
	  reduce(r);
	  scalarbase(p, r);
	  pack(sm, p);

	  for (i = 32; i < 64; i++) sm[i] = sk[i];
	  crypto_hash(h, sm, n + 64);
	  reduce(h);

	  for (i = 0; i < 64; i++) x[i] = 0;
	  for (i = 0; i < 32; i++) x[i] = r[i];
	  for (i = 0; i < 32; i++) {
	    for (j = 0; j < 32; j++) {
	      x[i+j] += h[i] * d[j];
	    }
	  }

	  modL(sm.subarray(32), x);
	  return smlen;
	}

	function unpackneg(r, p) {
	  var t = gf(), chk = gf(), num = gf(),
	      den = gf(), den2 = gf(), den4 = gf(),
	      den6 = gf();

	  set25519(r[2], gf1);
	  unpack25519(r[1], p);
	  S(num, r[1]);
	  M(den, num, D);
	  Z(num, num, r[2]);
	  A(den, r[2], den);

	  S(den2, den);
	  S(den4, den2);
	  M(den6, den4, den2);
	  M(t, den6, num);
	  M(t, t, den);

	  pow2523(t, t);
	  M(t, t, num);
	  M(t, t, den);
	  M(t, t, den);
	  M(r[0], t, den);

	  S(chk, r[0]);
	  M(chk, chk, den);
	  if (neq25519(chk, num)) M(r[0], r[0], I);

	  S(chk, r[0]);
	  M(chk, chk, den);
	  if (neq25519(chk, num)) return -1;

	  if (par25519(r[0]) === (p[31]>>7)) Z(r[0], gf0, r[0]);

	  M(r[3], r[0], r[1]);
	  return 0;
	}

	function crypto_sign_open(m, sm, n, pk) {
	  var i;
	  var t = new Uint8Array(32), h = new Uint8Array(64);
	  var p = [gf(), gf(), gf(), gf()],
	      q = [gf(), gf(), gf(), gf()];

	  if (n < 64) return -1;

	  if (unpackneg(q, pk)) return -1;

	  for (i = 0; i < n; i++) m[i] = sm[i];
	  for (i = 0; i < 32; i++) m[i+32] = pk[i];
	  crypto_hash(h, m, n);
	  reduce(h);
	  scalarmult(p, q, h);

	  scalarbase(q, sm.subarray(32));
	  add(p, q);
	  pack(t, p);

	  n -= 64;
	  if (crypto_verify_32(sm, 0, t, 0)) {
	    for (i = 0; i < n; i++) m[i] = 0;
	    return -1;
	  }

	  for (i = 0; i < n; i++) m[i] = sm[i + 64];
	  return n;
	}

	var crypto_secretbox_KEYBYTES = 32,
	    crypto_secretbox_NONCEBYTES = 24,
	    crypto_secretbox_ZEROBYTES = 32,
	    crypto_secretbox_BOXZEROBYTES = 16,
	    crypto_scalarmult_BYTES = 32,
	    crypto_scalarmult_SCALARBYTES = 32,
	    crypto_box_PUBLICKEYBYTES = 32,
	    crypto_box_SECRETKEYBYTES = 32,
	    crypto_box_BEFORENMBYTES = 32,
	    crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
	    crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
	    crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
	    crypto_sign_BYTES = 64,
	    crypto_sign_PUBLICKEYBYTES = 32,
	    crypto_sign_SECRETKEYBYTES = 64,
	    crypto_sign_SEEDBYTES = 32,
	    crypto_hash_BYTES = 64;

	nacl.lowlevel = {
	  crypto_core_hsalsa20: crypto_core_hsalsa20,
	  crypto_stream_xor: crypto_stream_xor,
	  crypto_stream: crypto_stream,
	  crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
	  crypto_stream_salsa20: crypto_stream_salsa20,
	  crypto_onetimeauth: crypto_onetimeauth,
	  crypto_onetimeauth_verify: crypto_onetimeauth_verify,
	  crypto_verify_16: crypto_verify_16,
	  crypto_verify_32: crypto_verify_32,
	  crypto_secretbox: crypto_secretbox,
	  crypto_secretbox_open: crypto_secretbox_open,
	  crypto_scalarmult: crypto_scalarmult,
	  crypto_scalarmult_base: crypto_scalarmult_base,
	  crypto_box_beforenm: crypto_box_beforenm,
	  crypto_box_afternm: crypto_box_afternm,
	  crypto_box: crypto_box,
	  crypto_box_open: crypto_box_open,
	  crypto_box_keypair: crypto_box_keypair,
	  crypto_hash: crypto_hash,
	  crypto_sign: crypto_sign,
	  crypto_sign_keypair: crypto_sign_keypair,
	  crypto_sign_open: crypto_sign_open,

	  crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
	  crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
	  crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
	  crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
	  crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
	  crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
	  crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
	  crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
	  crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
	  crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
	  crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
	  crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
	  crypto_sign_BYTES: crypto_sign_BYTES,
	  crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
	  crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
	  crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
	  crypto_hash_BYTES: crypto_hash_BYTES,

	  gf: gf,
	  D: D,
	  L: L,
	  pack25519: pack25519,
	  unpack25519: unpack25519,
	  M: M,
	  A: A,
	  S: S,
	  Z: Z,
	  pow2523: pow2523,
	  add: add,
	  set25519: set25519,
	  modL: modL,
	  scalarmult: scalarmult,
	  scalarbase: scalarbase,
	};

	/* High-level API */

	function checkLengths(k, n) {
	  if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
	  if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
	}

	function checkBoxLengths(pk, sk) {
	  if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
	  if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
	}

	function checkArrayTypes() {
	  for (var i = 0; i < arguments.length; i++) {
	    if (!(arguments[i] instanceof Uint8Array))
	      throw new TypeError('unexpected type, use Uint8Array');
	  }
	}

	function cleanup(arr) {
	  for (var i = 0; i < arr.length; i++) arr[i] = 0;
	}

	nacl.randomBytes = function(n) {
	  var b = new Uint8Array(n);
	  randombytes(b, n);
	  return b;
	};

	nacl.secretbox = function(msg, nonce, key) {
	  checkArrayTypes(msg, nonce, key);
	  checkLengths(key, nonce);
	  var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
	  var c = new Uint8Array(m.length);
	  for (var i = 0; i < msg.length; i++) m[i+crypto_secretbox_ZEROBYTES] = msg[i];
	  crypto_secretbox(c, m, m.length, nonce, key);
	  return c.subarray(crypto_secretbox_BOXZEROBYTES);
	};

	nacl.secretbox.open = function(box, nonce, key) {
	  checkArrayTypes(box, nonce, key);
	  checkLengths(key, nonce);
	  var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
	  var m = new Uint8Array(c.length);
	  for (var i = 0; i < box.length; i++) c[i+crypto_secretbox_BOXZEROBYTES] = box[i];
	  if (c.length < 32) return null;
	  if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
	  return m.subarray(crypto_secretbox_ZEROBYTES);
	};

	nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
	nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
	nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;

	nacl.scalarMult = function(n, p) {
	  checkArrayTypes(n, p);
	  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
	  if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
	  var q = new Uint8Array(crypto_scalarmult_BYTES);
	  crypto_scalarmult(q, n, p);
	  return q;
	};

	nacl.scalarMult.base = function(n) {
	  checkArrayTypes(n);
	  if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
	  var q = new Uint8Array(crypto_scalarmult_BYTES);
	  crypto_scalarmult_base(q, n);
	  return q;
	};

	nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
	nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;

	nacl.box = function(msg, nonce, publicKey, secretKey) {
	  var k = nacl.box.before(publicKey, secretKey);
	  return nacl.secretbox(msg, nonce, k);
	};

	nacl.box.before = function(publicKey, secretKey) {
	  checkArrayTypes(publicKey, secretKey);
	  checkBoxLengths(publicKey, secretKey);
	  var k = new Uint8Array(crypto_box_BEFORENMBYTES);
	  crypto_box_beforenm(k, publicKey, secretKey);
	  return k;
	};

	nacl.box.after = nacl.secretbox;

	nacl.box.open = function(msg, nonce, publicKey, secretKey) {
	  var k = nacl.box.before(publicKey, secretKey);
	  return nacl.secretbox.open(msg, nonce, k);
	};

	nacl.box.open.after = nacl.secretbox.open;

	nacl.box.keyPair = function() {
	  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
	  var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
	  crypto_box_keypair(pk, sk);
	  return {publicKey: pk, secretKey: sk};
	};

	nacl.box.keyPair.fromSecretKey = function(secretKey) {
	  checkArrayTypes(secretKey);
	  if (secretKey.length !== crypto_box_SECRETKEYBYTES)
	    throw new Error('bad secret key size');
	  var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
	  crypto_scalarmult_base(pk, secretKey);
	  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
	};

	nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
	nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
	nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
	nacl.box.nonceLength = crypto_box_NONCEBYTES;
	nacl.box.overheadLength = nacl.secretbox.overheadLength;

	nacl.sign = function(msg, secretKey) {
	  checkArrayTypes(msg, secretKey);
	  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
	    throw new Error('bad secret key size');
	  var signedMsg = new Uint8Array(crypto_sign_BYTES+msg.length);
	  crypto_sign(signedMsg, msg, msg.length, secretKey);
	  return signedMsg;
	};

	nacl.sign.open = function(signedMsg, publicKey) {
	  checkArrayTypes(signedMsg, publicKey);
	  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
	    throw new Error('bad public key size');
	  var tmp = new Uint8Array(signedMsg.length);
	  var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
	  if (mlen < 0) return null;
	  var m = new Uint8Array(mlen);
	  for (var i = 0; i < m.length; i++) m[i] = tmp[i];
	  return m;
	};

	nacl.sign.detached = function(msg, secretKey) {
	  var signedMsg = nacl.sign(msg, secretKey);
	  var sig = new Uint8Array(crypto_sign_BYTES);
	  for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
	  return sig;
	};

	nacl.sign.detached.verify = function(msg, sig, publicKey) {
	  checkArrayTypes(msg, sig, publicKey);
	  if (sig.length !== crypto_sign_BYTES)
	    throw new Error('bad signature size');
	  if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
	    throw new Error('bad public key size');
	  var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
	  var m = new Uint8Array(crypto_sign_BYTES + msg.length);
	  var i;
	  for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
	  for (i = 0; i < msg.length; i++) sm[i+crypto_sign_BYTES] = msg[i];
	  return (crypto_sign_open(m, sm, sm.length, publicKey) >= 0);
	};

	nacl.sign.keyPair = function() {
	  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
	  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
	  crypto_sign_keypair(pk, sk);
	  return {publicKey: pk, secretKey: sk};
	};

	nacl.sign.keyPair.fromSecretKey = function(secretKey) {
	  checkArrayTypes(secretKey);
	  if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
	    throw new Error('bad secret key size');
	  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
	  for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32+i];
	  return {publicKey: pk, secretKey: new Uint8Array(secretKey)};
	};

	nacl.sign.keyPair.fromSeed = function(seed) {
	  checkArrayTypes(seed);
	  if (seed.length !== crypto_sign_SEEDBYTES)
	    throw new Error('bad seed size');
	  var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
	  var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
	  for (var i = 0; i < 32; i++) sk[i] = seed[i];
	  crypto_sign_keypair(pk, sk, true);
	  return {publicKey: pk, secretKey: sk};
	};

	nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
	nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
	nacl.sign.seedLength = crypto_sign_SEEDBYTES;
	nacl.sign.signatureLength = crypto_sign_BYTES;

	nacl.hash = function(msg) {
	  checkArrayTypes(msg);
	  var h = new Uint8Array(crypto_hash_BYTES);
	  crypto_hash(h, msg, msg.length);
	  return h;
	};

	nacl.hash.hashLength = crypto_hash_BYTES;

	nacl.verify = function(x, y) {
	  checkArrayTypes(x, y);
	  // Zero length arguments are considered not equal.
	  if (x.length === 0 || y.length === 0) return false;
	  if (x.length !== y.length) return false;
	  return (vn(x, 0, y, 0, x.length) === 0) ? true : false;
	};

	nacl.setPRNG = function(fn) {
	  randombytes = fn;
	};

	(function() {
	  // Initialize PRNG if environment provides CSPRNG.
	  // If not, methods calling randombytes will throw.
	  var crypto = typeof self !== 'undefined' ? (self.crypto || self.msCrypto) : null;
	  if (crypto && crypto.getRandomValues) {
	    // Browsers.
	    var QUOTA = 65536;
	    nacl.setPRNG(function(x, n) {
	      var i, v = new Uint8Array(n);
	      for (i = 0; i < n; i += QUOTA) {
	        crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
	      }
	      for (i = 0; i < n; i++) x[i] = v[i];
	      cleanup(v);
	    });
	  } else if (typeof commonjsRequire !== 'undefined') {
	    // Node.js.
	    crypto = require$$0$3;
	    if (crypto && crypto.randomBytes) {
	      nacl.setPRNG(function(x, n) {
	        var i, v = crypto.randomBytes(n);
	        for (i = 0; i < n; i++) x[i] = v[i];
	        cleanup(v);
	      });
	    }
	  }
	})();

	})(module.exports ? module.exports : (self.nacl = self.nacl || {}));
} (naclFast));

var nacl = naclFast.exports;

var global$1 = (typeof global !== "undefined" ? global :
  typeof self !== "undefined" ? self :
  typeof window !== "undefined" ? window : {});

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
  ? global$1.TYPED_ARRAY_SUPPORT
  : true;

/*
 * Export kMaxLength after typed array support is determined.
 */
var _kMaxLength = kMaxLength();

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length)
}
Buffer.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
};

Buffer.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex$1(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex$1 (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

var _polyfillNode_buffer = /*#__PURE__*/Object.freeze({
	__proto__: null,
	Buffer: Buffer,
	INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
	SlowBuffer: SlowBuffer,
	isBuffer: isBuffer,
	kMaxLength: _kMaxLength
});

var bn = {exports: {}};

var require$$0$2 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_buffer);

(function (module) {
	(function (module, exports) {

	  // Utils
	  function assert (val, msg) {
	    if (!val) throw new Error(msg || 'Assertion failed');
	  }

	  // Could use `inherits` module, but don't want to move from single file
	  // architecture yet.
	  function inherits (ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  }

	  // BN

	  function BN (number, base, endian) {
	    if (BN.isBN(number)) {
	      return number;
	    }

	    this.negative = 0;
	    this.words = null;
	    this.length = 0;

	    // Reduction context
	    this.red = null;

	    if (number !== null) {
	      if (base === 'le' || base === 'be') {
	        endian = base;
	        base = 10;
	      }

	      this._init(number || 0, base || 10, endian || 'be');
	    }
	  }
	  if (typeof module === 'object') {
	    module.exports = BN;
	  } else {
	    exports.BN = BN;
	  }

	  BN.BN = BN;
	  BN.wordSize = 26;

	  var Buffer;
	  try {
	    if (typeof window !== 'undefined' && typeof window.Buffer !== 'undefined') {
	      Buffer = window.Buffer;
	    } else {
	      Buffer = require$$0$2.Buffer;
	    }
	  } catch (e) {
	  }

	  BN.isBN = function isBN (num) {
	    if (num instanceof BN) {
	      return true;
	    }

	    return num !== null && typeof num === 'object' &&
	      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
	  };

	  BN.max = function max (left, right) {
	    if (left.cmp(right) > 0) return left;
	    return right;
	  };

	  BN.min = function min (left, right) {
	    if (left.cmp(right) < 0) return left;
	    return right;
	  };

	  BN.prototype._init = function init (number, base, endian) {
	    if (typeof number === 'number') {
	      return this._initNumber(number, base, endian);
	    }

	    if (typeof number === 'object') {
	      return this._initArray(number, base, endian);
	    }

	    if (base === 'hex') {
	      base = 16;
	    }
	    assert(base === (base | 0) && base >= 2 && base <= 36);

	    number = number.toString().replace(/\s+/g, '');
	    var start = 0;
	    if (number[0] === '-') {
	      start++;
	      this.negative = 1;
	    }

	    if (start < number.length) {
	      if (base === 16) {
	        this._parseHex(number, start, endian);
	      } else {
	        this._parseBase(number, base, start);
	        if (endian === 'le') {
	          this._initArray(this.toArray(), base, endian);
	        }
	      }
	    }
	  };

	  BN.prototype._initNumber = function _initNumber (number, base, endian) {
	    if (number < 0) {
	      this.negative = 1;
	      number = -number;
	    }
	    if (number < 0x4000000) {
	      this.words = [number & 0x3ffffff];
	      this.length = 1;
	    } else if (number < 0x10000000000000) {
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff
	      ];
	      this.length = 2;
	    } else {
	      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
	      this.words = [
	        number & 0x3ffffff,
	        (number / 0x4000000) & 0x3ffffff,
	        1
	      ];
	      this.length = 3;
	    }

	    if (endian !== 'le') return;

	    // Reverse the bytes
	    this._initArray(this.toArray(), base, endian);
	  };

	  BN.prototype._initArray = function _initArray (number, base, endian) {
	    // Perhaps a Uint8Array
	    assert(typeof number.length === 'number');
	    if (number.length <= 0) {
	      this.words = [0];
	      this.length = 1;
	      return this;
	    }

	    this.length = Math.ceil(number.length / 3);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this.words[i] = 0;
	    }

	    var j, w;
	    var off = 0;
	    if (endian === 'be') {
	      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
	        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
	        this.words[j] |= (w << off) & 0x3ffffff;
	        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    } else if (endian === 'le') {
	      for (i = 0, j = 0; i < number.length; i += 3) {
	        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
	        this.words[j] |= (w << off) & 0x3ffffff;
	        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
	        off += 24;
	        if (off >= 26) {
	          off -= 26;
	          j++;
	        }
	      }
	    }
	    return this._strip();
	  };

	  function parseHex4Bits (string, index) {
	    var c = string.charCodeAt(index);
	    // '0' - '9'
	    if (c >= 48 && c <= 57) {
	      return c - 48;
	    // 'A' - 'F'
	    } else if (c >= 65 && c <= 70) {
	      return c - 55;
	    // 'a' - 'f'
	    } else if (c >= 97 && c <= 102) {
	      return c - 87;
	    } else {
	      assert(false, 'Invalid character in ' + string);
	    }
	  }

	  function parseHexByte (string, lowerBound, index) {
	    var r = parseHex4Bits(string, index);
	    if (index - 1 >= lowerBound) {
	      r |= parseHex4Bits(string, index - 1) << 4;
	    }
	    return r;
	  }

	  BN.prototype._parseHex = function _parseHex (number, start, endian) {
	    // Create possibly bigger array to ensure that it fits the number
	    this.length = Math.ceil((number.length - start) / 6);
	    this.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      this.words[i] = 0;
	    }

	    // 24-bits chunks
	    var off = 0;
	    var j = 0;

	    var w;
	    if (endian === 'be') {
	      for (i = number.length - 1; i >= start; i -= 2) {
	        w = parseHexByte(number, start, i) << off;
	        this.words[j] |= w & 0x3ffffff;
	        if (off >= 18) {
	          off -= 18;
	          j += 1;
	          this.words[j] |= w >>> 26;
	        } else {
	          off += 8;
	        }
	      }
	    } else {
	      var parseLength = number.length - start;
	      for (i = parseLength % 2 === 0 ? start + 1 : start; i < number.length; i += 2) {
	        w = parseHexByte(number, start, i) << off;
	        this.words[j] |= w & 0x3ffffff;
	        if (off >= 18) {
	          off -= 18;
	          j += 1;
	          this.words[j] |= w >>> 26;
	        } else {
	          off += 8;
	        }
	      }
	    }

	    this._strip();
	  };

	  function parseBase (str, start, end, mul) {
	    var r = 0;
	    var b = 0;
	    var len = Math.min(str.length, end);
	    for (var i = start; i < len; i++) {
	      var c = str.charCodeAt(i) - 48;

	      r *= mul;

	      // 'a'
	      if (c >= 49) {
	        b = c - 49 + 0xa;

	      // 'A'
	      } else if (c >= 17) {
	        b = c - 17 + 0xa;

	      // '0' - '9'
	      } else {
	        b = c;
	      }
	      assert(c >= 0 && b < mul, 'Invalid character');
	      r += b;
	    }
	    return r;
	  }

	  BN.prototype._parseBase = function _parseBase (number, base, start) {
	    // Initialize as zero
	    this.words = [0];
	    this.length = 1;

	    // Find length of limb in base
	    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
	      limbLen++;
	    }
	    limbLen--;
	    limbPow = (limbPow / base) | 0;

	    var total = number.length - start;
	    var mod = total % limbLen;
	    var end = Math.min(total, total - mod) + start;

	    var word = 0;
	    for (var i = start; i < end; i += limbLen) {
	      word = parseBase(number, i, i + limbLen, base);

	      this.imuln(limbPow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }

	    if (mod !== 0) {
	      var pow = 1;
	      word = parseBase(number, i, number.length, base);

	      for (i = 0; i < mod; i++) {
	        pow *= base;
	      }

	      this.imuln(pow);
	      if (this.words[0] + word < 0x4000000) {
	        this.words[0] += word;
	      } else {
	        this._iaddn(word);
	      }
	    }

	    this._strip();
	  };

	  BN.prototype.copy = function copy (dest) {
	    dest.words = new Array(this.length);
	    for (var i = 0; i < this.length; i++) {
	      dest.words[i] = this.words[i];
	    }
	    dest.length = this.length;
	    dest.negative = this.negative;
	    dest.red = this.red;
	  };

	  function move (dest, src) {
	    dest.words = src.words;
	    dest.length = src.length;
	    dest.negative = src.negative;
	    dest.red = src.red;
	  }

	  BN.prototype._move = function _move (dest) {
	    move(dest, this);
	  };

	  BN.prototype.clone = function clone () {
	    var r = new BN(null);
	    this.copy(r);
	    return r;
	  };

	  BN.prototype._expand = function _expand (size) {
	    while (this.length < size) {
	      this.words[this.length++] = 0;
	    }
	    return this;
	  };

	  // Remove leading `0` from `this`
	  BN.prototype._strip = function strip () {
	    while (this.length > 1 && this.words[this.length - 1] === 0) {
	      this.length--;
	    }
	    return this._normSign();
	  };

	  BN.prototype._normSign = function _normSign () {
	    // -0 = 0
	    if (this.length === 1 && this.words[0] === 0) {
	      this.negative = 0;
	    }
	    return this;
	  };

	  // Check Symbol.for because not everywhere where Symbol defined
	  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Browser_compatibility
	  if (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function') {
	    try {
	      BN.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspect;
	    } catch (e) {
	      BN.prototype.inspect = inspect;
	    }
	  } else {
	    BN.prototype.inspect = inspect;
	  }

	  function inspect () {
	    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
	  }

	  /*

	  var zeros = [];
	  var groupSizes = [];
	  var groupBases = [];

	  var s = '';
	  var i = -1;
	  while (++i < BN.wordSize) {
	    zeros[i] = s;
	    s += '0';
	  }
	  groupSizes[0] = 0;
	  groupSizes[1] = 0;
	  groupBases[0] = 0;
	  groupBases[1] = 0;
	  var base = 2 - 1;
	  while (++base < 36 + 1) {
	    var groupSize = 0;
	    var groupBase = 1;
	    while (groupBase < (1 << BN.wordSize) / base) {
	      groupBase *= base;
	      groupSize += 1;
	    }
	    groupSizes[base] = groupSize;
	    groupBases[base] = groupBase;
	  }

	  */

	  var zeros = [
	    '',
	    '0',
	    '00',
	    '000',
	    '0000',
	    '00000',
	    '000000',
	    '0000000',
	    '00000000',
	    '000000000',
	    '0000000000',
	    '00000000000',
	    '000000000000',
	    '0000000000000',
	    '00000000000000',
	    '000000000000000',
	    '0000000000000000',
	    '00000000000000000',
	    '000000000000000000',
	    '0000000000000000000',
	    '00000000000000000000',
	    '000000000000000000000',
	    '0000000000000000000000',
	    '00000000000000000000000',
	    '000000000000000000000000',
	    '0000000000000000000000000'
	  ];

	  var groupSizes = [
	    0, 0,
	    25, 16, 12, 11, 10, 9, 8,
	    8, 7, 7, 7, 7, 6, 6,
	    6, 6, 6, 6, 6, 5, 5,
	    5, 5, 5, 5, 5, 5, 5,
	    5, 5, 5, 5, 5, 5, 5
	  ];

	  var groupBases = [
	    0, 0,
	    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
	    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
	    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
	    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
	    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
	  ];

	  BN.prototype.toString = function toString (base, padding) {
	    base = base || 10;
	    padding = padding | 0 || 1;

	    var out;
	    if (base === 16 || base === 'hex') {
	      out = '';
	      var off = 0;
	      var carry = 0;
	      for (var i = 0; i < this.length; i++) {
	        var w = this.words[i];
	        var word = (((w << off) | carry) & 0xffffff).toString(16);
	        carry = (w >>> (24 - off)) & 0xffffff;
	        if (carry !== 0 || i !== this.length - 1) {
	          out = zeros[6 - word.length] + word + out;
	        } else {
	          out = word + out;
	        }
	        off += 2;
	        if (off >= 26) {
	          off -= 26;
	          i--;
	        }
	      }
	      if (carry !== 0) {
	        out = carry.toString(16) + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    if (base === (base | 0) && base >= 2 && base <= 36) {
	      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
	      var groupSize = groupSizes[base];
	      // var groupBase = Math.pow(base, groupSize);
	      var groupBase = groupBases[base];
	      out = '';
	      var c = this.clone();
	      c.negative = 0;
	      while (!c.isZero()) {
	        var r = c.modrn(groupBase).toString(base);
	        c = c.idivn(groupBase);

	        if (!c.isZero()) {
	          out = zeros[groupSize - r.length] + r + out;
	        } else {
	          out = r + out;
	        }
	      }
	      if (this.isZero()) {
	        out = '0' + out;
	      }
	      while (out.length % padding !== 0) {
	        out = '0' + out;
	      }
	      if (this.negative !== 0) {
	        out = '-' + out;
	      }
	      return out;
	    }

	    assert(false, 'Base should be between 2 and 36');
	  };

	  BN.prototype.toNumber = function toNumber () {
	    var ret = this.words[0];
	    if (this.length === 2) {
	      ret += this.words[1] * 0x4000000;
	    } else if (this.length === 3 && this.words[2] === 0x01) {
	      // NOTE: at this stage it is known that the top bit is set
	      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
	    } else if (this.length > 2) {
	      assert(false, 'Number can only safely store up to 53 bits');
	    }
	    return (this.negative !== 0) ? -ret : ret;
	  };

	  BN.prototype.toJSON = function toJSON () {
	    return this.toString(16, 2);
	  };

	  if (Buffer) {
	    BN.prototype.toBuffer = function toBuffer (endian, length) {
	      return this.toArrayLike(Buffer, endian, length);
	    };
	  }

	  BN.prototype.toArray = function toArray (endian, length) {
	    return this.toArrayLike(Array, endian, length);
	  };

	  var allocate = function allocate (ArrayType, size) {
	    if (ArrayType.allocUnsafe) {
	      return ArrayType.allocUnsafe(size);
	    }
	    return new ArrayType(size);
	  };

	  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
	    this._strip();

	    var byteLength = this.byteLength();
	    var reqLength = length || Math.max(1, byteLength);
	    assert(byteLength <= reqLength, 'byte array longer than desired length');
	    assert(reqLength > 0, 'Requested array length <= 0');

	    var res = allocate(ArrayType, reqLength);
	    var postfix = endian === 'le' ? 'LE' : 'BE';
	    this['_toArrayLike' + postfix](res, byteLength);
	    return res;
	  };

	  BN.prototype._toArrayLikeLE = function _toArrayLikeLE (res, byteLength) {
	    var position = 0;
	    var carry = 0;

	    for (var i = 0, shift = 0; i < this.length; i++) {
	      var word = (this.words[i] << shift) | carry;

	      res[position++] = word & 0xff;
	      if (position < res.length) {
	        res[position++] = (word >> 8) & 0xff;
	      }
	      if (position < res.length) {
	        res[position++] = (word >> 16) & 0xff;
	      }

	      if (shift === 6) {
	        if (position < res.length) {
	          res[position++] = (word >> 24) & 0xff;
	        }
	        carry = 0;
	        shift = 0;
	      } else {
	        carry = word >>> 24;
	        shift += 2;
	      }
	    }

	    if (position < res.length) {
	      res[position++] = carry;

	      while (position < res.length) {
	        res[position++] = 0;
	      }
	    }
	  };

	  BN.prototype._toArrayLikeBE = function _toArrayLikeBE (res, byteLength) {
	    var position = res.length - 1;
	    var carry = 0;

	    for (var i = 0, shift = 0; i < this.length; i++) {
	      var word = (this.words[i] << shift) | carry;

	      res[position--] = word & 0xff;
	      if (position >= 0) {
	        res[position--] = (word >> 8) & 0xff;
	      }
	      if (position >= 0) {
	        res[position--] = (word >> 16) & 0xff;
	      }

	      if (shift === 6) {
	        if (position >= 0) {
	          res[position--] = (word >> 24) & 0xff;
	        }
	        carry = 0;
	        shift = 0;
	      } else {
	        carry = word >>> 24;
	        shift += 2;
	      }
	    }

	    if (position >= 0) {
	      res[position--] = carry;

	      while (position >= 0) {
	        res[position--] = 0;
	      }
	    }
	  };

	  if (Math.clz32) {
	    BN.prototype._countBits = function _countBits (w) {
	      return 32 - Math.clz32(w);
	    };
	  } else {
	    BN.prototype._countBits = function _countBits (w) {
	      var t = w;
	      var r = 0;
	      if (t >= 0x1000) {
	        r += 13;
	        t >>>= 13;
	      }
	      if (t >= 0x40) {
	        r += 7;
	        t >>>= 7;
	      }
	      if (t >= 0x8) {
	        r += 4;
	        t >>>= 4;
	      }
	      if (t >= 0x02) {
	        r += 2;
	        t >>>= 2;
	      }
	      return r + t;
	    };
	  }

	  BN.prototype._zeroBits = function _zeroBits (w) {
	    // Short-cut
	    if (w === 0) return 26;

	    var t = w;
	    var r = 0;
	    if ((t & 0x1fff) === 0) {
	      r += 13;
	      t >>>= 13;
	    }
	    if ((t & 0x7f) === 0) {
	      r += 7;
	      t >>>= 7;
	    }
	    if ((t & 0xf) === 0) {
	      r += 4;
	      t >>>= 4;
	    }
	    if ((t & 0x3) === 0) {
	      r += 2;
	      t >>>= 2;
	    }
	    if ((t & 0x1) === 0) {
	      r++;
	    }
	    return r;
	  };

	  // Return number of used bits in a BN
	  BN.prototype.bitLength = function bitLength () {
	    var w = this.words[this.length - 1];
	    var hi = this._countBits(w);
	    return (this.length - 1) * 26 + hi;
	  };

	  function toBitArray (num) {
	    var w = new Array(num.bitLength());

	    for (var bit = 0; bit < w.length; bit++) {
	      var off = (bit / 26) | 0;
	      var wbit = bit % 26;

	      w[bit] = (num.words[off] >>> wbit) & 0x01;
	    }

	    return w;
	  }

	  // Number of trailing zero bits
	  BN.prototype.zeroBits = function zeroBits () {
	    if (this.isZero()) return 0;

	    var r = 0;
	    for (var i = 0; i < this.length; i++) {
	      var b = this._zeroBits(this.words[i]);
	      r += b;
	      if (b !== 26) break;
	    }
	    return r;
	  };

	  BN.prototype.byteLength = function byteLength () {
	    return Math.ceil(this.bitLength() / 8);
	  };

	  BN.prototype.toTwos = function toTwos (width) {
	    if (this.negative !== 0) {
	      return this.abs().inotn(width).iaddn(1);
	    }
	    return this.clone();
	  };

	  BN.prototype.fromTwos = function fromTwos (width) {
	    if (this.testn(width - 1)) {
	      return this.notn(width).iaddn(1).ineg();
	    }
	    return this.clone();
	  };

	  BN.prototype.isNeg = function isNeg () {
	    return this.negative !== 0;
	  };

	  // Return negative clone of `this`
	  BN.prototype.neg = function neg () {
	    return this.clone().ineg();
	  };

	  BN.prototype.ineg = function ineg () {
	    if (!this.isZero()) {
	      this.negative ^= 1;
	    }

	    return this;
	  };

	  // Or `num` with `this` in-place
	  BN.prototype.iuor = function iuor (num) {
	    while (this.length < num.length) {
	      this.words[this.length++] = 0;
	    }

	    for (var i = 0; i < num.length; i++) {
	      this.words[i] = this.words[i] | num.words[i];
	    }

	    return this._strip();
	  };

	  BN.prototype.ior = function ior (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuor(num);
	  };

	  // Or `num` with `this`
	  BN.prototype.or = function or (num) {
	    if (this.length > num.length) return this.clone().ior(num);
	    return num.clone().ior(this);
	  };

	  BN.prototype.uor = function uor (num) {
	    if (this.length > num.length) return this.clone().iuor(num);
	    return num.clone().iuor(this);
	  };

	  // And `num` with `this` in-place
	  BN.prototype.iuand = function iuand (num) {
	    // b = min-length(num, this)
	    var b;
	    if (this.length > num.length) {
	      b = num;
	    } else {
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this.words[i] = this.words[i] & num.words[i];
	    }

	    this.length = b.length;

	    return this._strip();
	  };

	  BN.prototype.iand = function iand (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuand(num);
	  };

	  // And `num` with `this`
	  BN.prototype.and = function and (num) {
	    if (this.length > num.length) return this.clone().iand(num);
	    return num.clone().iand(this);
	  };

	  BN.prototype.uand = function uand (num) {
	    if (this.length > num.length) return this.clone().iuand(num);
	    return num.clone().iuand(this);
	  };

	  // Xor `num` with `this` in-place
	  BN.prototype.iuxor = function iuxor (num) {
	    // a.length > b.length
	    var a;
	    var b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    for (var i = 0; i < b.length; i++) {
	      this.words[i] = a.words[i] ^ b.words[i];
	    }

	    if (this !== a) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    this.length = a.length;

	    return this._strip();
	  };

	  BN.prototype.ixor = function ixor (num) {
	    assert((this.negative | num.negative) === 0);
	    return this.iuxor(num);
	  };

	  // Xor `num` with `this`
	  BN.prototype.xor = function xor (num) {
	    if (this.length > num.length) return this.clone().ixor(num);
	    return num.clone().ixor(this);
	  };

	  BN.prototype.uxor = function uxor (num) {
	    if (this.length > num.length) return this.clone().iuxor(num);
	    return num.clone().iuxor(this);
	  };

	  // Not ``this`` with ``width`` bitwidth
	  BN.prototype.inotn = function inotn (width) {
	    assert(typeof width === 'number' && width >= 0);

	    var bytesNeeded = Math.ceil(width / 26) | 0;
	    var bitsLeft = width % 26;

	    // Extend the buffer with leading zeroes
	    this._expand(bytesNeeded);

	    if (bitsLeft > 0) {
	      bytesNeeded--;
	    }

	    // Handle complete words
	    for (var i = 0; i < bytesNeeded; i++) {
	      this.words[i] = ~this.words[i] & 0x3ffffff;
	    }

	    // Handle the residue
	    if (bitsLeft > 0) {
	      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
	    }

	    // And remove leading zeroes
	    return this._strip();
	  };

	  BN.prototype.notn = function notn (width) {
	    return this.clone().inotn(width);
	  };

	  // Set `bit` of `this`
	  BN.prototype.setn = function setn (bit, val) {
	    assert(typeof bit === 'number' && bit >= 0);

	    var off = (bit / 26) | 0;
	    var wbit = bit % 26;

	    this._expand(off + 1);

	    if (val) {
	      this.words[off] = this.words[off] | (1 << wbit);
	    } else {
	      this.words[off] = this.words[off] & ~(1 << wbit);
	    }

	    return this._strip();
	  };

	  // Add `num` to `this` in-place
	  BN.prototype.iadd = function iadd (num) {
	    var r;

	    // negative + positive
	    if (this.negative !== 0 && num.negative === 0) {
	      this.negative = 0;
	      r = this.isub(num);
	      this.negative ^= 1;
	      return this._normSign();

	    // positive + negative
	    } else if (this.negative === 0 && num.negative !== 0) {
	      num.negative = 0;
	      r = this.isub(num);
	      num.negative = 1;
	      return r._normSign();
	    }

	    // a.length > b.length
	    var a, b;
	    if (this.length > num.length) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
	      this.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      this.words[i] = r & 0x3ffffff;
	      carry = r >>> 26;
	    }

	    this.length = a.length;
	    if (carry !== 0) {
	      this.words[this.length] = carry;
	      this.length++;
	    // Copy the rest of the words
	    } else if (a !== this) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    return this;
	  };

	  // Add `num` to `this`
	  BN.prototype.add = function add (num) {
	    var res;
	    if (num.negative !== 0 && this.negative === 0) {
	      num.negative = 0;
	      res = this.sub(num);
	      num.negative ^= 1;
	      return res;
	    } else if (num.negative === 0 && this.negative !== 0) {
	      this.negative = 0;
	      res = num.sub(this);
	      this.negative = 1;
	      return res;
	    }

	    if (this.length > num.length) return this.clone().iadd(num);

	    return num.clone().iadd(this);
	  };

	  // Subtract `num` from `this` in-place
	  BN.prototype.isub = function isub (num) {
	    // this - (-num) = this + num
	    if (num.negative !== 0) {
	      num.negative = 0;
	      var r = this.iadd(num);
	      num.negative = 1;
	      return r._normSign();

	    // -this - num = -(this + num)
	    } else if (this.negative !== 0) {
	      this.negative = 0;
	      this.iadd(num);
	      this.negative = 1;
	      return this._normSign();
	    }

	    // At this point both numbers are positive
	    var cmp = this.cmp(num);

	    // Optimization - zeroify
	    if (cmp === 0) {
	      this.negative = 0;
	      this.length = 1;
	      this.words[0] = 0;
	      return this;
	    }

	    // a > b
	    var a, b;
	    if (cmp > 0) {
	      a = this;
	      b = num;
	    } else {
	      a = num;
	      b = this;
	    }

	    var carry = 0;
	    for (var i = 0; i < b.length; i++) {
	      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
	      carry = r >> 26;
	      this.words[i] = r & 0x3ffffff;
	    }
	    for (; carry !== 0 && i < a.length; i++) {
	      r = (a.words[i] | 0) + carry;
	      carry = r >> 26;
	      this.words[i] = r & 0x3ffffff;
	    }

	    // Copy rest of the words
	    if (carry === 0 && i < a.length && a !== this) {
	      for (; i < a.length; i++) {
	        this.words[i] = a.words[i];
	      }
	    }

	    this.length = Math.max(this.length, i);

	    if (a !== this) {
	      this.negative = 1;
	    }

	    return this._strip();
	  };

	  // Subtract `num` from `this`
	  BN.prototype.sub = function sub (num) {
	    return this.clone().isub(num);
	  };

	  function smallMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    var len = (self.length + num.length) | 0;
	    out.length = len;
	    len = (len - 1) | 0;

	    // Peel one iteration (compiler can't do it, because of code complexity)
	    var a = self.words[0] | 0;
	    var b = num.words[0] | 0;
	    var r = a * b;

	    var lo = r & 0x3ffffff;
	    var carry = (r / 0x4000000) | 0;
	    out.words[0] = lo;

	    for (var k = 1; k < len; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = carry >>> 26;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = (k - j) | 0;
	        a = self.words[i] | 0;
	        b = num.words[j] | 0;
	        r = a * b + rword;
	        ncarry += (r / 0x4000000) | 0;
	        rword = r & 0x3ffffff;
	      }
	      out.words[k] = rword | 0;
	      carry = ncarry | 0;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry | 0;
	    } else {
	      out.length--;
	    }

	    return out._strip();
	  }

	  // TODO(indutny): it may be reasonable to omit it for users who don't need
	  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
	  // multiplication (like elliptic secp256k1).
	  var comb10MulTo = function comb10MulTo (self, num, out) {
	    var a = self.words;
	    var b = num.words;
	    var o = out.words;
	    var c = 0;
	    var lo;
	    var mid;
	    var hi;
	    var a0 = a[0] | 0;
	    var al0 = a0 & 0x1fff;
	    var ah0 = a0 >>> 13;
	    var a1 = a[1] | 0;
	    var al1 = a1 & 0x1fff;
	    var ah1 = a1 >>> 13;
	    var a2 = a[2] | 0;
	    var al2 = a2 & 0x1fff;
	    var ah2 = a2 >>> 13;
	    var a3 = a[3] | 0;
	    var al3 = a3 & 0x1fff;
	    var ah3 = a3 >>> 13;
	    var a4 = a[4] | 0;
	    var al4 = a4 & 0x1fff;
	    var ah4 = a4 >>> 13;
	    var a5 = a[5] | 0;
	    var al5 = a5 & 0x1fff;
	    var ah5 = a5 >>> 13;
	    var a6 = a[6] | 0;
	    var al6 = a6 & 0x1fff;
	    var ah6 = a6 >>> 13;
	    var a7 = a[7] | 0;
	    var al7 = a7 & 0x1fff;
	    var ah7 = a7 >>> 13;
	    var a8 = a[8] | 0;
	    var al8 = a8 & 0x1fff;
	    var ah8 = a8 >>> 13;
	    var a9 = a[9] | 0;
	    var al9 = a9 & 0x1fff;
	    var ah9 = a9 >>> 13;
	    var b0 = b[0] | 0;
	    var bl0 = b0 & 0x1fff;
	    var bh0 = b0 >>> 13;
	    var b1 = b[1] | 0;
	    var bl1 = b1 & 0x1fff;
	    var bh1 = b1 >>> 13;
	    var b2 = b[2] | 0;
	    var bl2 = b2 & 0x1fff;
	    var bh2 = b2 >>> 13;
	    var b3 = b[3] | 0;
	    var bl3 = b3 & 0x1fff;
	    var bh3 = b3 >>> 13;
	    var b4 = b[4] | 0;
	    var bl4 = b4 & 0x1fff;
	    var bh4 = b4 >>> 13;
	    var b5 = b[5] | 0;
	    var bl5 = b5 & 0x1fff;
	    var bh5 = b5 >>> 13;
	    var b6 = b[6] | 0;
	    var bl6 = b6 & 0x1fff;
	    var bh6 = b6 >>> 13;
	    var b7 = b[7] | 0;
	    var bl7 = b7 & 0x1fff;
	    var bh7 = b7 >>> 13;
	    var b8 = b[8] | 0;
	    var bl8 = b8 & 0x1fff;
	    var bh8 = b8 >>> 13;
	    var b9 = b[9] | 0;
	    var bl9 = b9 & 0x1fff;
	    var bh9 = b9 >>> 13;

	    out.negative = self.negative ^ num.negative;
	    out.length = 19;
	    /* k = 0 */
	    lo = Math.imul(al0, bl0);
	    mid = Math.imul(al0, bh0);
	    mid = (mid + Math.imul(ah0, bl0)) | 0;
	    hi = Math.imul(ah0, bh0);
	    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
	    w0 &= 0x3ffffff;
	    /* k = 1 */
	    lo = Math.imul(al1, bl0);
	    mid = Math.imul(al1, bh0);
	    mid = (mid + Math.imul(ah1, bl0)) | 0;
	    hi = Math.imul(ah1, bh0);
	    lo = (lo + Math.imul(al0, bl1)) | 0;
	    mid = (mid + Math.imul(al0, bh1)) | 0;
	    mid = (mid + Math.imul(ah0, bl1)) | 0;
	    hi = (hi + Math.imul(ah0, bh1)) | 0;
	    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
	    w1 &= 0x3ffffff;
	    /* k = 2 */
	    lo = Math.imul(al2, bl0);
	    mid = Math.imul(al2, bh0);
	    mid = (mid + Math.imul(ah2, bl0)) | 0;
	    hi = Math.imul(ah2, bh0);
	    lo = (lo + Math.imul(al1, bl1)) | 0;
	    mid = (mid + Math.imul(al1, bh1)) | 0;
	    mid = (mid + Math.imul(ah1, bl1)) | 0;
	    hi = (hi + Math.imul(ah1, bh1)) | 0;
	    lo = (lo + Math.imul(al0, bl2)) | 0;
	    mid = (mid + Math.imul(al0, bh2)) | 0;
	    mid = (mid + Math.imul(ah0, bl2)) | 0;
	    hi = (hi + Math.imul(ah0, bh2)) | 0;
	    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
	    w2 &= 0x3ffffff;
	    /* k = 3 */
	    lo = Math.imul(al3, bl0);
	    mid = Math.imul(al3, bh0);
	    mid = (mid + Math.imul(ah3, bl0)) | 0;
	    hi = Math.imul(ah3, bh0);
	    lo = (lo + Math.imul(al2, bl1)) | 0;
	    mid = (mid + Math.imul(al2, bh1)) | 0;
	    mid = (mid + Math.imul(ah2, bl1)) | 0;
	    hi = (hi + Math.imul(ah2, bh1)) | 0;
	    lo = (lo + Math.imul(al1, bl2)) | 0;
	    mid = (mid + Math.imul(al1, bh2)) | 0;
	    mid = (mid + Math.imul(ah1, bl2)) | 0;
	    hi = (hi + Math.imul(ah1, bh2)) | 0;
	    lo = (lo + Math.imul(al0, bl3)) | 0;
	    mid = (mid + Math.imul(al0, bh3)) | 0;
	    mid = (mid + Math.imul(ah0, bl3)) | 0;
	    hi = (hi + Math.imul(ah0, bh3)) | 0;
	    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
	    w3 &= 0x3ffffff;
	    /* k = 4 */
	    lo = Math.imul(al4, bl0);
	    mid = Math.imul(al4, bh0);
	    mid = (mid + Math.imul(ah4, bl0)) | 0;
	    hi = Math.imul(ah4, bh0);
	    lo = (lo + Math.imul(al3, bl1)) | 0;
	    mid = (mid + Math.imul(al3, bh1)) | 0;
	    mid = (mid + Math.imul(ah3, bl1)) | 0;
	    hi = (hi + Math.imul(ah3, bh1)) | 0;
	    lo = (lo + Math.imul(al2, bl2)) | 0;
	    mid = (mid + Math.imul(al2, bh2)) | 0;
	    mid = (mid + Math.imul(ah2, bl2)) | 0;
	    hi = (hi + Math.imul(ah2, bh2)) | 0;
	    lo = (lo + Math.imul(al1, bl3)) | 0;
	    mid = (mid + Math.imul(al1, bh3)) | 0;
	    mid = (mid + Math.imul(ah1, bl3)) | 0;
	    hi = (hi + Math.imul(ah1, bh3)) | 0;
	    lo = (lo + Math.imul(al0, bl4)) | 0;
	    mid = (mid + Math.imul(al0, bh4)) | 0;
	    mid = (mid + Math.imul(ah0, bl4)) | 0;
	    hi = (hi + Math.imul(ah0, bh4)) | 0;
	    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
	    w4 &= 0x3ffffff;
	    /* k = 5 */
	    lo = Math.imul(al5, bl0);
	    mid = Math.imul(al5, bh0);
	    mid = (mid + Math.imul(ah5, bl0)) | 0;
	    hi = Math.imul(ah5, bh0);
	    lo = (lo + Math.imul(al4, bl1)) | 0;
	    mid = (mid + Math.imul(al4, bh1)) | 0;
	    mid = (mid + Math.imul(ah4, bl1)) | 0;
	    hi = (hi + Math.imul(ah4, bh1)) | 0;
	    lo = (lo + Math.imul(al3, bl2)) | 0;
	    mid = (mid + Math.imul(al3, bh2)) | 0;
	    mid = (mid + Math.imul(ah3, bl2)) | 0;
	    hi = (hi + Math.imul(ah3, bh2)) | 0;
	    lo = (lo + Math.imul(al2, bl3)) | 0;
	    mid = (mid + Math.imul(al2, bh3)) | 0;
	    mid = (mid + Math.imul(ah2, bl3)) | 0;
	    hi = (hi + Math.imul(ah2, bh3)) | 0;
	    lo = (lo + Math.imul(al1, bl4)) | 0;
	    mid = (mid + Math.imul(al1, bh4)) | 0;
	    mid = (mid + Math.imul(ah1, bl4)) | 0;
	    hi = (hi + Math.imul(ah1, bh4)) | 0;
	    lo = (lo + Math.imul(al0, bl5)) | 0;
	    mid = (mid + Math.imul(al0, bh5)) | 0;
	    mid = (mid + Math.imul(ah0, bl5)) | 0;
	    hi = (hi + Math.imul(ah0, bh5)) | 0;
	    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
	    w5 &= 0x3ffffff;
	    /* k = 6 */
	    lo = Math.imul(al6, bl0);
	    mid = Math.imul(al6, bh0);
	    mid = (mid + Math.imul(ah6, bl0)) | 0;
	    hi = Math.imul(ah6, bh0);
	    lo = (lo + Math.imul(al5, bl1)) | 0;
	    mid = (mid + Math.imul(al5, bh1)) | 0;
	    mid = (mid + Math.imul(ah5, bl1)) | 0;
	    hi = (hi + Math.imul(ah5, bh1)) | 0;
	    lo = (lo + Math.imul(al4, bl2)) | 0;
	    mid = (mid + Math.imul(al4, bh2)) | 0;
	    mid = (mid + Math.imul(ah4, bl2)) | 0;
	    hi = (hi + Math.imul(ah4, bh2)) | 0;
	    lo = (lo + Math.imul(al3, bl3)) | 0;
	    mid = (mid + Math.imul(al3, bh3)) | 0;
	    mid = (mid + Math.imul(ah3, bl3)) | 0;
	    hi = (hi + Math.imul(ah3, bh3)) | 0;
	    lo = (lo + Math.imul(al2, bl4)) | 0;
	    mid = (mid + Math.imul(al2, bh4)) | 0;
	    mid = (mid + Math.imul(ah2, bl4)) | 0;
	    hi = (hi + Math.imul(ah2, bh4)) | 0;
	    lo = (lo + Math.imul(al1, bl5)) | 0;
	    mid = (mid + Math.imul(al1, bh5)) | 0;
	    mid = (mid + Math.imul(ah1, bl5)) | 0;
	    hi = (hi + Math.imul(ah1, bh5)) | 0;
	    lo = (lo + Math.imul(al0, bl6)) | 0;
	    mid = (mid + Math.imul(al0, bh6)) | 0;
	    mid = (mid + Math.imul(ah0, bl6)) | 0;
	    hi = (hi + Math.imul(ah0, bh6)) | 0;
	    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
	    w6 &= 0x3ffffff;
	    /* k = 7 */
	    lo = Math.imul(al7, bl0);
	    mid = Math.imul(al7, bh0);
	    mid = (mid + Math.imul(ah7, bl0)) | 0;
	    hi = Math.imul(ah7, bh0);
	    lo = (lo + Math.imul(al6, bl1)) | 0;
	    mid = (mid + Math.imul(al6, bh1)) | 0;
	    mid = (mid + Math.imul(ah6, bl1)) | 0;
	    hi = (hi + Math.imul(ah6, bh1)) | 0;
	    lo = (lo + Math.imul(al5, bl2)) | 0;
	    mid = (mid + Math.imul(al5, bh2)) | 0;
	    mid = (mid + Math.imul(ah5, bl2)) | 0;
	    hi = (hi + Math.imul(ah5, bh2)) | 0;
	    lo = (lo + Math.imul(al4, bl3)) | 0;
	    mid = (mid + Math.imul(al4, bh3)) | 0;
	    mid = (mid + Math.imul(ah4, bl3)) | 0;
	    hi = (hi + Math.imul(ah4, bh3)) | 0;
	    lo = (lo + Math.imul(al3, bl4)) | 0;
	    mid = (mid + Math.imul(al3, bh4)) | 0;
	    mid = (mid + Math.imul(ah3, bl4)) | 0;
	    hi = (hi + Math.imul(ah3, bh4)) | 0;
	    lo = (lo + Math.imul(al2, bl5)) | 0;
	    mid = (mid + Math.imul(al2, bh5)) | 0;
	    mid = (mid + Math.imul(ah2, bl5)) | 0;
	    hi = (hi + Math.imul(ah2, bh5)) | 0;
	    lo = (lo + Math.imul(al1, bl6)) | 0;
	    mid = (mid + Math.imul(al1, bh6)) | 0;
	    mid = (mid + Math.imul(ah1, bl6)) | 0;
	    hi = (hi + Math.imul(ah1, bh6)) | 0;
	    lo = (lo + Math.imul(al0, bl7)) | 0;
	    mid = (mid + Math.imul(al0, bh7)) | 0;
	    mid = (mid + Math.imul(ah0, bl7)) | 0;
	    hi = (hi + Math.imul(ah0, bh7)) | 0;
	    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
	    w7 &= 0x3ffffff;
	    /* k = 8 */
	    lo = Math.imul(al8, bl0);
	    mid = Math.imul(al8, bh0);
	    mid = (mid + Math.imul(ah8, bl0)) | 0;
	    hi = Math.imul(ah8, bh0);
	    lo = (lo + Math.imul(al7, bl1)) | 0;
	    mid = (mid + Math.imul(al7, bh1)) | 0;
	    mid = (mid + Math.imul(ah7, bl1)) | 0;
	    hi = (hi + Math.imul(ah7, bh1)) | 0;
	    lo = (lo + Math.imul(al6, bl2)) | 0;
	    mid = (mid + Math.imul(al6, bh2)) | 0;
	    mid = (mid + Math.imul(ah6, bl2)) | 0;
	    hi = (hi + Math.imul(ah6, bh2)) | 0;
	    lo = (lo + Math.imul(al5, bl3)) | 0;
	    mid = (mid + Math.imul(al5, bh3)) | 0;
	    mid = (mid + Math.imul(ah5, bl3)) | 0;
	    hi = (hi + Math.imul(ah5, bh3)) | 0;
	    lo = (lo + Math.imul(al4, bl4)) | 0;
	    mid = (mid + Math.imul(al4, bh4)) | 0;
	    mid = (mid + Math.imul(ah4, bl4)) | 0;
	    hi = (hi + Math.imul(ah4, bh4)) | 0;
	    lo = (lo + Math.imul(al3, bl5)) | 0;
	    mid = (mid + Math.imul(al3, bh5)) | 0;
	    mid = (mid + Math.imul(ah3, bl5)) | 0;
	    hi = (hi + Math.imul(ah3, bh5)) | 0;
	    lo = (lo + Math.imul(al2, bl6)) | 0;
	    mid = (mid + Math.imul(al2, bh6)) | 0;
	    mid = (mid + Math.imul(ah2, bl6)) | 0;
	    hi = (hi + Math.imul(ah2, bh6)) | 0;
	    lo = (lo + Math.imul(al1, bl7)) | 0;
	    mid = (mid + Math.imul(al1, bh7)) | 0;
	    mid = (mid + Math.imul(ah1, bl7)) | 0;
	    hi = (hi + Math.imul(ah1, bh7)) | 0;
	    lo = (lo + Math.imul(al0, bl8)) | 0;
	    mid = (mid + Math.imul(al0, bh8)) | 0;
	    mid = (mid + Math.imul(ah0, bl8)) | 0;
	    hi = (hi + Math.imul(ah0, bh8)) | 0;
	    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
	    w8 &= 0x3ffffff;
	    /* k = 9 */
	    lo = Math.imul(al9, bl0);
	    mid = Math.imul(al9, bh0);
	    mid = (mid + Math.imul(ah9, bl0)) | 0;
	    hi = Math.imul(ah9, bh0);
	    lo = (lo + Math.imul(al8, bl1)) | 0;
	    mid = (mid + Math.imul(al8, bh1)) | 0;
	    mid = (mid + Math.imul(ah8, bl1)) | 0;
	    hi = (hi + Math.imul(ah8, bh1)) | 0;
	    lo = (lo + Math.imul(al7, bl2)) | 0;
	    mid = (mid + Math.imul(al7, bh2)) | 0;
	    mid = (mid + Math.imul(ah7, bl2)) | 0;
	    hi = (hi + Math.imul(ah7, bh2)) | 0;
	    lo = (lo + Math.imul(al6, bl3)) | 0;
	    mid = (mid + Math.imul(al6, bh3)) | 0;
	    mid = (mid + Math.imul(ah6, bl3)) | 0;
	    hi = (hi + Math.imul(ah6, bh3)) | 0;
	    lo = (lo + Math.imul(al5, bl4)) | 0;
	    mid = (mid + Math.imul(al5, bh4)) | 0;
	    mid = (mid + Math.imul(ah5, bl4)) | 0;
	    hi = (hi + Math.imul(ah5, bh4)) | 0;
	    lo = (lo + Math.imul(al4, bl5)) | 0;
	    mid = (mid + Math.imul(al4, bh5)) | 0;
	    mid = (mid + Math.imul(ah4, bl5)) | 0;
	    hi = (hi + Math.imul(ah4, bh5)) | 0;
	    lo = (lo + Math.imul(al3, bl6)) | 0;
	    mid = (mid + Math.imul(al3, bh6)) | 0;
	    mid = (mid + Math.imul(ah3, bl6)) | 0;
	    hi = (hi + Math.imul(ah3, bh6)) | 0;
	    lo = (lo + Math.imul(al2, bl7)) | 0;
	    mid = (mid + Math.imul(al2, bh7)) | 0;
	    mid = (mid + Math.imul(ah2, bl7)) | 0;
	    hi = (hi + Math.imul(ah2, bh7)) | 0;
	    lo = (lo + Math.imul(al1, bl8)) | 0;
	    mid = (mid + Math.imul(al1, bh8)) | 0;
	    mid = (mid + Math.imul(ah1, bl8)) | 0;
	    hi = (hi + Math.imul(ah1, bh8)) | 0;
	    lo = (lo + Math.imul(al0, bl9)) | 0;
	    mid = (mid + Math.imul(al0, bh9)) | 0;
	    mid = (mid + Math.imul(ah0, bl9)) | 0;
	    hi = (hi + Math.imul(ah0, bh9)) | 0;
	    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
	    w9 &= 0x3ffffff;
	    /* k = 10 */
	    lo = Math.imul(al9, bl1);
	    mid = Math.imul(al9, bh1);
	    mid = (mid + Math.imul(ah9, bl1)) | 0;
	    hi = Math.imul(ah9, bh1);
	    lo = (lo + Math.imul(al8, bl2)) | 0;
	    mid = (mid + Math.imul(al8, bh2)) | 0;
	    mid = (mid + Math.imul(ah8, bl2)) | 0;
	    hi = (hi + Math.imul(ah8, bh2)) | 0;
	    lo = (lo + Math.imul(al7, bl3)) | 0;
	    mid = (mid + Math.imul(al7, bh3)) | 0;
	    mid = (mid + Math.imul(ah7, bl3)) | 0;
	    hi = (hi + Math.imul(ah7, bh3)) | 0;
	    lo = (lo + Math.imul(al6, bl4)) | 0;
	    mid = (mid + Math.imul(al6, bh4)) | 0;
	    mid = (mid + Math.imul(ah6, bl4)) | 0;
	    hi = (hi + Math.imul(ah6, bh4)) | 0;
	    lo = (lo + Math.imul(al5, bl5)) | 0;
	    mid = (mid + Math.imul(al5, bh5)) | 0;
	    mid = (mid + Math.imul(ah5, bl5)) | 0;
	    hi = (hi + Math.imul(ah5, bh5)) | 0;
	    lo = (lo + Math.imul(al4, bl6)) | 0;
	    mid = (mid + Math.imul(al4, bh6)) | 0;
	    mid = (mid + Math.imul(ah4, bl6)) | 0;
	    hi = (hi + Math.imul(ah4, bh6)) | 0;
	    lo = (lo + Math.imul(al3, bl7)) | 0;
	    mid = (mid + Math.imul(al3, bh7)) | 0;
	    mid = (mid + Math.imul(ah3, bl7)) | 0;
	    hi = (hi + Math.imul(ah3, bh7)) | 0;
	    lo = (lo + Math.imul(al2, bl8)) | 0;
	    mid = (mid + Math.imul(al2, bh8)) | 0;
	    mid = (mid + Math.imul(ah2, bl8)) | 0;
	    hi = (hi + Math.imul(ah2, bh8)) | 0;
	    lo = (lo + Math.imul(al1, bl9)) | 0;
	    mid = (mid + Math.imul(al1, bh9)) | 0;
	    mid = (mid + Math.imul(ah1, bl9)) | 0;
	    hi = (hi + Math.imul(ah1, bh9)) | 0;
	    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
	    w10 &= 0x3ffffff;
	    /* k = 11 */
	    lo = Math.imul(al9, bl2);
	    mid = Math.imul(al9, bh2);
	    mid = (mid + Math.imul(ah9, bl2)) | 0;
	    hi = Math.imul(ah9, bh2);
	    lo = (lo + Math.imul(al8, bl3)) | 0;
	    mid = (mid + Math.imul(al8, bh3)) | 0;
	    mid = (mid + Math.imul(ah8, bl3)) | 0;
	    hi = (hi + Math.imul(ah8, bh3)) | 0;
	    lo = (lo + Math.imul(al7, bl4)) | 0;
	    mid = (mid + Math.imul(al7, bh4)) | 0;
	    mid = (mid + Math.imul(ah7, bl4)) | 0;
	    hi = (hi + Math.imul(ah7, bh4)) | 0;
	    lo = (lo + Math.imul(al6, bl5)) | 0;
	    mid = (mid + Math.imul(al6, bh5)) | 0;
	    mid = (mid + Math.imul(ah6, bl5)) | 0;
	    hi = (hi + Math.imul(ah6, bh5)) | 0;
	    lo = (lo + Math.imul(al5, bl6)) | 0;
	    mid = (mid + Math.imul(al5, bh6)) | 0;
	    mid = (mid + Math.imul(ah5, bl6)) | 0;
	    hi = (hi + Math.imul(ah5, bh6)) | 0;
	    lo = (lo + Math.imul(al4, bl7)) | 0;
	    mid = (mid + Math.imul(al4, bh7)) | 0;
	    mid = (mid + Math.imul(ah4, bl7)) | 0;
	    hi = (hi + Math.imul(ah4, bh7)) | 0;
	    lo = (lo + Math.imul(al3, bl8)) | 0;
	    mid = (mid + Math.imul(al3, bh8)) | 0;
	    mid = (mid + Math.imul(ah3, bl8)) | 0;
	    hi = (hi + Math.imul(ah3, bh8)) | 0;
	    lo = (lo + Math.imul(al2, bl9)) | 0;
	    mid = (mid + Math.imul(al2, bh9)) | 0;
	    mid = (mid + Math.imul(ah2, bl9)) | 0;
	    hi = (hi + Math.imul(ah2, bh9)) | 0;
	    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
	    w11 &= 0x3ffffff;
	    /* k = 12 */
	    lo = Math.imul(al9, bl3);
	    mid = Math.imul(al9, bh3);
	    mid = (mid + Math.imul(ah9, bl3)) | 0;
	    hi = Math.imul(ah9, bh3);
	    lo = (lo + Math.imul(al8, bl4)) | 0;
	    mid = (mid + Math.imul(al8, bh4)) | 0;
	    mid = (mid + Math.imul(ah8, bl4)) | 0;
	    hi = (hi + Math.imul(ah8, bh4)) | 0;
	    lo = (lo + Math.imul(al7, bl5)) | 0;
	    mid = (mid + Math.imul(al7, bh5)) | 0;
	    mid = (mid + Math.imul(ah7, bl5)) | 0;
	    hi = (hi + Math.imul(ah7, bh5)) | 0;
	    lo = (lo + Math.imul(al6, bl6)) | 0;
	    mid = (mid + Math.imul(al6, bh6)) | 0;
	    mid = (mid + Math.imul(ah6, bl6)) | 0;
	    hi = (hi + Math.imul(ah6, bh6)) | 0;
	    lo = (lo + Math.imul(al5, bl7)) | 0;
	    mid = (mid + Math.imul(al5, bh7)) | 0;
	    mid = (mid + Math.imul(ah5, bl7)) | 0;
	    hi = (hi + Math.imul(ah5, bh7)) | 0;
	    lo = (lo + Math.imul(al4, bl8)) | 0;
	    mid = (mid + Math.imul(al4, bh8)) | 0;
	    mid = (mid + Math.imul(ah4, bl8)) | 0;
	    hi = (hi + Math.imul(ah4, bh8)) | 0;
	    lo = (lo + Math.imul(al3, bl9)) | 0;
	    mid = (mid + Math.imul(al3, bh9)) | 0;
	    mid = (mid + Math.imul(ah3, bl9)) | 0;
	    hi = (hi + Math.imul(ah3, bh9)) | 0;
	    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
	    w12 &= 0x3ffffff;
	    /* k = 13 */
	    lo = Math.imul(al9, bl4);
	    mid = Math.imul(al9, bh4);
	    mid = (mid + Math.imul(ah9, bl4)) | 0;
	    hi = Math.imul(ah9, bh4);
	    lo = (lo + Math.imul(al8, bl5)) | 0;
	    mid = (mid + Math.imul(al8, bh5)) | 0;
	    mid = (mid + Math.imul(ah8, bl5)) | 0;
	    hi = (hi + Math.imul(ah8, bh5)) | 0;
	    lo = (lo + Math.imul(al7, bl6)) | 0;
	    mid = (mid + Math.imul(al7, bh6)) | 0;
	    mid = (mid + Math.imul(ah7, bl6)) | 0;
	    hi = (hi + Math.imul(ah7, bh6)) | 0;
	    lo = (lo + Math.imul(al6, bl7)) | 0;
	    mid = (mid + Math.imul(al6, bh7)) | 0;
	    mid = (mid + Math.imul(ah6, bl7)) | 0;
	    hi = (hi + Math.imul(ah6, bh7)) | 0;
	    lo = (lo + Math.imul(al5, bl8)) | 0;
	    mid = (mid + Math.imul(al5, bh8)) | 0;
	    mid = (mid + Math.imul(ah5, bl8)) | 0;
	    hi = (hi + Math.imul(ah5, bh8)) | 0;
	    lo = (lo + Math.imul(al4, bl9)) | 0;
	    mid = (mid + Math.imul(al4, bh9)) | 0;
	    mid = (mid + Math.imul(ah4, bl9)) | 0;
	    hi = (hi + Math.imul(ah4, bh9)) | 0;
	    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
	    w13 &= 0x3ffffff;
	    /* k = 14 */
	    lo = Math.imul(al9, bl5);
	    mid = Math.imul(al9, bh5);
	    mid = (mid + Math.imul(ah9, bl5)) | 0;
	    hi = Math.imul(ah9, bh5);
	    lo = (lo + Math.imul(al8, bl6)) | 0;
	    mid = (mid + Math.imul(al8, bh6)) | 0;
	    mid = (mid + Math.imul(ah8, bl6)) | 0;
	    hi = (hi + Math.imul(ah8, bh6)) | 0;
	    lo = (lo + Math.imul(al7, bl7)) | 0;
	    mid = (mid + Math.imul(al7, bh7)) | 0;
	    mid = (mid + Math.imul(ah7, bl7)) | 0;
	    hi = (hi + Math.imul(ah7, bh7)) | 0;
	    lo = (lo + Math.imul(al6, bl8)) | 0;
	    mid = (mid + Math.imul(al6, bh8)) | 0;
	    mid = (mid + Math.imul(ah6, bl8)) | 0;
	    hi = (hi + Math.imul(ah6, bh8)) | 0;
	    lo = (lo + Math.imul(al5, bl9)) | 0;
	    mid = (mid + Math.imul(al5, bh9)) | 0;
	    mid = (mid + Math.imul(ah5, bl9)) | 0;
	    hi = (hi + Math.imul(ah5, bh9)) | 0;
	    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
	    w14 &= 0x3ffffff;
	    /* k = 15 */
	    lo = Math.imul(al9, bl6);
	    mid = Math.imul(al9, bh6);
	    mid = (mid + Math.imul(ah9, bl6)) | 0;
	    hi = Math.imul(ah9, bh6);
	    lo = (lo + Math.imul(al8, bl7)) | 0;
	    mid = (mid + Math.imul(al8, bh7)) | 0;
	    mid = (mid + Math.imul(ah8, bl7)) | 0;
	    hi = (hi + Math.imul(ah8, bh7)) | 0;
	    lo = (lo + Math.imul(al7, bl8)) | 0;
	    mid = (mid + Math.imul(al7, bh8)) | 0;
	    mid = (mid + Math.imul(ah7, bl8)) | 0;
	    hi = (hi + Math.imul(ah7, bh8)) | 0;
	    lo = (lo + Math.imul(al6, bl9)) | 0;
	    mid = (mid + Math.imul(al6, bh9)) | 0;
	    mid = (mid + Math.imul(ah6, bl9)) | 0;
	    hi = (hi + Math.imul(ah6, bh9)) | 0;
	    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
	    w15 &= 0x3ffffff;
	    /* k = 16 */
	    lo = Math.imul(al9, bl7);
	    mid = Math.imul(al9, bh7);
	    mid = (mid + Math.imul(ah9, bl7)) | 0;
	    hi = Math.imul(ah9, bh7);
	    lo = (lo + Math.imul(al8, bl8)) | 0;
	    mid = (mid + Math.imul(al8, bh8)) | 0;
	    mid = (mid + Math.imul(ah8, bl8)) | 0;
	    hi = (hi + Math.imul(ah8, bh8)) | 0;
	    lo = (lo + Math.imul(al7, bl9)) | 0;
	    mid = (mid + Math.imul(al7, bh9)) | 0;
	    mid = (mid + Math.imul(ah7, bl9)) | 0;
	    hi = (hi + Math.imul(ah7, bh9)) | 0;
	    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
	    w16 &= 0x3ffffff;
	    /* k = 17 */
	    lo = Math.imul(al9, bl8);
	    mid = Math.imul(al9, bh8);
	    mid = (mid + Math.imul(ah9, bl8)) | 0;
	    hi = Math.imul(ah9, bh8);
	    lo = (lo + Math.imul(al8, bl9)) | 0;
	    mid = (mid + Math.imul(al8, bh9)) | 0;
	    mid = (mid + Math.imul(ah8, bl9)) | 0;
	    hi = (hi + Math.imul(ah8, bh9)) | 0;
	    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
	    w17 &= 0x3ffffff;
	    /* k = 18 */
	    lo = Math.imul(al9, bl9);
	    mid = Math.imul(al9, bh9);
	    mid = (mid + Math.imul(ah9, bl9)) | 0;
	    hi = Math.imul(ah9, bh9);
	    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
	    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
	    w18 &= 0x3ffffff;
	    o[0] = w0;
	    o[1] = w1;
	    o[2] = w2;
	    o[3] = w3;
	    o[4] = w4;
	    o[5] = w5;
	    o[6] = w6;
	    o[7] = w7;
	    o[8] = w8;
	    o[9] = w9;
	    o[10] = w10;
	    o[11] = w11;
	    o[12] = w12;
	    o[13] = w13;
	    o[14] = w14;
	    o[15] = w15;
	    o[16] = w16;
	    o[17] = w17;
	    o[18] = w18;
	    if (c !== 0) {
	      o[19] = c;
	      out.length++;
	    }
	    return out;
	  };

	  // Polyfill comb
	  if (!Math.imul) {
	    comb10MulTo = smallMulTo;
	  }

	  function bigMulTo (self, num, out) {
	    out.negative = num.negative ^ self.negative;
	    out.length = self.length + num.length;

	    var carry = 0;
	    var hncarry = 0;
	    for (var k = 0; k < out.length - 1; k++) {
	      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
	      // note that ncarry could be >= 0x3ffffff
	      var ncarry = hncarry;
	      hncarry = 0;
	      var rword = carry & 0x3ffffff;
	      var maxJ = Math.min(k, num.length - 1);
	      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
	        var i = k - j;
	        var a = self.words[i] | 0;
	        var b = num.words[j] | 0;
	        var r = a * b;

	        var lo = r & 0x3ffffff;
	        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
	        lo = (lo + rword) | 0;
	        rword = lo & 0x3ffffff;
	        ncarry = (ncarry + (lo >>> 26)) | 0;

	        hncarry += ncarry >>> 26;
	        ncarry &= 0x3ffffff;
	      }
	      out.words[k] = rword;
	      carry = ncarry;
	      ncarry = hncarry;
	    }
	    if (carry !== 0) {
	      out.words[k] = carry;
	    } else {
	      out.length--;
	    }

	    return out._strip();
	  }

	  function jumboMulTo (self, num, out) {
	    // Temporary disable, see https://github.com/indutny/bn.js/issues/211
	    // var fftm = new FFTM();
	    // return fftm.mulp(self, num, out);
	    return bigMulTo(self, num, out);
	  }

	  BN.prototype.mulTo = function mulTo (num, out) {
	    var res;
	    var len = this.length + num.length;
	    if (this.length === 10 && num.length === 10) {
	      res = comb10MulTo(this, num, out);
	    } else if (len < 63) {
	      res = smallMulTo(this, num, out);
	    } else if (len < 1024) {
	      res = bigMulTo(this, num, out);
	    } else {
	      res = jumboMulTo(this, num, out);
	    }

	    return res;
	  };

	  // Multiply `this` by `num`
	  BN.prototype.mul = function mul (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return this.mulTo(num, out);
	  };

	  // Multiply employing FFT
	  BN.prototype.mulf = function mulf (num) {
	    var out = new BN(null);
	    out.words = new Array(this.length + num.length);
	    return jumboMulTo(this, num, out);
	  };

	  // In-place Multiplication
	  BN.prototype.imul = function imul (num) {
	    return this.clone().mulTo(num, this);
	  };

	  BN.prototype.imuln = function imuln (num) {
	    var isNegNum = num < 0;
	    if (isNegNum) num = -num;

	    assert(typeof num === 'number');
	    assert(num < 0x4000000);

	    // Carry
	    var carry = 0;
	    for (var i = 0; i < this.length; i++) {
	      var w = (this.words[i] | 0) * num;
	      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
	      carry >>= 26;
	      carry += (w / 0x4000000) | 0;
	      // NOTE: lo is 27bit maximum
	      carry += lo >>> 26;
	      this.words[i] = lo & 0x3ffffff;
	    }

	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }

	    return isNegNum ? this.ineg() : this;
	  };

	  BN.prototype.muln = function muln (num) {
	    return this.clone().imuln(num);
	  };

	  // `this` * `this`
	  BN.prototype.sqr = function sqr () {
	    return this.mul(this);
	  };

	  // `this` * `this` in-place
	  BN.prototype.isqr = function isqr () {
	    return this.imul(this.clone());
	  };

	  // Math.pow(`this`, `num`)
	  BN.prototype.pow = function pow (num) {
	    var w = toBitArray(num);
	    if (w.length === 0) return new BN(1);

	    // Skip leading zeroes
	    var res = this;
	    for (var i = 0; i < w.length; i++, res = res.sqr()) {
	      if (w[i] !== 0) break;
	    }

	    if (++i < w.length) {
	      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
	        if (w[i] === 0) continue;

	        res = res.mul(q);
	      }
	    }

	    return res;
	  };

	  // Shift-left in-place
	  BN.prototype.iushln = function iushln (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;
	    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
	    var i;

	    if (r !== 0) {
	      var carry = 0;

	      for (i = 0; i < this.length; i++) {
	        var newCarry = this.words[i] & carryMask;
	        var c = ((this.words[i] | 0) - newCarry) << r;
	        this.words[i] = c | carry;
	        carry = newCarry >>> (26 - r);
	      }

	      if (carry) {
	        this.words[i] = carry;
	        this.length++;
	      }
	    }

	    if (s !== 0) {
	      for (i = this.length - 1; i >= 0; i--) {
	        this.words[i + s] = this.words[i];
	      }

	      for (i = 0; i < s; i++) {
	        this.words[i] = 0;
	      }

	      this.length += s;
	    }

	    return this._strip();
	  };

	  BN.prototype.ishln = function ishln (bits) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushln(bits);
	  };

	  // Shift-right in-place
	  // NOTE: `hint` is a lowest bit before trailing zeroes
	  // NOTE: if `extended` is present - it will be filled with destroyed bits
	  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var h;
	    if (hint) {
	      h = (hint - (hint % 26)) / 26;
	    } else {
	      h = 0;
	    }

	    var r = bits % 26;
	    var s = Math.min((bits - r) / 26, this.length);
	    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	    var maskedWords = extended;

	    h -= s;
	    h = Math.max(0, h);

	    // Extended mode, copy masked part
	    if (maskedWords) {
	      for (var i = 0; i < s; i++) {
	        maskedWords.words[i] = this.words[i];
	      }
	      maskedWords.length = s;
	    }

	    if (s === 0) ; else if (this.length > s) {
	      this.length -= s;
	      for (i = 0; i < this.length; i++) {
	        this.words[i] = this.words[i + s];
	      }
	    } else {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    var carry = 0;
	    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
	      var word = this.words[i] | 0;
	      this.words[i] = (carry << (26 - r)) | (word >>> r);
	      carry = word & mask;
	    }

	    // Push carried bits as a mask
	    if (maskedWords && carry !== 0) {
	      maskedWords.words[maskedWords.length++] = carry;
	    }

	    if (this.length === 0) {
	      this.words[0] = 0;
	      this.length = 1;
	    }

	    return this._strip();
	  };

	  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
	    // TODO(indutny): implement me
	    assert(this.negative === 0);
	    return this.iushrn(bits, hint, extended);
	  };

	  // Shift-left
	  BN.prototype.shln = function shln (bits) {
	    return this.clone().ishln(bits);
	  };

	  BN.prototype.ushln = function ushln (bits) {
	    return this.clone().iushln(bits);
	  };

	  // Shift-right
	  BN.prototype.shrn = function shrn (bits) {
	    return this.clone().ishrn(bits);
	  };

	  BN.prototype.ushrn = function ushrn (bits) {
	    return this.clone().iushrn(bits);
	  };

	  // Test if n bit is set
	  BN.prototype.testn = function testn (bit) {
	    assert(typeof bit === 'number' && bit >= 0);
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) return false;

	    // Check bit and return
	    var w = this.words[s];

	    return !!(w & q);
	  };

	  // Return only lowers bits of number (in-place)
	  BN.prototype.imaskn = function imaskn (bits) {
	    assert(typeof bits === 'number' && bits >= 0);
	    var r = bits % 26;
	    var s = (bits - r) / 26;

	    assert(this.negative === 0, 'imaskn works only with positive numbers');

	    if (this.length <= s) {
	      return this;
	    }

	    if (r !== 0) {
	      s++;
	    }
	    this.length = Math.min(s, this.length);

	    if (r !== 0) {
	      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
	      this.words[this.length - 1] &= mask;
	    }

	    return this._strip();
	  };

	  // Return only lowers bits of number
	  BN.prototype.maskn = function maskn (bits) {
	    return this.clone().imaskn(bits);
	  };

	  // Add plain number `num` to `this`
	  BN.prototype.iaddn = function iaddn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) return this.isubn(-num);

	    // Possible sign change
	    if (this.negative !== 0) {
	      if (this.length === 1 && (this.words[0] | 0) <= num) {
	        this.words[0] = num - (this.words[0] | 0);
	        this.negative = 0;
	        return this;
	      }

	      this.negative = 0;
	      this.isubn(num);
	      this.negative = 1;
	      return this;
	    }

	    // Add without checks
	    return this._iaddn(num);
	  };

	  BN.prototype._iaddn = function _iaddn (num) {
	    this.words[0] += num;

	    // Carry
	    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
	      this.words[i] -= 0x4000000;
	      if (i === this.length - 1) {
	        this.words[i + 1] = 1;
	      } else {
	        this.words[i + 1]++;
	      }
	    }
	    this.length = Math.max(this.length, i + 1);

	    return this;
	  };

	  // Subtract plain number `num` from `this`
	  BN.prototype.isubn = function isubn (num) {
	    assert(typeof num === 'number');
	    assert(num < 0x4000000);
	    if (num < 0) return this.iaddn(-num);

	    if (this.negative !== 0) {
	      this.negative = 0;
	      this.iaddn(num);
	      this.negative = 1;
	      return this;
	    }

	    this.words[0] -= num;

	    if (this.length === 1 && this.words[0] < 0) {
	      this.words[0] = -this.words[0];
	      this.negative = 1;
	    } else {
	      // Carry
	      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
	        this.words[i] += 0x4000000;
	        this.words[i + 1] -= 1;
	      }
	    }

	    return this._strip();
	  };

	  BN.prototype.addn = function addn (num) {
	    return this.clone().iaddn(num);
	  };

	  BN.prototype.subn = function subn (num) {
	    return this.clone().isubn(num);
	  };

	  BN.prototype.iabs = function iabs () {
	    this.negative = 0;

	    return this;
	  };

	  BN.prototype.abs = function abs () {
	    return this.clone().iabs();
	  };

	  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
	    var len = num.length + shift;
	    var i;

	    this._expand(len);

	    var w;
	    var carry = 0;
	    for (i = 0; i < num.length; i++) {
	      w = (this.words[i + shift] | 0) + carry;
	      var right = (num.words[i] | 0) * mul;
	      w -= right & 0x3ffffff;
	      carry = (w >> 26) - ((right / 0x4000000) | 0);
	      this.words[i + shift] = w & 0x3ffffff;
	    }
	    for (; i < this.length - shift; i++) {
	      w = (this.words[i + shift] | 0) + carry;
	      carry = w >> 26;
	      this.words[i + shift] = w & 0x3ffffff;
	    }

	    if (carry === 0) return this._strip();

	    // Subtraction overflow
	    assert(carry === -1);
	    carry = 0;
	    for (i = 0; i < this.length; i++) {
	      w = -(this.words[i] | 0) + carry;
	      carry = w >> 26;
	      this.words[i] = w & 0x3ffffff;
	    }
	    this.negative = 1;

	    return this._strip();
	  };

	  BN.prototype._wordDiv = function _wordDiv (num, mode) {
	    var shift = this.length - num.length;

	    var a = this.clone();
	    var b = num;

	    // Normalize
	    var bhi = b.words[b.length - 1] | 0;
	    var bhiBits = this._countBits(bhi);
	    shift = 26 - bhiBits;
	    if (shift !== 0) {
	      b = b.ushln(shift);
	      a.iushln(shift);
	      bhi = b.words[b.length - 1] | 0;
	    }

	    // Initialize quotient
	    var m = a.length - b.length;
	    var q;

	    if (mode !== 'mod') {
	      q = new BN(null);
	      q.length = m + 1;
	      q.words = new Array(q.length);
	      for (var i = 0; i < q.length; i++) {
	        q.words[i] = 0;
	      }
	    }

	    var diff = a.clone()._ishlnsubmul(b, 1, m);
	    if (diff.negative === 0) {
	      a = diff;
	      if (q) {
	        q.words[m] = 1;
	      }
	    }

	    for (var j = m - 1; j >= 0; j--) {
	      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
	        (a.words[b.length + j - 1] | 0);

	      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
	      // (0x7ffffff)
	      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

	      a._ishlnsubmul(b, qj, j);
	      while (a.negative !== 0) {
	        qj--;
	        a.negative = 0;
	        a._ishlnsubmul(b, 1, j);
	        if (!a.isZero()) {
	          a.negative ^= 1;
	        }
	      }
	      if (q) {
	        q.words[j] = qj;
	      }
	    }
	    if (q) {
	      q._strip();
	    }
	    a._strip();

	    // Denormalize
	    if (mode !== 'div' && shift !== 0) {
	      a.iushrn(shift);
	    }

	    return {
	      div: q || null,
	      mod: a
	    };
	  };

	  // NOTE: 1) `mode` can be set to `mod` to request mod only,
	  //       to `div` to request div only, or be absent to
	  //       request both div & mod
	  //       2) `positive` is true if unsigned mod is requested
	  BN.prototype.divmod = function divmod (num, mode, positive) {
	    assert(!num.isZero());

	    if (this.isZero()) {
	      return {
	        div: new BN(0),
	        mod: new BN(0)
	      };
	    }

	    var div, mod, res;
	    if (this.negative !== 0 && num.negative === 0) {
	      res = this.neg().divmod(num, mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.iadd(num);
	        }
	      }

	      return {
	        div: div,
	        mod: mod
	      };
	    }

	    if (this.negative === 0 && num.negative !== 0) {
	      res = this.divmod(num.neg(), mode);

	      if (mode !== 'mod') {
	        div = res.div.neg();
	      }

	      return {
	        div: div,
	        mod: res.mod
	      };
	    }

	    if ((this.negative & num.negative) !== 0) {
	      res = this.neg().divmod(num.neg(), mode);

	      if (mode !== 'div') {
	        mod = res.mod.neg();
	        if (positive && mod.negative !== 0) {
	          mod.isub(num);
	        }
	      }

	      return {
	        div: res.div,
	        mod: mod
	      };
	    }

	    // Both numbers are positive at this point

	    // Strip both numbers to approximate shift value
	    if (num.length > this.length || this.cmp(num) < 0) {
	      return {
	        div: new BN(0),
	        mod: this
	      };
	    }

	    // Very short reduction
	    if (num.length === 1) {
	      if (mode === 'div') {
	        return {
	          div: this.divn(num.words[0]),
	          mod: null
	        };
	      }

	      if (mode === 'mod') {
	        return {
	          div: null,
	          mod: new BN(this.modrn(num.words[0]))
	        };
	      }

	      return {
	        div: this.divn(num.words[0]),
	        mod: new BN(this.modrn(num.words[0]))
	      };
	    }

	    return this._wordDiv(num, mode);
	  };

	  // Find `this` / `num`
	  BN.prototype.div = function div (num) {
	    return this.divmod(num, 'div', false).div;
	  };

	  // Find `this` % `num`
	  BN.prototype.mod = function mod (num) {
	    return this.divmod(num, 'mod', false).mod;
	  };

	  BN.prototype.umod = function umod (num) {
	    return this.divmod(num, 'mod', true).mod;
	  };

	  // Find Round(`this` / `num`)
	  BN.prototype.divRound = function divRound (num) {
	    var dm = this.divmod(num);

	    // Fast case - exact division
	    if (dm.mod.isZero()) return dm.div;

	    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

	    var half = num.ushrn(1);
	    var r2 = num.andln(1);
	    var cmp = mod.cmp(half);

	    // Round down
	    if (cmp < 0 || (r2 === 1 && cmp === 0)) return dm.div;

	    // Round up
	    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
	  };

	  BN.prototype.modrn = function modrn (num) {
	    var isNegNum = num < 0;
	    if (isNegNum) num = -num;

	    assert(num <= 0x3ffffff);
	    var p = (1 << 26) % num;

	    var acc = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      acc = (p * acc + (this.words[i] | 0)) % num;
	    }

	    return isNegNum ? -acc : acc;
	  };

	  // WARNING: DEPRECATED
	  BN.prototype.modn = function modn (num) {
	    return this.modrn(num);
	  };

	  // In-place division by number
	  BN.prototype.idivn = function idivn (num) {
	    var isNegNum = num < 0;
	    if (isNegNum) num = -num;

	    assert(num <= 0x3ffffff);

	    var carry = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var w = (this.words[i] | 0) + carry * 0x4000000;
	      this.words[i] = (w / num) | 0;
	      carry = w % num;
	    }

	    this._strip();
	    return isNegNum ? this.ineg() : this;
	  };

	  BN.prototype.divn = function divn (num) {
	    return this.clone().idivn(num);
	  };

	  BN.prototype.egcd = function egcd (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var x = this;
	    var y = p.clone();

	    if (x.negative !== 0) {
	      x = x.umod(p);
	    } else {
	      x = x.clone();
	    }

	    // A * x + B * y = x
	    var A = new BN(1);
	    var B = new BN(0);

	    // C * x + D * y = y
	    var C = new BN(0);
	    var D = new BN(1);

	    var g = 0;

	    while (x.isEven() && y.isEven()) {
	      x.iushrn(1);
	      y.iushrn(1);
	      ++g;
	    }

	    var yp = y.clone();
	    var xp = x.clone();

	    while (!x.isZero()) {
	      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
	      if (i > 0) {
	        x.iushrn(i);
	        while (i-- > 0) {
	          if (A.isOdd() || B.isOdd()) {
	            A.iadd(yp);
	            B.isub(xp);
	          }

	          A.iushrn(1);
	          B.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
	      if (j > 0) {
	        y.iushrn(j);
	        while (j-- > 0) {
	          if (C.isOdd() || D.isOdd()) {
	            C.iadd(yp);
	            D.isub(xp);
	          }

	          C.iushrn(1);
	          D.iushrn(1);
	        }
	      }

	      if (x.cmp(y) >= 0) {
	        x.isub(y);
	        A.isub(C);
	        B.isub(D);
	      } else {
	        y.isub(x);
	        C.isub(A);
	        D.isub(B);
	      }
	    }

	    return {
	      a: C,
	      b: D,
	      gcd: y.iushln(g)
	    };
	  };

	  // This is reduced incarnation of the binary EEA
	  // above, designated to invert members of the
	  // _prime_ fields F(p) at a maximal speed
	  BN.prototype._invmp = function _invmp (p) {
	    assert(p.negative === 0);
	    assert(!p.isZero());

	    var a = this;
	    var b = p.clone();

	    if (a.negative !== 0) {
	      a = a.umod(p);
	    } else {
	      a = a.clone();
	    }

	    var x1 = new BN(1);
	    var x2 = new BN(0);

	    var delta = b.clone();

	    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
	      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
	      if (i > 0) {
	        a.iushrn(i);
	        while (i-- > 0) {
	          if (x1.isOdd()) {
	            x1.iadd(delta);
	          }

	          x1.iushrn(1);
	        }
	      }

	      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
	      if (j > 0) {
	        b.iushrn(j);
	        while (j-- > 0) {
	          if (x2.isOdd()) {
	            x2.iadd(delta);
	          }

	          x2.iushrn(1);
	        }
	      }

	      if (a.cmp(b) >= 0) {
	        a.isub(b);
	        x1.isub(x2);
	      } else {
	        b.isub(a);
	        x2.isub(x1);
	      }
	    }

	    var res;
	    if (a.cmpn(1) === 0) {
	      res = x1;
	    } else {
	      res = x2;
	    }

	    if (res.cmpn(0) < 0) {
	      res.iadd(p);
	    }

	    return res;
	  };

	  BN.prototype.gcd = function gcd (num) {
	    if (this.isZero()) return num.abs();
	    if (num.isZero()) return this.abs();

	    var a = this.clone();
	    var b = num.clone();
	    a.negative = 0;
	    b.negative = 0;

	    // Remove common factor of two
	    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
	      a.iushrn(1);
	      b.iushrn(1);
	    }

	    do {
	      while (a.isEven()) {
	        a.iushrn(1);
	      }
	      while (b.isEven()) {
	        b.iushrn(1);
	      }

	      var r = a.cmp(b);
	      if (r < 0) {
	        // Swap `a` and `b` to make `a` always bigger than `b`
	        var t = a;
	        a = b;
	        b = t;
	      } else if (r === 0 || b.cmpn(1) === 0) {
	        break;
	      }

	      a.isub(b);
	    } while (true);

	    return b.iushln(shift);
	  };

	  // Invert number in the field F(num)
	  BN.prototype.invm = function invm (num) {
	    return this.egcd(num).a.umod(num);
	  };

	  BN.prototype.isEven = function isEven () {
	    return (this.words[0] & 1) === 0;
	  };

	  BN.prototype.isOdd = function isOdd () {
	    return (this.words[0] & 1) === 1;
	  };

	  // And first word and num
	  BN.prototype.andln = function andln (num) {
	    return this.words[0] & num;
	  };

	  // Increment at the bit position in-line
	  BN.prototype.bincn = function bincn (bit) {
	    assert(typeof bit === 'number');
	    var r = bit % 26;
	    var s = (bit - r) / 26;
	    var q = 1 << r;

	    // Fast case: bit is much higher than all existing words
	    if (this.length <= s) {
	      this._expand(s + 1);
	      this.words[s] |= q;
	      return this;
	    }

	    // Add bit and propagate, if needed
	    var carry = q;
	    for (var i = s; carry !== 0 && i < this.length; i++) {
	      var w = this.words[i] | 0;
	      w += carry;
	      carry = w >>> 26;
	      w &= 0x3ffffff;
	      this.words[i] = w;
	    }
	    if (carry !== 0) {
	      this.words[i] = carry;
	      this.length++;
	    }
	    return this;
	  };

	  BN.prototype.isZero = function isZero () {
	    return this.length === 1 && this.words[0] === 0;
	  };

	  BN.prototype.cmpn = function cmpn (num) {
	    var negative = num < 0;

	    if (this.negative !== 0 && !negative) return -1;
	    if (this.negative === 0 && negative) return 1;

	    this._strip();

	    var res;
	    if (this.length > 1) {
	      res = 1;
	    } else {
	      if (negative) {
	        num = -num;
	      }

	      assert(num <= 0x3ffffff, 'Number is too big');

	      var w = this.words[0] | 0;
	      res = w === num ? 0 : w < num ? -1 : 1;
	    }
	    if (this.negative !== 0) return -res | 0;
	    return res;
	  };

	  // Compare two numbers and return:
	  // 1 - if `this` > `num`
	  // 0 - if `this` == `num`
	  // -1 - if `this` < `num`
	  BN.prototype.cmp = function cmp (num) {
	    if (this.negative !== 0 && num.negative === 0) return -1;
	    if (this.negative === 0 && num.negative !== 0) return 1;

	    var res = this.ucmp(num);
	    if (this.negative !== 0) return -res | 0;
	    return res;
	  };

	  // Unsigned comparison
	  BN.prototype.ucmp = function ucmp (num) {
	    // At this point both numbers have the same sign
	    if (this.length > num.length) return 1;
	    if (this.length < num.length) return -1;

	    var res = 0;
	    for (var i = this.length - 1; i >= 0; i--) {
	      var a = this.words[i] | 0;
	      var b = num.words[i] | 0;

	      if (a === b) continue;
	      if (a < b) {
	        res = -1;
	      } else if (a > b) {
	        res = 1;
	      }
	      break;
	    }
	    return res;
	  };

	  BN.prototype.gtn = function gtn (num) {
	    return this.cmpn(num) === 1;
	  };

	  BN.prototype.gt = function gt (num) {
	    return this.cmp(num) === 1;
	  };

	  BN.prototype.gten = function gten (num) {
	    return this.cmpn(num) >= 0;
	  };

	  BN.prototype.gte = function gte (num) {
	    return this.cmp(num) >= 0;
	  };

	  BN.prototype.ltn = function ltn (num) {
	    return this.cmpn(num) === -1;
	  };

	  BN.prototype.lt = function lt (num) {
	    return this.cmp(num) === -1;
	  };

	  BN.prototype.lten = function lten (num) {
	    return this.cmpn(num) <= 0;
	  };

	  BN.prototype.lte = function lte (num) {
	    return this.cmp(num) <= 0;
	  };

	  BN.prototype.eqn = function eqn (num) {
	    return this.cmpn(num) === 0;
	  };

	  BN.prototype.eq = function eq (num) {
	    return this.cmp(num) === 0;
	  };

	  //
	  // A reduce context, could be using montgomery or something better, depending
	  // on the `m` itself.
	  //
	  BN.red = function red (num) {
	    return new Red(num);
	  };

	  BN.prototype.toRed = function toRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    assert(this.negative === 0, 'red works only with positives');
	    return ctx.convertTo(this)._forceRed(ctx);
	  };

	  BN.prototype.fromRed = function fromRed () {
	    assert(this.red, 'fromRed works only with numbers in reduction context');
	    return this.red.convertFrom(this);
	  };

	  BN.prototype._forceRed = function _forceRed (ctx) {
	    this.red = ctx;
	    return this;
	  };

	  BN.prototype.forceRed = function forceRed (ctx) {
	    assert(!this.red, 'Already a number in reduction context');
	    return this._forceRed(ctx);
	  };

	  BN.prototype.redAdd = function redAdd (num) {
	    assert(this.red, 'redAdd works only with red numbers');
	    return this.red.add(this, num);
	  };

	  BN.prototype.redIAdd = function redIAdd (num) {
	    assert(this.red, 'redIAdd works only with red numbers');
	    return this.red.iadd(this, num);
	  };

	  BN.prototype.redSub = function redSub (num) {
	    assert(this.red, 'redSub works only with red numbers');
	    return this.red.sub(this, num);
	  };

	  BN.prototype.redISub = function redISub (num) {
	    assert(this.red, 'redISub works only with red numbers');
	    return this.red.isub(this, num);
	  };

	  BN.prototype.redShl = function redShl (num) {
	    assert(this.red, 'redShl works only with red numbers');
	    return this.red.shl(this, num);
	  };

	  BN.prototype.redMul = function redMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.mul(this, num);
	  };

	  BN.prototype.redIMul = function redIMul (num) {
	    assert(this.red, 'redMul works only with red numbers');
	    this.red._verify2(this, num);
	    return this.red.imul(this, num);
	  };

	  BN.prototype.redSqr = function redSqr () {
	    assert(this.red, 'redSqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqr(this);
	  };

	  BN.prototype.redISqr = function redISqr () {
	    assert(this.red, 'redISqr works only with red numbers');
	    this.red._verify1(this);
	    return this.red.isqr(this);
	  };

	  // Square root over p
	  BN.prototype.redSqrt = function redSqrt () {
	    assert(this.red, 'redSqrt works only with red numbers');
	    this.red._verify1(this);
	    return this.red.sqrt(this);
	  };

	  BN.prototype.redInvm = function redInvm () {
	    assert(this.red, 'redInvm works only with red numbers');
	    this.red._verify1(this);
	    return this.red.invm(this);
	  };

	  // Return negative clone of `this` % `red modulo`
	  BN.prototype.redNeg = function redNeg () {
	    assert(this.red, 'redNeg works only with red numbers');
	    this.red._verify1(this);
	    return this.red.neg(this);
	  };

	  BN.prototype.redPow = function redPow (num) {
	    assert(this.red && !num.red, 'redPow(normalNum)');
	    this.red._verify1(this);
	    return this.red.pow(this, num);
	  };

	  // Prime numbers with efficient reduction
	  var primes = {
	    k256: null,
	    p224: null,
	    p192: null,
	    p25519: null
	  };

	  // Pseudo-Mersenne prime
	  function MPrime (name, p) {
	    // P = 2 ^ N - K
	    this.name = name;
	    this.p = new BN(p, 16);
	    this.n = this.p.bitLength();
	    this.k = new BN(1).iushln(this.n).isub(this.p);

	    this.tmp = this._tmp();
	  }

	  MPrime.prototype._tmp = function _tmp () {
	    var tmp = new BN(null);
	    tmp.words = new Array(Math.ceil(this.n / 13));
	    return tmp;
	  };

	  MPrime.prototype.ireduce = function ireduce (num) {
	    // Assumes that `num` is less than `P^2`
	    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
	    var r = num;
	    var rlen;

	    do {
	      this.split(r, this.tmp);
	      r = this.imulK(r);
	      r = r.iadd(this.tmp);
	      rlen = r.bitLength();
	    } while (rlen > this.n);

	    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
	    if (cmp === 0) {
	      r.words[0] = 0;
	      r.length = 1;
	    } else if (cmp > 0) {
	      r.isub(this.p);
	    } else {
	      if (r.strip !== undefined) {
	        // r is a BN v4 instance
	        r.strip();
	      } else {
	        // r is a BN v5 instance
	        r._strip();
	      }
	    }

	    return r;
	  };

	  MPrime.prototype.split = function split (input, out) {
	    input.iushrn(this.n, 0, out);
	  };

	  MPrime.prototype.imulK = function imulK (num) {
	    return num.imul(this.k);
	  };

	  function K256 () {
	    MPrime.call(
	      this,
	      'k256',
	      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
	  }
	  inherits(K256, MPrime);

	  K256.prototype.split = function split (input, output) {
	    // 256 = 9 * 26 + 22
	    var mask = 0x3fffff;

	    var outLen = Math.min(input.length, 9);
	    for (var i = 0; i < outLen; i++) {
	      output.words[i] = input.words[i];
	    }
	    output.length = outLen;

	    if (input.length <= 9) {
	      input.words[0] = 0;
	      input.length = 1;
	      return;
	    }

	    // Shift by 9 limbs
	    var prev = input.words[9];
	    output.words[output.length++] = prev & mask;

	    for (i = 10; i < input.length; i++) {
	      var next = input.words[i] | 0;
	      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
	      prev = next;
	    }
	    prev >>>= 22;
	    input.words[i - 10] = prev;
	    if (prev === 0 && input.length > 10) {
	      input.length -= 10;
	    } else {
	      input.length -= 9;
	    }
	  };

	  K256.prototype.imulK = function imulK (num) {
	    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
	    num.words[num.length] = 0;
	    num.words[num.length + 1] = 0;
	    num.length += 2;

	    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
	    var lo = 0;
	    for (var i = 0; i < num.length; i++) {
	      var w = num.words[i] | 0;
	      lo += w * 0x3d1;
	      num.words[i] = lo & 0x3ffffff;
	      lo = w * 0x40 + ((lo / 0x4000000) | 0);
	    }

	    // Fast length reduction
	    if (num.words[num.length - 1] === 0) {
	      num.length--;
	      if (num.words[num.length - 1] === 0) {
	        num.length--;
	      }
	    }
	    return num;
	  };

	  function P224 () {
	    MPrime.call(
	      this,
	      'p224',
	      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
	  }
	  inherits(P224, MPrime);

	  function P192 () {
	    MPrime.call(
	      this,
	      'p192',
	      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
	  }
	  inherits(P192, MPrime);

	  function P25519 () {
	    // 2 ^ 255 - 19
	    MPrime.call(
	      this,
	      '25519',
	      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
	  }
	  inherits(P25519, MPrime);

	  P25519.prototype.imulK = function imulK (num) {
	    // K = 0x13
	    var carry = 0;
	    for (var i = 0; i < num.length; i++) {
	      var hi = (num.words[i] | 0) * 0x13 + carry;
	      var lo = hi & 0x3ffffff;
	      hi >>>= 26;

	      num.words[i] = lo;
	      carry = hi;
	    }
	    if (carry !== 0) {
	      num.words[num.length++] = carry;
	    }
	    return num;
	  };

	  // Exported mostly for testing purposes, use plain name instead
	  BN._prime = function prime (name) {
	    // Cached version of prime
	    if (primes[name]) return primes[name];

	    var prime;
	    if (name === 'k256') {
	      prime = new K256();
	    } else if (name === 'p224') {
	      prime = new P224();
	    } else if (name === 'p192') {
	      prime = new P192();
	    } else if (name === 'p25519') {
	      prime = new P25519();
	    } else {
	      throw new Error('Unknown prime ' + name);
	    }
	    primes[name] = prime;

	    return prime;
	  };

	  //
	  // Base reduction engine
	  //
	  function Red (m) {
	    if (typeof m === 'string') {
	      var prime = BN._prime(m);
	      this.m = prime.p;
	      this.prime = prime;
	    } else {
	      assert(m.gtn(1), 'modulus must be greater than 1');
	      this.m = m;
	      this.prime = null;
	    }
	  }

	  Red.prototype._verify1 = function _verify1 (a) {
	    assert(a.negative === 0, 'red works only with positives');
	    assert(a.red, 'red works only with red numbers');
	  };

	  Red.prototype._verify2 = function _verify2 (a, b) {
	    assert((a.negative | b.negative) === 0, 'red works only with positives');
	    assert(a.red && a.red === b.red,
	      'red works only with red numbers');
	  };

	  Red.prototype.imod = function imod (a) {
	    if (this.prime) return this.prime.ireduce(a)._forceRed(this);

	    move(a, a.umod(this.m)._forceRed(this));
	    return a;
	  };

	  Red.prototype.neg = function neg (a) {
	    if (a.isZero()) {
	      return a.clone();
	    }

	    return this.m.sub(a)._forceRed(this);
	  };

	  Red.prototype.add = function add (a, b) {
	    this._verify2(a, b);

	    var res = a.add(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.iadd = function iadd (a, b) {
	    this._verify2(a, b);

	    var res = a.iadd(b);
	    if (res.cmp(this.m) >= 0) {
	      res.isub(this.m);
	    }
	    return res;
	  };

	  Red.prototype.sub = function sub (a, b) {
	    this._verify2(a, b);

	    var res = a.sub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res._forceRed(this);
	  };

	  Red.prototype.isub = function isub (a, b) {
	    this._verify2(a, b);

	    var res = a.isub(b);
	    if (res.cmpn(0) < 0) {
	      res.iadd(this.m);
	    }
	    return res;
	  };

	  Red.prototype.shl = function shl (a, num) {
	    this._verify1(a);
	    return this.imod(a.ushln(num));
	  };

	  Red.prototype.imul = function imul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.imul(b));
	  };

	  Red.prototype.mul = function mul (a, b) {
	    this._verify2(a, b);
	    return this.imod(a.mul(b));
	  };

	  Red.prototype.isqr = function isqr (a) {
	    return this.imul(a, a.clone());
	  };

	  Red.prototype.sqr = function sqr (a) {
	    return this.mul(a, a);
	  };

	  Red.prototype.sqrt = function sqrt (a) {
	    if (a.isZero()) return a.clone();

	    var mod3 = this.m.andln(3);
	    assert(mod3 % 2 === 1);

	    // Fast case
	    if (mod3 === 3) {
	      var pow = this.m.add(new BN(1)).iushrn(2);
	      return this.pow(a, pow);
	    }

	    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
	    //
	    // Find Q and S, that Q * 2 ^ S = (P - 1)
	    var q = this.m.subn(1);
	    var s = 0;
	    while (!q.isZero() && q.andln(1) === 0) {
	      s++;
	      q.iushrn(1);
	    }
	    assert(!q.isZero());

	    var one = new BN(1).toRed(this);
	    var nOne = one.redNeg();

	    // Find quadratic non-residue
	    // NOTE: Max is such because of generalized Riemann hypothesis.
	    var lpow = this.m.subn(1).iushrn(1);
	    var z = this.m.bitLength();
	    z = new BN(2 * z * z).toRed(this);

	    while (this.pow(z, lpow).cmp(nOne) !== 0) {
	      z.redIAdd(nOne);
	    }

	    var c = this.pow(z, q);
	    var r = this.pow(a, q.addn(1).iushrn(1));
	    var t = this.pow(a, q);
	    var m = s;
	    while (t.cmp(one) !== 0) {
	      var tmp = t;
	      for (var i = 0; tmp.cmp(one) !== 0; i++) {
	        tmp = tmp.redSqr();
	      }
	      assert(i < m);
	      var b = this.pow(c, new BN(1).iushln(m - i - 1));

	      r = r.redMul(b);
	      c = b.redSqr();
	      t = t.redMul(c);
	      m = i;
	    }

	    return r;
	  };

	  Red.prototype.invm = function invm (a) {
	    var inv = a._invmp(this.m);
	    if (inv.negative !== 0) {
	      inv.negative = 0;
	      return this.imod(inv).redNeg();
	    } else {
	      return this.imod(inv);
	    }
	  };

	  Red.prototype.pow = function pow (a, num) {
	    if (num.isZero()) return new BN(1).toRed(this);
	    if (num.cmpn(1) === 0) return a.clone();

	    var windowSize = 4;
	    var wnd = new Array(1 << windowSize);
	    wnd[0] = new BN(1).toRed(this);
	    wnd[1] = a;
	    for (var i = 2; i < wnd.length; i++) {
	      wnd[i] = this.mul(wnd[i - 1], a);
	    }

	    var res = wnd[0];
	    var current = 0;
	    var currentLen = 0;
	    var start = num.bitLength() % 26;
	    if (start === 0) {
	      start = 26;
	    }

	    for (i = num.length - 1; i >= 0; i--) {
	      var word = num.words[i];
	      for (var j = start - 1; j >= 0; j--) {
	        var bit = (word >> j) & 1;
	        if (res !== wnd[0]) {
	          res = this.sqr(res);
	        }

	        if (bit === 0 && current === 0) {
	          currentLen = 0;
	          continue;
	        }

	        current <<= 1;
	        current |= bit;
	        currentLen++;
	        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

	        res = this.mul(res, wnd[current]);
	        currentLen = 0;
	        current = 0;
	      }
	      start = 26;
	    }

	    return res;
	  };

	  Red.prototype.convertTo = function convertTo (num) {
	    var r = num.umod(this.m);

	    return r === num ? r.clone() : r;
	  };

	  Red.prototype.convertFrom = function convertFrom (num) {
	    var res = num.clone();
	    res.red = null;
	    return res;
	  };

	  //
	  // Montgomery method engine
	  //

	  BN.mont = function mont (num) {
	    return new Mont(num);
	  };

	  function Mont (m) {
	    Red.call(this, m);

	    this.shift = this.m.bitLength();
	    if (this.shift % 26 !== 0) {
	      this.shift += 26 - (this.shift % 26);
	    }

	    this.r = new BN(1).iushln(this.shift);
	    this.r2 = this.imod(this.r.sqr());
	    this.rinv = this.r._invmp(this.m);

	    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
	    this.minv = this.minv.umod(this.r);
	    this.minv = this.r.sub(this.minv);
	  }
	  inherits(Mont, Red);

	  Mont.prototype.convertTo = function convertTo (num) {
	    return this.imod(num.ushln(this.shift));
	  };

	  Mont.prototype.convertFrom = function convertFrom (num) {
	    var r = this.imod(num.mul(this.rinv));
	    r.red = null;
	    return r;
	  };

	  Mont.prototype.imul = function imul (a, b) {
	    if (a.isZero() || b.isZero()) {
	      a.words[0] = 0;
	      a.length = 1;
	      return a;
	    }

	    var t = a.imul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;

	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.mul = function mul (a, b) {
	    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

	    var t = a.mul(b);
	    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
	    var u = t.isub(c).iushrn(this.shift);
	    var res = u;
	    if (u.cmp(this.m) >= 0) {
	      res = u.isub(this.m);
	    } else if (u.cmpn(0) < 0) {
	      res = u.iadd(this.m);
	    }

	    return res._forceRed(this);
	  };

	  Mont.prototype.invm = function invm (a) {
	    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
	    var res = this.imod(a._invmp(this.m).mul(this.r2));
	    return res._forceRed(this);
	  };
	})(module, commonjsGlobal);
} (bn));

var BN = bn.exports;

var safeBuffer = {exports: {}};

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */

(function (module, exports) {
	/* eslint-disable node/no-deprecated-api */
	var buffer = require$$0$2;
	var Buffer = buffer.Buffer;

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key];
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer;
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer, exports);
	  exports.Buffer = SafeBuffer;
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	SafeBuffer.prototype = Object.create(Buffer.prototype);

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer);

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	};

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size);
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding);
	    } else {
	      buf.fill(fill);
	    }
	  } else {
	    buf.fill(0);
	  }
	  return buf
	};

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	};

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer.SlowBuffer(size)
	};
} (safeBuffer, safeBuffer.exports));

// base-x encoding / decoding
// Copyright (c) 2018 base-x contributors
// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
// Distributed under the MIT software license, see the accompanying
// file LICENSE or http://www.opensource.org/licenses/mit-license.php.
// @ts-ignore
var _Buffer = safeBuffer.exports.Buffer;
function base (ALPHABET) {
  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up
  var iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up
  function encode (source) {
    if (Array.isArray(source) || source instanceof Uint8Array) { source = _Buffer.from(source); }
    if (!_Buffer.isBuffer(source)) { throw new TypeError('Expected Buffer') }
    if (source.length === 0) { return '' }
        // Skip & count leading zeroes.
    var zeroes = 0;
    var length = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
        // Allocate enough space in big-endian base58 representation.
    var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
    var b58 = new Uint8Array(size);
        // Process the bytes.
    while (pbegin !== pend) {
      var carry = source[pbegin];
            // Apply "b58 = b58 * 256 + ch".
      var i = 0;
      for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
        carry += (256 * b58[it1]) >>> 0;
        b58[it1] = (carry % BASE) >>> 0;
        carry = (carry / BASE) >>> 0;
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i;
      pbegin++;
    }
        // Skip leading zeroes in base58 result.
    var it2 = size - length;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
        // Translate the result into a string.
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]); }
    return str
  }
  function decodeUnsafe (source) {
    if (typeof source !== 'string') { throw new TypeError('Expected String') }
    if (source.length === 0) { return _Buffer.alloc(0) }
    var psz = 0;
        // Skip and count leading '1's.
    var zeroes = 0;
    var length = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
        // Allocate enough space in big-endian base256 representation.
    var size = (((source.length - psz) * FACTOR) + 1) >>> 0; // log(58) / log(256), rounded up.
    var b256 = new Uint8Array(size);
        // Process the characters.
    while (source[psz]) {
            // Decode character
      var carry = BASE_MAP[source.charCodeAt(psz)];
            // Invalid character
      if (carry === 255) { return }
      var i = 0;
      for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
        carry += (BASE * b256[it3]) >>> 0;
        b256[it3] = (carry % 256) >>> 0;
        carry = (carry / 256) >>> 0;
      }
      if (carry !== 0) { throw new Error('Non-zero carry') }
      length = i;
      psz++;
    }
        // Skip leading zeroes in b256.
    var it4 = size - length;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
    vch.fill(0x00, 0, zeroes);
    var j = zeroes;
    while (it4 !== size) {
      vch[j++] = b256[it4++];
    }
    return vch
  }
  function decode (string) {
    var buffer = decodeUnsafe(string);
    if (buffer) { return buffer }
    throw new Error('Non-base' + BASE + ' character')
  }
  return {
    encode: encode,
    decodeUnsafe: decodeUnsafe,
    decode: decode
  }
}
var src = base;

var basex = src;
var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

var bs58 = basex(ALPHABET);

var bs58$1 = bs58;

var Layout$1 = {};

/* The MIT License (MIT)
 *
 * Copyright 2015-2018 Peter A. Bigot
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
Object.defineProperty(Layout$1, "__esModule", { value: true });
Layout$1.s16 = Layout$1.s8 = Layout$1.nu64be = Layout$1.u48be = Layout$1.u40be = Layout$1.u32be = Layout$1.u24be = Layout$1.u16be = nu64 = Layout$1.nu64 = Layout$1.u48 = Layout$1.u40 = u32 = Layout$1.u32 = Layout$1.u24 = u16 = Layout$1.u16 = u8 = Layout$1.u8 = offset = Layout$1.offset = Layout$1.greedy = Layout$1.Constant = Layout$1.UTF8 = Layout$1.CString = Layout$1.Blob = Layout$1.Boolean = Layout$1.BitField = Layout$1.BitStructure = Layout$1.VariantLayout = Layout$1.Union = Layout$1.UnionLayoutDiscriminator = Layout$1.UnionDiscriminator = Layout$1.Structure = Layout$1.Sequence = Layout$1.DoubleBE = Layout$1.Double = Layout$1.FloatBE = Layout$1.Float = Layout$1.NearInt64BE = Layout$1.NearInt64 = Layout$1.NearUInt64BE = Layout$1.NearUInt64 = Layout$1.IntBE = Layout$1.Int = Layout$1.UIntBE = Layout$1.UInt = Layout$1.OffsetLayout = Layout$1.GreedyCount = Layout$1.ExternalLayout = Layout$1.bindConstructorLayout = Layout$1.nameWithProperty = Layout$1.Layout = Layout$1.uint8ArrayToBuffer = Layout$1.checkUint8Array = void 0;
Layout$1.constant = Layout$1.utf8 = Layout$1.cstr = blob = Layout$1.blob = Layout$1.unionLayoutDiscriminator = Layout$1.union = seq = Layout$1.seq = Layout$1.bits = struct = Layout$1.struct = Layout$1.f64be = Layout$1.f64 = Layout$1.f32be = Layout$1.f32 = Layout$1.ns64be = Layout$1.s48be = Layout$1.s40be = Layout$1.s32be = Layout$1.s24be = Layout$1.s16be = ns64 = Layout$1.ns64 = Layout$1.s48 = Layout$1.s40 = Layout$1.s32 = Layout$1.s24 = void 0;
const buffer_1 = require$$0$2;
/* Check if a value is a Uint8Array.
 *
 * @ignore */
function checkUint8Array(b) {
    if (!(b instanceof Uint8Array)) {
        throw new TypeError('b must be a Uint8Array');
    }
}
Layout$1.checkUint8Array = checkUint8Array;
/* Create a Buffer instance from a Uint8Array.
 *
 * @ignore */
function uint8ArrayToBuffer(b) {
    checkUint8Array(b);
    return buffer_1.Buffer.from(b.buffer, b.byteOffset, b.length);
}
Layout$1.uint8ArrayToBuffer = uint8ArrayToBuffer;
/**
 * Base class for layout objects.
 *
 * **NOTE** This is an abstract base class; you can create instances
 * if it amuses you, but they won't support the {@link
 * Layout#encode|encode} or {@link Layout#decode|decode} functions.
 *
 * @param {Number} span - Initializer for {@link Layout#span|span}.  The
 * parameter must be an integer; a negative value signifies that the
 * span is {@link Layout#getSpan|value-specific}.
 *
 * @param {string} [property] - Initializer for {@link
 * Layout#property|property}.
 *
 * @abstract
 */
class Layout {
    constructor(span, property) {
        if (!Number.isInteger(span)) {
            throw new TypeError('span must be an integer');
        }
        /** The span of the layout in bytes.
         *
         * Positive values are generally expected.
         *
         * Zero will only appear in {@link Constant}s and in {@link
         * Sequence}s where the {@link Sequence#count|count} is zero.
         *
         * A negative value indicates that the span is value-specific, and
         * must be obtained using {@link Layout#getSpan|getSpan}. */
        this.span = span;
        /** The property name used when this layout is represented in an
         * Object.
         *
         * Used only for layouts that {@link Layout#decode|decode} to Object
         * instances.  If left undefined the span of the unnamed layout will
         * be treated as padding: it will not be mutated by {@link
         * Layout#encode|encode} nor represented as a property in the
         * decoded Object. */
        this.property = property;
    }
    /** Function to create an Object into which decoded properties will
     * be written.
     *
     * Used only for layouts that {@link Layout#decode|decode} to Object
     * instances, which means:
     * * {@link Structure}
     * * {@link Union}
     * * {@link VariantLayout}
     * * {@link BitStructure}
     *
     * If left undefined the JavaScript representation of these layouts
     * will be Object instances.
     *
     * See {@link bindConstructorLayout}.
     */
    makeDestinationObject() {
        return {};
    }
    /**
     * Calculate the span of a specific instance of a layout.
     *
     * @param {Uint8Array} b - the buffer that contains an encoded instance.
     *
     * @param {Number} [offset] - the offset at which the encoded instance
     * starts.  If absent a zero offset is inferred.
     *
     * @return {Number} - the number of bytes covered by the layout
     * instance.  If this method is not overridden in a subclass the
     * definition-time constant {@link Layout#span|span} will be
     * returned.
     *
     * @throws {RangeError} - if the length of the value cannot be
     * determined.
     */
    getSpan(b, offset) {
        if (0 > this.span) {
            throw new RangeError('indeterminate span');
        }
        return this.span;
    }
    /**
     * Replicate the layout using a new property.
     *
     * This function must be used to get a structurally-equivalent layout
     * with a different name since all {@link Layout} instances are
     * immutable.
     *
     * **NOTE** This is a shallow copy.  All fields except {@link
     * Layout#property|property} are strictly equal to the origin layout.
     *
     * @param {String} property - the value for {@link
     * Layout#property|property} in the replica.
     *
     * @returns {Layout} - the copy with {@link Layout#property|property}
     * set to `property`.
     */
    replicate(property) {
        const rv = Object.create(this.constructor.prototype);
        Object.assign(rv, this);
        rv.property = property;
        return rv;
    }
    /**
     * Create an object from layout properties and an array of values.
     *
     * **NOTE** This function returns `undefined` if invoked on a layout
     * that does not return its value as an Object.  Objects are
     * returned for things that are a {@link Structure}, which includes
     * {@link VariantLayout|variant layouts} if they are structures, and
     * excludes {@link Union}s.  If you want this feature for a union
     * you must use {@link Union.getVariant|getVariant} to select the
     * desired layout.
     *
     * @param {Array} values - an array of values that correspond to the
     * default order for properties.  As with {@link Layout#decode|decode}
     * layout elements that have no property name are skipped when
     * iterating over the array values.  Only the top-level properties are
     * assigned; arguments are not assigned to properties of contained
     * layouts.  Any unused values are ignored.
     *
     * @return {(Object|undefined)}
     */
    fromArray(values) {
        return undefined;
    }
}
Layout$1.Layout = Layout;
/* Provide text that carries a name (such as for a function that will
 * be throwing an error) annotated with the property of a given layout
 * (such as one for which the value was unacceptable).
 *
 * @ignore */
function nameWithProperty(name, lo) {
    if (lo.property) {
        return name + '[' + lo.property + ']';
    }
    return name;
}
Layout$1.nameWithProperty = nameWithProperty;
/**
 * Augment a class so that instances can be encoded/decoded using a
 * given layout.
 *
 * Calling this function couples `Class` with `layout` in several ways:
 *
 * * `Class.layout_` becomes a static member property equal to `layout`;
 * * `layout.boundConstructor_` becomes a static member property equal
 *    to `Class`;
 * * The {@link Layout#makeDestinationObject|makeDestinationObject()}
 *   property of `layout` is set to a function that returns a `new
 *   Class()`;
 * * `Class.decode(b, offset)` becomes a static member function that
 *   delegates to {@link Layout#decode|layout.decode}.  The
 *   synthesized function may be captured and extended.
 * * `Class.prototype.encode(b, offset)` provides an instance member
 *   function that delegates to {@link Layout#encode|layout.encode}
 *   with `src` set to `this`.  The synthesized function may be
 *   captured and extended, but when the extension is invoked `this`
 *   must be explicitly bound to the instance.
 *
 * @param {class} Class - a JavaScript class with a nullary
 * constructor.
 *
 * @param {Layout} layout - the {@link Layout} instance used to encode
 * instances of `Class`.
 */
// `Class` must be a constructor Function, but the assignment of a `layout_` property to it makes it difficult to type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function bindConstructorLayout(Class, layout) {
    if ('function' !== typeof Class) {
        throw new TypeError('Class must be constructor');
    }
    if (Object.prototype.hasOwnProperty.call(Class, 'layout_')) {
        throw new Error('Class is already bound to a layout');
    }
    if (!(layout && (layout instanceof Layout))) {
        throw new TypeError('layout must be a Layout');
    }
    if (Object.prototype.hasOwnProperty.call(layout, 'boundConstructor_')) {
        throw new Error('layout is already bound to a constructor');
    }
    Class.layout_ = layout;
    layout.boundConstructor_ = Class;
    layout.makeDestinationObject = (() => new Class());
    Object.defineProperty(Class.prototype, 'encode', {
        value(b, offset) {
            return layout.encode(this, b, offset);
        },
        writable: true,
    });
    Object.defineProperty(Class, 'decode', {
        value(b, offset) {
            return layout.decode(b, offset);
        },
        writable: true,
    });
}
Layout$1.bindConstructorLayout = bindConstructorLayout;
/**
 * An object that behaves like a layout but does not consume space
 * within its containing layout.
 *
 * This is primarily used to obtain metadata about a member, such as a
 * {@link OffsetLayout} that can provide data about a {@link
 * Layout#getSpan|value-specific span}.
 *
 * **NOTE** This is an abstract base class; you can create instances
 * if it amuses you, but they won't support {@link
 * ExternalLayout#isCount|isCount} or other {@link Layout} functions.
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @abstract
 * @augments {Layout}
 */
class ExternalLayout extends Layout {
    /**
     * Return `true` iff the external layout decodes to an unsigned
     * integer layout.
     *
     * In that case it can be used as the source of {@link
     * Sequence#count|Sequence counts}, {@link Blob#length|Blob lengths},
     * or as {@link UnionLayoutDiscriminator#layout|external union
     * discriminators}.
     *
     * @abstract
     */
    isCount() {
        throw new Error('ExternalLayout is abstract');
    }
}
Layout$1.ExternalLayout = ExternalLayout;
/**
 * An {@link ExternalLayout} that determines its {@link
 * Layout#decode|value} based on offset into and length of the buffer
 * on which it is invoked.
 *
 * *Factory*: {@link module:Layout.greedy|greedy}
 *
 * @param {Number} [elementSpan] - initializer for {@link
 * GreedyCount#elementSpan|elementSpan}.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {ExternalLayout}
 */
class GreedyCount extends ExternalLayout {
    constructor(elementSpan = 1, property) {
        if ((!Number.isInteger(elementSpan)) || (0 >= elementSpan)) {
            throw new TypeError('elementSpan must be a (positive) integer');
        }
        super(-1, property);
        /** The layout for individual elements of the sequence.  The value
         * must be a positive integer.  If not provided, the value will be
         * 1. */
        this.elementSpan = elementSpan;
    }
    /** @override */
    isCount() {
        return true;
    }
    /** @override */
    decode(b, offset = 0) {
        checkUint8Array(b);
        const rem = b.length - offset;
        return Math.floor(rem / this.elementSpan);
    }
    /** @override */
    encode(src, b, offset) {
        return 0;
    }
}
Layout$1.GreedyCount = GreedyCount;
/**
 * An {@link ExternalLayout} that supports accessing a {@link Layout}
 * at a fixed offset from the start of another Layout.  The offset may
 * be before, within, or after the base layout.
 *
 * *Factory*: {@link module:Layout.offset|offset}
 *
 * @param {Layout} layout - initializer for {@link
 * OffsetLayout#layout|layout}, modulo `property`.
 *
 * @param {Number} [offset] - Initializes {@link
 * OffsetLayout#offset|offset}.  Defaults to zero.
 *
 * @param {string} [property] - Optional new property name for a
 * {@link Layout#replicate| replica} of `layout` to be used as {@link
 * OffsetLayout#layout|layout}.  If not provided the `layout` is used
 * unchanged.
 *
 * @augments {Layout}
 */
class OffsetLayout extends ExternalLayout {
    constructor(layout, offset = 0, property) {
        if (!(layout instanceof Layout)) {
            throw new TypeError('layout must be a Layout');
        }
        if (!Number.isInteger(offset)) {
            throw new TypeError('offset must be integer or undefined');
        }
        super(layout.span, property || layout.property);
        /** The subordinated layout. */
        this.layout = layout;
        /** The location of {@link OffsetLayout#layout} relative to the
         * start of another layout.
         *
         * The value may be positive or negative, but an error will thrown
         * if at the point of use it goes outside the span of the Uint8Array
         * being accessed.  */
        this.offset = offset;
    }
    /** @override */
    isCount() {
        return ((this.layout instanceof UInt)
            || (this.layout instanceof UIntBE));
    }
    /** @override */
    decode(b, offset = 0) {
        return this.layout.decode(b, offset + this.offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        return this.layout.encode(src, b, offset + this.offset);
    }
}
Layout$1.OffsetLayout = OffsetLayout;
/**
 * Represent an unsigned integer in little-endian format.
 *
 * *Factory*: {@link module:Layout.u8|u8}, {@link
 *  module:Layout.u16|u16}, {@link module:Layout.u24|u24}, {@link
 *  module:Layout.u32|u32}, {@link module:Layout.u40|u40}, {@link
 *  module:Layout.u48|u48}
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class UInt extends Layout {
    constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
            throw new RangeError('span must not exceed 6 bytes');
        }
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readUIntLE(offset, this.span);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeUIntLE(src, offset, this.span);
        return this.span;
    }
}
Layout$1.UInt = UInt;
/**
 * Represent an unsigned integer in big-endian format.
 *
 * *Factory*: {@link module:Layout.u8be|u8be}, {@link
 * module:Layout.u16be|u16be}, {@link module:Layout.u24be|u24be},
 * {@link module:Layout.u32be|u32be}, {@link
 * module:Layout.u40be|u40be}, {@link module:Layout.u48be|u48be}
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class UIntBE extends Layout {
    constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
            throw new RangeError('span must not exceed 6 bytes');
        }
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readUIntBE(offset, this.span);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeUIntBE(src, offset, this.span);
        return this.span;
    }
}
Layout$1.UIntBE = UIntBE;
/**
 * Represent a signed integer in little-endian format.
 *
 * *Factory*: {@link module:Layout.s8|s8}, {@link
 *  module:Layout.s16|s16}, {@link module:Layout.s24|s24}, {@link
 *  module:Layout.s32|s32}, {@link module:Layout.s40|s40}, {@link
 *  module:Layout.s48|s48}
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Int extends Layout {
    constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
            throw new RangeError('span must not exceed 6 bytes');
        }
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readIntLE(offset, this.span);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeIntLE(src, offset, this.span);
        return this.span;
    }
}
Layout$1.Int = Int;
/**
 * Represent a signed integer in big-endian format.
 *
 * *Factory*: {@link module:Layout.s8be|s8be}, {@link
 * module:Layout.s16be|s16be}, {@link module:Layout.s24be|s24be},
 * {@link module:Layout.s32be|s32be}, {@link
 * module:Layout.s40be|s40be}, {@link module:Layout.s48be|s48be}
 *
 * @param {Number} span - initializer for {@link Layout#span|span}.
 * The parameter can range from 1 through 6.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class IntBE extends Layout {
    constructor(span, property) {
        super(span, property);
        if (6 < this.span) {
            throw new RangeError('span must not exceed 6 bytes');
        }
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readIntBE(offset, this.span);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeIntBE(src, offset, this.span);
        return this.span;
    }
}
Layout$1.IntBE = IntBE;
const V2E32 = Math.pow(2, 32);
/* True modulus high and low 32-bit words, where low word is always
 * non-negative. */
function divmodInt64(src) {
    const hi32 = Math.floor(src / V2E32);
    const lo32 = src - (hi32 * V2E32);
    return { hi32, lo32 };
}
/* Reconstruct Number from quotient and non-negative remainder */
function roundedInt64(hi32, lo32) {
    return hi32 * V2E32 + lo32;
}
/**
 * Represent an unsigned 64-bit integer in little-endian format when
 * encoded and as a near integral JavaScript Number when decoded.
 *
 * *Factory*: {@link module:Layout.nu64|nu64}
 *
 * **NOTE** Values with magnitude greater than 2^52 may not decode to
 * the exact value of the encoded representation.
 *
 * @augments {Layout}
 */
class NearUInt64 extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const lo32 = buffer.readUInt32LE(offset);
        const hi32 = buffer.readUInt32LE(offset + 4);
        return roundedInt64(hi32, lo32);
    }
    /** @override */
    encode(src, b, offset = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split.lo32, offset);
        buffer.writeUInt32LE(split.hi32, offset + 4);
        return 8;
    }
}
Layout$1.NearUInt64 = NearUInt64;
/**
 * Represent an unsigned 64-bit integer in big-endian format when
 * encoded and as a near integral JavaScript Number when decoded.
 *
 * *Factory*: {@link module:Layout.nu64be|nu64be}
 *
 * **NOTE** Values with magnitude greater than 2^52 may not decode to
 * the exact value of the encoded representation.
 *
 * @augments {Layout}
 */
class NearUInt64BE extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const hi32 = buffer.readUInt32BE(offset);
        const lo32 = buffer.readUInt32BE(offset + 4);
        return roundedInt64(hi32, lo32);
    }
    /** @override */
    encode(src, b, offset = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32BE(split.hi32, offset);
        buffer.writeUInt32BE(split.lo32, offset + 4);
        return 8;
    }
}
Layout$1.NearUInt64BE = NearUInt64BE;
/**
 * Represent a signed 64-bit integer in little-endian format when
 * encoded and as a near integral JavaScript Number when decoded.
 *
 * *Factory*: {@link module:Layout.ns64|ns64}
 *
 * **NOTE** Values with magnitude greater than 2^52 may not decode to
 * the exact value of the encoded representation.
 *
 * @augments {Layout}
 */
class NearInt64 extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const lo32 = buffer.readUInt32LE(offset);
        const hi32 = buffer.readInt32LE(offset + 4);
        return roundedInt64(hi32, lo32);
    }
    /** @override */
    encode(src, b, offset = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeUInt32LE(split.lo32, offset);
        buffer.writeInt32LE(split.hi32, offset + 4);
        return 8;
    }
}
Layout$1.NearInt64 = NearInt64;
/**
 * Represent a signed 64-bit integer in big-endian format when
 * encoded and as a near integral JavaScript Number when decoded.
 *
 * *Factory*: {@link module:Layout.ns64be|ns64be}
 *
 * **NOTE** Values with magnitude greater than 2^52 may not decode to
 * the exact value of the encoded representation.
 *
 * @augments {Layout}
 */
class NearInt64BE extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        const buffer = uint8ArrayToBuffer(b);
        const hi32 = buffer.readInt32BE(offset);
        const lo32 = buffer.readUInt32BE(offset + 4);
        return roundedInt64(hi32, lo32);
    }
    /** @override */
    encode(src, b, offset = 0) {
        const split = divmodInt64(src);
        const buffer = uint8ArrayToBuffer(b);
        buffer.writeInt32BE(split.hi32, offset);
        buffer.writeUInt32BE(split.lo32, offset + 4);
        return 8;
    }
}
Layout$1.NearInt64BE = NearInt64BE;
/**
 * Represent a 32-bit floating point number in little-endian format.
 *
 * *Factory*: {@link module:Layout.f32|f32}
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Float extends Layout {
    constructor(property) {
        super(4, property);
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readFloatLE(offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeFloatLE(src, offset);
        return 4;
    }
}
Layout$1.Float = Float;
/**
 * Represent a 32-bit floating point number in big-endian format.
 *
 * *Factory*: {@link module:Layout.f32be|f32be}
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class FloatBE extends Layout {
    constructor(property) {
        super(4, property);
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readFloatBE(offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeFloatBE(src, offset);
        return 4;
    }
}
Layout$1.FloatBE = FloatBE;
/**
 * Represent a 64-bit floating point number in little-endian format.
 *
 * *Factory*: {@link module:Layout.f64|f64}
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Double extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readDoubleLE(offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeDoubleLE(src, offset);
        return 8;
    }
}
Layout$1.Double = Double;
/**
 * Represent a 64-bit floating point number in big-endian format.
 *
 * *Factory*: {@link module:Layout.f64be|f64be}
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class DoubleBE extends Layout {
    constructor(property) {
        super(8, property);
    }
    /** @override */
    decode(b, offset = 0) {
        return uint8ArrayToBuffer(b).readDoubleBE(offset);
    }
    /** @override */
    encode(src, b, offset = 0) {
        uint8ArrayToBuffer(b).writeDoubleBE(src, offset);
        return 8;
    }
}
Layout$1.DoubleBE = DoubleBE;
/**
 * Represent a contiguous sequence of a specific layout as an Array.
 *
 * *Factory*: {@link module:Layout.seq|seq}
 *
 * @param {Layout} elementLayout - initializer for {@link
 * Sequence#elementLayout|elementLayout}.
 *
 * @param {(Number|ExternalLayout)} count - initializer for {@link
 * Sequence#count|count}.  The parameter must be either a positive
 * integer or an instance of {@link ExternalLayout}.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Sequence extends Layout {
    constructor(elementLayout, count, property) {
        if (!(elementLayout instanceof Layout)) {
            throw new TypeError('elementLayout must be a Layout');
        }
        if (!(((count instanceof ExternalLayout) && count.isCount())
            || (Number.isInteger(count) && (0 <= count)))) {
            throw new TypeError('count must be non-negative integer '
                + 'or an unsigned integer ExternalLayout');
        }
        let span = -1;
        if ((!(count instanceof ExternalLayout))
            && (0 < elementLayout.span)) {
            span = count * elementLayout.span;
        }
        super(span, property);
        /** The layout for individual elements of the sequence. */
        this.elementLayout = elementLayout;
        /** The number of elements in the sequence.
         *
         * This will be either a non-negative integer or an instance of
         * {@link ExternalLayout} for which {@link
         * ExternalLayout#isCount|isCount()} is `true`. */
        this.count = count;
    }
    /** @override */
    getSpan(b, offset = 0) {
        if (0 <= this.span) {
            return this.span;
        }
        let span = 0;
        let count = this.count;
        if (count instanceof ExternalLayout) {
            count = count.decode(b, offset);
        }
        if (0 < this.elementLayout.span) {
            span = count * this.elementLayout.span;
        }
        else {
            let idx = 0;
            while (idx < count) {
                span += this.elementLayout.getSpan(b, offset + span);
                ++idx;
            }
        }
        return span;
    }
    /** @override */
    decode(b, offset = 0) {
        const rv = [];
        let i = 0;
        let count = this.count;
        if (count instanceof ExternalLayout) {
            count = count.decode(b, offset);
        }
        while (i < count) {
            rv.push(this.elementLayout.decode(b, offset));
            offset += this.elementLayout.getSpan(b, offset);
            i += 1;
        }
        return rv;
    }
    /** Implement {@link Layout#encode|encode} for {@link Sequence}.
     *
     * **NOTE** If `src` is shorter than {@link Sequence#count|count} then
     * the unused space in the buffer is left unchanged.  If `src` is
     * longer than {@link Sequence#count|count} the unneeded elements are
     * ignored.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(src, b, offset = 0) {
        const elo = this.elementLayout;
        const span = src.reduce((span, v) => {
            return span + elo.encode(v, b, offset + span);
        }, 0);
        if (this.count instanceof ExternalLayout) {
            this.count.encode(src.length, b, offset);
        }
        return span;
    }
}
Layout$1.Sequence = Sequence;
/**
 * Represent a contiguous sequence of arbitrary layout elements as an
 * Object.
 *
 * *Factory*: {@link module:Layout.struct|struct}
 *
 * **NOTE** The {@link Layout#span|span} of the structure is variable
 * if any layout in {@link Structure#fields|fields} has a variable
 * span.  When {@link Layout#encode|encoding} we must have a value for
 * all variable-length fields, or we wouldn't be able to figure out
 * how much space to use for storage.  We can only identify the value
 * for a field when it has a {@link Layout#property|property}.  As
 * such, although a structure may contain both unnamed fields and
 * variable-length fields, it cannot contain an unnamed
 * variable-length field.
 *
 * @param {Layout[]} fields - initializer for {@link
 * Structure#fields|fields}.  An error is raised if this contains a
 * variable-length field for which a {@link Layout#property|property}
 * is not defined.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @param {Boolean} [decodePrefixes] - initializer for {@link
 * Structure#decodePrefixes|property}.
 *
 * @throws {Error} - if `fields` contains an unnamed variable-length
 * layout.
 *
 * @augments {Layout}
 */
class Structure extends Layout {
    constructor(fields, property, decodePrefixes) {
        if (!(Array.isArray(fields)
            && fields.reduce((acc, v) => acc && (v instanceof Layout), true))) {
            throw new TypeError('fields must be array of Layout instances');
        }
        if (('boolean' === typeof property)
            && (undefined === decodePrefixes)) {
            decodePrefixes = property;
            property = undefined;
        }
        /* Verify absence of unnamed variable-length fields. */
        for (const fd of fields) {
            if ((0 > fd.span)
                && (undefined === fd.property)) {
                throw new Error('fields cannot contain unnamed variable-length layout');
            }
        }
        let span = -1;
        try {
            span = fields.reduce((span, fd) => span + fd.getSpan(), 0);
        }
        catch (e) {
            // ignore error
        }
        super(span, property);
        /** The sequence of {@link Layout} values that comprise the
         * structure.
         *
         * The individual elements need not be the same type, and may be
         * either scalar or aggregate layouts.  If a member layout leaves
         * its {@link Layout#property|property} undefined the
         * corresponding region of the buffer associated with the element
         * will not be mutated.
         *
         * @type {Layout[]} */
        this.fields = fields;
        /** Control behavior of {@link Layout#decode|decode()} given short
         * buffers.
         *
         * In some situations a structure many be extended with additional
         * fields over time, with older installations providing only a
         * prefix of the full structure.  If this property is `true`
         * decoding will accept those buffers and leave subsequent fields
         * undefined, as long as the buffer ends at a field boundary.
         * Defaults to `false`. */
        this.decodePrefixes = !!decodePrefixes;
    }
    /** @override */
    getSpan(b, offset = 0) {
        if (0 <= this.span) {
            return this.span;
        }
        let span = 0;
        try {
            span = this.fields.reduce((span, fd) => {
                const fsp = fd.getSpan(b, offset);
                offset += fsp;
                return span + fsp;
            }, 0);
        }
        catch (e) {
            throw new RangeError('indeterminate span');
        }
        return span;
    }
    /** @override */
    decode(b, offset = 0) {
        checkUint8Array(b);
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
            if (undefined !== fd.property) {
                dest[fd.property] = fd.decode(b, offset);
            }
            offset += fd.getSpan(b, offset);
            if (this.decodePrefixes
                && (b.length === offset)) {
                break;
            }
        }
        return dest;
    }
    /** Implement {@link Layout#encode|encode} for {@link Structure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the buffer is
     * left unmodified. */
    encode(src, b, offset = 0) {
        const firstOffset = offset;
        let lastOffset = 0;
        let lastWrote = 0;
        for (const fd of this.fields) {
            let span = fd.span;
            lastWrote = (0 < span) ? span : 0;
            if (undefined !== fd.property) {
                const fv = src[fd.property];
                if (undefined !== fv) {
                    lastWrote = fd.encode(fv, b, offset);
                    if (0 > span) {
                        /* Read the as-encoded span, which is not necessarily the
                         * same as what we wrote. */
                        span = fd.getSpan(b, offset);
                    }
                }
            }
            lastOffset = offset;
            offset += span;
        }
        /* Use (lastOffset + lastWrote) instead of offset because the last
         * item may have had a dynamic length and we don't want to include
         * the padding between it and the end of the space reserved for
         * it. */
        return (lastOffset + lastWrote) - firstOffset;
    }
    /** @override */
    fromArray(values) {
        const dest = this.makeDestinationObject();
        for (const fd of this.fields) {
            if ((undefined !== fd.property)
                && (0 < values.length)) {
                dest[fd.property] = values.shift();
            }
        }
        return dest;
    }
    /**
     * Get access to the layout of a given property.
     *
     * @param {String} property - the structure member of interest.
     *
     * @return {Layout} - the layout associated with `property`, or
     * undefined if there is no such property.
     */
    layoutFor(property) {
        if ('string' !== typeof property) {
            throw new TypeError('property must be string');
        }
        for (const fd of this.fields) {
            if (fd.property === property) {
                return fd;
            }
        }
        return undefined;
    }
    /**
     * Get the offset of a structure member.
     *
     * @param {String} property - the structure member of interest.
     *
     * @return {Number} - the offset in bytes to the start of `property`
     * within the structure, or undefined if `property` is not a field
     * within the structure.  If the property is a member but follows a
     * variable-length structure member a negative number will be
     * returned.
     */
    offsetOf(property) {
        if ('string' !== typeof property) {
            throw new TypeError('property must be string');
        }
        let offset = 0;
        for (const fd of this.fields) {
            if (fd.property === property) {
                return offset;
            }
            if (0 > fd.span) {
                offset = -1;
            }
            else if (0 <= offset) {
                offset += fd.span;
            }
        }
        return undefined;
    }
}
Layout$1.Structure = Structure;
/**
 * An object that can provide a {@link
 * Union#discriminator|discriminator} API for {@link Union}.
 *
 * **NOTE** This is an abstract base class; you can create instances
 * if it amuses you, but they won't support the {@link
 * UnionDiscriminator#encode|encode} or {@link
 * UnionDiscriminator#decode|decode} functions.
 *
 * @param {string} [property] - Default for {@link
 * UnionDiscriminator#property|property}.
 *
 * @abstract
 */
class UnionDiscriminator {
    constructor(property) {
        /** The {@link Layout#property|property} to be used when the
         * discriminator is referenced in isolation (generally when {@link
         * Union#decode|Union decode} cannot delegate to a specific
         * variant). */
        this.property = property;
    }
    /** Analog to {@link Layout#decode|Layout decode} for union discriminators.
     *
     * The implementation of this method need not reference the buffer if
     * variant information is available through other means. */
    decode(b, offset) {
        throw new Error('UnionDiscriminator is abstract');
    }
    /** Analog to {@link Layout#decode|Layout encode} for union discriminators.
     *
     * The implementation of this method need not store the value if
     * variant information is maintained through other means. */
    encode(src, b, offset) {
        throw new Error('UnionDiscriminator is abstract');
    }
}
Layout$1.UnionDiscriminator = UnionDiscriminator;
/**
 * An object that can provide a {@link
 * UnionDiscriminator|discriminator API} for {@link Union} using an
 * unsigned integral {@link Layout} instance located either inside or
 * outside the union.
 *
 * @param {ExternalLayout} layout - initializes {@link
 * UnionLayoutDiscriminator#layout|layout}.  Must satisfy {@link
 * ExternalLayout#isCount|isCount()}.
 *
 * @param {string} [property] - Default for {@link
 * UnionDiscriminator#property|property}, superseding the property
 * from `layout`, but defaulting to `variant` if neither `property`
 * nor layout provide a property name.
 *
 * @augments {UnionDiscriminator}
 */
class UnionLayoutDiscriminator extends UnionDiscriminator {
    constructor(layout, property) {
        if (!((layout instanceof ExternalLayout)
            && layout.isCount())) {
            throw new TypeError('layout must be an unsigned integer ExternalLayout');
        }
        super(property || layout.property || 'variant');
        /** The {@link ExternalLayout} used to access the discriminator
         * value. */
        this.layout = layout;
    }
    /** Delegate decoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    decode(b, offset) {
        return this.layout.decode(b, offset);
    }
    /** Delegate encoding to {@link UnionLayoutDiscriminator#layout|layout}. */
    encode(src, b, offset) {
        return this.layout.encode(src, b, offset);
    }
}
Layout$1.UnionLayoutDiscriminator = UnionLayoutDiscriminator;
/**
 * Represent any number of span-compatible layouts.
 *
 * *Factory*: {@link module:Layout.union|union}
 *
 * If the union has a {@link Union#defaultLayout|default layout} that
 * layout must have a non-negative {@link Layout#span|span}.  The span
 * of a fixed-span union includes its {@link
 * Union#discriminator|discriminator} if the variant is a {@link
 * Union#usesPrefixDiscriminator|prefix of the union}, plus the span
 * of its {@link Union#defaultLayout|default layout}.
 *
 * If the union does not have a default layout then the encoded span
 * of the union depends on the encoded span of its variant (which may
 * be fixed or variable).
 *
 * {@link VariantLayout#layout|Variant layout}s are added through
 * {@link Union#addVariant|addVariant}.  If the union has a default
 * layout, the span of the {@link VariantLayout#layout|layout
 * contained by the variant} must not exceed the span of the {@link
 * Union#defaultLayout|default layout} (minus the span of a {@link
 * Union#usesPrefixDiscriminator|prefix disriminator}, if used).  The
 * span of the variant will equal the span of the union itself.
 *
 * The variant for a buffer can only be identified from the {@link
 * Union#discriminator|discriminator} {@link
 * UnionDiscriminator#property|property} (in the case of the {@link
 * Union#defaultLayout|default layout}), or by using {@link
 * Union#getVariant|getVariant} and examining the resulting {@link
 * VariantLayout} instance.
 *
 * A variant compatible with a JavaScript object can be identified
 * using {@link Union#getSourceVariant|getSourceVariant}.
 *
 * @param {(UnionDiscriminator|ExternalLayout|Layout)} discr - How to
 * identify the layout used to interpret the union contents.  The
 * parameter must be an instance of {@link UnionDiscriminator}, an
 * {@link ExternalLayout} that satisfies {@link
 * ExternalLayout#isCount|isCount()}, or {@link UInt} (or {@link
 * UIntBE}).  When a non-external layout element is passed the layout
 * appears at the start of the union.  In all cases the (synthesized)
 * {@link UnionDiscriminator} instance is recorded as {@link
 * Union#discriminator|discriminator}.
 *
 * @param {(Layout|null)} defaultLayout - initializer for {@link
 * Union#defaultLayout|defaultLayout}.  If absent defaults to `null`.
 * If `null` there is no default layout: the union has data-dependent
 * length and attempts to decode or encode unrecognized variants will
 * throw an exception.  A {@link Layout} instance must have a
 * non-negative {@link Layout#span|span}, and if it lacks a {@link
 * Layout#property|property} the {@link
 * Union#defaultLayout|defaultLayout} will be a {@link
 * Layout#replicate|replica} with property `content`.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Union extends Layout {
    constructor(discr, defaultLayout, property) {
        let discriminator;
        if ((discr instanceof UInt)
            || (discr instanceof UIntBE)) {
            discriminator = new UnionLayoutDiscriminator(new OffsetLayout(discr));
        }
        else if ((discr instanceof ExternalLayout)
            && discr.isCount()) {
            discriminator = new UnionLayoutDiscriminator(discr);
        }
        else if (!(discr instanceof UnionDiscriminator)) {
            throw new TypeError('discr must be a UnionDiscriminator '
                + 'or an unsigned integer layout');
        }
        else {
            discriminator = discr;
        }
        if (undefined === defaultLayout) {
            defaultLayout = null;
        }
        if (!((null === defaultLayout)
            || (defaultLayout instanceof Layout))) {
            throw new TypeError('defaultLayout must be null or a Layout');
        }
        if (null !== defaultLayout) {
            if (0 > defaultLayout.span) {
                throw new Error('defaultLayout must have constant span');
            }
            if (undefined === defaultLayout.property) {
                defaultLayout = defaultLayout.replicate('content');
            }
        }
        /* The union span can be estimated only if there's a default
         * layout.  The union spans its default layout, plus any prefix
         * variant layout.  By construction both layouts, if present, have
         * non-negative span. */
        let span = -1;
        if (defaultLayout) {
            span = defaultLayout.span;
            if ((0 <= span) && ((discr instanceof UInt)
                || (discr instanceof UIntBE))) {
                span += discriminator.layout.span;
            }
        }
        super(span, property);
        /** The interface for the discriminator value in isolation.
         *
         * This a {@link UnionDiscriminator} either passed to the
         * constructor or synthesized from the `discr` constructor
         * argument.  {@link
         * Union#usesPrefixDiscriminator|usesPrefixDiscriminator} will be
         * `true` iff the `discr` parameter was a non-offset {@link
         * Layout} instance. */
        this.discriminator = discriminator;
        /** `true` if the {@link Union#discriminator|discriminator} is the
         * first field in the union.
         *
         * If `false` the discriminator is obtained from somewhere
         * else. */
        this.usesPrefixDiscriminator = (discr instanceof UInt)
            || (discr instanceof UIntBE);
        /** The layout for non-discriminator content when the value of the
         * discriminator is not recognized.
         *
         * This is the value passed to the constructor.  It is
         * structurally equivalent to the second component of {@link
         * Union#layout|layout} but may have a different property
         * name. */
        this.defaultLayout = defaultLayout;
        /** A registry of allowed variants.
         *
         * The keys are unsigned integers which should be compatible with
         * {@link Union.discriminator|discriminator}.  The property value
         * is the corresponding {@link VariantLayout} instances assigned
         * to this union by {@link Union#addVariant|addVariant}.
         *
         * **NOTE** The registry remains mutable so that variants can be
         * {@link Union#addVariant|added} at any time.  Users should not
         * manipulate the content of this property. */
        this.registry = {};
        /* Private variable used when invoking getSourceVariant */
        let boundGetSourceVariant = this.defaultGetSourceVariant.bind(this);
        /** Function to infer the variant selected by a source object.
         *
         * Defaults to {@link
         * Union#defaultGetSourceVariant|defaultGetSourceVariant} but may
         * be overridden using {@link
         * Union#configGetSourceVariant|configGetSourceVariant}.
         *
         * @param {Object} src - as with {@link
         * Union#defaultGetSourceVariant|defaultGetSourceVariant}.
         *
         * @returns {(undefined|VariantLayout)} The default variant
         * (`undefined`) or first registered variant that uses a property
         * available in `src`. */
        this.getSourceVariant = function (src) {
            return boundGetSourceVariant(src);
        };
        /** Function to override the implementation of {@link
         * Union#getSourceVariant|getSourceVariant}.
         *
         * Use this if the desired variant cannot be identified using the
         * algorithm of {@link
         * Union#defaultGetSourceVariant|defaultGetSourceVariant}.
         *
         * **NOTE** The provided function will be invoked bound to this
         * Union instance, providing local access to {@link
         * Union#registry|registry}.
         *
         * @param {Function} gsv - a function that follows the API of
         * {@link Union#defaultGetSourceVariant|defaultGetSourceVariant}. */
        this.configGetSourceVariant = function (gsv) {
            boundGetSourceVariant = gsv.bind(this);
        };
    }
    /** @override */
    getSpan(b, offset = 0) {
        if (0 <= this.span) {
            return this.span;
        }
        /* Default layouts always have non-negative span, so we don't have
         * one and we have to recognize the variant which will in turn
         * determine the span. */
        const vlo = this.getVariant(b, offset);
        if (!vlo) {
            throw new Error('unable to determine span for unrecognized variant');
        }
        return vlo.getSpan(b, offset);
    }
    /**
     * Method to infer a registered Union variant compatible with `src`.
     *
     * The first satisfied rule in the following sequence defines the
     * return value:
     * * If `src` has properties matching the Union discriminator and
     *   the default layout, `undefined` is returned regardless of the
     *   value of the discriminator property (this ensures the default
     *   layout will be used);
     * * If `src` has a property matching the Union discriminator, the
     *   value of the discriminator identifies a registered variant, and
     *   either (a) the variant has no layout, or (b) `src` has the
     *   variant's property, then the variant is returned (because the
     *   source satisfies the constraints of the variant it identifies);
     * * If `src` does not have a property matching the Union
     *   discriminator, but does have a property matching a registered
     *   variant, then the variant is returned (because the source
     *   matches a variant without an explicit conflict);
     * * An error is thrown (because we either can't identify a variant,
     *   or we were explicitly told the variant but can't satisfy it).
     *
     * @param {Object} src - an object presumed to be compatible with
     * the content of the Union.
     *
     * @return {(undefined|VariantLayout)} - as described above.
     *
     * @throws {Error} - if `src` cannot be associated with a default or
     * registered variant.
     */
    defaultGetSourceVariant(src) {
        if (Object.prototype.hasOwnProperty.call(src, this.discriminator.property)) {
            if (this.defaultLayout && this.defaultLayout.property
                && Object.prototype.hasOwnProperty.call(src, this.defaultLayout.property)) {
                return undefined;
            }
            const vlo = this.registry[src[this.discriminator.property]];
            if (vlo
                && ((!vlo.layout)
                    || (vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property)))) {
                return vlo;
            }
        }
        else {
            for (const tag in this.registry) {
                const vlo = this.registry[tag];
                if (vlo.property && Object.prototype.hasOwnProperty.call(src, vlo.property)) {
                    return vlo;
                }
            }
        }
        throw new Error('unable to infer src variant');
    }
    /** Implement {@link Layout#decode|decode} for {@link Union}.
     *
     * If the variant is {@link Union#addVariant|registered} the return
     * value is an instance of that variant, with no explicit
     * discriminator.  Otherwise the {@link Union#defaultLayout|default
     * layout} is used to decode the content. */
    decode(b, offset = 0) {
        let dest;
        const dlo = this.discriminator;
        const discr = dlo.decode(b, offset);
        const clo = this.registry[discr];
        if (undefined === clo) {
            const defaultLayout = this.defaultLayout;
            let contentOffset = 0;
            if (this.usesPrefixDiscriminator) {
                contentOffset = dlo.layout.span;
            }
            dest = this.makeDestinationObject();
            dest[dlo.property] = discr;
            // defaultLayout.property can be undefined, but this is allowed by buffer-layout
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            dest[defaultLayout.property] = defaultLayout.decode(b, offset + contentOffset);
        }
        else {
            dest = clo.decode(b, offset);
        }
        return dest;
    }
    /** Implement {@link Layout#encode|encode} for {@link Union}.
     *
     * This API assumes the `src` object is consistent with the union's
     * {@link Union#defaultLayout|default layout}.  To encode variants
     * use the appropriate variant-specific {@link VariantLayout#encode}
     * method. */
    encode(src, b, offset = 0) {
        const vlo = this.getSourceVariant(src);
        if (undefined === vlo) {
            const dlo = this.discriminator;
            // this.defaultLayout is not undefined when vlo is undefined
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const clo = this.defaultLayout;
            let contentOffset = 0;
            if (this.usesPrefixDiscriminator) {
                contentOffset = dlo.layout.span;
            }
            dlo.encode(src[dlo.property], b, offset);
            // clo.property is not undefined when vlo is undefined
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return contentOffset + clo.encode(src[clo.property], b, offset + contentOffset);
        }
        return vlo.encode(src, b, offset);
    }
    /** Register a new variant structure within a union.  The newly
     * created variant is returned.
     *
     * @param {Number} variant - initializer for {@link
     * VariantLayout#variant|variant}.
     *
     * @param {Layout} layout - initializer for {@link
     * VariantLayout#layout|layout}.
     *
     * @param {String} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {VariantLayout} */
    addVariant(variant, layout, property) {
        const rv = new VariantLayout(this, variant, layout, property);
        this.registry[variant] = rv;
        return rv;
    }
    /**
     * Get the layout associated with a registered variant.
     *
     * If `vb` does not produce a registered variant the function returns
     * `undefined`.
     *
     * @param {(Number|Uint8Array)} vb - either the variant number, or a
     * buffer from which the discriminator is to be read.
     *
     * @param {Number} offset - offset into `vb` for the start of the
     * union.  Used only when `vb` is an instance of {Uint8Array}.
     *
     * @return {({VariantLayout}|undefined)}
     */
    getVariant(vb, offset = 0) {
        let variant;
        if (vb instanceof Uint8Array) {
            variant = this.discriminator.decode(vb, offset);
        }
        else {
            variant = vb;
        }
        return this.registry[variant];
    }
}
Layout$1.Union = Union;
/**
 * Represent a specific variant within a containing union.
 *
 * **NOTE** The {@link Layout#span|span} of the variant may include
 * the span of the {@link Union#discriminator|discriminator} used to
 * identify it, but values read and written using the variant strictly
 * conform to the content of {@link VariantLayout#layout|layout}.
 *
 * **NOTE** User code should not invoke this constructor directly.  Use
 * the union {@link Union#addVariant|addVariant} helper method.
 *
 * @param {Union} union - initializer for {@link
 * VariantLayout#union|union}.
 *
 * @param {Number} variant - initializer for {@link
 * VariantLayout#variant|variant}.
 *
 * @param {Layout} [layout] - initializer for {@link
 * VariantLayout#layout|layout}.  If absent the variant carries no
 * data.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.  Unlike many other layouts, variant
 * layouts normally include a property name so they can be identified
 * within their containing {@link Union}.  The property identifier may
 * be absent only if `layout` is is absent.
 *
 * @augments {Layout}
 */
class VariantLayout extends Layout {
    constructor(union, variant, layout, property) {
        if (!(union instanceof Union)) {
            throw new TypeError('union must be a Union');
        }
        if ((!Number.isInteger(variant)) || (0 > variant)) {
            throw new TypeError('variant must be a (non-negative) integer');
        }
        if (('string' === typeof layout)
            && (undefined === property)) {
            property = layout;
            layout = null;
        }
        if (layout) {
            if (!(layout instanceof Layout)) {
                throw new TypeError('layout must be a Layout');
            }
            if ((null !== union.defaultLayout)
                && (0 <= layout.span)
                && (layout.span > union.defaultLayout.span)) {
                throw new Error('variant span exceeds span of containing union');
            }
            if ('string' !== typeof property) {
                throw new TypeError('variant must have a String property');
            }
        }
        let span = union.span;
        if (0 > union.span) {
            span = layout ? layout.span : 0;
            if ((0 <= span) && union.usesPrefixDiscriminator) {
                span += union.discriminator.layout.span;
            }
        }
        super(span, property);
        /** The {@link Union} to which this variant belongs. */
        this.union = union;
        /** The unsigned integral value identifying this variant within
         * the {@link Union#discriminator|discriminator} of the containing
         * union. */
        this.variant = variant;
        /** The {@link Layout} to be used when reading/writing the
         * non-discriminator part of the {@link
         * VariantLayout#union|union}.  If `null` the variant carries no
         * data. */
        this.layout = layout || null;
    }
    /** @override */
    getSpan(b, offset = 0) {
        if (0 <= this.span) {
            /* Will be equal to the containing union span if that is not
             * variable. */
            return this.span;
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
            contentOffset = this.union.discriminator.layout.span;
        }
        /* Span is defined solely by the variant (and prefix discriminator) */
        let span = 0;
        if (this.layout) {
            span = this.layout.getSpan(b, offset + contentOffset);
        }
        return contentOffset + span;
    }
    /** @override */
    decode(b, offset = 0) {
        const dest = this.makeDestinationObject();
        if (this !== this.union.getVariant(b, offset)) {
            throw new Error('variant mismatch');
        }
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
            contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout) {
            dest[this.property] = this.layout.decode(b, offset + contentOffset);
        }
        else if (this.property) {
            dest[this.property] = true;
        }
        else if (this.union.usesPrefixDiscriminator) {
            dest[this.union.discriminator.property] = this.variant;
        }
        return dest;
    }
    /** @override */
    encode(src, b, offset = 0) {
        let contentOffset = 0;
        if (this.union.usesPrefixDiscriminator) {
            contentOffset = this.union.discriminator.layout.span;
        }
        if (this.layout
            && (!Object.prototype.hasOwnProperty.call(src, this.property))) {
            throw new TypeError('variant lacks property ' + this.property);
        }
        this.union.discriminator.encode(this.variant, b, offset);
        let span = contentOffset;
        if (this.layout) {
            this.layout.encode(src[this.property], b, offset + contentOffset);
            span += this.layout.getSpan(b, offset + contentOffset);
            if ((0 <= this.union.span)
                && (span > this.union.span)) {
                throw new Error('encoded variant overruns containing union');
            }
        }
        return span;
    }
    /** Delegate {@link Layout#fromArray|fromArray} to {@link
     * VariantLayout#layout|layout}. */
    fromArray(values) {
        if (this.layout) {
            return this.layout.fromArray(values);
        }
        return undefined;
    }
}
Layout$1.VariantLayout = VariantLayout;
/** JavaScript chose to define bitwise operations as operating on
 * signed 32-bit values in 2's complement form, meaning any integer
 * with bit 31 set is going to look negative.  For right shifts that's
 * not a problem, because `>>>` is a logical shift, but for every
 * other bitwise operator we have to compensate for possible negative
 * results. */
function fixBitwiseResult(v) {
    if (0 > v) {
        v += 0x100000000;
    }
    return v;
}
/**
 * Contain a sequence of bit fields as an unsigned integer.
 *
 * *Factory*: {@link module:Layout.bits|bits}
 *
 * This is a container element; within it there are {@link BitField}
 * instances that provide the extracted properties.  The container
 * simply defines the aggregate representation and its bit ordering.
 * The representation is an object containing properties with numeric
 * or {@link Boolean} values.
 *
 * {@link BitField}s are added with the {@link
 * BitStructure#addField|addField} and {@link
 * BitStructure#addBoolean|addBoolean} methods.

 * @param {Layout} word - initializer for {@link
 * BitStructure#word|word}.  The parameter must be an instance of
 * {@link UInt} (or {@link UIntBE}) that is no more than 4 bytes wide.
 *
 * @param {bool} [msb] - `true` if the bit numbering starts at the
 * most significant bit of the containing word; `false` (default) if
 * it starts at the least significant bit of the containing word.  If
 * the parameter at this position is a string and `property` is
 * `undefined` the value of this argument will instead be used as the
 * value of `property`.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class BitStructure extends Layout {
    constructor(word, msb, property) {
        if (!((word instanceof UInt)
            || (word instanceof UIntBE))) {
            throw new TypeError('word must be a UInt or UIntBE layout');
        }
        if (('string' === typeof msb)
            && (undefined === property)) {
            property = msb;
            msb = false;
        }
        if (4 < word.span) {
            throw new RangeError('word cannot exceed 32 bits');
        }
        super(word.span, property);
        /** The layout used for the packed value.  {@link BitField}
         * instances are packed sequentially depending on {@link
         * BitStructure#msb|msb}. */
        this.word = word;
        /** Whether the bit sequences are packed starting at the most
         * significant bit growing down (`true`), or the least significant
         * bit growing up (`false`).
         *
         * **NOTE** Regardless of this value, the least significant bit of
         * any {@link BitField} value is the least significant bit of the
         * corresponding section of the packed value. */
        this.msb = !!msb;
        /** The sequence of {@link BitField} layouts that comprise the
         * packed structure.
         *
         * **NOTE** The array remains mutable to allow fields to be {@link
         * BitStructure#addField|added} after construction.  Users should
         * not manipulate the content of this property.*/
        this.fields = [];
        /* Storage for the value.  Capture a variable instead of using an
         * instance property because we don't want anything to change the
         * value without going through the mutator. */
        let value = 0;
        this._packedSetValue = function (v) {
            value = fixBitwiseResult(v);
            return this;
        };
        this._packedGetValue = function () {
            return value;
        };
    }
    /** @override */
    decode(b, offset = 0) {
        const dest = this.makeDestinationObject();
        const value = this.word.decode(b, offset);
        this._packedSetValue(value);
        for (const fd of this.fields) {
            if (undefined !== fd.property) {
                dest[fd.property] = fd.decode(b);
            }
        }
        return dest;
    }
    /** Implement {@link Layout#encode|encode} for {@link BitStructure}.
     *
     * If `src` is missing a property for a member with a defined {@link
     * Layout#property|property} the corresponding region of the packed
     * value is left unmodified.  Unused bits are also left unmodified. */
    encode(src, b, offset = 0) {
        const value = this.word.decode(b, offset);
        this._packedSetValue(value);
        for (const fd of this.fields) {
            if (undefined !== fd.property) {
                const fv = src[fd.property];
                if (undefined !== fv) {
                    fd.encode(fv);
                }
            }
        }
        return this.word.encode(this._packedGetValue(), b, offset);
    }
    /** Register a new bitfield with a containing bit structure.  The
     * resulting bitfield is returned.
     *
     * @param {Number} bits - initializer for {@link BitField#bits|bits}.
     *
     * @param {string} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {BitField} */
    addField(bits, property) {
        const bf = new BitField(this, bits, property);
        this.fields.push(bf);
        return bf;
    }
    /** As with {@link BitStructure#addField|addField} for single-bit
     * fields with `boolean` value representation.
     *
     * @param {string} property - initializer for {@link
     * Layout#property|property}.
     *
     * @return {Boolean} */
    // `Boolean` conflicts with the native primitive type
    // eslint-disable-next-line @typescript-eslint/ban-types
    addBoolean(property) {
        // This is my Boolean, not the Javascript one.
        const bf = new Boolean$1(this, property);
        this.fields.push(bf);
        return bf;
    }
    /**
     * Get access to the bit field for a given property.
     *
     * @param {String} property - the bit field of interest.
     *
     * @return {BitField} - the field associated with `property`, or
     * undefined if there is no such property.
     */
    fieldFor(property) {
        if ('string' !== typeof property) {
            throw new TypeError('property must be string');
        }
        for (const fd of this.fields) {
            if (fd.property === property) {
                return fd;
            }
        }
        return undefined;
    }
}
Layout$1.BitStructure = BitStructure;
/**
 * Represent a sequence of bits within a {@link BitStructure}.
 *
 * All bit field values are represented as unsigned integers.
 *
 * **NOTE** User code should not invoke this constructor directly.
 * Use the container {@link BitStructure#addField|addField} helper
 * method.
 *
 * **NOTE** BitField instances are not instances of {@link Layout}
 * since {@link Layout#span|span} measures 8-bit units.
 *
 * @param {BitStructure} container - initializer for {@link
 * BitField#container|container}.
 *
 * @param {Number} bits - initializer for {@link BitField#bits|bits}.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 */
class BitField {
    constructor(container, bits, property) {
        if (!(container instanceof BitStructure)) {
            throw new TypeError('container must be a BitStructure');
        }
        if ((!Number.isInteger(bits)) || (0 >= bits)) {
            throw new TypeError('bits must be positive integer');
        }
        const totalBits = 8 * container.span;
        const usedBits = container.fields.reduce((sum, fd) => sum + fd.bits, 0);
        if ((bits + usedBits) > totalBits) {
            throw new Error('bits too long for span remainder ('
                + (totalBits - usedBits) + ' of '
                + totalBits + ' remain)');
        }
        /** The {@link BitStructure} instance to which this bit field
         * belongs. */
        this.container = container;
        /** The span of this value in bits. */
        this.bits = bits;
        /** A mask of {@link BitField#bits|bits} bits isolating value bits
         * that fit within the field.
         *
         * That is, it masks a value that has not yet been shifted into
         * position within its containing packed integer. */
        this.valueMask = (1 << bits) - 1;
        if (32 === bits) { // shifted value out of range
            this.valueMask = 0xFFFFFFFF;
        }
        /** The offset of the value within the containing packed unsigned
         * integer.  The least significant bit of the packed value is at
         * offset zero, regardless of bit ordering used. */
        this.start = usedBits;
        if (this.container.msb) {
            this.start = totalBits - usedBits - bits;
        }
        /** A mask of {@link BitField#bits|bits} isolating the field value
         * within the containing packed unsigned integer. */
        this.wordMask = fixBitwiseResult(this.valueMask << this.start);
        /** The property name used when this bitfield is represented in an
         * Object.
         *
         * Intended to be functionally equivalent to {@link
         * Layout#property}.
         *
         * If left undefined the corresponding span of bits will be
         * treated as padding: it will not be mutated by {@link
         * Layout#encode|encode} nor represented as a property in the
         * decoded Object. */
        this.property = property;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field. */
    decode(b, offset) {
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(word & this.wordMask);
        const value = wordValue >>> this.start;
        return value;
    }
    /** Store a value into the corresponding subsequence of the containing
     * bit field.
     *
     * **NOTE** This is not a specialization of {@link
     * Layout#encode|Layout.encode} and there is no return value. */
    encode(value) {
        if ('number' !== typeof value
            || !Number.isInteger(value)
            || (value !== fixBitwiseResult(value & this.valueMask))) {
            throw new TypeError(nameWithProperty('BitField.encode', this)
                + ' value must be integer not exceeding ' + this.valueMask);
        }
        const word = this.container._packedGetValue();
        const wordValue = fixBitwiseResult(value << this.start);
        this.container._packedSetValue(fixBitwiseResult(word & ~this.wordMask)
            | wordValue);
    }
}
Layout$1.BitField = BitField;
/**
 * Represent a single bit within a {@link BitStructure} as a
 * JavaScript boolean.
 *
 * **NOTE** User code should not invoke this constructor directly.
 * Use the container {@link BitStructure#addBoolean|addBoolean} helper
 * method.
 *
 * @param {BitStructure} container - initializer for {@link
 * BitField#container|container}.
 *
 * @param {string} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {BitField}
 */
/* eslint-disable no-extend-native */
class Boolean$1 extends BitField {
    constructor(container, property) {
        super(container, 1, property);
    }
    /** Override {@link BitField#decode|decode} for {@link Boolean|Boolean}.
     *
     * @returns {boolean} */
    decode(b, offset) {
        return !!super.decode(b, offset);
    }
    /** @override */
    encode(value) {
        if ('boolean' === typeof value) {
            // BitField requires integer values
            value = +value;
        }
        super.encode(value);
    }
}
Layout$1.Boolean = Boolean$1;
/* eslint-enable no-extend-native */
/**
 * Contain a fixed-length block of arbitrary data, represented as a
 * Uint8Array.
 *
 * *Factory*: {@link module:Layout.blob|blob}
 *
 * @param {(Number|ExternalLayout)} length - initializes {@link
 * Blob#length|length}.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Blob extends Layout {
    constructor(length, property) {
        if (!(((length instanceof ExternalLayout) && length.isCount())
            || (Number.isInteger(length) && (0 <= length)))) {
            throw new TypeError('length must be positive integer '
                + 'or an unsigned integer ExternalLayout');
        }
        let span = -1;
        if (!(length instanceof ExternalLayout)) {
            span = length;
        }
        super(span, property);
        /** The number of bytes in the blob.
         *
         * This may be a non-negative integer, or an instance of {@link
         * ExternalLayout} that satisfies {@link
         * ExternalLayout#isCount|isCount()}. */
        this.length = length;
    }
    /** @override */
    getSpan(b, offset) {
        let span = this.span;
        if (0 > span) {
            span = this.length.decode(b, offset);
        }
        return span;
    }
    /** @override */
    decode(b, offset = 0) {
        let span = this.span;
        if (0 > span) {
            span = this.length.decode(b, offset);
        }
        return uint8ArrayToBuffer(b).slice(offset, offset + span);
    }
    /** Implement {@link Layout#encode|encode} for {@link Blob}.
     *
     * **NOTE** If {@link Layout#count|count} is an instance of {@link
     * ExternalLayout} then the length of `src` will be encoded as the
     * count after `src` is encoded. */
    encode(src, b, offset) {
        let span = this.length;
        if (this.length instanceof ExternalLayout) {
            span = src.length;
        }
        if (!(src instanceof Uint8Array && span === src.length)) {
            throw new TypeError(nameWithProperty('Blob.encode', this)
                + ' requires (length ' + span + ') Uint8Array as src');
        }
        if ((offset + span) > b.length) {
            throw new RangeError('encoding overruns Uint8Array');
        }
        const srcBuffer = uint8ArrayToBuffer(src);
        uint8ArrayToBuffer(b).write(srcBuffer.toString('hex'), offset, span, 'hex');
        if (this.length instanceof ExternalLayout) {
            this.length.encode(span, b, offset);
        }
        return span;
    }
}
Layout$1.Blob = Blob;
/**
 * Contain a `NUL`-terminated UTF8 string.
 *
 * *Factory*: {@link module:Layout.cstr|cstr}
 *
 * **NOTE** Any UTF8 string that incorporates a zero-valued byte will
 * not be correctly decoded by this layout.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class CString extends Layout {
    constructor(property) {
        super(-1, property);
    }
    /** @override */
    getSpan(b, offset = 0) {
        checkUint8Array(b);
        let idx = offset;
        while ((idx < b.length) && (0 !== b[idx])) {
            idx += 1;
        }
        return 1 + idx - offset;
    }
    /** @override */
    decode(b, offset = 0) {
        const span = this.getSpan(b, offset);
        return uint8ArrayToBuffer(b).slice(offset, offset + span - 1).toString('utf-8');
    }
    /** @override */
    encode(src, b, offset = 0) {
        /* Must force this to a string, lest it be a number and the
         * "utf8-encoding" below actually allocate a buffer of length
         * src */
        if ('string' !== typeof src) {
            src = String(src);
        }
        const srcb = buffer_1.Buffer.from(src, 'utf8');
        const span = srcb.length;
        if ((offset + span) > b.length) {
            throw new RangeError('encoding overruns Buffer');
        }
        const buffer = uint8ArrayToBuffer(b);
        srcb.copy(buffer, offset);
        buffer[offset + span] = 0;
        return span + 1;
    }
}
Layout$1.CString = CString;
/**
 * Contain a UTF8 string with implicit length.
 *
 * *Factory*: {@link module:Layout.utf8|utf8}
 *
 * **NOTE** Because the length is implicit in the size of the buffer
 * this layout should be used only in isolation, or in a situation
 * where the length can be expressed by operating on a slice of the
 * containing buffer.
 *
 * @param {Number} [maxSpan] - the maximum length allowed for encoded
 * string content.  If not provided there is no bound on the allowed
 * content.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class UTF8 extends Layout {
    constructor(maxSpan, property) {
        if (('string' === typeof maxSpan) && (undefined === property)) {
            property = maxSpan;
            maxSpan = undefined;
        }
        if (undefined === maxSpan) {
            maxSpan = -1;
        }
        else if (!Number.isInteger(maxSpan)) {
            throw new TypeError('maxSpan must be an integer');
        }
        super(-1, property);
        /** The maximum span of the layout in bytes.
         *
         * Positive values are generally expected.  Zero is abnormal.
         * Attempts to encode or decode a value that exceeds this length
         * will throw a `RangeError`.
         *
         * A negative value indicates that there is no bound on the length
         * of the content. */
        this.maxSpan = maxSpan;
    }
    /** @override */
    getSpan(b, offset = 0) {
        checkUint8Array(b);
        return b.length - offset;
    }
    /** @override */
    decode(b, offset = 0) {
        const span = this.getSpan(b, offset);
        if ((0 <= this.maxSpan)
            && (this.maxSpan < span)) {
            throw new RangeError('text length exceeds maxSpan');
        }
        return uint8ArrayToBuffer(b).slice(offset, offset + span).toString('utf-8');
    }
    /** @override */
    encode(src, b, offset = 0) {
        /* Must force this to a string, lest it be a number and the
         * "utf8-encoding" below actually allocate a buffer of length
         * src */
        if ('string' !== typeof src) {
            src = String(src);
        }
        const srcb = buffer_1.Buffer.from(src, 'utf8');
        const span = srcb.length;
        if ((0 <= this.maxSpan)
            && (this.maxSpan < span)) {
            throw new RangeError('text length exceeds maxSpan');
        }
        if ((offset + span) > b.length) {
            throw new RangeError('encoding overruns Buffer');
        }
        srcb.copy(uint8ArrayToBuffer(b), offset);
        return span;
    }
}
Layout$1.UTF8 = UTF8;
/**
 * Contain a constant value.
 *
 * This layout may be used in cases where a JavaScript value can be
 * inferred without an expression in the binary encoding.  An example
 * would be a {@link VariantLayout|variant layout} where the content
 * is implied by the union {@link Union#discriminator|discriminator}.
 *
 * @param {Object|Number|String} value - initializer for {@link
 * Constant#value|value}.  If the value is an object (or array) and
 * the application intends the object to remain unchanged regardless
 * of what is done to values decoded by this layout, the value should
 * be frozen prior passing it to this constructor.
 *
 * @param {String} [property] - initializer for {@link
 * Layout#property|property}.
 *
 * @augments {Layout}
 */
class Constant extends Layout {
    constructor(value, property) {
        super(0, property);
        /** The value produced by this constant when the layout is {@link
         * Constant#decode|decoded}.
         *
         * Any JavaScript value including `null` and `undefined` is
         * permitted.
         *
         * **WARNING** If `value` passed in the constructor was not
         * frozen, it is possible for users of decoded values to change
         * the content of the value. */
        this.value = value;
    }
    /** @override */
    decode(b, offset) {
        return this.value;
    }
    /** @override */
    encode(src, b, offset) {
        /* Constants take no space */
        return 0;
    }
}
Layout$1.Constant = Constant;
/** Factory for {@link GreedyCount}. */
Layout$1.greedy = ((elementSpan, property) => new GreedyCount(elementSpan, property));
/** Factory for {@link OffsetLayout}. */
var offset = Layout$1.offset = ((layout, offset, property) => new OffsetLayout(layout, offset, property));
/** Factory for {@link UInt|unsigned int layouts} spanning one
 * byte. */
var u8 = Layout$1.u8 = ((property) => new UInt(1, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning two bytes. */
var u16 = Layout$1.u16 = ((property) => new UInt(2, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning three bytes. */
Layout$1.u24 = ((property) => new UInt(3, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning four bytes. */
var u32 = Layout$1.u32 = ((property) => new UInt(4, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning five bytes. */
Layout$1.u40 = ((property) => new UInt(5, property));
/** Factory for {@link UInt|little-endian unsigned int layouts}
 * spanning six bytes. */
Layout$1.u48 = ((property) => new UInt(6, property));
/** Factory for {@link NearUInt64|little-endian unsigned int
 * layouts} interpreted as Numbers. */
var nu64 = Layout$1.nu64 = ((property) => new NearUInt64(property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning two bytes. */
Layout$1.u16be = ((property) => new UIntBE(2, property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning three bytes. */
Layout$1.u24be = ((property) => new UIntBE(3, property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning four bytes. */
Layout$1.u32be = ((property) => new UIntBE(4, property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning five bytes. */
Layout$1.u40be = ((property) => new UIntBE(5, property));
/** Factory for {@link UInt|big-endian unsigned int layouts}
 * spanning six bytes. */
Layout$1.u48be = ((property) => new UIntBE(6, property));
/** Factory for {@link NearUInt64BE|big-endian unsigned int
 * layouts} interpreted as Numbers. */
Layout$1.nu64be = ((property) => new NearUInt64BE(property));
/** Factory for {@link Int|signed int layouts} spanning one
 * byte. */
Layout$1.s8 = ((property) => new Int(1, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning two bytes. */
Layout$1.s16 = ((property) => new Int(2, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning three bytes. */
Layout$1.s24 = ((property) => new Int(3, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning four bytes. */
Layout$1.s32 = ((property) => new Int(4, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning five bytes. */
Layout$1.s40 = ((property) => new Int(5, property));
/** Factory for {@link Int|little-endian signed int layouts}
 * spanning six bytes. */
Layout$1.s48 = ((property) => new Int(6, property));
/** Factory for {@link NearInt64|little-endian signed int layouts}
 * interpreted as Numbers. */
var ns64 = Layout$1.ns64 = ((property) => new NearInt64(property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning two bytes. */
Layout$1.s16be = ((property) => new IntBE(2, property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning three bytes. */
Layout$1.s24be = ((property) => new IntBE(3, property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning four bytes. */
Layout$1.s32be = ((property) => new IntBE(4, property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning five bytes. */
Layout$1.s40be = ((property) => new IntBE(5, property));
/** Factory for {@link Int|big-endian signed int layouts}
 * spanning six bytes. */
Layout$1.s48be = ((property) => new IntBE(6, property));
/** Factory for {@link NearInt64BE|big-endian signed int layouts}
 * interpreted as Numbers. */
Layout$1.ns64be = ((property) => new NearInt64BE(property));
/** Factory for {@link Float|little-endian 32-bit floating point} values. */
Layout$1.f32 = ((property) => new Float(property));
/** Factory for {@link FloatBE|big-endian 32-bit floating point} values. */
Layout$1.f32be = ((property) => new FloatBE(property));
/** Factory for {@link Double|little-endian 64-bit floating point} values. */
Layout$1.f64 = ((property) => new Double(property));
/** Factory for {@link DoubleBE|big-endian 64-bit floating point} values. */
Layout$1.f64be = ((property) => new DoubleBE(property));
/** Factory for {@link Structure} values. */
var struct = Layout$1.struct = ((fields, property, decodePrefixes) => new Structure(fields, property, decodePrefixes));
/** Factory for {@link BitStructure} values. */
Layout$1.bits = ((word, msb, property) => new BitStructure(word, msb, property));
/** Factory for {@link Sequence} values. */
var seq = Layout$1.seq = ((elementLayout, count, property) => new Sequence(elementLayout, count, property));
/** Factory for {@link Union} values. */
Layout$1.union = ((discr, defaultLayout, property) => new Union(discr, defaultLayout, property));
/** Factory for {@link UnionLayoutDiscriminator} values. */
Layout$1.unionLayoutDiscriminator = ((layout, property) => new UnionLayoutDiscriminator(layout, property));
/** Factory for {@link Blob} values. */
var blob = Layout$1.blob = ((length, property) => new Blob(length, property));
/** Factory for {@link CString} values. */
Layout$1.cstr = ((property) => new CString(property));
/** Factory for {@link UTF8} values. */
Layout$1.utf8 = ((maxSpan, property) => new UTF8(maxSpan, property));
/** Factory for {@link Constant} values. */
Layout$1.constant = ((value, property) => new Constant(value, property));

/**
 * A `StructFailure` represents a single specific failure in validation.
 */

/**
 * `StructError` objects are thrown (or returned) when validation fails.
 *
 * Validation logic is design to exit early for maximum performance. The error
 * represents the first error encountered during validation. For more detail,
 * the `error.failures` property is a generator function that can be run to
 * continue validation and receive all the failures in the data.
 */
class StructError extends TypeError {
  constructor(failure, failures) {
    let cached;
    const {
      message,
      ...rest
    } = failure;
    const {
      path
    } = failure;
    const msg = path.length === 0 ? message : "At path: " + path.join('.') + " -- " + message;
    super(msg);
    Object.assign(this, rest);
    this.name = this.constructor.name;

    this.failures = () => {
      var _cached;

      return (_cached = cached) != null ? _cached : cached = [failure, ...failures()];
    };
  }

}

/**
 * Check if a value is an iterator.
 */
function isIterable(x) {
  return isObject(x) && typeof x[Symbol.iterator] === 'function';
}
/**
 * Check if a value is a plain object.
 */


function isObject(x) {
  return typeof x === 'object' && x != null;
}
/**
 * Return a value as a printable string.
 */

function print(value) {
  return typeof value === 'string' ? JSON.stringify(value) : "" + value;
}
/**
 * Shifts (removes and returns) the first value from the `input` iterator.
 * Like `Array.prototype.shift()` but for an `Iterator`.
 */

function shiftIterator(input) {
  const {
    done,
    value
  } = input.next();
  return done ? undefined : value;
}
/**
 * Convert a single validation result to a failure.
 */

function toFailure(result, context, struct, value) {
  if (result === true) {
    return;
  } else if (result === false) {
    result = {};
  } else if (typeof result === 'string') {
    result = {
      message: result
    };
  }

  const {
    path,
    branch
  } = context;
  const {
    type
  } = struct;
  const {
    refinement,
    message = "Expected a value of type `" + type + "`" + (refinement ? " with refinement `" + refinement + "`" : '') + ", but received: `" + print(value) + "`"
  } = result;
  return {
    value,
    type,
    refinement,
    key: path[path.length - 1],
    path,
    branch,
    ...result,
    message
  };
}
/**
 * Convert a validation result to an iterable of failures.
 */

function* toFailures(result, context, struct, value) {
  if (!isIterable(result)) {
    result = [result];
  }

  for (const r of result) {
    const failure = toFailure(r, context, struct, value);

    if (failure) {
      yield failure;
    }
  }
}
/**
 * Check a value against a struct, traversing deeply into nested values, and
 * returning an iterator of failures or success.
 */

function* run(value, struct, options = {}) {
  const {
    path = [],
    branch = [value],
    coerce = false,
    mask = false
  } = options;
  const ctx = {
    path,
    branch
  };

  if (coerce) {
    value = struct.coercer(value, ctx);

    if (mask && struct.type !== 'type' && isObject(struct.schema) && isObject(value) && !Array.isArray(value)) {
      for (const key in value) {
        if (struct.schema[key] === undefined) {
          delete value[key];
        }
      }
    }
  }

  let valid = true;

  for (const failure of struct.validator(value, ctx)) {
    valid = false;
    yield [failure, undefined];
  }

  for (let [k, v, s] of struct.entries(value, ctx)) {
    const ts = run(v, s, {
      path: k === undefined ? path : [...path, k],
      branch: k === undefined ? branch : [...branch, v],
      coerce,
      mask
    });

    for (const t of ts) {
      if (t[0]) {
        valid = false;
        yield [t[0], undefined];
      } else if (coerce) {
        v = t[1];

        if (k === undefined) {
          value = v;
        } else if (value instanceof Map) {
          value.set(k, v);
        } else if (value instanceof Set) {
          value.add(v);
        } else if (isObject(value)) {
          value[k] = v;
        }
      }
    }
  }

  if (valid) {
    for (const failure of struct.refiner(value, ctx)) {
      valid = false;
      yield [failure, undefined];
    }
  }

  if (valid) {
    yield [undefined, value];
  }
}

/**
 * `Struct` objects encapsulate the validation logic for a specific type of
 * values. Once constructed, you use the `assert`, `is` or `validate` helpers to
 * validate unknown input data against the struct.
 */

class Struct$1 {
  constructor(props) {
    const {
      type,
      schema,
      validator,
      refiner,
      coercer = value => value,
      entries = function* () {}
    } = props;
    this.type = type;
    this.schema = schema;
    this.entries = entries;
    this.coercer = coercer;

    if (validator) {
      this.validator = (value, context) => {
        const result = validator(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.validator = () => [];
    }

    if (refiner) {
      this.refiner = (value, context) => {
        const result = refiner(value, context);
        return toFailures(result, context, this, value);
      };
    } else {
      this.refiner = () => [];
    }
  }
  /**
   * Assert that a value passes the struct's validation, throwing if it doesn't.
   */


  assert(value) {
    return assert$7(value, this);
  }
  /**
   * Create a value with the struct's coercion logic, then validate it.
   */


  create(value) {
    return create(value, this);
  }
  /**
   * Check if a value passes the struct's validation.
   */


  is(value) {
    return is(value, this);
  }
  /**
   * Mask a value, coercing and validating it, but returning only the subset of
   * properties defined by the struct's schema.
   */


  mask(value) {
    return mask(value, this);
  }
  /**
   * Validate a value with the struct's validation logic, returning a tuple
   * representing the result.
   *
   * You may optionally pass `true` for the `withCoercion` argument to coerce
   * the value before attempting to validate it. If you do, the result will
   * contain the coerced result when successful.
   */


  validate(value, options = {}) {
    return validate$1(value, this, options);
  }

}
/**
 * Assert that a value passes a struct, throwing if it doesn't.
 */

function assert$7(value, struct) {
  const result = validate$1(value, struct);

  if (result[0]) {
    throw result[0];
  }
}
/**
 * Create a value with the coercion logic of struct and validate it.
 */

function create(value, struct) {
  const result = validate$1(value, struct, {
    coerce: true
  });

  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
/**
 * Mask a value, returning only the subset of properties defined by a struct.
 */

function mask(value, struct) {
  const result = validate$1(value, struct, {
    coerce: true,
    mask: true
  });

  if (result[0]) {
    throw result[0];
  } else {
    return result[1];
  }
}
/**
 * Check if a value passes a struct.
 */

function is(value, struct) {
  const result = validate$1(value, struct);
  return !result[0];
}
/**
 * Validate a value against a struct, returning an error if invalid, or the
 * value (with potential coercion) if valid.
 */

function validate$1(value, struct, options = {}) {
  const tuples = run(value, struct, options);
  const tuple = shiftIterator(tuples);

  if (tuple[0]) {
    const error = new StructError(tuple[0], function* () {
      for (const t of tuples) {
        if (t[0]) {
          yield t[0];
        }
      }
    });
    return [error, undefined];
  } else {
    const v = tuple[1];
    return [undefined, v];
  }
}
/**
 * Define a new struct type with a custom validation function.
 */

function define(name, validator) {
  return new Struct$1({
    type: name,
    schema: null,
    validator
  });
}

/**
 * Ensure that any value passes validation.
 */

function any() {
  return define('any', () => true);
}
function array(Element) {
  return new Struct$1({
    type: 'array',
    schema: Element,

    *entries(value) {
      if (Element && Array.isArray(value)) {
        for (const [i, v] of value.entries()) {
          yield [i, v, Element];
        }
      }
    },

    coercer(value) {
      return Array.isArray(value) ? value.slice() : value;
    },

    validator(value) {
      return Array.isArray(value) || "Expected an array value, but received: " + print(value);
    }

  });
}
/**
 * Ensure that a value is a boolean.
 */

function boolean() {
  return define('boolean', value => {
    return typeof value === 'boolean';
  });
}
/**
 * Ensure that a value is an instance of a specific class.
 */

function instance(Class) {
  return define('instance', value => {
    return value instanceof Class || "Expected a `" + Class.name + "` instance, but received: " + print(value);
  });
}
function literal(constant) {
  const description = print(constant);
  const t = typeof constant;
  return new Struct$1({
    type: 'literal',
    schema: t === 'string' || t === 'number' || t === 'boolean' ? constant : null,

    validator(value) {
      return value === constant || "Expected the literal `" + description + "`, but received: " + print(value);
    }

  });
}
/**
 * Ensure that no value ever passes validation.
 */

function never() {
  return define('never', () => false);
}
/**
 * Augment an existing struct to allow `null` values.
 */

function nullable(struct) {
  return new Struct$1({ ...struct,
    validator: (value, ctx) => value === null || struct.validator(value, ctx),
    refiner: (value, ctx) => value === null || struct.refiner(value, ctx)
  });
}
/**
 * Ensure that a value is a number.
 */

function number() {
  return define('number', value => {
    return typeof value === 'number' && !isNaN(value) || "Expected a number, but received: " + print(value);
  });
}
/**
 * Augment a struct to allow `undefined` values.
 */

function optional(struct) {
  return new Struct$1({ ...struct,
    validator: (value, ctx) => value === undefined || struct.validator(value, ctx),
    refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx)
  });
}
/**
 * Ensure that a value is an object with keys and values of specific types, but
 * without ensuring any specific shape of properties.
 *
 * Like TypeScript's `Record` utility.
 */

function record(Key, Value) {
  return new Struct$1({
    type: 'record',
    schema: null,

    *entries(value) {
      if (isObject(value)) {
        for (const k in value) {
          const v = value[k];
          yield [k, k, Key];
          yield [k, v, Value];
        }
      }
    },

    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }

  });
}
/**
 * Ensure that a value is a string.
 */

function string() {
  return define('string', value => {
    return typeof value === 'string' || "Expected a string, but received: " + print(value);
  });
}
function tuple(Elements) {
  const Never = never();
  return new Struct$1({
    type: 'tuple',
    schema: null,

    *entries(value) {
      if (Array.isArray(value)) {
        const length = Math.max(Elements.length, value.length);

        for (let i = 0; i < length; i++) {
          yield [i, value[i], Elements[i] || Never];
        }
      }
    },

    validator(value) {
      return Array.isArray(value) || "Expected an array, but received: " + print(value);
    }

  });
}
/**
 * Ensure that a value has a set of known properties of specific types.
 *
 * Note: Unrecognized properties are allowed and untouched. This is similar to
 * how TypeScript's structural typing works.
 */

function type(schema) {
  const keys = Object.keys(schema);
  return new Struct$1({
    type: 'type',
    schema,

    *entries(value) {
      if (isObject(value)) {
        for (const k of keys) {
          yield [k, value[k], schema[k]];
        }
      }
    },

    validator(value) {
      return isObject(value) || "Expected an object, but received: " + print(value);
    }

  });
}
function union(Structs) {
  const description = Structs.map(s => s.type).join(' | ');
  return new Struct$1({
    type: 'union',
    schema: null,

    validator(value, ctx) {
      const failures = [];

      for (const S of Structs) {
        const [...tuples] = run(value, S, ctx);
        const [first] = tuples;

        if (!first[0]) {
          return [];
        } else {
          for (const [failure] of tuples) {
            if (failure) {
              failures.push(failure);
            }
          }
        }
      }

      return ["Expected the value to satisfy a union of `" + description + "`, but received: " + print(value), ...failures];
    }

  });
}
/**
 * Ensure that any value passes validation, without widening its type to `any`.
 */

function unknown() {
  return define('unknown', () => true);
}

/**
 * Augment a `Struct` to add an additional coercion step to its input.
 *
 * This allows you to transform input data before validating it, to increase the
 * likelihood that it passes validation—for example for default values, parsing
 * different formats, etc.
 *
 * Note: You must use `create(value, Struct)` on the value to have the coercion
 * take effect! Using simply `assert()` or `is()` will not use coercion.
 */

function coerce(struct, condition, coercer) {
  return new Struct$1({ ...struct,
    coercer: (value, ctx) => {
      return is(value, condition) ? struct.coercer(coercer(value, ctx), ctx) : struct.coercer(value, ctx);
    }
  });
}

var dist = {};

var interopRequireDefault = {exports: {}};

(function (module) {
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}

	module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (interopRequireDefault));

var createClass = {exports: {}};

var hasRequiredCreateClass;

function requireCreateClass () {
	if (hasRequiredCreateClass) return createClass.exports;
	hasRequiredCreateClass = 1;
	(function (module) {
		function _defineProperties(target, props) {
		  for (var i = 0; i < props.length; i++) {
		    var descriptor = props[i];
		    descriptor.enumerable = descriptor.enumerable || false;
		    descriptor.configurable = true;
		    if ("value" in descriptor) descriptor.writable = true;
		    Object.defineProperty(target, descriptor.key, descriptor);
		  }
		}

		function _createClass(Constructor, protoProps, staticProps) {
		  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
		  if (staticProps) _defineProperties(Constructor, staticProps);
		  Object.defineProperty(Constructor, "prototype", {
		    writable: false
		  });
		  return Constructor;
		}

		module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (createClass));
	return createClass.exports;
}

var classCallCheck = {exports: {}};

var hasRequiredClassCallCheck;

function requireClassCallCheck () {
	if (hasRequiredClassCallCheck) return classCallCheck.exports;
	hasRequiredClassCallCheck = 1;
	(function (module) {
		function _classCallCheck(instance, Constructor) {
		  if (!(instance instanceof Constructor)) {
		    throw new TypeError("Cannot call a class as a function");
		  }
		}

		module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (classCallCheck));
	return classCallCheck.exports;
}

var inherits$1 = {exports: {}};

var setPrototypeOf = {exports: {}};

var hasRequiredSetPrototypeOf;

function requireSetPrototypeOf () {
	if (hasRequiredSetPrototypeOf) return setPrototypeOf.exports;
	hasRequiredSetPrototypeOf = 1;
	(function (module) {
		function _setPrototypeOf(o, p) {
		  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
		    o.__proto__ = p;
		    return o;
		  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
		  return _setPrototypeOf(o, p);
		}

		module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (setPrototypeOf));
	return setPrototypeOf.exports;
}

var hasRequiredInherits;

function requireInherits () {
	if (hasRequiredInherits) return inherits$1.exports;
	hasRequiredInherits = 1;
	(function (module) {
		var setPrototypeOf = requireSetPrototypeOf();

		function _inherits(subClass, superClass) {
		  if (typeof superClass !== "function" && superClass !== null) {
		    throw new TypeError("Super expression must either be null or a function");
		  }

		  subClass.prototype = Object.create(superClass && superClass.prototype, {
		    constructor: {
		      value: subClass,
		      writable: true,
		      configurable: true
		    }
		  });
		  Object.defineProperty(subClass, "prototype", {
		    writable: false
		  });
		  if (superClass) setPrototypeOf(subClass, superClass);
		}

		module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (inherits$1));
	return inherits$1.exports;
}

var possibleConstructorReturn = {exports: {}};

var _typeof = {exports: {}};

var hasRequired_typeof;

function require_typeof () {
	if (hasRequired_typeof) return _typeof.exports;
	hasRequired_typeof = 1;
	(function (module) {
		function _typeof(obj) {
		  "@babel/helpers - typeof";

		  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
		    return typeof obj;
		  } : function (obj) {
		    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
		  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
		}

		module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (_typeof));
	return _typeof.exports;
}

var assertThisInitialized = {exports: {}};

var hasRequiredAssertThisInitialized;

function requireAssertThisInitialized () {
	if (hasRequiredAssertThisInitialized) return assertThisInitialized.exports;
	hasRequiredAssertThisInitialized = 1;
	(function (module) {
		function _assertThisInitialized(self) {
		  if (self === void 0) {
		    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		  }

		  return self;
		}

		module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (assertThisInitialized));
	return assertThisInitialized.exports;
}

var hasRequiredPossibleConstructorReturn;

function requirePossibleConstructorReturn () {
	if (hasRequiredPossibleConstructorReturn) return possibleConstructorReturn.exports;
	hasRequiredPossibleConstructorReturn = 1;
	(function (module) {
		var _typeof = require_typeof()["default"];

		var assertThisInitialized = requireAssertThisInitialized();

		function _possibleConstructorReturn(self, call) {
		  if (call && (_typeof(call) === "object" || typeof call === "function")) {
		    return call;
		  } else if (call !== void 0) {
		    throw new TypeError("Derived constructors may only return object or undefined");
		  }

		  return assertThisInitialized(self);
		}

		module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (possibleConstructorReturn));
	return possibleConstructorReturn.exports;
}

var getPrototypeOf = {exports: {}};

var hasRequiredGetPrototypeOf;

function requireGetPrototypeOf () {
	if (hasRequiredGetPrototypeOf) return getPrototypeOf.exports;
	hasRequiredGetPrototypeOf = 1;
	(function (module) {
		function _getPrototypeOf(o) {
		  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
		    return o.__proto__ || Object.getPrototypeOf(o);
		  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
		  return _getPrototypeOf(o);
		}

		module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
} (getPrototypeOf));
	return getPrototypeOf.exports;
}

var websocket$1 = {};

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global$1.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global$1.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser$1 = true;
var env = {};
var argv = [];
var version$4 = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = global$1.performance || {};
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var browser$1$1 = {
  nextTick: nextTick,
  title: title,
  browser: browser$1,
  env: env,
  argv: argv,
  version: version$4,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

const EventEmitter$1 = require('events');
const https = require('https');
const http$1 = require('http');
const net = require('net');
const tls = require('tls');
const { randomBytes, createHash: createHash$1 } = require('crypto');
require('stream');
const { URL: URL$2 } = require('url');

const PerMessageDeflate$3 = require('./permessage-deflate');
const Receiver$1 = require('./receiver');
const Sender$1 = require('./sender');
const {
  BINARY_TYPES: BINARY_TYPES$1,
  EMPTY_BUFFER: EMPTY_BUFFER$2,
  GUID: GUID$1,
  kForOnEventAttribute,
  kListener,
  kStatusCode: kStatusCode$1,
  kWebSocket: kWebSocket$2,
  NOOP
} = require('./constants');
const {
  EventTarget: { addEventListener, removeEventListener }
} = require('./event-target');
const { format, parse: parse$1 } = require('./extension');
const { toBuffer: toBuffer$2 } = require('./buffer-util');

const closeTimeout = 30 * 1000;
const kAborted = Symbol('kAborted');
const protocolVersions = [8, 13];
const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket$1 extends EventEmitter$1 {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES$1[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER$2;
    this._closeTimer = null;
    this._extensions = {};
    this._paused = false;
    this._protocol = '';
    this._readyState = WebSocket$1.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES$1.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;

    return this._socket._writableState.length + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }

  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }

  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(socket, head, options) {
    const receiver = new Receiver$1({
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: options.maxPayload,
      skipUTF8Validation: options.skipUTF8Validation
    });

    this._sender = new Sender$1(socket, this._extensions, options.generateMask);
    this._receiver = receiver;
    this._socket = socket;

    receiver[kWebSocket$2] = this;
    socket[kWebSocket$2] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError$1);

    this._readyState = WebSocket$1.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket$1.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate$3.extensionName]) {
      this._extensions[PerMessageDeflate$3.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this._readyState = WebSocket$1.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket$1.CLOSED) return;
    if (this.readyState === WebSocket$1.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake$1(this, this._req, msg);
    }

    if (this.readyState === WebSocket$1.CLOSING) {
      if (
        this._closeFrameSent &&
        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
      ) {
        this._socket.end();
      }

      return;
    }

    this._readyState = WebSocket$1.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;

      if (
        this._closeFrameReceived ||
        this._receiver._writableState.errorEmitted
      ) {
        this._socket.end();
      }
    });

    //
    // Specify a timeout for the closing handshake to complete.
    //
    this._closeTimer = setTimeout(
      this._socket.destroy.bind(this._socket),
      closeTimeout
    );
  }

  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    if (
      this.readyState === WebSocket$1.CONNECTING ||
      this.readyState === WebSocket$1.CLOSED
    ) {
      return;
    }

    this._paused = true;
    this._socket.pause();
  }

  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (this.readyState === WebSocket$1.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket$1.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER$2, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (this.readyState === WebSocket$1.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket$1.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER$2, mask, cb);
  }

  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    if (
      this.readyState === WebSocket$1.CONNECTING ||
      this.readyState === WebSocket$1.CLOSED
    ) {
      return;
    }

    this._paused = false;
    if (!this._receiver._writableState.needDrain) this._socket.resume();
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (this.readyState === WebSocket$1.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket$1.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[PerMessageDeflate$3.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER$2, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket$1.CLOSED) return;
    if (this.readyState === WebSocket$1.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      return abortHandshake$1(this, this._req, msg);
    }

    if (this._socket) {
      this._readyState = WebSocket$1.CLOSING;
      this._socket.destroy();
    }
  }
}

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket$1, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket$1.prototype, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket$1, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket$1.prototype, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket$1, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket$1.prototype, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket$1, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket$1.prototype, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

[
  'binaryType',
  'bufferedAmount',
  'extensions',
  'isPaused',
  'protocol',
  'readyState',
  'url'
].forEach((property) => {
  Object.defineProperty(WebSocket$1.prototype, property, { enumerable: true });
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket$1.prototype, `on${method}`, {
    enumerable: true,
    get() {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) return listener[kListener];
      }

      return null;
    },
    set(handler) {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) {
          this.removeListener(method, listener);
          break;
        }
      }

      if (typeof handler !== 'function') return;

      this.addEventListener(method, handler, {
        [kForOnEventAttribute]: true
      });
    }
  });
});

WebSocket$1.prototype.addEventListener = addEventListener;
WebSocket$1.prototype.removeEventListener = removeEventListener;

module.exports = WebSocket$1;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|URL)} address The URL to which to connect
 * @param {Array} protocols The subprotocols
 * @param {Object} [options] Connection options
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Function} [options.generateMask] The function used to generate the
 *     masking key
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
 *     not to skip UTF-8 validation for text and close messages
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: 'GET',
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  let parsedUrl;

  if (address instanceof URL$2) {
    parsedUrl = address;
    websocket._url = address.href;
  } else {
    try {
      parsedUrl = new URL$2(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }

    websocket._url = address;
  }

  const isSecure = parsedUrl.protocol === 'wss:';
  const isUnixSocket = parsedUrl.protocol === 'ws+unix:';
  let invalidURLMessage;

  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isUnixSocket) {
    invalidURLMessage =
      'The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"';
  } else if (isUnixSocket && !parsedUrl.pathname) {
    invalidURLMessage = "The URL's pathname is empty";
  } else if (parsedUrl.hash) {
    invalidURLMessage = 'The URL contains a fragment identifier';
  }

  if (invalidURLMessage) {
    const err = new SyntaxError(invalidURLMessage);

    if (websocket._redirects === 0) {
      throw err;
    } else {
      emitErrorAndClose(websocket, err);
      return;
    }
  }

  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const request = isSecure ? https.request : http$1.request;
  const protocolSet = new Set();
  let perMessageDeflate;

  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = {
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket',
    ...opts.headers
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate$3(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate$3.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols.length) {
    for (const protocol of protocols) {
      if (
        typeof protocol !== 'string' ||
        !subprotocolRegex.test(protocol) ||
        protocolSet.has(protocol)
      ) {
        throw new SyntaxError(
          'An invalid or duplicated subprotocol was specified'
        );
      }

      protocolSet.add(protocol);
    }

    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isUnixSocket) {
    const parts = opts.path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req;

  if (opts.followRedirects) {
    if (websocket._redirects === 0) {
      websocket._originalSecure = isSecure;
      websocket._originalHost = parsedUrl.host;

      const headers = options && options.headers;

      //
      // Shallow copy the user provided options so that headers can be changed
      // without mutating the original object.
      //
      options = { ...options, headers: {} };

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          options.headers[key.toLowerCase()] = value;
        }
      }
    } else if (websocket.listenerCount('redirect') === 0) {
      const isSameHost = parsedUrl.host === websocket._originalHost;

      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
        //
        // Match curl 7.77.0 behavior and drop the following headers. These
        // headers are also dropped when following a redirect to a subdomain.
        //
        delete opts.headers.authorization;
        delete opts.headers.cookie;

        if (!isSameHost) delete opts.headers.host;

        opts.auth = undefined;
      }
    }

    //
    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
    // If the `Authorization` header is set, then there is nothing to do as it
    // will take precedence.
    //
    if (opts.auth && !options.headers.authorization) {
      options.headers.authorization =
        'Basic ' + Buffer.from(opts.auth).toString('base64');
    }

    req = websocket._req = request(opts);

    if (websocket._redirects) {
      //
      // Unlike what is done for the `'upgrade'` event, no early exit is
      // triggered here if the user calls `websocket.close()` or
      // `websocket.terminate()` from a listener of the `'redirect'` event. This
      // is because the user can also call `request.destroy()` with an error
      // before calling `websocket.close()` or `websocket.terminate()` and this
      // would result in an error being emitted on the `request` object with no
      // `'error'` event listeners attached.
      //
      websocket.emit('redirect', websocket.url, req);
    }
  } else {
    req = websocket._req = request(opts);
  }

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake$1(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (req === null || req[kAborted]) return;

    req = websocket._req = null;
    emitErrorAndClose(websocket, err);
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake$1(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      let addr;

      try {
        addr = new URL$2(location, address);
      } catch (e) {
        const err = new SyntaxError(`Invalid URL: ${location}`);
        emitErrorAndClose(websocket, err);
        return;
      }

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake$1(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the
    // `'upgrade'` event.
    //
    if (websocket.readyState !== WebSocket$1.CONNECTING) return;

    req = websocket._req = null;

    if (res.headers.upgrade.toLowerCase() !== 'websocket') {
      abortHandshake$1(websocket, socket, 'Invalid Upgrade header');
      return;
    }

    const digest = createHash$1('sha1')
      .update(key + GUID$1)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake$1(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    let protError;

    if (serverProt !== undefined) {
      if (!protocolSet.size) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (!protocolSet.has(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }
    } else if (protocolSet.size) {
      protError = 'Server sent no subprotocol';
    }

    if (protError) {
      abortHandshake$1(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;

    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

    if (secWebSocketExtensions !== undefined) {
      if (!perMessageDeflate) {
        const message =
          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
          'was requested';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      let extensions;

      try {
        extensions = parse$1(secWebSocketExtensions);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      const extensionNames = Object.keys(extensions);

      if (
        extensionNames.length !== 1 ||
        extensionNames[0] !== PerMessageDeflate$3.extensionName
      ) {
        const message = 'Server indicated an extension that was not requested';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      try {
        perMessageDeflate.accept(extensions[PerMessageDeflate$3.extensionName]);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake$1(websocket, socket, message);
        return;
      }

      websocket._extensions[PerMessageDeflate$3.extensionName] =
        perMessageDeflate;
    }

    websocket.setSocket(socket, head, {
      generateMask: opts.generateMask,
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });

  req.end();
}

/**
 * Emit the `'error'` and `'close'` events.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {Error} The error to emit
 * @private
 */
function emitErrorAndClose(websocket, err) {
  websocket._readyState = WebSocket$1.CLOSING;
  websocket.emit('error', err);
  websocket.emitClose();
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
 *     abort or the socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake$1(websocket, stream, message) {
  websocket._readyState = WebSocket$1.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake$1);

  if (stream.setHeader) {
    stream[kAborted] = true;
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    browser$1$1.nextTick(emitErrorAndClose, websocket, err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */
function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer$2(data).length;

    //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //
    if (websocket._socket) websocket._sender._bufferedBytes += length;
    else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket.readyState} ` +
        `(${readyStates[websocket.readyState]})`
    );
    cb(err);
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {Buffer} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket$2];

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (websocket._socket[kWebSocket$2] === undefined) return;

  websocket._socket.removeListener('data', socketOnData);
  browser$1$1.nextTick(resume, websocket._socket);

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  const websocket = this[kWebSocket$2];

  if (!websocket.isPaused) websocket._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket$2];

  if (websocket._socket[kWebSocket$2] !== undefined) {
    websocket._socket.removeListener('data', socketOnData);

    //
    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
    // https://github.com/websockets/ws/issues/1940.
    //
    browser$1$1.nextTick(resume, websocket._socket);

    websocket.close(err[kStatusCode$1]);
  }

  websocket.emit('error', err);
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket$2].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
 * @param {Boolean} isBinary Specifies whether the message is binary or not
 * @private
 */
function receiverOnMessage(data, isBinary) {
  this[kWebSocket$2].emit('message', data, isBinary);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket$2];

  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket$2].emit('pong', data);
}

/**
 * Resume a readable stream
 *
 * @param {Readable} stream The readable stream
 * @private
 */
function resume(stream) {
  stream.resume();
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket$2];

  this.removeListener('close', socketOnClose);
  this.removeListener('data', socketOnData);
  this.removeListener('end', socketOnEnd);

  websocket._readyState = WebSocket$1.CLOSING;

  let chunk;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk.
  //
  if (
    !this._readableState.endEmitted &&
    !websocket._closeFrameReceived &&
    !websocket._receiver._writableState.errorEmitted &&
    (chunk = websocket._socket.read()) !== null
  ) {
    websocket._receiver.write(chunk);
  }

  websocket._receiver.end();

  this[kWebSocket$2] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket$2]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket$2];

  websocket._readyState = WebSocket$1.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError$1() {
  const websocket = this[kWebSocket$2];

  this.removeListener('error', socketOnError$1);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket$1.CLOSING;
    this.destroy();
  }
}

var websocket = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var require$$0$1 = /*@__PURE__*/getAugmentedNamespace(websocket);

const { Duplex } = require('stream');

/**
 * Emits the `'close'` event on a stream.
 *
 * @param {Duplex} stream The stream.
 * @private
 */
function emitClose$1(stream) {
  stream.emit('close');
}

/**
 * The listener of the `'end'` event.
 *
 * @private
 */
function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}

/**
 * The listener of the `'error'` event.
 *
 * @param {Error} err The error
 * @private
 */
function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();
  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}

/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} [options] The options for the `Duplex` constructor
 * @return {Duplex} The duplex stream
 * @public
 */
function createWebSocketStream(ws, options) {
  let terminateOnDestroy = true;

  const duplex = new Duplex({
    ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  ws.on('message', function message(msg, isBinary) {
    const data =
      !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;

    if (!duplex.push(data)) ws.pause();
  });

  ws.once('error', function error(err) {
    if (duplex.destroyed) return;

    // Prevent `ws.terminate()` from being called by `duplex._destroy()`.
    //
    // - If the `'error'` event is emitted before the `'open'` event, then
    //   `ws.terminate()` is a noop as no socket is assigned.
    // - Otherwise, the error is re-emitted by the listener of the `'error'`
    //   event of the `Receiver` object. The listener already closes the
    //   connection by calling `ws.close()`. This allows a close frame to be
    //   sent to the other peer. If `ws.terminate()` is called right after this,
    //   then the close frame might not be sent.
    terminateOnDestroy = false;
    duplex.destroy(err);
  });

  ws.once('close', function close() {
    if (duplex.destroyed) return;

    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      browser$1$1.nextTick(emitClose$1, duplex);
      return;
    }

    let called = false;

    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });

    ws.once('close', function close() {
      if (!called) callback(err);
      browser$1$1.nextTick(emitClose$1, duplex);
    });

    if (terminateOnDestroy) ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    }

    // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.
    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted) duplex.destroy();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });
      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.isPaused) ws.resume();
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

module.exports = createWebSocketStream;

var stream = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(stream);

const EventEmitter = require('events');
const http = require('http');
require('https');
require('net');
require('tls');
const { createHash } = require('crypto');

const extension = require('./extension');
const PerMessageDeflate$2 = require('./permessage-deflate');
const subprotocol = require('./subprotocol');
const WebSocket = require('./websocket');
const { GUID, kWebSocket: kWebSocket$1 } = require('./constants');

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

const RUNNING = 0;
const CLOSING = 1;
const CLOSED = 2;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = {
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket,
      ...options
    };

    if (
      (options.port == null && !options.server && !options.noServer) ||
      (options.port != null && (options.server || options.noServer)) ||
      (options.server && options.noServer)
    ) {
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options ' +
          'must be specified'
      );
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');

      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, emitConnection);
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) {
      this.clients = new Set();
      this._shouldEmitClose = false;
    }

    this.options = options;
    this._state = RUNNING;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */
  close(cb) {
    if (this._state === CLOSED) {
      if (cb) {
        this.once('close', () => {
          cb(new Error('The server is not running'));
        });
      }

      browser$1$1.nextTick(emitClose, this);
      return;
    }

    if (cb) this.once('close', cb);

    if (this._state === CLOSING) return;
    this._state = CLOSING;

    if (this.options.noServer || this.options.server) {
      if (this._server) {
        this._removeListeners();
        this._removeListeners = this._server = null;
      }

      if (this.clients) {
        if (!this.clients.size) {
          browser$1$1.nextTick(emitClose, this);
        } else {
          this._shouldEmitClose = true;
        }
      } else {
        browser$1$1.nextTick(emitClose, this);
      }
    } else {
      const server = this._server;

      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // The HTTP/S server was created internally. Close it, and rely on its
      // `'close'` event.
      //
      server.close(() => {
        emitClose(this);
      });
    }
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const key = req.headers['sec-websocket-key'];
    const version = +req.headers['sec-websocket-version'];

    if (req.method !== 'GET') {
      const message = 'Invalid HTTP method';
      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
      return;
    }

    if (req.headers.upgrade.toLowerCase() !== 'websocket') {
      const message = 'Invalid Upgrade header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!key || !keyRegex.test(key)) {
      const message = 'Missing or invalid Sec-WebSocket-Key header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (version !== 8 && version !== 13) {
      const message = 'Missing or invalid Sec-WebSocket-Version header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!this.shouldHandle(req)) {
      abortHandshake(socket, 400);
      return;
    }

    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
    let protocols = new Set();

    if (secWebSocketProtocol !== undefined) {
      try {
        protocols = subprotocol.parse(secWebSocketProtocol);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Protocol header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
    const extensions = {};

    if (
      this.options.perMessageDeflate &&
      secWebSocketExtensions !== undefined
    ) {
      const perMessageDeflate = new PerMessageDeflate$2(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = extension.parse(secWebSocketExtensions);

        if (offers[PerMessageDeflate$2.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate$2.extensionName]);
          extensions[PerMessageDeflate$2.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        const message =
          'Invalid or unacceptable Sec-WebSocket-Extensions header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(
            extensions,
            key,
            protocols,
            req,
            socket,
            head,
            cb
          );
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket$1]) {
      throw new Error(
        'server.handleUpgrade() was called more than once with the same ' +
          'socket, possibly due to a misconfiguration'
      );
    }

    if (this._state > RUNNING) return abortHandshake(socket, 503);

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    const ws = new this.options.WebSocket(null);

    if (protocols.size) {
      //
      // Optionally call external protocol selection handler.
      //
      const protocol = this.options.handleProtocols
        ? this.options.handleProtocols(protocols, req)
        : protocols.values().next().value;

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws._protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate$2.extensionName]) {
      const params = extensions[PerMessageDeflate$2.extensionName].params;
      const value = extension.format({
        [PerMessageDeflate$2.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, {
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    });

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => {
        this.clients.delete(ws);

        if (this._shouldEmitClose && !this.clients.size) {
          browser$1$1.nextTick(emitClose, this);
        }
      });
    }

    cb(ws, req);
  }
}

module.exports = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when
 *     called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server._state = CLOSED;
  server.emit('close');
}

/**
 * Handle socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  //
  // The socket is writable unless the user destroyed or ended it before calling
  // `server.handleUpgrade()` or in the `verifyClient` function, which is a user
  // error. Handling this does not make much sense as the worst that can happen
  // is that some of the data written by the user might be discarded due to the
  // call to `socket.end()` below, which triggers an `'error'` event that in
  // turn causes the socket to be destroyed.
  //
  message = message || http.STATUS_CODES[code];
  headers = {
    Connection: 'close',
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(message),
    ...headers
  };

  socket.once('finish', socket.destroy);

  socket.end(
    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
      Object.keys(headers)
        .map((h) => `${h}: ${headers[h]}`)
        .join('\r\n') +
      '\r\n\r\n' +
      message
  );
}

/**
 * Emit a `'wsClientError'` event on a `WebSocketServer` if there is at least
 * one listener for it, otherwise call `abortHandshake()`.
 *
 * @param {WebSocketServer} server The WebSocket server
 * @param {http.IncomingMessage} req The request object
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} message The HTTP response body
 * @private
 */
function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
  if (server.listenerCount('wsClientError')) {
    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);

    server.emit('wsClientError', err, socket, req);
  } else {
    abortHandshake(socket, code, message);
  }
}

var websocketServer = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var require$$2 = /*@__PURE__*/getAugmentedNamespace(websocketServer);

const { Writable } = require('stream');

const PerMessageDeflate$1 = require('./permessage-deflate');
const {
  BINARY_TYPES,
  EMPTY_BUFFER: EMPTY_BUFFER$1,
  kStatusCode,
  kWebSocket
} = require('./constants');
const { concat, toArrayBuffer, unmask } = require('./buffer-util');
const { isValidStatusCode: isValidStatusCode$1, isValidUTF8 } = require('./validation');

const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */
class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(options = {}) {
    super();

    this._binaryType = options.binaryType || BINARY_TYPES[0];
    this._extensions = options.extensions || {};
    this._isServer = !!options.isServer;
    this._maxPayload = options.maxPayload | 0;
    this._skipUTF8Validation = !!options.skipUTF8Validation;
    this[kWebSocket] = undefined;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = buf.slice(n);
      return buf.slice(0, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = buf.slice(n);
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    let err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(
        RangeError,
        'RSV2 and RSV3 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_2_3'
      );
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate$1.extensionName]) {
      this._loop = false;
      return error(
        RangeError,
        'RSV1 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_1'
      );
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          'invalid opcode 0',
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          `invalid opcode ${this._opcode}`,
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(
          RangeError,
          'FIN must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_FIN'
        );
      }

      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (this._payloadLength > 0x7d) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      }
    } else {
      this._loop = false;
      return error(
        RangeError,
        `invalid opcode ${this._opcode}`,
        true,
        1002,
        'WS_ERR_INVALID_OPCODE'
      );
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(
          RangeError,
          'MASK must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_MASK'
        );
      }
    } else if (this._masked) {
      this._loop = false;
      return error(
        RangeError,
        'MASK must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_MASK'
      );
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009,
        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(
          RangeError,
          'Max payload size exceeded',
          false,
          1009,
          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        );
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER$1;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);

      if (
        this._masked &&
        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
      ) {
        unmask(data, this._mask);
      }
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its length is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate$1.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(
              RangeError,
              'Max payload size exceeded',
              false,
              1009,
              'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
            )
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        let data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data, true);
      } else {
        const buf = concat(fragments, messageLength);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          this._loop = false;
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('message', buf, false);
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, EMPTY_BUFFER$1);
        this.end();
      } else if (data.length === 1) {
        return error(
          RangeError,
          'invalid payload length 1',
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode$1(code)) {
          return error(
            RangeError,
            `invalid status code ${code}`,
            true,
            1002,
            'WS_ERR_INVALID_CLOSE_CODE'
          );
        }

        const buf = data.slice(2);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('conclude', code, buf);
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

module.exports = Receiver;

/**
 * Builds an error object.
 *
 * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @param {String} errorCode The exposed error code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode, errorCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err.code = errorCode;
  err[kStatusCode] = statusCode;
  return err;
}

var receiver = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var require$$3 = /*@__PURE__*/getAugmentedNamespace(receiver);

require('net');
require('tls');
const { randomFillSync } = require('crypto');

const PerMessageDeflate = require('./permessage-deflate');
const { EMPTY_BUFFER } = require('./constants');
const { isValidStatusCode } = require('./validation');
const { mask: applyMask, toBuffer: toBuffer$1 } = require('./buffer-util');

const kByteLength = Symbol('kByteLength');
const maskBuffer = Buffer.alloc(4);

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {(net.Socket|tls.Socket)} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(socket, extensions, generateMask) {
    this._extensions = extensions || {};

    if (generateMask) {
      this._generateMask = generateMask;
      this._maskBuffer = Buffer.alloc(4);
    }

    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(data, options) {
    let mask;
    let merge = false;
    let offset = 2;
    let skipMasking = false;

    if (options.mask) {
      mask = options.maskBuffer || maskBuffer;

      if (options.generateMask) {
        options.generateMask(mask);
      } else {
        randomFillSync(mask, 0, 4);
      }

      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
      offset = 6;
    }

    let dataLength;

    if (typeof data === 'string') {
      if (
        (!options.mask || skipMasking) &&
        options[kByteLength] !== undefined
      ) {
        dataLength = options[kByteLength];
      } else {
        data = Buffer.from(data);
        dataLength = data.length;
      }
    } else {
      dataLength = data.length;
      merge = options.mask && options.readOnly && !skipMasking;
    }

    let payloadLength = dataLength;

    if (dataLength >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (dataLength > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(dataLength, 2);
    } else if (payloadLength === 127) {
      target[2] = target[3] = 0;
      target.writeUIntBE(dataLength, 4, 6);
    }

    if (!options.mask) return [target, data];

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (skipMasking) return [target, data];

    if (merge) {
      applyMask(data, mask, target, offset, dataLength);
      return [target];
    }

    applyMask(data, mask, data, 0, dataLength);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || !data.length) {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);

      if (typeof data === 'string') {
        buf.write(data, 2);
      } else {
        buf.set(data, 2);
      }
    }

    const options = {
      [kByteLength]: buf.length,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x08,
      readOnly: false,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, buf, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(buf, options), cb);
    }
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x09,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x0a,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(data, options, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer$1(data);
      byteLength = data.length;
      readOnly = toBuffer$1.readOnly;
    }

    if (this._firstFragment) {
      this._firstFragment = false;
      if (
        rsv1 &&
        perMessageDeflate &&
        perMessageDeflate.params[
          perMessageDeflate._isServer
            ? 'server_no_context_takeover'
            : 'client_no_context_takeover'
        ]
      ) {
        rsv1 = byteLength >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        [kByteLength]: byteLength,
        fin: options.fin,
        generateMask: this._generateMask,
        mask: options.mask,
        maskBuffer: this._maskBuffer,
        opcode,
        readOnly,
        rsv1
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, data, this._compress, opts, cb]);
      } else {
        this.dispatch(data, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender.frame(data, {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1: false
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    this._bufferedBytes += options[kByteLength];
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const params = this._queue[i];
          const callback = params[params.length - 1];

          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= options[kByteLength];
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[3][kByteLength];
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[3][kByteLength];
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

module.exports = Sender;

var sender = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var require$$4 = /*@__PURE__*/getAugmentedNamespace(sender);

var ws;
var hasRequiredWs;

function requireWs () {
	if (hasRequiredWs) return ws;
	hasRequiredWs = 1;

	const WebSocket = require$$0$1;

	WebSocket.createWebSocketStream = require$$1;
	WebSocket.Server = require$$2;
	WebSocket.Receiver = require$$3;
	WebSocket.Sender = require$$4;

	WebSocket.WebSocket = WebSocket;
	WebSocket.WebSocketServer = WebSocket.Server;

	ws = WebSocket;
	return ws;
}

/* A wrapper for the "qaap/uws-bindings" library. */

var hasRequiredWebsocket;

function requireWebsocket () {
	if (hasRequiredWebsocket) return websocket$1;
	hasRequiredWebsocket = 1;
	(function (exports) {

		var _interopRequireDefault = interopRequireDefault.exports;

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports["default"] = _default;

		var _ws = _interopRequireDefault(requireWs());

		/**
		 * factory method for common WebSocket instance
		 * @method
		 * @param {String} address - url to a websocket server
		 * @param {(Object)} options - websocket options
		 * @return {Undefined}
		 */
		function _default(address, options) {
		  return new _ws["default"](address, options);
		}
} (websocket$1));
	return websocket$1;
}

var _interopRequireDefault$1 = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator$1 = _interopRequireDefault$1(require("@babel/runtime/regenerator"));

var _asyncToGenerator2$1 = _interopRequireDefault$1(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2$1 = _interopRequireDefault$1(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2$1 = _interopRequireDefault$1(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2$1 = _interopRequireDefault$1(require("@babel/runtime/helpers/createClass"));

var _inherits2$1 = _interopRequireDefault$1(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2$1 = _interopRequireDefault$1(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2$1 = _interopRequireDefault$1(require("@babel/runtime/helpers/getPrototypeOf"));

var _eventemitter$1 = require("eventemitter3");

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2$1["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2$1["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2$1["default"])(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __rest = function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}; // @ts-ignore


var CommonClient = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2$1["default"])(CommonClient, _EventEmitter);

  var _super = _createSuper$1(CommonClient);

  /**
   * Instantiate a Client class.
   * @constructor
   * @param {webSocketFactory} webSocketFactory - factory method for WebSocket
   * @param {String} address - url to a websocket server
   * @param {Object} options - ws options object with reconnect parameters
   * @param {Function} generate_request_id - custom generation request Id
   * @return {CommonClient}
   */
  function CommonClient(webSocketFactory) {
    var _this;

    var address = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ws://localhost:8080";

    var _a = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var generate_request_id = arguments.length > 3 ? arguments[3] : undefined;
    (0, _classCallCheck2$1["default"])(this, CommonClient);

    var _a$autoconnect = _a.autoconnect,
        autoconnect = _a$autoconnect === void 0 ? true : _a$autoconnect,
        _a$reconnect = _a.reconnect,
        reconnect = _a$reconnect === void 0 ? true : _a$reconnect,
        _a$reconnect_interval = _a.reconnect_interval,
        reconnect_interval = _a$reconnect_interval === void 0 ? 1000 : _a$reconnect_interval,
        _a$max_reconnects = _a.max_reconnects,
        max_reconnects = _a$max_reconnects === void 0 ? 5 : _a$max_reconnects,
        rest_options = __rest(_a, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);

    _this = _super.call(this);
    _this.webSocketFactory = webSocketFactory;
    _this.queue = {};
    _this.rpc_id = 0;
    _this.address = address;
    _this.autoconnect = autoconnect;
    _this.ready = false;
    _this.reconnect = reconnect;
    _this.reconnect_interval = reconnect_interval;
    _this.max_reconnects = max_reconnects;
    _this.rest_options = rest_options;
    _this.current_reconnects = 0;

    _this.generate_request_id = generate_request_id || function () {
      return ++_this.rpc_id;
    };

    if (_this.autoconnect) _this._connect(_this.address, Object.assign({
      autoconnect: _this.autoconnect,
      reconnect: _this.reconnect,
      reconnect_interval: _this.reconnect_interval,
      max_reconnects: _this.max_reconnects
    }, _this.rest_options));
    return _this;
  }
  /**
   * Connects to a defined server if not connected already.
   * @method
   * @return {Undefined}
   */


  (0, _createClass2$1["default"])(CommonClient, [{
    key: "connect",
    value: function connect() {
      if (this.socket) return;

      this._connect(this.address, Object.assign({
        autoconnect: this.autoconnect,
        reconnect: this.reconnect,
        reconnect_interval: this.reconnect_interval,
        max_reconnects: this.max_reconnects
      }, this.rest_options));
    }
    /**
     * Calls a registered RPC method on server.
     * @method
     * @param {String} method - RPC method name
     * @param {Object|Array} params - optional method parameters
     * @param {Number} timeout - RPC reply timeout value
     * @param {Object} ws_opts - options passed to ws
     * @return {Promise}
     */

  }, {
    key: "call",
    value: function call(method, params, timeout, ws_opts) {
      var _this2 = this;

      if (!ws_opts && "object" === (0, _typeof2$1["default"])(timeout)) {
        ws_opts = timeout;
        timeout = null;
      }

      return new Promise(function (resolve, reject) {
        if (!_this2.ready) return reject(new Error("socket not ready"));

        var rpc_id = _this2.generate_request_id(method, params);

        var message = {
          jsonrpc: "2.0",
          method: method,
          params: params || null,
          id: rpc_id
        };

        _this2.socket.send(JSON.stringify(message), ws_opts, function (error) {
          if (error) return reject(error);
          _this2.queue[rpc_id] = {
            promise: [resolve, reject]
          };

          if (timeout) {
            _this2.queue[rpc_id].timeout = setTimeout(function () {
              delete _this2.queue[rpc_id];
              reject(new Error("reply timeout"));
            }, timeout);
          }
        });
      });
    }
    /**
     * Logins with the other side of the connection.
     * @method
     * @param {Object} params - Login credentials object
     * @return {Promise}
     */

  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2$1["default"])( /*#__PURE__*/_regenerator$1["default"].mark(function _callee(params) {
        var resp;
        return _regenerator$1["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.call("rpc.login", params);

              case 2:
                resp = _context.sent;

                if (resp) {
                  _context.next = 5;
                  break;
                }

                throw new Error("authentication failed");

              case 5:
                return _context.abrupt("return", resp);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /**
     * Fetches a list of client's methods registered on server.
     * @method
     * @return {Array}
     */

  }, {
    key: "listMethods",
    value: function () {
      var _listMethods = (0, _asyncToGenerator2$1["default"])( /*#__PURE__*/_regenerator$1["default"].mark(function _callee2() {
        return _regenerator$1["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.call("__listMethods");

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function listMethods() {
        return _listMethods.apply(this, arguments);
      }

      return listMethods;
    }()
    /**
     * Sends a JSON-RPC 2.0 notification to server.
     * @method
     * @param {String} method - RPC method name
     * @param {Object} params - optional method parameters
     * @return {Promise}
     */

  }, {
    key: "notify",
    value: function notify(method, params) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (!_this3.ready) return reject(new Error("socket not ready"));
        var message = {
          jsonrpc: "2.0",
          method: method,
          params: params || null
        };

        _this3.socket.send(JSON.stringify(message), function (error) {
          if (error) return reject(error);
          resolve();
        });
      });
    }
    /**
     * Subscribes for a defined event.
     * @method
     * @param {String|Array} event - event name
     * @return {Undefined}
     * @throws {Error}
     */

  }, {
    key: "subscribe",
    value: function () {
      var _subscribe = (0, _asyncToGenerator2$1["default"])( /*#__PURE__*/_regenerator$1["default"].mark(function _callee3(event) {
        var result;
        return _regenerator$1["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (typeof event === "string") event = [event];
                _context3.next = 3;
                return this.call("rpc.on", event);

              case 3:
                result = _context3.sent;

                if (!(typeof event === "string" && result[event] !== "ok")) {
                  _context3.next = 6;
                  break;
                }

                throw new Error("Failed subscribing to an event '" + event + "' with: " + result[event]);

              case 6:
                return _context3.abrupt("return", result);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function subscribe(_x2) {
        return _subscribe.apply(this, arguments);
      }

      return subscribe;
    }()
    /**
     * Unsubscribes from a defined event.
     * @method
     * @param {String|Array} event - event name
     * @return {Undefined}
     * @throws {Error}
     */

  }, {
    key: "unsubscribe",
    value: function () {
      var _unsubscribe = (0, _asyncToGenerator2$1["default"])( /*#__PURE__*/_regenerator$1["default"].mark(function _callee4(event) {
        var result;
        return _regenerator$1["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (typeof event === "string") event = [event];
                _context4.next = 3;
                return this.call("rpc.off", event);

              case 3:
                result = _context4.sent;

                if (!(typeof event === "string" && result[event] !== "ok")) {
                  _context4.next = 6;
                  break;
                }

                throw new Error("Failed unsubscribing from an event with: " + result);

              case 6:
                return _context4.abrupt("return", result);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function unsubscribe(_x3) {
        return _unsubscribe.apply(this, arguments);
      }

      return unsubscribe;
    }()
    /**
     * Closes a WebSocket connection gracefully.
     * @method
     * @param {Number} code - socket close code
     * @param {String} data - optional data to be sent before closing
     * @return {Undefined}
     */

  }, {
    key: "close",
    value: function close(code, data) {
      this.socket.close(code || 1000, data);
    }
    /**
     * Connection/Message handler.
     * @method
     * @private
     * @param {String} address - WebSocket API address
     * @param {Object} options - ws options object
     * @return {Undefined}
     */

  }, {
    key: "_connect",
    value: function _connect(address, options) {
      var _this4 = this;

      this.socket = this.webSocketFactory(address, options);
      this.socket.addEventListener("open", function () {
        _this4.ready = true;

        _this4.emit("open");

        _this4.current_reconnects = 0;
      });
      this.socket.addEventListener("message", function (_ref) {
        var message = _ref.data;
        if (message instanceof ArrayBuffer) message = Buffer.from(message).toString();

        try {
          message = JSON.parse(message);
        } catch (error) {
          return;
        } // check if any listeners are attached and forward event


        if (message.notification && _this4.listeners(message.notification).length) {
          if (!Object.keys(message.params).length) return _this4.emit(message.notification);
          var args = [message.notification];
          if (message.params.constructor === Object) args.push(message.params);else // using for-loop instead of unshift/spread because performance is better
            for (var i = 0; i < message.params.length; i++) {
              args.push(message.params[i]);
            } // run as microtask so that pending queue messages are resolved first
          // eslint-disable-next-line prefer-spread

          return Promise.resolve().then(function () {
            _this4.emit.apply(_this4, args);
          });
        }

        if (!_this4.queue[message.id]) {
          // general JSON RPC 2.0 events
          if (message.method && message.params) {
            // run as microtask so that pending queue messages are resolved first
            return Promise.resolve().then(function () {
              _this4.emit(message.method, message.params);
            });
          }

          return;
        } // reject early since server's response is invalid


        if ("error" in message === "result" in message) _this4.queue[message.id].promise[1](new Error("Server response malformed. Response must include either \"result\"" + " or \"error\", but not both."));
        if (_this4.queue[message.id].timeout) clearTimeout(_this4.queue[message.id].timeout);
        if (message.error) _this4.queue[message.id].promise[1](message.error);else _this4.queue[message.id].promise[0](message.result);
        delete _this4.queue[message.id];
      });
      this.socket.addEventListener("error", function (error) {
        return _this4.emit("error", error);
      });
      this.socket.addEventListener("close", function (_ref2) {
        var code = _ref2.code,
            reason = _ref2.reason;
        if (_this4.ready) // Delay close event until internal state is updated
          setTimeout(function () {
            return _this4.emit("close", code, reason);
          }, 0);
        _this4.ready = false;
        _this4.socket = undefined;
        if (code === 1000) return;
        _this4.current_reconnects++;
        if (_this4.reconnect && (_this4.max_reconnects > _this4.current_reconnects || _this4.max_reconnects === 0)) setTimeout(function () {
          return _this4._connect(address, options);
        }, _this4.reconnect_interval);
      });
    }
  }]);
  return CommonClient;
}(_eventemitter$1.EventEmitter);

exports["default"] = CommonClient;

var client = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var require$$7 = /*@__PURE__*/getAugmentedNamespace(client);

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _eventemitter = require("eventemitter3");

var _ws = require("ws");

var _uuid = require("uuid");

var _url = _interopRequireDefault(require("url"));

var utils$a = _interopRequireWildcard(require("./utils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Server = /*#__PURE__*/function (_EventEmitter) {
  (0, _inherits2["default"])(Server, _EventEmitter);

  var _super = _createSuper(Server);

  /**
   * Instantiate a Server class.
   * @constructor
   * @param {Object} options - ws constructor's parameters with rpc
   * @return {Server} - returns a new Server instance
   */
  function Server(options) {
    var _this;

    (0, _classCallCheck2["default"])(this, Server);
    _this = _super.call(this);
    /**
     * Stores all connected sockets with a universally unique identifier
     * in the appropriate namespace.
     * Stores all rpc methods to specific namespaces. "/" by default.
     * Stores all events as keys and subscribed users in array as value
     * @private
     * @name namespaces
     * @param {Object} namespaces.rpc_methods
     * @param {Map} namespaces.clients
     * @param {Object} namespaces.events
     */

    _this.namespaces = {};
    _this.wss = new _ws.Server(options);

    _this.wss.on("listening", function () {
      return _this.emit("listening");
    });

    _this.wss.on("connection", function (socket, request) {
      var u = _url["default"].parse(request.url, true);

      var ns = u.pathname;
      if (u.query.socket_id) socket._id = u.query.socket_id;else socket._id = (0, _uuid.v1)(); // unauthenticated by default

      socket["_authenticated"] = false; // propagate socket errors

      socket.on("error", function (error) {
        return _this.emit("socket-error", socket, error);
      }); // cleanup after the socket gets disconnected

      socket.on("close", function () {
        _this.namespaces[ns].clients["delete"](socket._id);

        for (var _i = 0, _Object$keys = Object.keys(_this.namespaces[ns].events); _i < _Object$keys.length; _i++) {
          var event = _Object$keys[_i];

          var index = _this.namespaces[ns].events[event].sockets.indexOf(socket._id);

          if (index >= 0) _this.namespaces[ns].events[event].sockets.splice(index, 1);
        }

        _this.emit("disconnection", socket);
      });
      if (!_this.namespaces[ns]) _this._generateNamespace(ns); // store socket and method

      _this.namespaces[ns].clients.set(socket._id, socket);

      _this.emit("connection", socket, request);

      return _this._handleRPC(socket, ns);
    });

    _this.wss.on("error", function (error) {
      return _this.emit("error", error);
    });

    return _this;
  }
  /**
   * Registers an RPC method.
   * @method
   * @param {String} name - method name
   * @param {Function} fn - a callee function
   * @param {String} ns - namespace identifier
   * @throws {TypeError}
   * @return {Object} - returns an IMethod object
   */


  (0, _createClass2["default"])(Server, [{
    key: "register",
    value: function register(name, fn) {
      var _this2 = this;

      var ns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "/";
      if (!this.namespaces[ns]) this._generateNamespace(ns);
      this.namespaces[ns].rpc_methods[name] = {
        fn: fn,
        "protected": false
      };
      return {
        "protected": function _protected() {
          return _this2._makeProtectedMethod(name, ns);
        },
        "public": function _public() {
          return _this2._makePublicMethod(name, ns);
        }
      };
    }
    /**
     * Sets an auth method.
     * @method
     * @param {Function} fn - an arbitrary auth method
     * @param {String} ns - namespace identifier
     * @throws {TypeError}
     * @return {Undefined}
     */

  }, {
    key: "setAuth",
    value: function setAuth(fn) {
      var ns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      this.register("rpc.login", fn, ns);
    }
    /**
     * Marks an RPC method as protected.
     * @method
     * @param {String} name - method name
     * @param {String} ns - namespace identifier
     * @return {Undefined}
     */

  }, {
    key: "_makeProtectedMethod",
    value: function _makeProtectedMethod(name) {
      var ns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      this.namespaces[ns].rpc_methods[name]["protected"] = true;
    }
    /**
     * Marks an RPC method as public.
     * @method
     * @param {String} name - method name
     * @param {String} ns - namespace identifier
     * @return {Undefined}
     */

  }, {
    key: "_makePublicMethod",
    value: function _makePublicMethod(name) {
      var ns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      this.namespaces[ns].rpc_methods[name]["protected"] = false;
    }
    /**
     * Marks an event as protected.
     * @method
     * @param {String} name - event name
     * @param {String} ns - namespace identifier
     * @return {Undefined}
     */

  }, {
    key: "_makeProtectedEvent",
    value: function _makeProtectedEvent(name) {
      var ns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      this.namespaces[ns].events[name]["protected"] = true;
    }
    /**
     * Marks an event as public.
     * @method
     * @param {String} name - event name
     * @param {String} ns - namespace identifier
     * @return {Undefined}
     */

  }, {
    key: "_makePublicEvent",
    value: function _makePublicEvent(name) {
      var ns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      this.namespaces[ns].events[name]["protected"] = false;
    }
    /**
     * Removes a namespace and closes all connections
     * @method
     * @param {String} ns - namespace identifier
     * @throws {TypeError}
     * @return {Undefined}
     */

  }, {
    key: "closeNamespace",
    value: function closeNamespace(ns) {
      var namespace = this.namespaces[ns];

      if (namespace) {
        delete namespace.rpc_methods;
        delete namespace.events;

        var _iterator = _createForOfIteratorHelper(namespace.clients.values()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var socket = _step.value;
            socket.close();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        delete this.namespaces[ns];
      }
    }
    /**
     * Creates a new event that can be emitted to clients.
     * @method
     * @param {String} name - event name
     * @param {String} ns - namespace identifier
     * @throws {TypeError}
     * @return {Object} - returns an IEvent object
     */

  }, {
    key: "event",
    value: function event(name) {
      var _this3 = this;

      var ns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      if (!this.namespaces[ns]) this._generateNamespace(ns);else {
        var index = this.namespaces[ns].events[name];
        if (index !== undefined) throw new Error("Already registered event ".concat(ns).concat(name));
      }
      this.namespaces[ns].events[name] = {
        sockets: [],
        "protected": false
      }; // forward emitted event to subscribers

      this.on(name, function () {
        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        // flatten an object if no spreading is wanted
        if (params.length === 1 && params[0] instanceof Object) params = params[0];

        var _iterator2 = _createForOfIteratorHelper(_this3.namespaces[ns].events[name].sockets),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var socket_id = _step2.value;

            var socket = _this3.namespaces[ns].clients.get(socket_id);

            if (!socket) continue;
            socket.send(JSON.stringify({
              notification: name,
              params: params || null
            }));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      });
      return {
        "protected": function _protected() {
          return _this3._makeProtectedEvent(name, ns);
        },
        "public": function _public() {
          return _this3._makePublicEvent(name, ns);
        }
      };
    }
    /**
     * Returns a requested namespace object
     * @method
     * @param {String} name - namespace identifier
     * @throws {TypeError}
     * @return {Object} - namespace object
     */

  }, {
    key: "of",
    value: function of(name) {
      if (!this.namespaces[name]) this._generateNamespace(name);
      var self = this;
      return {
        // self.register convenience method
        register: function register(fn_name, fn) {
          if (arguments.length !== 2) throw new Error("must provide exactly two arguments");
          if (typeof fn_name !== "string") throw new Error("name must be a string");
          if (typeof fn !== "function") throw new Error("handler must be a function");
          return self.register(fn_name, fn, name);
        },
        // self.event convenience method
        event: function event(ev_name) {
          if (arguments.length !== 1) throw new Error("must provide exactly one argument");
          if (typeof ev_name !== "string") throw new Error("name must be a string");
          return self.event(ev_name, name);
        },

        // self.eventList convenience method
        get eventList() {
          return Object.keys(self.namespaces[name].events);
        },

        /**
         * Emits a specified event to this namespace.
         * @inner
         * @method
         * @param {String} event - event name
         * @param {Array} params - event parameters
         * @return {Undefined}
         */
        emit: function emit(event) {
          var socket_ids = (0, _toConsumableArray2["default"])(self.namespaces[name].clients.keys());

          for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            params[_key2 - 1] = arguments[_key2];
          }

          for (var i = 0, id; id = socket_ids[i]; ++i) {
            self.namespaces[name].clients.get(id).send(JSON.stringify({
              notification: event,
              params: params || []
            }));
          }
        },

        /**
         * Returns a name of this namespace.
         * @inner
         * @method
         * @kind constant
         * @return {String}
         */
        get name() {
          return name;
        },

        /**
         * Returns a hash of websocket objects connected to this namespace.
         * @inner
         * @method
         * @return {Object}
         */
        connected: function connected() {
          var socket_ids = (0, _toConsumableArray2["default"])(self.namespaces[name].clients.keys());
          return socket_ids.reduce(function (acc, curr) {
            return Object.assign(Object.assign({}, acc), (0, _defineProperty2["default"])({}, curr, self.namespaces[name].clients.get(curr)));
          }, {});
        },

        /**
         * Returns a list of client unique identifiers connected to this namespace.
         * @inner
         * @method
         * @return {Array}
         */
        clients: function clients() {
          return self.namespaces[name];
        }
      };
    }
    /**
     * Lists all created events in a given namespace. Defaults to "/".
     * @method
     * @param {String} ns - namespaces identifier
     * @readonly
     * @return {Array} - returns a list of created events
     */

  }, {
    key: "eventList",
    value: function eventList() {
      var ns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
      if (!this.namespaces[ns]) return [];
      return Object.keys(this.namespaces[ns].events);
    }
    /**
     * Creates a JSON-RPC 2.0 compliant error
     * @method
     * @param {Number} code - indicates the error type that occurred
     * @param {String} message - provides a short description of the error
     * @param {String|Object} data - details containing additional information about the error
     * @return {Object}
     */

  }, {
    key: "createError",
    value: function createError(code, message, data) {
      return {
        code: code,
        message: message,
        data: data || null
      };
    }
    /**
     * Closes the server and terminates all clients.
     * @method
     * @return {Promise}
     */

  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        try {
          _this4.wss.close();

          _this4.emit("close");

          resolve();
        } catch (error) {
          reject(error);
        }
      });
    }
    /**
     * Handles all WebSocket JSON RPC 2.0 requests.
     * @private
     * @param {Object} socket - ws socket instance
     * @param {String} ns - namespaces identifier
     * @return {Undefined}
     */

  }, {
    key: "_handleRPC",
    value: function _handleRPC(socket) {
      var _this5 = this;

      var ns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      socket.on("message", /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
          var msg_options, parsedData, responses, _iterator3, _step3, message, _response, response;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  msg_options = {};

                  if (data instanceof ArrayBuffer) {
                    msg_options.binary = true;
                    data = Buffer.from(data).toString();
                  }

                  if (!(socket.readyState !== 1)) {
                    _context.next = 4;
                    break;
                  }

                  return _context.abrupt("return");

                case 4:
                  _context.prev = 4;
                  parsedData = JSON.parse(data);
                  _context.next = 11;
                  break;

                case 8:
                  _context.prev = 8;
                  _context.t0 = _context["catch"](4);
                  return _context.abrupt("return", socket.send(JSON.stringify({
                    jsonrpc: "2.0",
                    error: utils$a.createError(-32700, _context.t0.toString()),
                    id: null
                  }), msg_options));

                case 11:
                  if (!Array.isArray(parsedData)) {
                    _context.next = 39;
                    break;
                  }

                  if (parsedData.length) {
                    _context.next = 14;
                    break;
                  }

                  return _context.abrupt("return", socket.send(JSON.stringify({
                    jsonrpc: "2.0",
                    error: utils$a.createError(-32600, "Invalid array"),
                    id: null
                  }), msg_options));

                case 14:
                  responses = [];
                  _iterator3 = _createForOfIteratorHelper(parsedData);
                  _context.prev = 16;

                  _iterator3.s();

                case 18:
                  if ((_step3 = _iterator3.n()).done) {
                    _context.next = 28;
                    break;
                  }

                  message = _step3.value;
                  _context.next = 22;
                  return _this5._runMethod(message, socket._id, ns);

                case 22:
                  _response = _context.sent;

                  if (_response) {
                    _context.next = 25;
                    break;
                  }

                  return _context.abrupt("continue", 26);

                case 25:
                  responses.push(_response);

                case 26:
                  _context.next = 18;
                  break;

                case 28:
                  _context.next = 33;
                  break;

                case 30:
                  _context.prev = 30;
                  _context.t1 = _context["catch"](16);

                  _iterator3.e(_context.t1);

                case 33:
                  _context.prev = 33;

                  _iterator3.f();

                  return _context.finish(33);

                case 36:
                  if (responses.length) {
                    _context.next = 38;
                    break;
                  }

                  return _context.abrupt("return");

                case 38:
                  return _context.abrupt("return", socket.send(JSON.stringify(responses), msg_options));

                case 39:
                  _context.next = 41;
                  return _this5._runMethod(parsedData, socket._id, ns);

                case 41:
                  response = _context.sent;

                  if (response) {
                    _context.next = 44;
                    break;
                  }

                  return _context.abrupt("return");

                case 44:
                  return _context.abrupt("return", socket.send(JSON.stringify(response), msg_options));

                case 45:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[4, 8], [16, 30, 33, 36]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
    /**
     * Runs a defined RPC method.
     * @private
     * @param {Object} message - a message received
     * @param {Object} socket_id - user's socket id
     * @param {String} ns - namespaces identifier
     * @return {Object|undefined}
     */

  }, {
    key: "_runMethod",
    value: function () {
      var _runMethod2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(message, socket_id) {
        var ns,
            results,
            event_names,
            _iterator4,
            _step4,
            name,
            index,
            namespace,
            socket_index,
            _results,
            _iterator5,
            _step5,
            _name,
            _index,
            response,
            s,
            _args2 = arguments;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ns = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : "/";

                if (!((0, _typeof2["default"])(message) !== "object" || message === null)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32600),
                  id: null
                });

              case 3:
                if (!(message.jsonrpc !== "2.0")) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32600, "Invalid JSON RPC version"),
                  id: message.id || null
                });

              case 5:
                if (message.method) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32602, "Method not specified"),
                  id: message.id || null
                });

              case 7:
                if (!(typeof message.method !== "string")) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32600, "Invalid method name"),
                  id: message.id || null
                });

              case 9:
                if (!(message.params && typeof message.params === "string")) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32600),
                  id: message.id || null
                });

              case 11:
                if (!(message.method === "rpc.on")) {
                  _context2.next = 47;
                  break;
                }

                if (message.params) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32000),
                  id: message.id || null
                });

              case 14:
                results = {};
                event_names = Object.keys(this.namespaces[ns].events);
                _iterator4 = _createForOfIteratorHelper(message.params);
                _context2.prev = 17;

                _iterator4.s();

              case 19:
                if ((_step4 = _iterator4.n()).done) {
                  _context2.next = 36;
                  break;
                }

                name = _step4.value;
                index = event_names.indexOf(name);
                namespace = this.namespaces[ns];

                if (!(index === -1)) {
                  _context2.next = 26;
                  break;
                }

                results[name] = "provided event invalid";
                return _context2.abrupt("continue", 34);

              case 26:
                if (!(namespace.events[event_names[index]]["protected"] === true && namespace.clients.get(socket_id)["_authenticated"] === false)) {
                  _context2.next = 28;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32606),
                  id: message.id || null
                });

              case 28:
                socket_index = namespace.events[event_names[index]].sockets.indexOf(socket_id);

                if (!(socket_index >= 0)) {
                  _context2.next = 32;
                  break;
                }

                results[name] = "socket has already been subscribed to event";
                return _context2.abrupt("continue", 34);

              case 32:
                namespace.events[event_names[index]].sockets.push(socket_id);
                results[name] = "ok";

              case 34:
                _context2.next = 19;
                break;

              case 36:
                _context2.next = 41;
                break;

              case 38:
                _context2.prev = 38;
                _context2.t0 = _context2["catch"](17);

                _iterator4.e(_context2.t0);

              case 41:
                _context2.prev = 41;

                _iterator4.f();

                return _context2.finish(41);

              case 44:
                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  result: results,
                  id: message.id || null
                });

              case 47:
                if (!(message.method === "rpc.off")) {
                  _context2.next = 78;
                  break;
                }

                if (message.params) {
                  _context2.next = 50;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32000),
                  id: message.id || null
                });

              case 50:
                _results = {};
                _iterator5 = _createForOfIteratorHelper(message.params);
                _context2.prev = 52;

                _iterator5.s();

              case 54:
                if ((_step5 = _iterator5.n()).done) {
                  _context2.next = 67;
                  break;
                }

                _name = _step5.value;

                if (this.namespaces[ns].events[_name]) {
                  _context2.next = 59;
                  break;
                }

                _results[_name] = "provided event invalid";
                return _context2.abrupt("continue", 65);

              case 59:
                _index = this.namespaces[ns].events[_name].sockets.indexOf(socket_id);

                if (!(_index === -1)) {
                  _context2.next = 63;
                  break;
                }

                _results[_name] = "not subscribed";
                return _context2.abrupt("continue", 65);

              case 63:
                this.namespaces[ns].events[_name].sockets.splice(_index, 1);

                _results[_name] = "ok";

              case 65:
                _context2.next = 54;
                break;

              case 67:
                _context2.next = 72;
                break;

              case 69:
                _context2.prev = 69;
                _context2.t1 = _context2["catch"](52);

                _iterator5.e(_context2.t1);

              case 72:
                _context2.prev = 72;

                _iterator5.f();

                return _context2.finish(72);

              case 75:
                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  result: _results,
                  id: message.id || null
                });

              case 78:
                if (!(message.method === "rpc.login")) {
                  _context2.next = 81;
                  break;
                }

                if (message.params) {
                  _context2.next = 81;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32604),
                  id: message.id || null
                });

              case 81:
                if (this.namespaces[ns].rpc_methods[message.method]) {
                  _context2.next = 83;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32601),
                  id: message.id || null
                });

              case 83:
                response = null; // reject request if method is protected and if client is not authenticated

                if (!(this.namespaces[ns].rpc_methods[message.method]["protected"] === true && this.namespaces[ns].clients.get(socket_id)["_authenticated"] === false)) {
                  _context2.next = 86;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: utils$a.createError(-32605),
                  id: message.id || null
                });

              case 86:
                _context2.prev = 86;
                _context2.next = 89;
                return this.namespaces[ns].rpc_methods[message.method].fn(message.params, socket_id);

              case 89:
                response = _context2.sent;
                _context2.next = 99;
                break;

              case 92:
                _context2.prev = 92;
                _context2.t2 = _context2["catch"](86);

                if (message.id) {
                  _context2.next = 96;
                  break;
                }

                return _context2.abrupt("return");

              case 96:
                if (!(_context2.t2 instanceof Error)) {
                  _context2.next = 98;
                  break;
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: {
                    code: -32000,
                    message: _context2.t2.name,
                    data: _context2.t2.message
                  },
                  id: message.id
                });

              case 98:
                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  error: _context2.t2,
                  id: message.id
                });

              case 99:
                if (message.id) {
                  _context2.next = 101;
                  break;
                }

                return _context2.abrupt("return");

              case 101:
                // if login middleware returned true, set connection as authenticated
                if (message.method === "rpc.login" && response === true) {
                  s = this.namespaces[ns].clients.get(socket_id);
                  s["_authenticated"] = true;
                  this.namespaces[ns].clients.set(socket_id, s);
                }

                return _context2.abrupt("return", {
                  jsonrpc: "2.0",
                  result: response,
                  id: message.id
                });

              case 103:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[17, 38, 41, 44], [52, 69, 72, 75], [86, 92]]);
      }));

      function _runMethod(_x2, _x3) {
        return _runMethod2.apply(this, arguments);
      }

      return _runMethod;
    }()
    /**
     * Generate a new namespace store.
     * Also preregister some special namespace methods.
     * @private
     * @param {String} name - namespaces identifier
     * @return {undefined}
     */

  }, {
    key: "_generateNamespace",
    value: function _generateNamespace(name) {
      var _this6 = this;

      this.namespaces[name] = {
        rpc_methods: {
          "__listMethods": {
            fn: function fn() {
              return Object.keys(_this6.namespaces[name].rpc_methods);
            },
            "protected": false
          }
        },
        clients: new Map(),
        events: {}
      };
    }
  }]);
  return Server;
}(_eventemitter.EventEmitter);

exports["default"] = Server;

var server = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var require$$8 = /*@__PURE__*/getAugmentedNamespace(server);

(function (exports) {

	var _interopRequireDefault = interopRequireDefault.exports;

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Client = void 0;
	Object.defineProperty(exports, "Server", {
	  enumerable: true,
	  get: function get() {
	    return _server["default"];
	  }
	});

	var _createClass2 = _interopRequireDefault(requireCreateClass());

	var _classCallCheck2 = _interopRequireDefault(requireClassCallCheck());

	var _inherits2 = _interopRequireDefault(requireInherits());

	var _possibleConstructorReturn2 = _interopRequireDefault(requirePossibleConstructorReturn());

	var _getPrototypeOf2 = _interopRequireDefault(requireGetPrototypeOf());

	var _websocket = _interopRequireDefault(requireWebsocket());

	var _client = _interopRequireDefault(require$$7);

	var _server = _interopRequireDefault(require$$8);

	function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

	function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

	var __rest = function (s, e) {
	  var t = {};

	  for (var p in s) {
	    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	  }

	  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
	    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	  }
	  return t;
	};

	var Client = /*#__PURE__*/function (_CommonClient) {
	  (0, _inherits2["default"])(Client, _CommonClient);

	  var _super = _createSuper(Client);

	  function Client() {
	    var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ws://localhost:8080";

	    var _a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    var generate_request_id = arguments.length > 2 ? arguments[2] : undefined;
	    (0, _classCallCheck2["default"])(this, Client);

	    var _a$autoconnect = _a.autoconnect,
	        autoconnect = _a$autoconnect === void 0 ? true : _a$autoconnect,
	        _a$reconnect = _a.reconnect,
	        reconnect = _a$reconnect === void 0 ? true : _a$reconnect,
	        _a$reconnect_interval = _a.reconnect_interval,
	        reconnect_interval = _a$reconnect_interval === void 0 ? 1000 : _a$reconnect_interval,
	        _a$max_reconnects = _a.max_reconnects,
	        max_reconnects = _a$max_reconnects === void 0 ? 5 : _a$max_reconnects,
	        rest_options = __rest(_a, ["autoconnect", "reconnect", "reconnect_interval", "max_reconnects"]);

	    return _super.call(this, _websocket["default"], address, Object.assign({
	      autoconnect: autoconnect,
	      reconnect: reconnect,
	      reconnect_interval: reconnect_interval,
	      max_reconnects: max_reconnects
	    }, rest_options), generate_request_id);
	  }

	  return (0, _createClass2["default"])(Client);
	}(_client["default"]);

	exports.Client = Client;
} (dist));

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify$1(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || new Array(16);
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || rng)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || stringify$1(b);
}

function parse(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var v;
  var arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = [];

  for (var i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL$1 = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function v35 (name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = parse(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    var bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (var i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return stringify$1(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL$1;
  return generateUUID;
}

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (var i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';

  for (var i = 0; i < length32; i += 8) {
    var x = input[i >> 5] >>> i % 32 & 0xff;
    var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  var length8 = input.length * 8;
  var output = new Uint32Array(getOutputLength(length8));

  for (var i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var v3 = v35('v3', 0x30, md5);
var v3$1 = v3;

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify$1(rnds);
}

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f$1(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (var i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var _i = 0; _i < N; ++_i) {
    var arr = new Uint32Array(16);

    for (var j = 0; j < 16; ++j) {
      arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
    }

    M[_i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var _i2 = 0; _i2 < N; ++_i2) {
    var W = new Uint32Array(80);

    for (var t = 0; t < 16; ++t) {
      W[t] = M[_i2][t];
    }

    for (var _t = 16; _t < 80; ++_t) {
      W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var _t2 = 0; _t2 < 80; ++_t2) {
      var s = Math.floor(_t2 / 20);
      var T = ROTL(a, 5) + f$1(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var v5 = v35('v5', 0x50, sha1);
var v5$1 = v5;

var nil = '00000000-0000-0000-0000-000000000000';

function version$3(uuid) {
  if (!validate(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var esmBrowser = /*#__PURE__*/Object.freeze({
	__proto__: null,
	v1: v1,
	v3: v3$1,
	v4: v4,
	v5: v5$1,
	NIL: nil,
	version: version$3,
	validate: validate,
	stringify: stringify$1,
	parse: parse
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(esmBrowser);

const uuid$1 = require$$0.v4;

/**
 *  Generates a JSON-RPC 1.0 or 2.0 request
 *  @param {String} method Name of method to call
 *  @param {Array|Object} params Array of parameters passed to the method as specified, or an object of parameter names and corresponding value
 *  @param {String|Number|null} [id] Request ID can be a string, number, null for explicit notification or left out for automatic generation
 *  @param {Object} [options]
 *  @param {Number} [options.version=2] JSON-RPC version to use (1 or 2)
 *  @param {Boolean} [options.notificationIdNull=false] When true, version 2 requests will set id to null instead of omitting it
 *  @param {Function} [options.generator] Passed the request, and the options object and is expected to return a request ID
 *  @throws {TypeError} If any of the parameters are invalid
 *  @return {Object} A JSON-RPC 1.0 or 2.0 request
 *  @memberOf Utils
 */
const generateRequest$1 = function(method, params, id, options) {
  if(typeof method !== 'string') {
    throw new TypeError(method + ' must be a string');
  }

  options = options || {};

  // check valid version provided
  const version = typeof options.version === 'number' ? options.version : 2;
  if (version !== 1 && version !== 2) {
    throw new TypeError(version + ' must be 1 or 2');
  }

  const request = {
    method: method
  };

  if(version === 2) {
    request.jsonrpc = '2.0';
  }

  if(params) {
    // params given, but invalid?
    if(typeof params !== 'object' && !Array.isArray(params)) {
      throw new TypeError(params + ' must be an object, array or omitted');
    }
    request.params = params;
  }

  // if id was left out, generate one (null means explicit notification)
  if(typeof(id) === 'undefined') {
    const generator = typeof options.generator === 'function' ? options.generator : function() { return uuid$1(); };
    request.id = generator(request, options);
  } else if (version === 2 && id === null) {
    // we have a version 2 notification
    if (options.notificationIdNull) {
      request.id = null; // id will not be set at all unless option provided
    }
  } else {
    request.id = id;
  }

  return request;
};

var generateRequest_1 = generateRequest$1;

const uuid = require$$0.v4;
const generateRequest = generateRequest_1;

/**
 * Constructor for a Jayson Browser Client that does not depend any node.js core libraries
 * @class ClientBrowser
 * @param {Function} callServer Method that calls the server, receives the stringified request and a regular node-style callback
 * @param {Object} [options]
 * @param {Function} [options.reviver] Reviver function for JSON
 * @param {Function} [options.replacer] Replacer function for JSON
 * @param {Number} [options.version=2] JSON-RPC version to use (1|2)
 * @param {Function} [options.generator] Function to use for generating request IDs
 *  @param {Boolean} [options.notificationIdNull=false] When true, version 2 requests will set id to null instead of omitting it
 * @return {ClientBrowser}
 */
const ClientBrowser = function(callServer, options) {
  if(!(this instanceof ClientBrowser)) {
    return new ClientBrowser(callServer, options);
  }

  if (!options) {
    options = {};
  }

  this.options = {
    reviver: typeof options.reviver !== 'undefined' ? options.reviver : null,
    replacer: typeof options.replacer !== 'undefined' ? options.replacer : null,
    generator: typeof options.generator !== 'undefined' ? options.generator : function() { return uuid(); },
    version: typeof options.version !== 'undefined' ? options.version : 2,
    notificationIdNull: typeof options.notificationIdNull === 'boolean' ? options.notificationIdNull : false,
  };

  this.callServer = callServer;
};

var browser = ClientBrowser;

/**
 *  Creates a request and dispatches it if given a callback.
 *  @param {String|Array} method A batch request if passed an Array, or a method name if passed a String
 *  @param {Array|Object} [params] Parameters for the method
 *  @param {String|Number} [id] Optional id. If undefined an id will be generated. If null it creates a notification request
 *  @param {Function} [callback] Request callback. If specified, executes the request rather than only returning it.
 *  @throws {TypeError} Invalid parameters
 *  @return {Object} JSON-RPC 1.0 or 2.0 compatible request
 */
ClientBrowser.prototype.request = function(method, params, id, callback) {
  const self = this;
  let request = null;

  // is this a batch request?
  const isBatch = Array.isArray(method) && typeof params === 'function';

  if (this.options.version === 1 && isBatch) {
    throw new TypeError('JSON-RPC 1.0 does not support batching');
  }

  // is this a raw request?
  const isRaw = !isBatch && method && typeof method === 'object' && typeof params === 'function';

  if(isBatch || isRaw) {
    callback = params;
    request = method;
  } else {
    if(typeof id === 'function') {
      callback = id;
      // specifically undefined because "null" is a notification request
      id = undefined;
    }

    const hasCallback = typeof callback === 'function';

    try {
      request = generateRequest(method, params, id, {
        generator: this.options.generator,
        version: this.options.version,
        notificationIdNull: this.options.notificationIdNull,
      });
    } catch(err) {
      if(hasCallback) {
        return callback(err);
      }
      throw err;
    }

    // no callback means we should just return a raw request
    if(!hasCallback) {
      return request;
    }

  }

  let message;
  try {
    message = JSON.stringify(request, this.options.replacer);
  } catch(err) {
    return callback(err);
  }

  this.callServer(message, function(err, response) {
    self._parseResponse(err, response, callback);
  });

  // always return the raw request
  return request;
};

/**
 * Parses a response from a server
 * @param {Object} err Error to pass on that is unrelated to the actual response
 * @param {String} responseText JSON-RPC 1.0 or 2.0 response
 * @param {Function} callback Callback that will receive different arguments depending on the amount of parameters
 * @private
 */
ClientBrowser.prototype._parseResponse = function(err, responseText, callback) {
  if(err) {
    callback(err);
    return;
  }

  if(!responseText) {
    // empty response text, assume that is correct because it could be a
    // notification which jayson does not give any body for
    return callback();
  }

  let response;
  try {
    response = JSON.parse(responseText, this.options.reviver);
  } catch(err) {
    return callback(err);
  }

  if(callback.length === 3) {
    // if callback length is 3, we split callback arguments on error and response

    // is batch response?
    if(Array.isArray(response)) {

      // neccesary to split strictly on validity according to spec here
      const isError = function(res) {
        return typeof res.error !== 'undefined';
      };

      const isNotError = function (res) {
        return !isError(res);
      };

      return callback(null, response.filter(isError), response.filter(isNotError));
    
    } else {

      // split regardless of validity
      return callback(null, response.error, response.result);
    
    }
  
  }

  callback(null, response);
};

var RpcClient = browser;

const toBuffer = arr => {
  if (Buffer.isBuffer(arr)) {
    return arr;
  } else if (arr instanceof Uint8Array) {
    return Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
  } else {
    return Buffer.from(arr);
  }
};

var hash$1 = {};

var utils$9 = {};

var minimalisticAssert = assert$6;

function assert$6(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert$6.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};

var inherits_browser = {exports: {}};

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  inherits_browser.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

var assert$5 = minimalisticAssert;
var inherits = inherits_browser.exports;

utils$9.inherits = inherits;

function isSurrogatePair(msg, i) {
  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
}

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      // Inspired by stringToUtf8ByteArray() in closure-library by Google
      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
      // Apache License 2.0
      // https://github.com/google/closure-library/blob/master/LICENSE
      var p = 0;
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = (c >> 6) | 192;
          res[p++] = (c & 63) | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
          res[p++] = (c >> 18) | 240;
          res[p++] = ((c >> 12) & 63) | 128;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        } else {
          res[p++] = (c >> 12) | 224;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
utils$9.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils$9.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
utils$9.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
utils$9.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils$9.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
utils$9.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert$5(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
utils$9.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
utils$9.split32 = split32;

function rotr32$1(w, b) {
  return (w >>> b) | (w << (32 - b));
}
utils$9.rotr32 = rotr32$1;

function rotl32$2(w, b) {
  return (w << b) | (w >>> (32 - b));
}
utils$9.rotl32 = rotl32$2;

function sum32$3(a, b) {
  return (a + b) >>> 0;
}
utils$9.sum32 = sum32$3;

function sum32_3$1(a, b, c) {
  return (a + b + c) >>> 0;
}
utils$9.sum32_3 = sum32_3$1;

function sum32_4$2(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
utils$9.sum32_4 = sum32_4$2;

function sum32_5$2(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
utils$9.sum32_5 = sum32_5$2;

function sum64$1(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
utils$9.sum64 = sum64$1;

function sum64_hi$1(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
utils$9.sum64_hi = sum64_hi$1;

function sum64_lo$1(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
utils$9.sum64_lo = sum64_lo$1;

function sum64_4_hi$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
utils$9.sum64_4_hi = sum64_4_hi$1;

function sum64_4_lo$1(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
utils$9.sum64_4_lo = sum64_4_lo$1;

function sum64_5_hi$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
utils$9.sum64_5_hi = sum64_5_hi$1;

function sum64_5_lo$1(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
utils$9.sum64_5_lo = sum64_5_lo$1;

function rotr64_hi$1(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
utils$9.rotr64_hi = rotr64_hi$1;

function rotr64_lo$1(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
utils$9.rotr64_lo = rotr64_lo$1;

function shr64_hi$1(ah, al, num) {
  return ah >>> num;
}
utils$9.shr64_hi = shr64_hi$1;

function shr64_lo$1(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
utils$9.shr64_lo = shr64_lo$1;

var common$5 = {};

var utils$8 = utils$9;
var assert$4 = minimalisticAssert;

function BlockHash$4() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
common$5.BlockHash = BlockHash$4;

BlockHash$4.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils$8.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils$8.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash$4.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert$4(this.pending === null);

  return this._digest(enc);
};

BlockHash$4.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};

var sha = {};

var common$4 = {};

var utils$7 = utils$9;
var rotr32 = utils$7.rotr32;

function ft_1$1(s, x, y, z) {
  if (s === 0)
    return ch32$1(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32$1(x, y, z);
}
common$4.ft_1 = ft_1$1;

function ch32$1(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
common$4.ch32 = ch32$1;

function maj32$1(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
common$4.maj32 = maj32$1;

function p32(x, y, z) {
  return x ^ y ^ z;
}
common$4.p32 = p32;

function s0_256$1(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
common$4.s0_256 = s0_256$1;

function s1_256$1(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
common$4.s1_256 = s1_256$1;

function g0_256$1(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
common$4.g0_256 = g0_256$1;

function g1_256$1(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
common$4.g1_256 = g1_256$1;

var utils$6 = utils$9;
var common$3 = common$5;
var shaCommon$1 = common$4;

var rotl32$1 = utils$6.rotl32;
var sum32$2 = utils$6.sum32;
var sum32_5$1 = utils$6.sum32_5;
var ft_1 = shaCommon$1.ft_1;
var BlockHash$3 = common$3.BlockHash;

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash$3.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils$6.inherits(SHA1, BlockHash$3);
var _1 = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32$1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5$1(rotl32$1(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32$1(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32$2(this.h[0], a);
  this.h[1] = sum32$2(this.h[1], b);
  this.h[2] = sum32$2(this.h[2], c);
  this.h[3] = sum32$2(this.h[3], d);
  this.h[4] = sum32$2(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$6.toHex32(this.h, 'big');
  else
    return utils$6.split32(this.h, 'big');
};

var utils$5 = utils$9;
var common$2 = common$5;
var shaCommon = common$4;
var assert$3 = minimalisticAssert;

var sum32$1 = utils$5.sum32;
var sum32_4$1 = utils$5.sum32_4;
var sum32_5 = utils$5.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;

var BlockHash$2 = common$2.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256$1() {
  if (!(this instanceof SHA256$1))
    return new SHA256$1();

  BlockHash$2.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils$5.inherits(SHA256$1, BlockHash$2);
var _256 = SHA256$1;

SHA256$1.blockSize = 512;
SHA256$1.outSize = 256;
SHA256$1.hmacStrength = 192;
SHA256$1.padLength = 64;

SHA256$1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4$1(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert$3(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32$1(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32$1(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32$1(T1, T2);
  }

  this.h[0] = sum32$1(this.h[0], a);
  this.h[1] = sum32$1(this.h[1], b);
  this.h[2] = sum32$1(this.h[2], c);
  this.h[3] = sum32$1(this.h[3], d);
  this.h[4] = sum32$1(this.h[4], e);
  this.h[5] = sum32$1(this.h[5], f);
  this.h[6] = sum32$1(this.h[6], g);
  this.h[7] = sum32$1(this.h[7], h);
};

SHA256$1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$5.toHex32(this.h, 'big');
  else
    return utils$5.split32(this.h, 'big');
};

var utils$4 = utils$9;
var SHA256 = _256;

function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();

  SHA256.call(this);
  this.h = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
}
utils$4.inherits(SHA224, SHA256);
var _224 = SHA224;

SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  // Just truncate output
  if (enc === 'hex')
    return utils$4.toHex32(this.h.slice(0, 7), 'big');
  else
    return utils$4.split32(this.h.slice(0, 7), 'big');
};

var utils$3 = utils$9;
var common$1 = common$5;
var assert$2 = minimalisticAssert;

var rotr64_hi = utils$3.rotr64_hi;
var rotr64_lo = utils$3.rotr64_lo;
var shr64_hi = utils$3.shr64_hi;
var shr64_lo = utils$3.shr64_lo;
var sum64 = utils$3.sum64;
var sum64_hi = utils$3.sum64_hi;
var sum64_lo = utils$3.sum64_lo;
var sum64_4_hi = utils$3.sum64_4_hi;
var sum64_4_lo = utils$3.sum64_4_lo;
var sum64_5_hi = utils$3.sum64_5_hi;
var sum64_5_lo = utils$3.sum64_5_lo;

var BlockHash$1 = common$1.BlockHash;

var sha512_K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function SHA512$1() {
  if (!(this instanceof SHA512$1))
    return new SHA512$1();

  BlockHash$1.call(this);
  this.h = [
    0x6a09e667, 0xf3bcc908,
    0xbb67ae85, 0x84caa73b,
    0x3c6ef372, 0xfe94f82b,
    0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1,
    0x9b05688c, 0x2b3e6c1f,
    0x1f83d9ab, 0xfb41bd6b,
    0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils$3.inherits(SHA512$1, BlockHash$1);
var _512 = SHA512$1;

SHA512$1.blockSize = 1024;
SHA512$1.outSize = 512;
SHA512$1.hmacStrength = 192;
SHA512$1.padLength = 128;

SHA512$1.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];  // i - 7
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];  // i - 16
    var c3_lo = W[i - 31];

    W[i] = sum64_4_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
  }
};

SHA512$1.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;

  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];

  assert$2(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];

    var T1_hi = sum64_5_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);

    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512$1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$3.toHex32(this.h, 'big');
  else
    return utils$3.split32(this.h, 'big');
};

function ch64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi = shr64_hi(xh, xl, 6);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo = shr64_lo(xh, xl, 6);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

var utils$2 = utils$9;

var SHA512 = _512;

function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();

  SHA512.call(this);
  this.h = [
    0xcbbb9d5d, 0xc1059ed8,
    0x629a292a, 0x367cd507,
    0x9159015a, 0x3070dd17,
    0x152fecd8, 0xf70e5939,
    0x67332667, 0xffc00b31,
    0x8eb44a87, 0x68581511,
    0xdb0c2e0d, 0x64f98fa7,
    0x47b5481d, 0xbefa4fa4 ];
}
utils$2.inherits(SHA384, SHA512);
var _384 = SHA384;

SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$2.toHex32(this.h.slice(0, 12), 'big');
  else
    return utils$2.split32(this.h.slice(0, 12), 'big');
};

sha.sha1 = _1;
sha.sha224 = _224;
sha.sha256 = _256;
sha.sha384 = _384;
sha.sha512 = _512;

var ripemd = {};

var utils$1 = utils$9;
var common = common$5;

var rotl32 = utils$1.rotl32;
var sum32 = utils$1.sum32;
var sum32_3 = utils$1.sum32_3;
var sum32_4 = utils$1.sum32_4;
var BlockHash = common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();

  BlockHash.call(this);

  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
  this.endian = 'little';
}
utils$1.inherits(RIPEMD160, BlockHash);
ripemd.ripemd160 = RIPEMD160;

RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
        s[j]),
      E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]),
      Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils$1.toHex32(this.h, 'little');
  else
    return utils$1.split32(this.h, 'little');
};

function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return (x & y) | ((~x) & z);
  else if (j <= 47)
    return (x | (~y)) ^ z;
  else if (j <= 63)
    return (x & z) | (y & (~z));
  else
    return x ^ (y | (~z));
}

function K(j) {
  if (j <= 15)
    return 0x00000000;
  else if (j <= 31)
    return 0x5a827999;
  else if (j <= 47)
    return 0x6ed9eba1;
  else if (j <= 63)
    return 0x8f1bbcdc;
  else
    return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15)
    return 0x50a28be6;
  else if (j <= 31)
    return 0x5c4dd124;
  else if (j <= 47)
    return 0x6d703ef3;
  else if (j <= 63)
    return 0x7a6d76e9;
  else
    return 0x00000000;
}

var r = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var rh = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var s = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sh = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];

var utils = utils$9;
var assert$1 = minimalisticAssert;

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils.toArray(key, enc));
}
var hmac = Hmac;

Hmac.prototype._init = function init(key) {
  // Shorten key, if needed
  if (key.length > this.blockSize)
    key = new this.Hash().update(key).digest();
  assert$1(key.length <= this.blockSize);

  // Add padding to key
  for (var i = key.length; i < this.blockSize; i++)
    key.push(0);

  for (i = 0; i < key.length; i++)
    key[i] ^= 0x36;
  this.inner = new this.Hash().update(key);

  // 0x36 ^ 0x5c = 0x6a
  for (i = 0; i < key.length; i++)
    key[i] ^= 0x6a;
  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};

(function (exports) {
	var hash = exports;

	hash.utils = utils$9;
	hash.common = common$5;
	hash.sha = sha;
	hash.ripemd = ripemd;
	hash.hmac = hmac;

	// Proxy hash functions to the main object
	hash.sha1 = hash.sha.sha1;
	hash.sha256 = hash.sha.sha256;
	hash.sha224 = hash.sha.sha224;
	hash.sha384 = hash.sha.sha384;
	hash.sha512 = hash.sha.sha512;
	hash.ripemd160 = hash.ripemd.ripemd160;
} (hash$1));

var hash = hash$1;

const version$2 = "logger/5.6.0";

let _permanentCensorErrors = false;
let _censorErrors = false;
const LogLevels = { debug: 1, "default": 2, info: 2, warning: 3, error: 4, off: 5 };
let _logLevel = LogLevels["default"];
let _globalLogger = null;
function _checkNormalize() {
    try {
        const missing = [];
        // Make sure all forms of normalization are supported
        ["NFD", "NFC", "NFKD", "NFKC"].forEach((form) => {
            try {
                if ("test".normalize(form) !== "test") {
                    throw new Error("bad normalize");
                }
                ;
            }
            catch (error) {
                missing.push(form);
            }
        });
        if (missing.length) {
            throw new Error("missing " + missing.join(", "));
        }
        if (String.fromCharCode(0xe9).normalize("NFD") !== String.fromCharCode(0x65, 0x0301)) {
            throw new Error("broken implementation");
        }
    }
    catch (error) {
        return error.message;
    }
    return null;
}
const _normalizeError = _checkNormalize();
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["OFF"] = "OFF";
})(LogLevel || (LogLevel = {}));
var ErrorCode;
(function (ErrorCode) {
    ///////////////////
    // Generic Errors
    // Unknown Error
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    // Not Implemented
    ErrorCode["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    // Unsupported Operation
    //   - operation
    ErrorCode["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
    // Network Error (i.e. Ethereum Network, such as an invalid chain ID)
    //   - event ("noNetwork" is not re-thrown in provider.ready; otherwise thrown)
    ErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
    // Some sort of bad response from the server
    ErrorCode["SERVER_ERROR"] = "SERVER_ERROR";
    // Timeout
    ErrorCode["TIMEOUT"] = "TIMEOUT";
    ///////////////////
    // Operational  Errors
    // Buffer Overrun
    ErrorCode["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
    // Numeric Fault
    //   - operation: the operation being executed
    //   - fault: the reason this faulted
    ErrorCode["NUMERIC_FAULT"] = "NUMERIC_FAULT";
    ///////////////////
    // Argument Errors
    // Missing new operator to an object
    //  - name: The name of the class
    ErrorCode["MISSING_NEW"] = "MISSING_NEW";
    // Invalid argument (e.g. value is incompatible with type) to a function:
    //   - argument: The argument name that was invalid
    //   - value: The value of the argument
    ErrorCode["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
    // Missing argument to a function:
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
    // Too many arguments
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
    ///////////////////
    // Blockchain Errors
    // Call exception
    //  - transaction: the transaction
    //  - address?: the contract address
    //  - args?: The arguments passed into the function
    //  - method?: The Solidity method signature
    //  - errorSignature?: The EIP848 error signature
    //  - errorArgs?: The EIP848 error parameters
    //  - reason: The reason (only for EIP848 "Error(string)")
    ErrorCode["CALL_EXCEPTION"] = "CALL_EXCEPTION";
    // Insufficient funds (< value + gasLimit * gasPrice)
    //   - transaction: the transaction attempted
    ErrorCode["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
    // Nonce has already been used
    //   - transaction: the transaction attempted
    ErrorCode["NONCE_EXPIRED"] = "NONCE_EXPIRED";
    // The replacement fee for the transaction is too low
    //   - transaction: the transaction attempted
    ErrorCode["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
    // The gas limit could not be estimated
    //   - transaction: the transaction passed to estimateGas
    ErrorCode["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
    // The transaction was replaced by one with a higher gas price
    //   - reason: "cancelled", "replaced" or "repriced"
    //   - cancelled: true if reason == "cancelled" or reason == "replaced")
    //   - hash: original transaction hash
    //   - replacement: the full TransactionsResponse for the replacement
    //   - receipt: the receipt of the replacement
    ErrorCode["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
})(ErrorCode || (ErrorCode = {}));
const HEX = "0123456789abcdef";
class Logger {
    constructor(version) {
        Object.defineProperty(this, "version", {
            enumerable: true,
            value: version,
            writable: false
        });
    }
    _log(logLevel, args) {
        const level = logLevel.toLowerCase();
        if (LogLevels[level] == null) {
            this.throwArgumentError("invalid log level name", "logLevel", logLevel);
        }
        if (_logLevel > LogLevels[level]) {
            return;
        }
        console.log.apply(console, args);
    }
    debug(...args) {
        this._log(Logger.levels.DEBUG, args);
    }
    info(...args) {
        this._log(Logger.levels.INFO, args);
    }
    warn(...args) {
        this._log(Logger.levels.WARNING, args);
    }
    makeError(message, code, params) {
        // Errors are being censored
        if (_censorErrors) {
            return this.makeError("censored error", code, {});
        }
        if (!code) {
            code = Logger.errors.UNKNOWN_ERROR;
        }
        if (!params) {
            params = {};
        }
        const messageDetails = [];
        Object.keys(params).forEach((key) => {
            const value = params[key];
            try {
                if (value instanceof Uint8Array) {
                    let hex = "";
                    for (let i = 0; i < value.length; i++) {
                        hex += HEX[value[i] >> 4];
                        hex += HEX[value[i] & 0x0f];
                    }
                    messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
                }
                else {
                    messageDetails.push(key + "=" + JSON.stringify(value));
                }
            }
            catch (error) {
                messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
            }
        });
        messageDetails.push(`code=${code}`);
        messageDetails.push(`version=${this.version}`);
        const reason = message;
        let url = "";
        switch (code) {
            case ErrorCode.NUMERIC_FAULT: {
                url = "NUMERIC_FAULT";
                const fault = message;
                switch (fault) {
                    case "overflow":
                    case "underflow":
                    case "division-by-zero":
                        url += "-" + fault;
                        break;
                    case "negative-power":
                    case "negative-width":
                        url += "-unsupported";
                        break;
                    case "unbound-bitwise-result":
                        url += "-unbound-result";
                        break;
                }
                break;
            }
            case ErrorCode.CALL_EXCEPTION:
            case ErrorCode.INSUFFICIENT_FUNDS:
            case ErrorCode.MISSING_NEW:
            case ErrorCode.NONCE_EXPIRED:
            case ErrorCode.REPLACEMENT_UNDERPRICED:
            case ErrorCode.TRANSACTION_REPLACED:
            case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
                url = code;
                break;
        }
        if (url) {
            message += " [ See: https:/\/links.ethers.org/v5-errors-" + url + " ]";
        }
        if (messageDetails.length) {
            message += " (" + messageDetails.join(", ") + ")";
        }
        // @TODO: Any??
        const error = new Error(message);
        error.reason = reason;
        error.code = code;
        Object.keys(params).forEach(function (key) {
            error[key] = params[key];
        });
        return error;
    }
    throwError(message, code, params) {
        throw this.makeError(message, code, params);
    }
    throwArgumentError(message, name, value) {
        return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
            argument: name,
            value: value
        });
    }
    assert(condition, message, code, params) {
        if (!!condition) {
            return;
        }
        this.throwError(message, code, params);
    }
    assertArgument(condition, message, name, value) {
        if (!!condition) {
            return;
        }
        this.throwArgumentError(message, name, value);
    }
    checkNormalize(message) {
        if (_normalizeError) {
            this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "String.prototype.normalize", form: _normalizeError
            });
        }
    }
    checkSafeUint53(value, message) {
        if (typeof (value) !== "number") {
            return;
        }
        if (message == null) {
            message = "value not safe";
        }
        if (value < 0 || value >= 0x1fffffffffffff) {
            this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "out-of-safe-range",
                value: value
            });
        }
        if (value % 1) {
            this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "non-integer",
                value: value
            });
        }
    }
    checkArgumentCount(count, expectedCount, message) {
        if (message) {
            message = ": " + message;
        }
        else {
            message = "";
        }
        if (count < expectedCount) {
            this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
        if (count > expectedCount) {
            this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
    }
    checkNew(target, kind) {
        if (target === Object || target == null) {
            this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
        }
    }
    checkAbstract(target, kind) {
        if (target === kind) {
            this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, { name: target.name, operation: "new" });
        }
        else if (target === Object || target == null) {
            this.throwError("missing new", Logger.errors.MISSING_NEW, { name: kind.name });
        }
    }
    static globalLogger() {
        if (!_globalLogger) {
            _globalLogger = new Logger(version$2);
        }
        return _globalLogger;
    }
    static setCensorship(censorship, permanent) {
        if (!censorship && permanent) {
            this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        if (_permanentCensorErrors) {
            if (!censorship) {
                return;
            }
            this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        _censorErrors = !!censorship;
        _permanentCensorErrors = !!permanent;
    }
    static setLogLevel(logLevel) {
        const level = LogLevels[logLevel.toLowerCase()];
        if (level == null) {
            Logger.globalLogger().warn("invalid log level - " + logLevel);
            return;
        }
        _logLevel = level;
    }
    static from(version) {
        return new Logger(version);
    }
}
Logger.errors = ErrorCode;
Logger.levels = LogLevel;

const version$1 = "bytes/5.6.0";

const logger = new Logger(version$1);
///////////////////////////////
function isHexable(value) {
    return !!(value.toHexString);
}
function addSlice(array) {
    if (array.slice) {
        return array;
    }
    array.slice = function () {
        const args = Array.prototype.slice.call(arguments);
        return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
    };
    return array;
}
function isInteger(value) {
    return (typeof (value) === "number" && value == value && (value % 1) === 0);
}
function isBytes(value) {
    if (value == null) {
        return false;
    }
    if (value.constructor === Uint8Array) {
        return true;
    }
    if (typeof (value) === "string") {
        return false;
    }
    if (!isInteger(value.length) || value.length < 0) {
        return false;
    }
    for (let i = 0; i < value.length; i++) {
        const v = value[i];
        if (!isInteger(v) || v < 0 || v >= 256) {
            return false;
        }
    }
    return true;
}
function arrayify(value, options) {
    if (!options) {
        options = {};
    }
    if (typeof (value) === "number") {
        logger.checkSafeUint53(value, "invalid arrayify value");
        const result = [];
        while (value) {
            result.unshift(value & 0xff);
            value = parseInt(String(value / 256));
        }
        if (result.length === 0) {
            result.push(0);
        }
        return addSlice(new Uint8Array(result));
    }
    if (options.allowMissingPrefix && typeof (value) === "string" && value.substring(0, 2) !== "0x") {
        value = "0x" + value;
    }
    if (isHexable(value)) {
        value = value.toHexString();
    }
    if (isHexString(value)) {
        let hex = value.substring(2);
        if (hex.length % 2) {
            if (options.hexPad === "left") {
                hex = "0x0" + hex.substring(2);
            }
            else if (options.hexPad === "right") {
                hex += "0";
            }
            else {
                logger.throwArgumentError("hex data is odd-length", "value", value);
            }
        }
        const result = [];
        for (let i = 0; i < hex.length; i += 2) {
            result.push(parseInt(hex.substring(i, i + 2), 16));
        }
        return addSlice(new Uint8Array(result));
    }
    if (isBytes(value)) {
        return addSlice(new Uint8Array(value));
    }
    return logger.throwArgumentError("invalid arrayify value", "value", value);
}
function isHexString(value, length) {
    if (typeof (value) !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}

const version = "sha2/5.6.0";

new Logger(version);
function sha256(data) {
    return "0x" + (hash.sha256().update(arrayify(data)).digest("hex"));
}

class Struct {
  constructor(properties) {
    Object.assign(this, properties);
  }

  encode() {
    return Buffer.from(serialize(SOLANA_SCHEMA, this));
  }

  static decode(data) {
    return deserialize(SOLANA_SCHEMA, this, data);
  }

  static decodeUnchecked(data) {
    return deserializeUnchecked(SOLANA_SCHEMA, this, data);
  }

} // Class representing a Rust-compatible enum, since enums are only strings or
const SOLANA_SCHEMA = new Map();

/**
 * Maximum length of derived pubkey seed
 */

const MAX_SEED_LENGTH = 32;
/**
 * Value to be converted into public key
 */

function isPublicKeyData(value) {
  return value._bn !== undefined;
}
/**
 * A public key
 */


class PublicKey extends Struct {
  /** @internal */

  /**
   * Create a new PublicKey object
   * @param value ed25519 public key as buffer or base-58 encoded string
   */
  constructor(value) {
    super({});
    this._bn = void 0;

    if (isPublicKeyData(value)) {
      this._bn = value._bn;
    } else {
      if (typeof value === 'string') {
        // assume base 58 encoding by default
        const decoded = bs58$1.decode(value);

        if (decoded.length != 32) {
          throw new Error(`Invalid public key input`);
        }

        this._bn = new BN(decoded);
      } else {
        this._bn = new BN(value);
      }

      if (this._bn.byteLength() > 32) {
        throw new Error(`Invalid public key input`);
      }
    }
  }
  /**
   * Default public key value. (All zeros)
   */


  /**
   * Checks if two publicKeys are equal
   */
  equals(publicKey) {
    return this._bn.eq(publicKey._bn);
  }
  /**
   * Return the base-58 representation of the public key
   */


  toBase58() {
    return bs58$1.encode(this.toBytes());
  }

  toJSON() {
    return this.toBase58();
  }
  /**
   * Return the byte array representation of the public key
   */


  toBytes() {
    return this.toBuffer();
  }
  /**
   * Return the Buffer representation of the public key
   */


  toBuffer() {
    const b = this._bn.toArrayLike(Buffer);

    if (b.length === 32) {
      return b;
    }

    const zeroPad = Buffer.alloc(32);
    b.copy(zeroPad, 32 - b.length);
    return zeroPad;
  }
  /**
   * Return the base-58 representation of the public key
   */


  toString() {
    return this.toBase58();
  }
  /**
   * Derive a public key from another key, a seed, and a program ID.
   * The program ID will also serve as the owner of the public key, giving
   * it permission to write data to the account.
   */

  /* eslint-disable require-await */


  static async createWithSeed(fromPublicKey, seed, programId) {
    const buffer = Buffer.concat([fromPublicKey.toBuffer(), Buffer.from(seed), programId.toBuffer()]);
    const hash = sha256(new Uint8Array(buffer)).slice(2);
    return new PublicKey(Buffer.from(hash, 'hex'));
  }
  /**
   * Derive a program address from seeds and a program ID.
   */

  /* eslint-disable require-await */


  static createProgramAddressSync(seeds, programId) {
    let buffer = Buffer.alloc(0);
    seeds.forEach(function (seed) {
      if (seed.length > MAX_SEED_LENGTH) {
        throw new TypeError(`Max seed length exceeded`);
      }

      buffer = Buffer.concat([buffer, toBuffer(seed)]);
    });
    buffer = Buffer.concat([buffer, programId.toBuffer(), Buffer.from('ProgramDerivedAddress')]);
    let hash = sha256(new Uint8Array(buffer)).slice(2);
    let publicKeyBytes = new BN(hash, 16).toArray(undefined, 32);

    if (is_on_curve(publicKeyBytes)) {
      throw new Error(`Invalid seeds, address must fall off the curve`);
    }

    return new PublicKey(publicKeyBytes);
  }
  /**
   * Async version of createProgramAddressSync
   * For backwards compatibility
   */

  /* eslint-disable require-await */


  static async createProgramAddress(seeds, programId) {
    return this.createProgramAddressSync(seeds, programId);
  }
  /**
   * Find a valid program address
   *
   * Valid program addresses must fall off the ed25519 curve.  This function
   * iterates a nonce until it finds one that when combined with the seeds
   * results in a valid program address.
   */


  static findProgramAddressSync(seeds, programId) {
    let nonce = 255;
    let address;

    while (nonce != 0) {
      try {
        const seedsWithNonce = seeds.concat(Buffer.from([nonce]));
        address = this.createProgramAddressSync(seedsWithNonce, programId);
      } catch (err) {
        if (err instanceof TypeError) {
          throw err;
        }

        nonce--;
        continue;
      }

      return [address, nonce];
    }

    throw new Error(`Unable to find a viable program address nonce`);
  }
  /**
   * Async version of findProgramAddressSync
   * For backwards compatibility
   */


  static async findProgramAddress(seeds, programId) {
    return this.findProgramAddressSync(seeds, programId);
  }
  /**
   * Check that a pubkey is on the ed25519 curve.
   */


  static isOnCurve(pubkeyData) {
    const pubkey = new PublicKey(pubkeyData);
    return is_on_curve(pubkey.toBytes()) == 1;
  }

}
PublicKey.default = new PublicKey('11111111111111111111111111111111');
SOLANA_SCHEMA.set(PublicKey, {
  kind: 'struct',
  fields: [['_bn', 'u256']]
}); // @ts-ignore

let naclLowLevel = nacl.lowlevel; // Check that a pubkey is on the curve.
// This function and its dependents were sourced from:
// https://github.com/dchest/tweetnacl-js/blob/f1ec050ceae0861f34280e62498b1d3ed9c350c6/nacl.js#L792

function is_on_curve(p) {
  var r = [naclLowLevel.gf(), naclLowLevel.gf(), naclLowLevel.gf(), naclLowLevel.gf()];
  var t = naclLowLevel.gf(),
      chk = naclLowLevel.gf(),
      num = naclLowLevel.gf(),
      den = naclLowLevel.gf(),
      den2 = naclLowLevel.gf(),
      den4 = naclLowLevel.gf(),
      den6 = naclLowLevel.gf();
  naclLowLevel.set25519(r[2], gf1);
  naclLowLevel.unpack25519(r[1], p);
  naclLowLevel.S(num, r[1]);
  naclLowLevel.M(den, num, naclLowLevel.D);
  naclLowLevel.Z(num, num, r[2]);
  naclLowLevel.A(den, r[2], den);
  naclLowLevel.S(den2, den);
  naclLowLevel.S(den4, den2);
  naclLowLevel.M(den6, den4, den2);
  naclLowLevel.M(t, den6, num);
  naclLowLevel.M(t, t, den);
  naclLowLevel.pow2523(t, t);
  naclLowLevel.M(t, t, num);
  naclLowLevel.M(t, t, den);
  naclLowLevel.M(t, t, den);
  naclLowLevel.M(r[0], t, den);
  naclLowLevel.S(chk, r[0]);
  naclLowLevel.M(chk, chk, den);
  if (neq25519(chk, num)) naclLowLevel.M(r[0], r[0], I);
  naclLowLevel.S(chk, r[0]);
  naclLowLevel.M(chk, chk, den);
  if (neq25519(chk, num)) return 0;
  return 1;
}

let gf1 = naclLowLevel.gf([1]);
let I = naclLowLevel.gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);

function neq25519(a, b) {
  var c = new Uint8Array(32),
      d = new Uint8Array(32);
  naclLowLevel.pack25519(c, a);
  naclLowLevel.pack25519(d, b);
  return naclLowLevel.crypto_verify_32(c, 0, d, 0);
}

new PublicKey('BPFLoader1111111111111111111111111111111111');

/**
 * Maximum over-the-wire size of a Transaction
 *
 * 1280 is IPv6 minimum MTU
 * 40 bytes is the size of the IPv6 header
 * 8 bytes is the size of the fragment header
 */
const PACKET_DATA_SIZE = 1280 - 40 - 8;
const SIGNATURE_LENGTH_IN_BYTES = 64;

/**
 * Layout for a public key
 */

const publicKey = (property = 'publicKey') => {
  return blob(32, property);
};

/**
 * Layout for a Rust String type
 */
const rustString = (property = 'string') => {
  const rsl = struct([u32('length'), u32('lengthPadding'), blob(offset(u32(), -8), 'chars')], property);

  const _decode = rsl.decode.bind(rsl);

  const _encode = rsl.encode.bind(rsl);

  const rslShim = rsl;

  rslShim.decode = (b, offset) => {
    const data = _decode(b, offset);

    return data['chars'].toString();
  };

  rslShim.encode = (str, b, offset) => {
    const data = {
      chars: Buffer.from(str, 'utf8')
    };
    return _encode(data, b, offset);
  };

  rslShim.alloc = str => {
    return u32().span + u32().span + Buffer.from(str, 'utf8').length;
  };

  return rslShim;
};
/**
 * Layout for an Authorized object
 */

const authorized = (property = 'authorized') => {
  return struct([publicKey('staker'), publicKey('withdrawer')], property);
};
/**
 * Layout for a Lockup object
 */

const lockup = (property = 'lockup') => {
  return struct([ns64('unixTimestamp'), ns64('epoch'), publicKey('custodian')], property);
};
/**
 *  Layout for a VoteInit object
 */

const voteInit = (property = 'voteInit') => {
  return struct([publicKey('nodePubkey'), publicKey('authorizedVoter'), publicKey('authorizedWithdrawer'), u8('commission')], property);
};

function decodeLength(bytes) {
  let len = 0;
  let size = 0;

  for (;;) {
    let elem = bytes.shift();
    len |= (elem & 0x7f) << size * 7;
    size += 1;

    if ((elem & 0x80) === 0) {
      break;
    }
  }

  return len;
}
function encodeLength(bytes, len) {
  let rem_len = len;

  for (;;) {
    let elem = rem_len & 0x7f;
    rem_len >>= 7;

    if (rem_len == 0) {
      bytes.push(elem);
      break;
    } else {
      elem |= 0x80;
      bytes.push(elem);
    }
  }
}

/**
 * The message header, identifying signed and read-only account
 */

const PUBKEY_LENGTH = 32;
/**
 * List of instructions to be processed atomically
 */

class Message {
  constructor(args) {
    this.header = void 0;
    this.accountKeys = void 0;
    this.recentBlockhash = void 0;
    this.instructions = void 0;
    this.indexToProgramIds = new Map();
    this.header = args.header;
    this.accountKeys = args.accountKeys.map(account => new PublicKey(account));
    this.recentBlockhash = args.recentBlockhash;
    this.instructions = args.instructions;
    this.instructions.forEach(ix => this.indexToProgramIds.set(ix.programIdIndex, this.accountKeys[ix.programIdIndex]));
  }

  isAccountSigner(index) {
    return index < this.header.numRequiredSignatures;
  }

  isAccountWritable(index) {
    return index < this.header.numRequiredSignatures - this.header.numReadonlySignedAccounts || index >= this.header.numRequiredSignatures && index < this.accountKeys.length - this.header.numReadonlyUnsignedAccounts;
  }

  isProgramId(index) {
    return this.indexToProgramIds.has(index);
  }

  programIds() {
    return [...this.indexToProgramIds.values()];
  }

  nonProgramIds() {
    return this.accountKeys.filter((_, index) => !this.isProgramId(index));
  }

  serialize() {
    const numKeys = this.accountKeys.length;
    let keyCount = [];
    encodeLength(keyCount, numKeys);
    const instructions = this.instructions.map(instruction => {
      const {
        accounts,
        programIdIndex
      } = instruction;
      const data = Array.from(bs58$1.decode(instruction.data));
      let keyIndicesCount = [];
      encodeLength(keyIndicesCount, accounts.length);
      let dataCount = [];
      encodeLength(dataCount, data.length);
      return {
        programIdIndex,
        keyIndicesCount: Buffer.from(keyIndicesCount),
        keyIndices: accounts,
        dataLength: Buffer.from(dataCount),
        data
      };
    });
    let instructionCount = [];
    encodeLength(instructionCount, instructions.length);
    let instructionBuffer = Buffer.alloc(PACKET_DATA_SIZE);
    Buffer.from(instructionCount).copy(instructionBuffer);
    let instructionBufferLength = instructionCount.length;
    instructions.forEach(instruction => {
      const instructionLayout = struct([u8('programIdIndex'), blob(instruction.keyIndicesCount.length, 'keyIndicesCount'), seq(u8('keyIndex'), instruction.keyIndices.length, 'keyIndices'), blob(instruction.dataLength.length, 'dataLength'), seq(u8('userdatum'), instruction.data.length, 'data')]);
      const length = instructionLayout.encode(instruction, instructionBuffer, instructionBufferLength);
      instructionBufferLength += length;
    });
    instructionBuffer = instructionBuffer.slice(0, instructionBufferLength);
    const signDataLayout = struct([blob(1, 'numRequiredSignatures'), blob(1, 'numReadonlySignedAccounts'), blob(1, 'numReadonlyUnsignedAccounts'), blob(keyCount.length, 'keyCount'), seq(publicKey('key'), numKeys, 'keys'), publicKey('recentBlockhash')]);
    const transaction = {
      numRequiredSignatures: Buffer.from([this.header.numRequiredSignatures]),
      numReadonlySignedAccounts: Buffer.from([this.header.numReadonlySignedAccounts]),
      numReadonlyUnsignedAccounts: Buffer.from([this.header.numReadonlyUnsignedAccounts]),
      keyCount: Buffer.from(keyCount),
      keys: this.accountKeys.map(key => toBuffer(key.toBytes())),
      recentBlockhash: bs58$1.decode(this.recentBlockhash)
    };
    let signData = Buffer.alloc(2048);
    const length = signDataLayout.encode(transaction, signData);
    instructionBuffer.copy(signData, length);
    return signData.slice(0, length + instructionBuffer.length);
  }
  /**
   * Decode a compiled message into a Message object.
   */


  static from(buffer) {
    // Slice up wire data
    let byteArray = [...buffer];
    const numRequiredSignatures = byteArray.shift();
    const numReadonlySignedAccounts = byteArray.shift();
    const numReadonlyUnsignedAccounts = byteArray.shift();
    const accountCount = decodeLength(byteArray);
    let accountKeys = [];

    for (let i = 0; i < accountCount; i++) {
      const account = byteArray.slice(0, PUBKEY_LENGTH);
      byteArray = byteArray.slice(PUBKEY_LENGTH);
      accountKeys.push(bs58$1.encode(Buffer.from(account)));
    }

    const recentBlockhash = byteArray.slice(0, PUBKEY_LENGTH);
    byteArray = byteArray.slice(PUBKEY_LENGTH);
    const instructionCount = decodeLength(byteArray);
    let instructions = [];

    for (let i = 0; i < instructionCount; i++) {
      const programIdIndex = byteArray.shift();
      const accountCount = decodeLength(byteArray);
      const accounts = byteArray.slice(0, accountCount);
      byteArray = byteArray.slice(accountCount);
      const dataLength = decodeLength(byteArray);
      const dataSlice = byteArray.slice(0, dataLength);
      const data = bs58$1.encode(Buffer.from(dataSlice));
      byteArray = byteArray.slice(dataLength);
      instructions.push({
        programIdIndex,
        accounts,
        data
      });
    }

    const messageArgs = {
      header: {
        numRequiredSignatures,
        numReadonlySignedAccounts,
        numReadonlyUnsignedAccounts
      },
      recentBlockhash: bs58$1.encode(Buffer.from(recentBlockhash)),
      accountKeys,
      instructions
    };
    return new Message(messageArgs);
  }

}

function assert (condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

let TransactionStatus;
/**
 * Default (empty) signature
 */

(function (TransactionStatus) {
  TransactionStatus[TransactionStatus["BLOCKHEIGHT_EXCEEDED"] = 0] = "BLOCKHEIGHT_EXCEEDED";
  TransactionStatus[TransactionStatus["PROCESSED"] = 1] = "PROCESSED";
  TransactionStatus[TransactionStatus["TIMED_OUT"] = 2] = "TIMED_OUT";
})(TransactionStatus || (TransactionStatus = {}));

const DEFAULT_SIGNATURE = Buffer.alloc(SIGNATURE_LENGTH_IN_BYTES).fill(0);
/**
 * Account metadata used to define instructions
 */

/**
 * Transaction Instruction class
 */
class TransactionInstruction {
  /**
   * Public keys to include in this transaction
   * Boolean represents whether this pubkey needs to sign the transaction
   */

  /**
   * Program Id to execute
   */

  /**
   * Program input
   */
  constructor(opts) {
    this.keys = void 0;
    this.programId = void 0;
    this.data = Buffer.alloc(0);
    this.programId = opts.programId;
    this.keys = opts.keys;

    if (opts.data) {
      this.data = opts.data;
    }
  }
  /**
   * @internal
   */


  toJSON() {
    return {
      keys: this.keys.map(({
        pubkey,
        isSigner,
        isWritable
      }) => ({
        pubkey: pubkey.toJSON(),
        isSigner,
        isWritable
      })),
      programId: this.programId.toJSON(),
      data: [...this.data]
    };
  }

}
/**
 * Pair of signature and corresponding public key
 */

/**
 * Transaction class
 */
class Transaction {
  /**
   * Signatures for the transaction.  Typically created by invoking the
   * `sign()` method
   */

  /**
   * The first (payer) Transaction signature
   */
  get signature() {
    if (this.signatures.length > 0) {
      return this.signatures[0].signature;
    }

    return null;
  }
  /**
   * The transaction fee payer
   */


  /**
   * Construct an empty Transaction
   */
  constructor(opts) {
    this.signatures = [];
    this.feePayer = void 0;
    this.instructions = [];
    this.recentBlockhash = void 0;
    this.lastValidBlockHeight = void 0;
    this.nonceInfo = void 0;
    this._message = void 0;
    this._json = void 0;

    if (!opts) {
      return;
    }

    if (opts.feePayer) {
      this.feePayer = opts.feePayer;
    }

    if (opts.signatures) {
      this.signatures = opts.signatures;
    }

    if (Object.prototype.hasOwnProperty.call(opts, 'lastValidBlockHeight')) {
      const {
        blockhash,
        lastValidBlockHeight
      } = opts;
      this.recentBlockhash = blockhash;
      this.lastValidBlockHeight = lastValidBlockHeight;
    } else {
      const {
        recentBlockhash,
        nonceInfo
      } = opts;

      if (nonceInfo) {
        this.nonceInfo = nonceInfo;
      }

      this.recentBlockhash = recentBlockhash;
    }
  }
  /**
   * @internal
   */


  toJSON() {
    return {
      recentBlockhash: this.recentBlockhash || null,
      feePayer: this.feePayer ? this.feePayer.toJSON() : null,
      nonceInfo: this.nonceInfo ? {
        nonce: this.nonceInfo.nonce,
        nonceInstruction: this.nonceInfo.nonceInstruction.toJSON()
      } : null,
      instructions: this.instructions.map(instruction => instruction.toJSON()),
      signers: this.signatures.map(({
        publicKey
      }) => {
        return publicKey.toJSON();
      })
    };
  }
  /**
   * Add one or more instructions to this Transaction
   */


  add(...items) {
    if (items.length === 0) {
      throw new Error('No instructions');
    }

    items.forEach(item => {
      if ('instructions' in item) {
        this.instructions = this.instructions.concat(item.instructions);
      } else if ('data' in item && 'programId' in item && 'keys' in item) {
        this.instructions.push(item);
      } else {
        this.instructions.push(new TransactionInstruction(item));
      }
    });
    return this;
  }
  /**
   * Compile transaction data
   */


  compileMessage() {
    if (this._message && JSON.stringify(this.toJSON()) === JSON.stringify(this._json)) {
      return this._message;
    }

    let recentBlockhash;
    let instructions;

    if (this.nonceInfo) {
      recentBlockhash = this.nonceInfo.nonce;

      if (this.instructions[0] != this.nonceInfo.nonceInstruction) {
        instructions = [this.nonceInfo.nonceInstruction, ...this.instructions];
      } else {
        instructions = this.instructions;
      }
    } else {
      recentBlockhash = this.recentBlockhash;
      instructions = this.instructions;
    }

    if (!recentBlockhash) {
      throw new Error('Transaction recentBlockhash required');
    }

    if (instructions.length < 1) {
      console.warn('No instructions provided');
    }

    let feePayer;

    if (this.feePayer) {
      feePayer = this.feePayer;
    } else if (this.signatures.length > 0 && this.signatures[0].publicKey) {
      // Use implicit fee payer
      feePayer = this.signatures[0].publicKey;
    } else {
      throw new Error('Transaction fee payer required');
    }

    for (let i = 0; i < instructions.length; i++) {
      if (instructions[i].programId === undefined) {
        throw new Error(`Transaction instruction index ${i} has undefined program id`);
      }
    }

    const programIds = [];
    const accountMetas = [];
    instructions.forEach(instruction => {
      instruction.keys.forEach(accountMeta => {
        accountMetas.push({ ...accountMeta
        });
      });
      const programId = instruction.programId.toString();

      if (!programIds.includes(programId)) {
        programIds.push(programId);
      }
    }); // Append programID account metas

    programIds.forEach(programId => {
      accountMetas.push({
        pubkey: new PublicKey(programId),
        isSigner: false,
        isWritable: false
      });
    }); // Cull duplicate account metas

    const uniqueMetas = [];
    accountMetas.forEach(accountMeta => {
      const pubkeyString = accountMeta.pubkey.toString();
      const uniqueIndex = uniqueMetas.findIndex(x => {
        return x.pubkey.toString() === pubkeyString;
      });

      if (uniqueIndex > -1) {
        uniqueMetas[uniqueIndex].isWritable = uniqueMetas[uniqueIndex].isWritable || accountMeta.isWritable;
        uniqueMetas[uniqueIndex].isSigner = uniqueMetas[uniqueIndex].isSigner || accountMeta.isSigner;
      } else {
        uniqueMetas.push(accountMeta);
      }
    }); // Sort. Prioritizing first by signer, then by writable

    uniqueMetas.sort(function (x, y) {
      if (x.isSigner !== y.isSigner) {
        // Signers always come before non-signers
        return x.isSigner ? -1 : 1;
      }

      if (x.isWritable !== y.isWritable) {
        // Writable accounts always come before read-only accounts
        return x.isWritable ? -1 : 1;
      } // Otherwise, sort by pubkey, stringwise.


      return x.pubkey.toBase58().localeCompare(y.pubkey.toBase58());
    }); // Move fee payer to the front

    const feePayerIndex = uniqueMetas.findIndex(x => {
      return x.pubkey.equals(feePayer);
    });

    if (feePayerIndex > -1) {
      const [payerMeta] = uniqueMetas.splice(feePayerIndex, 1);
      payerMeta.isSigner = true;
      payerMeta.isWritable = true;
      uniqueMetas.unshift(payerMeta);
    } else {
      uniqueMetas.unshift({
        pubkey: feePayer,
        isSigner: true,
        isWritable: true
      });
    } // Disallow unknown signers


    for (const signature of this.signatures) {
      const uniqueIndex = uniqueMetas.findIndex(x => {
        return x.pubkey.equals(signature.publicKey);
      });

      if (uniqueIndex > -1) {
        if (!uniqueMetas[uniqueIndex].isSigner) {
          uniqueMetas[uniqueIndex].isSigner = true;
          console.warn('Transaction references a signature that is unnecessary, ' + 'only the fee payer and instruction signer accounts should sign a transaction. ' + 'This behavior is deprecated and will throw an error in the next major version release.');
        }
      } else {
        throw new Error(`unknown signer: ${signature.publicKey.toString()}`);
      }
    }

    let numRequiredSignatures = 0;
    let numReadonlySignedAccounts = 0;
    let numReadonlyUnsignedAccounts = 0; // Split out signing from non-signing keys and count header values

    const signedKeys = [];
    const unsignedKeys = [];
    uniqueMetas.forEach(({
      pubkey,
      isSigner,
      isWritable
    }) => {
      if (isSigner) {
        signedKeys.push(pubkey.toString());
        numRequiredSignatures += 1;

        if (!isWritable) {
          numReadonlySignedAccounts += 1;
        }
      } else {
        unsignedKeys.push(pubkey.toString());

        if (!isWritable) {
          numReadonlyUnsignedAccounts += 1;
        }
      }
    });
    const accountKeys = signedKeys.concat(unsignedKeys);
    const compiledInstructions = instructions.map(instruction => {
      const {
        data,
        programId
      } = instruction;
      return {
        programIdIndex: accountKeys.indexOf(programId.toString()),
        accounts: instruction.keys.map(meta => accountKeys.indexOf(meta.pubkey.toString())),
        data: bs58$1.encode(data)
      };
    });
    compiledInstructions.forEach(instruction => {
      assert(instruction.programIdIndex >= 0);
      instruction.accounts.forEach(keyIndex => assert(keyIndex >= 0));
    });
    return new Message({
      header: {
        numRequiredSignatures,
        numReadonlySignedAccounts,
        numReadonlyUnsignedAccounts
      },
      accountKeys,
      recentBlockhash,
      instructions: compiledInstructions
    });
  }
  /**
   * @internal
   */


  _compile() {
    const message = this.compileMessage();
    const signedKeys = message.accountKeys.slice(0, message.header.numRequiredSignatures);

    if (this.signatures.length === signedKeys.length) {
      const valid = this.signatures.every((pair, index) => {
        return signedKeys[index].equals(pair.publicKey);
      });
      if (valid) return message;
    }

    this.signatures = signedKeys.map(publicKey => ({
      signature: null,
      publicKey
    }));
    return message;
  }
  /**
   * Get a buffer of the Transaction data that need to be covered by signatures
   */


  serializeMessage() {
    return this._compile().serialize();
  }
  /**
   * Get the estimated fee associated with a transaction
   */


  async getEstimatedFee(connection) {
    return (await connection.getFeeForMessage(this.compileMessage())).value;
  }
  /**
   * Specify the public keys which will be used to sign the Transaction.
   * The first signer will be used as the transaction fee payer account.
   *
   * Signatures can be added with either `partialSign` or `addSignature`
   *
   * @deprecated Deprecated since v0.84.0. Only the fee payer needs to be
   * specified and it can be set in the Transaction constructor or with the
   * `feePayer` property.
   */


  setSigners(...signers) {
    if (signers.length === 0) {
      throw new Error('No signers');
    }

    const seen = new Set();
    this.signatures = signers.filter(publicKey => {
      const key = publicKey.toString();

      if (seen.has(key)) {
        return false;
      } else {
        seen.add(key);
        return true;
      }
    }).map(publicKey => ({
      signature: null,
      publicKey
    }));
  }
  /**
   * Sign the Transaction with the specified signers. Multiple signatures may
   * be applied to a Transaction. The first signature is considered "primary"
   * and is used identify and confirm transactions.
   *
   * If the Transaction `feePayer` is not set, the first signer will be used
   * as the transaction fee payer account.
   *
   * Transaction fields should not be modified after the first call to `sign`,
   * as doing so may invalidate the signature and cause the Transaction to be
   * rejected.
   *
   * The Transaction must be assigned a valid `recentBlockhash` before invoking this method
   */


  sign(...signers) {
    if (signers.length === 0) {
      throw new Error('No signers');
    } // Dedupe signers


    const seen = new Set();
    const uniqueSigners = [];

    for (const signer of signers) {
      const key = signer.publicKey.toString();

      if (seen.has(key)) {
        continue;
      } else {
        seen.add(key);
        uniqueSigners.push(signer);
      }
    }

    this.signatures = uniqueSigners.map(signer => ({
      signature: null,
      publicKey: signer.publicKey
    }));

    const message = this._compile();

    this._partialSign(message, ...uniqueSigners);
  }
  /**
   * Partially sign a transaction with the specified accounts. All accounts must
   * correspond to either the fee payer or a signer account in the transaction
   * instructions.
   *
   * All the caveats from the `sign` method apply to `partialSign`
   */


  partialSign(...signers) {
    if (signers.length === 0) {
      throw new Error('No signers');
    } // Dedupe signers


    const seen = new Set();
    const uniqueSigners = [];

    for (const signer of signers) {
      const key = signer.publicKey.toString();

      if (seen.has(key)) {
        continue;
      } else {
        seen.add(key);
        uniqueSigners.push(signer);
      }
    }

    const message = this._compile();

    this._partialSign(message, ...uniqueSigners);
  }
  /**
   * @internal
   */


  _partialSign(message, ...signers) {
    const signData = message.serialize();
    signers.forEach(signer => {
      const signature = nacl.sign.detached(signData, signer.secretKey);

      this._addSignature(signer.publicKey, toBuffer(signature));
    });
  }
  /**
   * Add an externally created signature to a transaction. The public key
   * must correspond to either the fee payer or a signer account in the transaction
   * instructions.
   */


  addSignature(pubkey, signature) {
    this._compile(); // Ensure signatures array is populated


    this._addSignature(pubkey, signature);
  }
  /**
   * @internal
   */


  _addSignature(pubkey, signature) {
    assert(signature.length === 64);
    const index = this.signatures.findIndex(sigpair => pubkey.equals(sigpair.publicKey));

    if (index < 0) {
      throw new Error(`unknown signer: ${pubkey.toString()}`);
    }

    this.signatures[index].signature = Buffer.from(signature);
  }
  /**
   * Verify signatures of a complete, signed Transaction
   */


  verifySignatures() {
    return this._verifySignatures(this.serializeMessage(), true);
  }
  /**
   * @internal
   */


  _verifySignatures(signData, requireAllSignatures) {
    for (const {
      signature,
      publicKey
    } of this.signatures) {
      if (signature === null) {
        if (requireAllSignatures) {
          return false;
        }
      } else {
        if (!nacl.sign.detached.verify(signData, signature, publicKey.toBuffer())) {
          return false;
        }
      }
    }

    return true;
  }
  /**
   * Serialize the Transaction in the wire format.
   */


  serialize(config) {
    const {
      requireAllSignatures,
      verifySignatures
    } = Object.assign({
      requireAllSignatures: true,
      verifySignatures: true
    }, config);
    const signData = this.serializeMessage();

    if (verifySignatures && !this._verifySignatures(signData, requireAllSignatures)) {
      throw new Error('Signature verification failed');
    }

    return this._serialize(signData);
  }
  /**
   * @internal
   */


  _serialize(signData) {
    const {
      signatures
    } = this;
    const signatureCount = [];
    encodeLength(signatureCount, signatures.length);
    const transactionLength = signatureCount.length + signatures.length * 64 + signData.length;
    const wireTransaction = Buffer.alloc(transactionLength);
    assert(signatures.length < 256);
    Buffer.from(signatureCount).copy(wireTransaction, 0);
    signatures.forEach(({
      signature
    }, index) => {
      if (signature !== null) {
        assert(signature.length === 64, `signature has invalid length`);
        Buffer.from(signature).copy(wireTransaction, signatureCount.length + index * 64);
      }
    });
    signData.copy(wireTransaction, signatureCount.length + signatures.length * 64);
    assert(wireTransaction.length <= PACKET_DATA_SIZE, `Transaction too large: ${wireTransaction.length} > ${PACKET_DATA_SIZE}`);
    return wireTransaction;
  }
  /**
   * Deprecated method
   * @internal
   */


  get keys() {
    assert(this.instructions.length === 1);
    return this.instructions[0].keys.map(keyObj => keyObj.pubkey);
  }
  /**
   * Deprecated method
   * @internal
   */


  get programId() {
    assert(this.instructions.length === 1);
    return this.instructions[0].programId;
  }
  /**
   * Deprecated method
   * @internal
   */


  get data() {
    assert(this.instructions.length === 1);
    return this.instructions[0].data;
  }
  /**
   * Parse a wire transaction into a Transaction object.
   */


  static from(buffer) {
    // Slice up wire data
    let byteArray = [...buffer];
    const signatureCount = decodeLength(byteArray);
    let signatures = [];

    for (let i = 0; i < signatureCount; i++) {
      const signature = byteArray.slice(0, SIGNATURE_LENGTH_IN_BYTES);
      byteArray = byteArray.slice(SIGNATURE_LENGTH_IN_BYTES);
      signatures.push(bs58$1.encode(Buffer.from(signature)));
    }

    return Transaction.populate(Message.from(byteArray), signatures);
  }
  /**
   * Populate Transaction object from message and signatures
   */


  static populate(message, signatures = []) {
    const transaction = new Transaction();
    transaction.recentBlockhash = message.recentBlockhash;

    if (message.header.numRequiredSignatures > 0) {
      transaction.feePayer = message.accountKeys[0];
    }

    signatures.forEach((signature, index) => {
      const sigPubkeyPair = {
        signature: signature == bs58$1.encode(DEFAULT_SIGNATURE) ? null : bs58$1.decode(signature),
        publicKey: message.accountKeys[index]
      };
      transaction.signatures.push(sigPubkeyPair);
    });
    message.instructions.forEach(instruction => {
      const keys = instruction.accounts.map(account => {
        const pubkey = message.accountKeys[account];
        return {
          pubkey,
          isSigner: transaction.signatures.some(keyObj => keyObj.publicKey.toString() === pubkey.toString()) || message.isAccountSigner(account),
          isWritable: message.isAccountWritable(account)
        };
      });
      transaction.instructions.push(new TransactionInstruction({
        keys,
        programId: message.accountKeys[instruction.programIdIndex],
        data: bs58$1.decode(instruction.data)
      }));
    });
    transaction._message = message;
    transaction._json = transaction.toJSON();
    return transaction;
  }

}

new PublicKey('SysvarC1ock11111111111111111111111111111111');
new PublicKey('SysvarEpochSchedu1e111111111111111111111111');
new PublicKey('Sysvar1nstructions1111111111111111111111111');
new PublicKey('SysvarRecentB1ockHashes11111111111111111111');
new PublicKey('SysvarRent111111111111111111111111111111111');
new PublicKey('SysvarRewards111111111111111111111111111111');
new PublicKey('SysvarS1otHashes111111111111111111111111111');
new PublicKey('SysvarS1otHistory11111111111111111111111111');
new PublicKey('SysvarStakeHistory1111111111111111111111111');

// zzz
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * https://github.com/solana-labs/solana/blob/90bedd7e067b5b8f3ddbb45da00a4e9cabb22c62/sdk/src/fee_calculator.rs#L7-L11
 *
 * @internal
 */

const FeeCalculatorLayout = nu64('lamportsPerSignature');
/**
 * Calculator for transaction fees.
 */

/**
 * See https://github.com/solana-labs/solana/blob/0ea2843ec9cdc517572b8e62c959f41b55cf4453/sdk/src/nonce_state.rs#L29-L32
 *
 * @internal
 */

const NonceAccountLayout = struct([u32('version'), u32('state'), publicKey('authorizedPubkey'), publicKey('nonce'), struct([FeeCalculatorLayout], 'feeCalculator')]);
NonceAccountLayout.span;

/**
 * NonceAccount class
 */
class NonceAccount {
  /**
   * @internal
   */
  constructor(args) {
    this.authorizedPubkey = void 0;
    this.nonce = void 0;
    this.feeCalculator = void 0;
    this.authorizedPubkey = args.authorizedPubkey;
    this.nonce = args.nonce;
    this.feeCalculator = args.feeCalculator;
  }
  /**
   * Deserialize NonceAccount from the account data.
   *
   * @param buffer account data
   * @return NonceAccount
   */


  static fromAccountData(buffer) {
    const nonceAccount = NonceAccountLayout.decode(toBuffer(buffer), 0);
    return new NonceAccount({
      authorizedPubkey: new PublicKey(nonceAccount.authorizedPubkey),
      nonce: new PublicKey(nonceAccount.nonce).toString(),
      feeCalculator: nonceAccount.feeCalculator
    });
  }

}

const encodeDecode = layout => {
  const decode = layout.decode.bind(layout);
  const encode = layout.encode.bind(layout);
  return {
    decode,
    encode
  };
};

const bigInt = length => property => {
  const layout = blob(length, property);
  const {
    encode,
    decode
  } = encodeDecode(layout);
  const bigIntLayout = layout;

  bigIntLayout.decode = (buffer, offset) => {
    const src = decode(buffer, offset);
    return toBigIntLE(Buffer.from(src));
  };

  bigIntLayout.encode = (bigInt, buffer, offset) => {
    const src = toBufferLE(bigInt, length);
    return encode(src, buffer, offset);
  };

  return bigIntLayout;
};

const u64 = bigInt(8);
/**
 * An enumeration of valid SystemInstructionType's
 */

/**
 * An enumeration of valid system InstructionType's
 * @internal
 */
Object.freeze({
  Create: {
    index: 0,
    layout: struct([u32('instruction'), ns64('lamports'), ns64('space'), publicKey('programId')])
  },
  Assign: {
    index: 1,
    layout: struct([u32('instruction'), publicKey('programId')])
  },
  Transfer: {
    index: 2,
    layout: struct([u32('instruction'), u64('lamports')])
  },
  CreateWithSeed: {
    index: 3,
    layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), ns64('lamports'), ns64('space'), publicKey('programId')])
  },
  AdvanceNonceAccount: {
    index: 4,
    layout: struct([u32('instruction')])
  },
  WithdrawNonceAccount: {
    index: 5,
    layout: struct([u32('instruction'), ns64('lamports')])
  },
  InitializeNonceAccount: {
    index: 6,
    layout: struct([u32('instruction'), publicKey('authorized')])
  },
  AuthorizeNonceAccount: {
    index: 7,
    layout: struct([u32('instruction'), publicKey('authorized')])
  },
  Allocate: {
    index: 8,
    layout: struct([u32('instruction'), ns64('space')])
  },
  AllocateWithSeed: {
    index: 9,
    layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), ns64('space'), publicKey('programId')])
  },
  AssignWithSeed: {
    index: 10,
    layout: struct([u32('instruction'), publicKey('base'), rustString('seed'), publicKey('programId')])
  },
  TransferWithSeed: {
    index: 11,
    layout: struct([u32('instruction'), u64('lamports'), rustString('seed'), publicKey('programId')])
  },
  UpgradeNonceAccount: {
    index: 12,
    layout: struct([u32('instruction')])
  }
});
new PublicKey('11111111111111111111111111111111');

new PublicKey('BPFLoader2111111111111111111111111111111111');
/**
 * An enumeration of valid ComputeBudgetInstructionType's
 */

/**
 * An enumeration of valid ComputeBudget InstructionType's
 * @internal
 */
Object.freeze({
  RequestUnits: {
    index: 0,
    layout: struct([u8('instruction'), u32('units'), u32('additionalFee')])
  },
  RequestHeapFrame: {
    index: 1,
    layout: struct([u8('instruction'), u32('bytes')])
  },
  SetComputeUnitLimit: {
    index: 2,
    layout: struct([u8('instruction'), u32('units')])
  },
  SetComputeUnitPrice: {
    index: 3,
    layout: struct([u8('instruction'), u64('microLamports')])
  }
});
new PublicKey('ComputeBudget111111111111111111111111111111');

var objToString = Object.prototype.toString;
var objKeys = Object.keys || function(obj) {
		var keys = [];
		for (var name in obj) {
			keys.push(name);
		}
		return keys;
	};

function stringify(val, isArrayProp) {
	var i, max, str, keys, key, propVal, toStr;
	if (val === true) {
		return "true";
	}
	if (val === false) {
		return "false";
	}
	switch (typeof val) {
		case "object":
			if (val === null) {
				return null;
			} else if (val.toJSON && typeof val.toJSON === "function") {
				return stringify(val.toJSON(), isArrayProp);
			} else {
				toStr = objToString.call(val);
				if (toStr === "[object Array]") {
					str = '[';
					max = val.length - 1;
					for(i = 0; i < max; i++) {
						str += stringify(val[i], true) + ',';
					}
					if (max > -1) {
						str += stringify(val[i], true);
					}
					return str + ']';
				} else if (toStr === "[object Object]") {
					// only object is left
					keys = objKeys(val).sort();
					max = keys.length;
					str = "";
					i = 0;
					while (i < max) {
						key = keys[i];
						propVal = stringify(val[key], false);
						if (propVal !== undefined) {
							if (str) {
								str += ',';
							}
							str += JSON.stringify(key) + ':' + propVal;
						}
						i++;
					}
					return '{' + str + '}';
				} else {
					return JSON.stringify(val);
				}
			}
		case "function":
		case "undefined":
			return isArrayProp ? null : undefined;
		case "string":
			return JSON.stringify(val);
		default:
			return isFinite(val) ? val : null;
	}
}

var fastStableStringify = function(val) {
	var returnVal = stringify(val, false);
	if (returnVal !== undefined) {
		return ''+ returnVal;
	}
};

var fastStableStringify$1 = fastStableStringify;

const MINIMUM_SLOT_PER_EPOCH = 32; // Returns the number of trailing zeros in the binary representation of self.

function trailingZeros(n) {
  let trailingZeros = 0;

  while (n > 1) {
    n /= 2;
    trailingZeros++;
  }

  return trailingZeros;
} // Returns the smallest power of two greater than or equal to n


function nextPowerOfTwo(n) {
  if (n === 0) return 1;
  n--;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  n |= n >> 32;
  return n + 1;
}
/**
 * Epoch schedule
 * (see https://docs.solana.com/terminology#epoch)
 * Can be retrieved with the {@link connection.getEpochSchedule} method
 */


class EpochSchedule {
  /** The maximum number of slots in each epoch */

  /** The number of slots before beginning of an epoch to calculate a leader schedule for that epoch */

  /** Indicates whether epochs start short and grow */

  /** The first epoch with `slotsPerEpoch` slots */

  /** The first slot of `firstNormalEpoch` */
  constructor(slotsPerEpoch, leaderScheduleSlotOffset, warmup, firstNormalEpoch, firstNormalSlot) {
    this.slotsPerEpoch = void 0;
    this.leaderScheduleSlotOffset = void 0;
    this.warmup = void 0;
    this.firstNormalEpoch = void 0;
    this.firstNormalSlot = void 0;
    this.slotsPerEpoch = slotsPerEpoch;
    this.leaderScheduleSlotOffset = leaderScheduleSlotOffset;
    this.warmup = warmup;
    this.firstNormalEpoch = firstNormalEpoch;
    this.firstNormalSlot = firstNormalSlot;
  }

  getEpoch(slot) {
    return this.getEpochAndSlotIndex(slot)[0];
  }

  getEpochAndSlotIndex(slot) {
    if (slot < this.firstNormalSlot) {
      const epoch = trailingZeros(nextPowerOfTwo(slot + MINIMUM_SLOT_PER_EPOCH + 1)) - trailingZeros(MINIMUM_SLOT_PER_EPOCH) - 1;
      const epochLen = this.getSlotsInEpoch(epoch);
      const slotIndex = slot - (epochLen - MINIMUM_SLOT_PER_EPOCH);
      return [epoch, slotIndex];
    } else {
      const normalSlotIndex = slot - this.firstNormalSlot;
      const normalEpochIndex = Math.floor(normalSlotIndex / this.slotsPerEpoch);
      const epoch = this.firstNormalEpoch + normalEpochIndex;
      const slotIndex = normalSlotIndex % this.slotsPerEpoch;
      return [epoch, slotIndex];
    }
  }

  getFirstSlotInEpoch(epoch) {
    if (epoch <= this.firstNormalEpoch) {
      return (Math.pow(2, epoch) - 1) * MINIMUM_SLOT_PER_EPOCH;
    } else {
      return (epoch - this.firstNormalEpoch) * this.slotsPerEpoch + this.firstNormalSlot;
    }
  }

  getLastSlotInEpoch(epoch) {
    return this.getFirstSlotInEpoch(epoch) + this.getSlotsInEpoch(epoch) - 1;
  }

  getSlotsInEpoch(epoch) {
    if (epoch < this.firstNormalEpoch) {
      return Math.pow(2, epoch + trailingZeros(MINIMUM_SLOT_PER_EPOCH));
    } else {
      return this.slotsPerEpoch;
    }
  }

}

class SendTransactionError extends Error {
  constructor(message, logs) {
    super(message);
    this.logs = void 0;
    this.logs = logs;
  }

} // Keep in sync with client/src/rpc_custom_errors.rs
class SolanaJSONRPCError extends Error {
  constructor({
    code,
    message,
    data
  }, customMessage) {
    super(customMessage != null ? `${customMessage}: ${message}` : message);
    this.code = void 0;
    this.data = void 0;
    this.code = code;
    this.data = data;
    this.name = 'SolanaJSONRPCError';
  }

}

var fetchImpl = globalThis.fetch;

// TODO: These constants should be removed in favor of reading them out of a
// Syscall account

/**
 * @internal
 */
const NUM_TICKS_PER_SECOND = 160;
/**
 * @internal
 */

const DEFAULT_TICKS_PER_SLOT = 64;
/**
 * @internal
 */

const NUM_SLOTS_PER_SECOND = NUM_TICKS_PER_SECOND / DEFAULT_TICKS_PER_SLOT;
/**
 * @internal
 */

const MS_PER_SLOT = 1000 / NUM_SLOTS_PER_SECOND;

class TransactionExpiredBlockheightExceededError extends Error {
  constructor(signature) {
    super(`Signature ${signature} has expired: block height exceeded.`);
    this.signature = void 0;
    this.signature = signature;
  }

}
Object.defineProperty(TransactionExpiredBlockheightExceededError.prototype, 'name', {
  value: 'TransactionExpiredBlockheightExceededError'
});
class TransactionExpiredTimeoutError extends Error {
  constructor(signature, timeoutSeconds) {
    super(`Transaction was not confirmed in ${timeoutSeconds.toFixed(2)} seconds. It is ` + 'unknown if it succeeded or failed. Check signature ' + `${signature} using the Solana Explorer or CLI tools.`);
    this.signature = void 0;
    this.signature = signature;
  }

}
Object.defineProperty(TransactionExpiredTimeoutError.prototype, 'name', {
  value: 'TransactionExpiredTimeoutError'
});

function makeWebsocketUrl(endpoint) {
  let url = new URL(endpoint);
  const useHttps = url.protocol === 'https:';
  url.protocol = useHttps ? 'wss:' : 'ws:';
  url.host = ''; // Only shift the port by +1 as a convention for ws(s) only if given endpoint
  // is explictly specifying the endpoint port (HTTP-based RPC), assuming
  // we're directly trying to connect to solana-validator's ws listening port.
  // When the endpoint omits the port, we're connecting to the protocol
  // default ports: http(80) or https(443) and it's assumed we're behind a reverse
  // proxy which manages WebSocket upgrade and backend port redirection.

  if (url.port !== '') {
    url.port = String(Number(url.port) + 1);
  }

  return url.toString();
}

var _process$env$npm_pack;
const PublicKeyFromString = coerce(instance(PublicKey), string(), value => new PublicKey(value));
const RawAccountDataResult = tuple([string(), literal('base64')]);
const BufferFromRawAccountData = coerce(instance(Buffer), RawAccountDataResult, value => Buffer.from(value[0], 'base64'));
/**
 * Attempt to use a recent blockhash for up to 30 seconds
 * @internal
 */

const BLOCKHASH_CACHE_TIMEOUT_MS = 30 * 1000;
/**
 * HACK.
 * Copied from rpc-websockets/dist/lib/client.
 * Otherwise, `yarn build` fails with:
 * https://gist.github.com/steveluscher/c057eca81d479ef705cdb53162f9971d
 */

/** @internal */
function extractCommitmentFromConfig(commitmentOrConfig) {
  let commitment;
  let config;

  if (typeof commitmentOrConfig === 'string') {
    commitment = commitmentOrConfig;
  } else if (commitmentOrConfig) {
    const {
      commitment: specifiedCommitment,
      ...specifiedConfig
    } = commitmentOrConfig;
    commitment = specifiedCommitment;
    config = specifiedConfig;
  }

  return {
    commitment,
    config
  };
}
/**
 * @internal
 */


function createRpcResult(result) {
  return union([type({
    jsonrpc: literal('2.0'),
    id: string(),
    result
  }), type({
    jsonrpc: literal('2.0'),
    id: string(),
    error: type({
      code: unknown(),
      message: string(),
      data: optional(any())
    })
  })]);
}

const UnknownRpcResult = createRpcResult(unknown());
/**
 * @internal
 */

function jsonRpcResult(schema) {
  return coerce(createRpcResult(schema), UnknownRpcResult, value => {
    if ('error' in value) {
      return value;
    } else {
      return { ...value,
        result: create(value.result, schema)
      };
    }
  });
}
/**
 * @internal
 */


function jsonRpcResultAndContext(value) {
  return jsonRpcResult(type({
    context: type({
      slot: number()
    }),
    value
  }));
}
/**
 * @internal
 */


function notificationResultAndContext(value) {
  return type({
    context: type({
      slot: number()
    }),
    value
  });
}
/**
 * The level of commitment desired when querying state
 * <pre>
 *   'processed': Query the most recent block which has reached 1 confirmation by the connected node
 *   'confirmed': Query the most recent block which has reached 1 confirmation by the cluster
 *   'finalized': Query the most recent block which has been finalized by the cluster
 * </pre>
 */


const GetInflationGovernorResult = type({
  foundation: number(),
  foundationTerm: number(),
  initial: number(),
  taper: number(),
  terminal: number()
});
/**
 * The inflation reward for an epoch
 */

/**
 * Expected JSON RPC response for the "getInflationReward" message
 */
const GetInflationRewardResult = jsonRpcResult(array(nullable(type({
  epoch: number(),
  effectiveSlot: number(),
  amount: number(),
  postBalance: number()
}))));
/**
 * Information about the current epoch
 */

const GetEpochInfoResult = type({
  epoch: number(),
  slotIndex: number(),
  slotsInEpoch: number(),
  absoluteSlot: number(),
  blockHeight: optional(number()),
  transactionCount: optional(number())
});
const GetEpochScheduleResult = type({
  slotsPerEpoch: number(),
  leaderScheduleSlotOffset: number(),
  warmup: boolean(),
  firstNormalEpoch: number(),
  firstNormalSlot: number()
});
/**
 * Leader schedule
 * (see https://docs.solana.com/terminology#leader-schedule)
 */

const GetLeaderScheduleResult = record(string(), array(number()));
/**
 * Transaction error or null
 */

const TransactionErrorResult = nullable(union([type({}), string()]));
/**
 * Signature status for a transaction
 */

const SignatureStatusResult = type({
  err: TransactionErrorResult
});
/**
 * Transaction signature received notification
 */

const SignatureReceivedResult = literal('receivedSignature');
/**
 * Version info for a node
 */

const VersionResult = type({
  'solana-core': string(),
  'feature-set': optional(number())
});
const SimulatedTransactionResponseStruct = jsonRpcResultAndContext(type({
  err: nullable(union([type({}), string()])),
  logs: nullable(array(string())),
  accounts: optional(nullable(array(nullable(type({
    executable: boolean(),
    owner: string(),
    lamports: number(),
    data: array(string()),
    rentEpoch: optional(number())
  }))))),
  unitsConsumed: optional(number())
}));

/**
 * Expected JSON RPC response for the "getBlockProduction" message
 */
const BlockProductionResponseStruct = jsonRpcResultAndContext(type({
  byIdentity: record(string(), array(number())),
  range: type({
    firstSlot: number(),
    lastSlot: number()
  })
}));
/**
 * A performance sample
 */

function createRpcClient(url, useHttps, httpHeaders, customFetch, fetchMiddleware, disableRetryOnRateLimit) {
  const fetch = customFetch ? customFetch : fetchImpl;

  let fetchWithMiddleware;

  if (fetchMiddleware) {
    fetchWithMiddleware = async (info, init) => {
      const modifiedFetchArgs = await new Promise((resolve, reject) => {
        try {
          fetchMiddleware(info, init, (modifiedInfo, modifiedInit) => resolve([modifiedInfo, modifiedInit]));
        } catch (error) {
          reject(error);
        }
      });
      return await fetch(...modifiedFetchArgs);
    };
  }

  const clientBrowser = new RpcClient(async (request, callback) => {
    const agent = undefined;
    const options = {
      method: 'POST',
      body: request,
      agent,
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, httpHeaders || {}, COMMON_HTTP_HEADERS)
    };

    try {
      let too_many_requests_retries = 5;
      let res;
      let waitTime = 500;

      for (;;) {
        if (fetchWithMiddleware) {
          res = await fetchWithMiddleware(url, options);
        } else {
          res = await fetch(url, options);
        }

        if (res.status !== 429
        /* Too many requests */
        ) {
          break;
        }

        if (disableRetryOnRateLimit === true) {
          break;
        }

        too_many_requests_retries -= 1;

        if (too_many_requests_retries === 0) {
          break;
        }

        console.log(`Server responded with ${res.status} ${res.statusText}.  Retrying after ${waitTime}ms delay...`);
        await sleep(waitTime);
        waitTime *= 2;
      }

      const text = await res.text();

      if (res.ok) {
        callback(null, text);
      } else {
        callback(new Error(`${res.status} ${res.statusText}: ${text}`));
      }
    } catch (err) {
      if (err instanceof Error) callback(err);
    } finally {
    }
  }, {});
  return clientBrowser;
}

function createRpcRequest(client) {
  return (method, args) => {
    return new Promise((resolve, reject) => {
      client.request(method, args, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  };
}

function createRpcBatchRequest(client) {
  return requests => {
    return new Promise((resolve, reject) => {
      // Do nothing if requests is empty
      if (requests.length === 0) resolve([]);
      const batch = requests.map(params => {
        return client.request(params.methodName, params.args);
      });
      client.request(batch, (err, response) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(response);
      });
    });
  };
}
/**
 * Expected JSON RPC response for the "getInflationGovernor" message
 */


const GetInflationGovernorRpcResult = jsonRpcResult(GetInflationGovernorResult);
/**
 * Expected JSON RPC response for the "getEpochInfo" message
 */

const GetEpochInfoRpcResult = jsonRpcResult(GetEpochInfoResult);
/**
 * Expected JSON RPC response for the "getEpochSchedule" message
 */

const GetEpochScheduleRpcResult = jsonRpcResult(GetEpochScheduleResult);
/**
 * Expected JSON RPC response for the "getLeaderSchedule" message
 */

const GetLeaderScheduleRpcResult = jsonRpcResult(GetLeaderScheduleResult);
/**
 * Expected JSON RPC response for the "minimumLedgerSlot" and "getFirstAvailableBlock" messages
 */

const SlotRpcResult = jsonRpcResult(number());
/**
 * Supply
 */

/**
 * Expected JSON RPC response for the "getSupply" message
 */
const GetSupplyRpcResult = jsonRpcResultAndContext(type({
  total: number(),
  circulating: number(),
  nonCirculating: number(),
  nonCirculatingAccounts: array(PublicKeyFromString)
}));
/**
 * Token amount object which returns a token amount in different formats
 * for various client use cases.
 */

/**
 * Expected JSON RPC structure for token amounts
 */
const TokenAmountResult = type({
  amount: string(),
  uiAmount: nullable(number()),
  decimals: number(),
  uiAmountString: optional(string())
});
/**
 * Token address and balance.
 */

/**
 * Expected JSON RPC response for the "getTokenLargestAccounts" message
 */
const GetTokenLargestAccountsResult = jsonRpcResultAndContext(array(type({
  address: PublicKeyFromString,
  amount: string(),
  uiAmount: nullable(number()),
  decimals: number(),
  uiAmountString: optional(string())
})));
/**
 * Expected JSON RPC response for the "getTokenAccountsByOwner" message
 */

const GetTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
  pubkey: PublicKeyFromString,
  account: type({
    executable: boolean(),
    owner: PublicKeyFromString,
    lamports: number(),
    data: BufferFromRawAccountData,
    rentEpoch: number()
  })
})));
const ParsedAccountDataResult = type({
  program: string(),
  parsed: unknown(),
  space: number()
});
/**
 * Expected JSON RPC response for the "getTokenAccountsByOwner" message with parsed data
 */

const GetParsedTokenAccountsByOwner = jsonRpcResultAndContext(array(type({
  pubkey: PublicKeyFromString,
  account: type({
    executable: boolean(),
    owner: PublicKeyFromString,
    lamports: number(),
    data: ParsedAccountDataResult,
    rentEpoch: number()
  })
})));
/**
 * Pair of an account address and its balance
 */

/**
 * Expected JSON RPC response for the "getLargestAccounts" message
 */
const GetLargestAccountsRpcResult = jsonRpcResultAndContext(array(type({
  lamports: number(),
  address: PublicKeyFromString
})));
/**
 * @internal
 */

const AccountInfoResult = type({
  executable: boolean(),
  owner: PublicKeyFromString,
  lamports: number(),
  data: BufferFromRawAccountData,
  rentEpoch: number()
});
/**
 * @internal
 */

const KeyedAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: AccountInfoResult
});
const ParsedOrRawAccountData = coerce(union([instance(Buffer), ParsedAccountDataResult]), union([RawAccountDataResult, ParsedAccountDataResult]), value => {
  if (Array.isArray(value)) {
    return create(value, BufferFromRawAccountData);
  } else {
    return value;
  }
});
/**
 * @internal
 */

const ParsedAccountInfoResult = type({
  executable: boolean(),
  owner: PublicKeyFromString,
  lamports: number(),
  data: ParsedOrRawAccountData,
  rentEpoch: number()
});
const KeyedParsedAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: ParsedAccountInfoResult
});
/**
 * @internal
 */

const StakeActivationResult = type({
  state: union([literal('active'), literal('inactive'), literal('activating'), literal('deactivating')]),
  active: number(),
  inactive: number()
});
/**
 * Expected JSON RPC response for the "getConfirmedSignaturesForAddress2" message
 */

const GetConfirmedSignaturesForAddress2RpcResult = jsonRpcResult(array(type({
  signature: string(),
  slot: number(),
  err: TransactionErrorResult,
  memo: nullable(string()),
  blockTime: optional(nullable(number()))
})));
/**
 * Expected JSON RPC response for the "getSignaturesForAddress" message
 */

const GetSignaturesForAddressRpcResult = jsonRpcResult(array(type({
  signature: string(),
  slot: number(),
  err: TransactionErrorResult,
  memo: nullable(string()),
  blockTime: optional(nullable(number()))
})));
/***
 * Expected JSON RPC response for the "accountNotification" message
 */

const AccountNotificationResult = type({
  subscription: number(),
  result: notificationResultAndContext(AccountInfoResult)
});
/**
 * @internal
 */

const ProgramAccountInfoResult = type({
  pubkey: PublicKeyFromString,
  account: AccountInfoResult
});
/***
 * Expected JSON RPC response for the "programNotification" message
 */

const ProgramAccountNotificationResult = type({
  subscription: number(),
  result: notificationResultAndContext(ProgramAccountInfoResult)
});
/**
 * @internal
 */

const SlotInfoResult = type({
  parent: number(),
  slot: number(),
  root: number()
});
/**
 * Expected JSON RPC response for the "slotNotification" message
 */

const SlotNotificationResult = type({
  subscription: number(),
  result: SlotInfoResult
});
/**
 * Slot updates which can be used for tracking the live progress of a cluster.
 * - `"firstShredReceived"`: connected node received the first shred of a block.
 * Indicates that a new block that is being produced.
 * - `"completed"`: connected node has received all shreds of a block. Indicates
 * a block was recently produced.
 * - `"optimisticConfirmation"`: block was optimistically confirmed by the
 * cluster. It is not guaranteed that an optimistic confirmation notification
 * will be sent for every finalized blocks.
 * - `"root"`: the connected node rooted this block.
 * - `"createdBank"`: the connected node has started validating this block.
 * - `"frozen"`: the connected node has validated this block.
 * - `"dead"`: the connected node failed to validate this block.
 */

/**
 * @internal
 */
const SlotUpdateResult = union([type({
  type: union([literal('firstShredReceived'), literal('completed'), literal('optimisticConfirmation'), literal('root')]),
  slot: number(),
  timestamp: number()
}), type({
  type: literal('createdBank'),
  parent: number(),
  slot: number(),
  timestamp: number()
}), type({
  type: literal('frozen'),
  slot: number(),
  timestamp: number(),
  stats: type({
    numTransactionEntries: number(),
    numSuccessfulTransactions: number(),
    numFailedTransactions: number(),
    maxTransactionsPerEntry: number()
  })
}), type({
  type: literal('dead'),
  slot: number(),
  timestamp: number(),
  err: string()
})]);
/**
 * Expected JSON RPC response for the "slotsUpdatesNotification" message
 */

const SlotUpdateNotificationResult = type({
  subscription: number(),
  result: SlotUpdateResult
});
/**
 * Expected JSON RPC response for the "signatureNotification" message
 */

const SignatureNotificationResult = type({
  subscription: number(),
  result: notificationResultAndContext(union([SignatureStatusResult, SignatureReceivedResult]))
});
/**
 * Expected JSON RPC response for the "rootNotification" message
 */

const RootNotificationResult = type({
  subscription: number(),
  result: number()
});
const ContactInfoResult = type({
  pubkey: string(),
  gossip: nullable(string()),
  tpu: nullable(string()),
  rpc: nullable(string()),
  version: nullable(string())
});
const VoteAccountInfoResult = type({
  votePubkey: string(),
  nodePubkey: string(),
  activatedStake: number(),
  epochVoteAccount: boolean(),
  epochCredits: array(tuple([number(), number(), number()])),
  commission: number(),
  lastVote: number(),
  rootSlot: nullable(number())
});
/**
 * Expected JSON RPC response for the "getVoteAccounts" message
 */

const GetVoteAccounts = jsonRpcResult(type({
  current: array(VoteAccountInfoResult),
  delinquent: array(VoteAccountInfoResult)
}));
const ConfirmationStatus = union([literal('processed'), literal('confirmed'), literal('finalized')]);
const SignatureStatusResponse = type({
  slot: number(),
  confirmations: nullable(number()),
  err: TransactionErrorResult,
  confirmationStatus: optional(ConfirmationStatus)
});
/**
 * Expected JSON RPC response for the "getSignatureStatuses" message
 */

const GetSignatureStatusesRpcResult = jsonRpcResultAndContext(array(nullable(SignatureStatusResponse)));
/**
 * Expected JSON RPC response for the "getMinimumBalanceForRentExemption" message
 */

const GetMinimumBalanceForRentExemptionRpcResult = jsonRpcResult(number());
const ConfirmedTransactionResult = type({
  signatures: array(string()),
  message: type({
    accountKeys: array(string()),
    header: type({
      numRequiredSignatures: number(),
      numReadonlySignedAccounts: number(),
      numReadonlyUnsignedAccounts: number()
    }),
    instructions: array(type({
      accounts: array(number()),
      data: string(),
      programIdIndex: number()
    })),
    recentBlockhash: string()
  })
});
const ParsedInstructionResult = type({
  parsed: unknown(),
  program: string(),
  programId: PublicKeyFromString
});
const RawInstructionResult = type({
  accounts: array(PublicKeyFromString),
  data: string(),
  programId: PublicKeyFromString
});
const InstructionResult = union([RawInstructionResult, ParsedInstructionResult]);
const UnknownInstructionResult = union([type({
  parsed: unknown(),
  program: string(),
  programId: string()
}), type({
  accounts: array(string()),
  data: string(),
  programId: string()
})]);
const ParsedOrRawInstruction = coerce(InstructionResult, UnknownInstructionResult, value => {
  if ('accounts' in value) {
    return create(value, RawInstructionResult);
  } else {
    return create(value, ParsedInstructionResult);
  }
});
/**
 * @internal
 */

const ParsedConfirmedTransactionResult = type({
  signatures: array(string()),
  message: type({
    accountKeys: array(type({
      pubkey: PublicKeyFromString,
      signer: boolean(),
      writable: boolean()
    })),
    instructions: array(ParsedOrRawInstruction),
    recentBlockhash: string()
  })
});
const TokenBalanceResult = type({
  accountIndex: number(),
  mint: string(),
  owner: optional(string()),
  uiTokenAmount: TokenAmountResult
});
/**
 * @internal
 */

const ConfirmedTransactionMetaResult = type({
  err: TransactionErrorResult,
  fee: number(),
  innerInstructions: optional(nullable(array(type({
    index: number(),
    instructions: array(type({
      accounts: array(number()),
      data: string(),
      programIdIndex: number()
    }))
  })))),
  preBalances: array(number()),
  postBalances: array(number()),
  logMessages: optional(nullable(array(string()))),
  preTokenBalances: optional(nullable(array(TokenBalanceResult))),
  postTokenBalances: optional(nullable(array(TokenBalanceResult)))
});
/**
 * @internal
 */

const ParsedConfirmedTransactionMetaResult = type({
  err: TransactionErrorResult,
  fee: number(),
  innerInstructions: optional(nullable(array(type({
    index: number(),
    instructions: array(ParsedOrRawInstruction)
  })))),
  preBalances: array(number()),
  postBalances: array(number()),
  logMessages: optional(nullable(array(string()))),
  preTokenBalances: optional(nullable(array(TokenBalanceResult))),
  postTokenBalances: optional(nullable(array(TokenBalanceResult)))
});
/**
 * Expected JSON RPC response for the "getBlock" message
 */

const GetBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number(),
  transactions: array(type({
    transaction: ConfirmedTransactionResult,
    meta: nullable(ConfirmedTransactionMetaResult)
  })),
  rewards: optional(array(type({
    pubkey: string(),
    lamports: number(),
    postBalance: nullable(number()),
    rewardType: nullable(string())
  }))),
  blockTime: nullable(number()),
  blockHeight: nullable(number())
})));
/**
 * Expected JSON RPC response for the "getConfirmedBlock" message
 *
 * @deprecated Deprecated since Solana v1.8.0. Please use {@link GetBlockRpcResult} instead.
 */

const GetConfirmedBlockRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number(),
  transactions: array(type({
    transaction: ConfirmedTransactionResult,
    meta: nullable(ConfirmedTransactionMetaResult)
  })),
  rewards: optional(array(type({
    pubkey: string(),
    lamports: number(),
    postBalance: nullable(number()),
    rewardType: nullable(string())
  }))),
  blockTime: nullable(number())
})));
/**
 * Expected JSON RPC response for the "getBlock" message
 */

const GetBlockSignaturesRpcResult = jsonRpcResult(nullable(type({
  blockhash: string(),
  previousBlockhash: string(),
  parentSlot: number(),
  signatures: array(string()),
  blockTime: nullable(number())
})));
/**
 * Expected JSON RPC response for the "getTransaction" message
 */

const GetTransactionRpcResult = jsonRpcResult(nullable(type({
  slot: number(),
  meta: ConfirmedTransactionMetaResult,
  blockTime: optional(nullable(number())),
  transaction: ConfirmedTransactionResult
})));
/**
 * Expected parsed JSON RPC response for the "getTransaction" message
 */

const GetParsedTransactionRpcResult = jsonRpcResult(nullable(type({
  slot: number(),
  transaction: ParsedConfirmedTransactionResult,
  meta: nullable(ParsedConfirmedTransactionMetaResult),
  blockTime: optional(nullable(number()))
})));
/**
 * Expected JSON RPC response for the "getRecentBlockhash" message
 *
 * @deprecated Deprecated since Solana v1.8.0. Please use {@link GetLatestBlockhashRpcResult} instead.
 */

const GetRecentBlockhashAndContextRpcResult = jsonRpcResultAndContext(type({
  blockhash: string(),
  feeCalculator: type({
    lamportsPerSignature: number()
  })
}));
/**
 * Expected JSON RPC response for the "getLatestBlockhash" message
 */

const GetLatestBlockhashRpcResult = jsonRpcResultAndContext(type({
  blockhash: string(),
  lastValidBlockHeight: number()
}));
const PerfSampleResult = type({
  slot: number(),
  numTransactions: number(),
  numSlots: number(),
  samplePeriodSecs: number()
});
/*
 * Expected JSON RPC response for "getRecentPerformanceSamples" message
 */

const GetRecentPerformanceSamplesRpcResult = jsonRpcResult(array(PerfSampleResult));
/**
 * Expected JSON RPC response for the "getFeeCalculatorForBlockhash" message
 */

const GetFeeCalculatorRpcResult = jsonRpcResultAndContext(nullable(type({
  feeCalculator: type({
    lamportsPerSignature: number()
  })
})));
/**
 * Expected JSON RPC response for the "requestAirdrop" message
 */

const RequestAirdropRpcResult = jsonRpcResult(string());
/**
 * Expected JSON RPC response for the "sendTransaction" message
 */

const SendTransactionRpcResult = jsonRpcResult(string());
/**
 * Information about the latest slot being processed by a node
 */

/**
 * @internal
 */
const LogsResult = type({
  err: TransactionErrorResult,
  logs: array(string()),
  signature: string()
});
/**
 * Logs result.
 */

/**
 * Expected JSON RPC response for the "logsNotification" message.
 */
const LogsNotificationResult = type({
  result: notificationResultAndContext(LogsResult),
  subscription: number()
});
/**
 * Filter for log subscriptions.
 */

/** @internal */
const COMMON_HTTP_HEADERS = {
  'solana-client': `js/${(_process$env$npm_pack = "0.0.0-development") !== null && _process$env$npm_pack !== void 0 ? _process$env$npm_pack : 'UNKNOWN'}`
};
/**
 * A connection to a fullnode JSON RPC endpoint
 */

class Connection {
  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal
   * A number that we increment every time an active connection closes.
   * Used to determine whether the same socket connection that was open
   * when an async operation started is the same one that's active when
   * its continuation fires.
   *
   */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /** @internal */

  /**
   * Special case.
   * After a signature is processed, RPCs automatically dispose of the
   * subscription on the server side. We need to track which of these
   * subscriptions have been disposed in such a way, so that we know
   * whether the client is dealing with a not-yet-processed signature
   * (in which case we must tear down the server subscription) or an
   * already-processed signature (in which case the client can simply
   * clear out the subscription locally without telling the server).
   *
   * NOTE: There is a proposal to eliminate this special case, here:
   * https://github.com/solana-labs/solana/issues/18892
   */

  /** @internal */

  /**
   * Establish a JSON RPC connection
   *
   * @param endpoint URL to the fullnode JSON RPC endpoint
   * @param commitmentOrConfig optional default commitment level or optional ConnectionConfig configuration object
   */
  constructor(endpoint, commitmentOrConfig) {
    this._commitment = void 0;
    this._confirmTransactionInitialTimeout = void 0;
    this._rpcEndpoint = void 0;
    this._rpcWsEndpoint = void 0;
    this._rpcClient = void 0;
    this._rpcRequest = void 0;
    this._rpcBatchRequest = void 0;
    this._rpcWebSocket = void 0;
    this._rpcWebSocketConnected = false;
    this._rpcWebSocketHeartbeat = null;
    this._rpcWebSocketIdleTimeout = null;
    this._rpcWebSocketGeneration = 0;
    this._disableBlockhashCaching = false;
    this._pollingBlockhash = false;
    this._blockhashInfo = {
      latestBlockhash: null,
      lastFetch: 0,
      transactionSignatures: [],
      simulatedSignatures: []
    };
    this._nextClientSubscriptionId = 0;
    this._subscriptionDisposeFunctionsByClientSubscriptionId = {};
    this._subscriptionCallbacksByServerSubscriptionId = {};
    this._subscriptionsByHash = {};
    this._subscriptionsAutoDisposedByRpc = new Set();
    let url = new URL(endpoint);
    const useHttps = url.protocol === 'https:';
    let wsEndpoint;
    let httpHeaders;
    let fetch;
    let fetchMiddleware;
    let disableRetryOnRateLimit;

    if (commitmentOrConfig && typeof commitmentOrConfig === 'string') {
      this._commitment = commitmentOrConfig;
    } else if (commitmentOrConfig) {
      this._commitment = commitmentOrConfig.commitment;
      this._confirmTransactionInitialTimeout = commitmentOrConfig.confirmTransactionInitialTimeout;
      wsEndpoint = commitmentOrConfig.wsEndpoint;
      httpHeaders = commitmentOrConfig.httpHeaders;
      fetch = commitmentOrConfig.fetch;
      fetchMiddleware = commitmentOrConfig.fetchMiddleware;
      disableRetryOnRateLimit = commitmentOrConfig.disableRetryOnRateLimit;
    }

    this._rpcEndpoint = endpoint;
    this._rpcWsEndpoint = wsEndpoint || makeWebsocketUrl(endpoint);
    this._rpcClient = createRpcClient(url.toString(), useHttps, httpHeaders, fetch, fetchMiddleware, disableRetryOnRateLimit);
    this._rpcRequest = createRpcRequest(this._rpcClient);
    this._rpcBatchRequest = createRpcBatchRequest(this._rpcClient);
    this._rpcWebSocket = new dist.Client(this._rpcWsEndpoint, {
      autoconnect: false,
      max_reconnects: Infinity
    });

    this._rpcWebSocket.on('open', this._wsOnOpen.bind(this));

    this._rpcWebSocket.on('error', this._wsOnError.bind(this));

    this._rpcWebSocket.on('close', this._wsOnClose.bind(this));

    this._rpcWebSocket.on('accountNotification', this._wsOnAccountNotification.bind(this));

    this._rpcWebSocket.on('programNotification', this._wsOnProgramAccountNotification.bind(this));

    this._rpcWebSocket.on('slotNotification', this._wsOnSlotNotification.bind(this));

    this._rpcWebSocket.on('slotsUpdatesNotification', this._wsOnSlotUpdatesNotification.bind(this));

    this._rpcWebSocket.on('signatureNotification', this._wsOnSignatureNotification.bind(this));

    this._rpcWebSocket.on('rootNotification', this._wsOnRootNotification.bind(this));

    this._rpcWebSocket.on('logsNotification', this._wsOnLogsNotification.bind(this));
  }
  /**
   * The default commitment used for requests
   */


  get commitment() {
    return this._commitment;
  }
  /**
   * The RPC endpoint
   */


  get rpcEndpoint() {
    return this._rpcEndpoint;
  }
  /**
   * Fetch the balance for the specified public key, return with context
   */


  async getBalanceAndContext(publicKey, commitmentOrConfig) {
    /** @internal */
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([publicKey.toBase58()], commitment, undefined
    /* encoding */
    , config);

    const unsafeRes = await this._rpcRequest('getBalance', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(number()));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get balance for ${publicKey.toBase58()}`);
    }

    return res.result;
  }
  /**
   * Fetch the balance for the specified public key
   */


  async getBalance(publicKey, commitmentOrConfig) {
    return await this.getBalanceAndContext(publicKey, commitmentOrConfig).then(x => x.value).catch(e => {
      throw new Error('failed to get balance of account ' + publicKey.toBase58() + ': ' + e);
    });
  }
  /**
   * Fetch the estimated production time of a block
   */


  async getBlockTime(slot) {
    const unsafeRes = await this._rpcRequest('getBlockTime', [slot]);
    const res = create(unsafeRes, jsonRpcResult(nullable(number())));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get block time for slot ${slot}`);
    }

    return res.result;
  }
  /**
   * Fetch the lowest slot that the node has information about in its ledger.
   * This value may increase over time if the node is configured to purge older ledger data
   */


  async getMinimumLedgerSlot() {
    const unsafeRes = await this._rpcRequest('minimumLedgerSlot', []);
    const res = create(unsafeRes, jsonRpcResult(number()));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get minimum ledger slot');
    }

    return res.result;
  }
  /**
   * Fetch the slot of the lowest confirmed block that has not been purged from the ledger
   */


  async getFirstAvailableBlock() {
    const unsafeRes = await this._rpcRequest('getFirstAvailableBlock', []);
    const res = create(unsafeRes, SlotRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get first available block');
    }

    return res.result;
  }
  /**
   * Fetch information about the current supply
   */


  async getSupply(config) {
    let configArg = {};

    if (typeof config === 'string') {
      configArg = {
        commitment: config
      };
    } else if (config) {
      configArg = { ...config,
        commitment: config && config.commitment || this.commitment
      };
    } else {
      configArg = {
        commitment: this.commitment
      };
    }

    const unsafeRes = await this._rpcRequest('getSupply', [configArg]);
    const res = create(unsafeRes, GetSupplyRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get supply');
    }

    return res.result;
  }
  /**
   * Fetch the current supply of a token mint
   */


  async getTokenSupply(tokenMintAddress, commitment) {
    const args = this._buildArgs([tokenMintAddress.toBase58()], commitment);

    const unsafeRes = await this._rpcRequest('getTokenSupply', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get token supply');
    }

    return res.result;
  }
  /**
   * Fetch the current balance of a token account
   */


  async getTokenAccountBalance(tokenAddress, commitment) {
    const args = this._buildArgs([tokenAddress.toBase58()], commitment);

    const unsafeRes = await this._rpcRequest('getTokenAccountBalance', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(TokenAmountResult));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get token account balance');
    }

    return res.result;
  }
  /**
   * Fetch all the token accounts owned by the specified account
   *
   * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>>}
   */


  async getTokenAccountsByOwner(ownerAddress, filter, commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);
    let _args = [ownerAddress.toBase58()];

    if ('mint' in filter) {
      _args.push({
        mint: filter.mint.toBase58()
      });
    } else {
      _args.push({
        programId: filter.programId.toBase58()
      });
    }

    const args = this._buildArgs(_args, commitment, 'base64', config);

    const unsafeRes = await this._rpcRequest('getTokenAccountsByOwner', args);
    const res = create(unsafeRes, GetTokenAccountsByOwner);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get token accounts owned by account ${ownerAddress.toBase58()}`);
    }

    return res.result;
  }
  /**
   * Fetch parsed token accounts owned by the specified account
   *
   * @return {Promise<RpcResponseAndContext<Array<{pubkey: PublicKey, account: AccountInfo<ParsedAccountData>}>>>}
   */


  async getParsedTokenAccountsByOwner(ownerAddress, filter, commitment) {
    let _args = [ownerAddress.toBase58()];

    if ('mint' in filter) {
      _args.push({
        mint: filter.mint.toBase58()
      });
    } else {
      _args.push({
        programId: filter.programId.toBase58()
      });
    }

    const args = this._buildArgs(_args, commitment, 'jsonParsed');

    const unsafeRes = await this._rpcRequest('getTokenAccountsByOwner', args);
    const res = create(unsafeRes, GetParsedTokenAccountsByOwner);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get token accounts owned by account ${ownerAddress.toBase58()}`);
    }

    return res.result;
  }
  /**
   * Fetch the 20 largest accounts with their current balances
   */


  async getLargestAccounts(config) {
    const arg = { ...config,
      commitment: config && config.commitment || this.commitment
    };
    const args = arg.filter || arg.commitment ? [arg] : [];
    const unsafeRes = await this._rpcRequest('getLargestAccounts', args);
    const res = create(unsafeRes, GetLargestAccountsRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get largest accounts');
    }

    return res.result;
  }
  /**
   * Fetch the 20 largest token accounts with their current balances
   * for a given mint.
   */


  async getTokenLargestAccounts(mintAddress, commitment) {
    const args = this._buildArgs([mintAddress.toBase58()], commitment);

    const unsafeRes = await this._rpcRequest('getTokenLargestAccounts', args);
    const res = create(unsafeRes, GetTokenLargestAccountsResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get token largest accounts');
    }

    return res.result;
  }
  /**
   * Fetch all the account info for the specified public key, return with context
   */


  async getAccountInfoAndContext(publicKey, commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([publicKey.toBase58()], commitment, 'base64', config);

    const unsafeRes = await this._rpcRequest('getAccountInfo', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(nullable(AccountInfoResult)));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get info about account ${publicKey.toBase58()}`);
    }

    return res.result;
  }
  /**
   * Fetch parsed account info for the specified public key
   */


  async getParsedAccountInfo(publicKey, commitment) {
    const args = this._buildArgs([publicKey.toBase58()], commitment, 'jsonParsed');

    const unsafeRes = await this._rpcRequest('getAccountInfo', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(nullable(ParsedAccountInfoResult)));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get info about account ${publicKey.toBase58()}`);
    }

    return res.result;
  }
  /**
   * Fetch all the account info for the specified public key
   */


  async getAccountInfo(publicKey, commitmentOrConfig) {
    try {
      const res = await this.getAccountInfoAndContext(publicKey, commitmentOrConfig);
      return res.value;
    } catch (e) {
      throw new Error('failed to get info about account ' + publicKey.toBase58() + ': ' + e);
    }
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys, return with context
   */


  async getMultipleAccountsInfoAndContext(publicKeys, commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);
    const keys = publicKeys.map(key => key.toBase58());

    const args = this._buildArgs([keys], commitment, 'base64', config);

    const unsafeRes = await this._rpcRequest('getMultipleAccounts', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(array(nullable(AccountInfoResult))));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get info for accounts ${keys}`);
    }

    return res.result;
  }
  /**
   * Fetch all the account info for multiple accounts specified by an array of public keys
   */


  async getMultipleAccountsInfo(publicKeys, commitmentOrConfig) {
    const res = await this.getMultipleAccountsInfoAndContext(publicKeys, commitmentOrConfig);
    return res.value;
  }
  /**
   * Returns epoch activation information for a stake account that has been delegated
   */


  async getStakeActivation(publicKey, commitmentOrConfig, epoch) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([publicKey.toBase58()], commitment, undefined
    /* encoding */
    , { ...config,
      epoch: epoch != null ? epoch : config === null || config === void 0 ? void 0 : config.epoch
    });

    const unsafeRes = await this._rpcRequest('getStakeActivation', args);
    const res = create(unsafeRes, jsonRpcResult(StakeActivationResult));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get Stake Activation ${publicKey.toBase58()}`);
    }

    return res.result;
  }
  /**
   * Fetch all the accounts owned by the specified program id
   *
   * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer>}>>}
   */


  async getProgramAccounts(programId, configOrCommitment) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(configOrCommitment);
    const {
      encoding,
      ...configWithoutEncoding
    } = config || {};

    const args = this._buildArgs([programId.toBase58()], commitment, encoding || 'base64', configWithoutEncoding);

    const unsafeRes = await this._rpcRequest('getProgramAccounts', args);
    const res = create(unsafeRes, jsonRpcResult(array(KeyedAccountInfoResult)));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get accounts owned by program ${programId.toBase58()}`);
    }

    return res.result;
  }
  /**
   * Fetch and parse all the accounts owned by the specified program id
   *
   * @return {Promise<Array<{pubkey: PublicKey, account: AccountInfo<Buffer | ParsedAccountData>}>>}
   */


  async getParsedProgramAccounts(programId, configOrCommitment) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(configOrCommitment);

    const args = this._buildArgs([programId.toBase58()], commitment, 'jsonParsed', config);

    const unsafeRes = await this._rpcRequest('getProgramAccounts', args);
    const res = create(unsafeRes, jsonRpcResult(array(KeyedParsedAccountInfoResult)));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `failed to get accounts owned by program ${programId.toBase58()}`);
    }

    return res.result;
  }

  // eslint-disable-next-line no-dupe-class-members
  async confirmTransaction(strategy, commitment) {
    let rawSignature;

    if (typeof strategy == 'string') {
      rawSignature = strategy;
    } else {
      const config = strategy;
      rawSignature = config.signature;
    }

    let decodedSignature;

    try {
      decodedSignature = bs58$1.decode(rawSignature);
    } catch (err) {
      throw new Error('signature must be base58 encoded: ' + rawSignature);
    }

    assert(decodedSignature.length === 64, 'signature has invalid length');
    const subscriptionCommitment = commitment || this.commitment;
    let timeoutId;
    let subscriptionId;
    let done = false;
    const confirmationPromise = new Promise((resolve, reject) => {
      try {
        subscriptionId = this.onSignature(rawSignature, (result, context) => {
          subscriptionId = undefined;
          const response = {
            context,
            value: result
          };
          done = true;
          resolve({
            __type: TransactionStatus.PROCESSED,
            response
          });
        }, subscriptionCommitment);
      } catch (err) {
        reject(err);
      }
    });
    const expiryPromise = new Promise(resolve => {
      if (typeof strategy === 'string') {
        let timeoutMs = this._confirmTransactionInitialTimeout || 60 * 1000;

        switch (subscriptionCommitment) {
          case 'processed':
          case 'recent':
          case 'single':
          case 'confirmed':
          case 'singleGossip':
            {
              timeoutMs = this._confirmTransactionInitialTimeout || 30 * 1000;
              break;
            }
        }

        timeoutId = setTimeout(() => resolve({
          __type: TransactionStatus.TIMED_OUT,
          timeoutMs
        }), timeoutMs);
      } else {
        let config = strategy;

        const checkBlockHeight = async () => {
          try {
            const blockHeight = await this.getBlockHeight(commitment);
            return blockHeight;
          } catch (_e) {
            return -1;
          }
        };

        (async () => {
          let currentBlockHeight = await checkBlockHeight();
          if (done) return;

          while (currentBlockHeight <= config.lastValidBlockHeight) {
            await sleep(1000);
            if (done) return;
            currentBlockHeight = await checkBlockHeight();
            if (done) return;
          }

          resolve({
            __type: TransactionStatus.BLOCKHEIGHT_EXCEEDED
          });
        })();
      }
    });
    let result;

    try {
      const outcome = await Promise.race([confirmationPromise, expiryPromise]);

      switch (outcome.__type) {
        case TransactionStatus.BLOCKHEIGHT_EXCEEDED:
          throw new TransactionExpiredBlockheightExceededError(rawSignature);

        case TransactionStatus.PROCESSED:
          result = outcome.response;
          break;

        case TransactionStatus.TIMED_OUT:
          throw new TransactionExpiredTimeoutError(rawSignature, outcome.timeoutMs / 1000);
      }
    } finally {
      clearTimeout(timeoutId);

      if (subscriptionId) {
        this.removeSignatureListener(subscriptionId);
      }
    }

    return result;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */


  async getClusterNodes() {
    const unsafeRes = await this._rpcRequest('getClusterNodes', []);
    const res = create(unsafeRes, jsonRpcResult(array(ContactInfoResult)));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get cluster nodes');
    }

    return res.result;
  }
  /**
   * Return the list of nodes that are currently participating in the cluster
   */


  async getVoteAccounts(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getVoteAccounts', args);
    const res = create(unsafeRes, GetVoteAccounts);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get vote accounts');
    }

    return res.result;
  }
  /**
   * Fetch the current slot that the node is processing
   */


  async getSlot(commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([], commitment, undefined
    /* encoding */
    , config);

    const unsafeRes = await this._rpcRequest('getSlot', args);
    const res = create(unsafeRes, jsonRpcResult(number()));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get slot');
    }

    return res.result;
  }
  /**
   * Fetch the current slot leader of the cluster
   */


  async getSlotLeader(commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([], commitment, undefined
    /* encoding */
    , config);

    const unsafeRes = await this._rpcRequest('getSlotLeader', args);
    const res = create(unsafeRes, jsonRpcResult(string()));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get slot leader');
    }

    return res.result;
  }
  /**
   * Fetch `limit` number of slot leaders starting from `startSlot`
   *
   * @param startSlot fetch slot leaders starting from this slot
   * @param limit number of slot leaders to return
   */


  async getSlotLeaders(startSlot, limit) {
    const args = [startSlot, limit];
    const unsafeRes = await this._rpcRequest('getSlotLeaders', args);
    const res = create(unsafeRes, jsonRpcResult(array(PublicKeyFromString)));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get slot leaders');
    }

    return res.result;
  }
  /**
   * Fetch the current status of a signature
   */


  async getSignatureStatus(signature, config) {
    const {
      context,
      value: values
    } = await this.getSignatureStatuses([signature], config);
    assert(values.length === 1);
    const value = values[0];
    return {
      context,
      value
    };
  }
  /**
   * Fetch the current statuses of a batch of signatures
   */


  async getSignatureStatuses(signatures, config) {
    const params = [signatures];

    if (config) {
      params.push(config);
    }

    const unsafeRes = await this._rpcRequest('getSignatureStatuses', params);
    const res = create(unsafeRes, GetSignatureStatusesRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get signature status');
    }

    return res.result;
  }
  /**
   * Fetch the current transaction count of the cluster
   */


  async getTransactionCount(commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([], commitment, undefined
    /* encoding */
    , config);

    const unsafeRes = await this._rpcRequest('getTransactionCount', args);
    const res = create(unsafeRes, jsonRpcResult(number()));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get transaction count');
    }

    return res.result;
  }
  /**
   * Fetch the current total currency supply of the cluster in lamports
   *
   * @deprecated Deprecated since v1.2.8. Please use {@link getSupply} instead.
   */


  async getTotalSupply(commitment) {
    const result = await this.getSupply({
      commitment,
      excludeNonCirculatingAccountsList: true
    });
    return result.value.total;
  }
  /**
   * Fetch the cluster InflationGovernor parameters
   */


  async getInflationGovernor(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getInflationGovernor', args);
    const res = create(unsafeRes, GetInflationGovernorRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get inflation');
    }

    return res.result;
  }
  /**
   * Fetch the inflation reward for a list of addresses for an epoch
   */


  async getInflationReward(addresses, epoch, commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([addresses.map(pubkey => pubkey.toBase58())], commitment, undefined
    /* encoding */
    , { ...config,
      epoch: epoch != null ? epoch : config === null || config === void 0 ? void 0 : config.epoch
    });

    const unsafeRes = await this._rpcRequest('getInflationReward', args);
    const res = create(unsafeRes, GetInflationRewardResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get inflation reward');
    }

    return res.result;
  }
  /**
   * Fetch the Epoch Info parameters
   */


  async getEpochInfo(commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([], commitment, undefined
    /* encoding */
    , config);

    const unsafeRes = await this._rpcRequest('getEpochInfo', args);
    const res = create(unsafeRes, GetEpochInfoRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get epoch info');
    }

    return res.result;
  }
  /**
   * Fetch the Epoch Schedule parameters
   */


  async getEpochSchedule() {
    const unsafeRes = await this._rpcRequest('getEpochSchedule', []);
    const res = create(unsafeRes, GetEpochScheduleRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get epoch schedule');
    }

    const epochSchedule = res.result;
    return new EpochSchedule(epochSchedule.slotsPerEpoch, epochSchedule.leaderScheduleSlotOffset, epochSchedule.warmup, epochSchedule.firstNormalEpoch, epochSchedule.firstNormalSlot);
  }
  /**
   * Fetch the leader schedule for the current epoch
   * @return {Promise<RpcResponseAndContext<LeaderSchedule>>}
   */


  async getLeaderSchedule() {
    const unsafeRes = await this._rpcRequest('getLeaderSchedule', []);
    const res = create(unsafeRes, GetLeaderScheduleRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get leader schedule');
    }

    return res.result;
  }
  /**
   * Fetch the minimum balance needed to exempt an account of `dataLength`
   * size from rent
   */


  async getMinimumBalanceForRentExemption(dataLength, commitment) {
    const args = this._buildArgs([dataLength], commitment);

    const unsafeRes = await this._rpcRequest('getMinimumBalanceForRentExemption', args);
    const res = create(unsafeRes, GetMinimumBalanceForRentExemptionRpcResult);

    if ('error' in res) {
      console.warn('Unable to fetch minimum balance for rent exemption');
      return 0;
    }

    return res.result;
  }
  /**
   * Fetch a recent blockhash from the cluster, return with context
   * @return {Promise<RpcResponseAndContext<{blockhash: Blockhash, feeCalculator: FeeCalculator}>>}
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getLatestBlockhash} instead.
   */


  async getRecentBlockhashAndContext(commitment) {
    const args = this._buildArgs([], commitment);

    const unsafeRes = await this._rpcRequest('getRecentBlockhash', args);
    const res = create(unsafeRes, GetRecentBlockhashAndContextRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get recent blockhash');
    }

    return res.result;
  }
  /**
   * Fetch recent performance samples
   * @return {Promise<Array<PerfSample>>}
   */


  async getRecentPerformanceSamples(limit) {
    const unsafeRes = await this._rpcRequest('getRecentPerformanceSamples', limit ? [limit] : []);
    const res = create(unsafeRes, GetRecentPerformanceSamplesRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get recent performance samples');
    }

    return res.result;
  }
  /**
   * Fetch the fee calculator for a recent blockhash from the cluster, return with context
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getFeeForMessage} instead.
   */


  async getFeeCalculatorForBlockhash(blockhash, commitment) {
    const args = this._buildArgs([blockhash], commitment);

    const unsafeRes = await this._rpcRequest('getFeeCalculatorForBlockhash', args);
    const res = create(unsafeRes, GetFeeCalculatorRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get fee calculator');
    }

    const {
      context,
      value
    } = res.result;
    return {
      context,
      value: value !== null ? value.feeCalculator : null
    };
  }
  /**
   * Fetch the fee for a message from the cluster, return with context
   */


  async getFeeForMessage(message, commitment) {
    const wireMessage = message.serialize().toString('base64');

    const args = this._buildArgs([wireMessage], commitment);

    const unsafeRes = await this._rpcRequest('getFeeForMessage', args);
    const res = create(unsafeRes, jsonRpcResultAndContext(nullable(number())));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get slot');
    }

    if (res.result === null) {
      throw new Error('invalid blockhash');
    }

    return res.result;
  }
  /**
   * Fetch a recent blockhash from the cluster
   * @return {Promise<{blockhash: Blockhash, feeCalculator: FeeCalculator}>}
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getLatestBlockhash} instead.
   */


  async getRecentBlockhash(commitment) {
    try {
      const res = await this.getRecentBlockhashAndContext(commitment);
      return res.value;
    } catch (e) {
      throw new Error('failed to get recent blockhash: ' + e);
    }
  }
  /**
   * Fetch the latest blockhash from the cluster
   * @return {Promise<BlockhashWithExpiryBlockHeight>}
   */


  async getLatestBlockhash(commitmentOrConfig) {
    try {
      const res = await this.getLatestBlockhashAndContext(commitmentOrConfig);
      return res.value;
    } catch (e) {
      throw new Error('failed to get recent blockhash: ' + e);
    }
  }
  /**
   * Fetch the latest blockhash from the cluster
   * @return {Promise<BlockhashWithExpiryBlockHeight>}
   */


  async getLatestBlockhashAndContext(commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([], commitment, undefined
    /* encoding */
    , config);

    const unsafeRes = await this._rpcRequest('getLatestBlockhash', args);
    const res = create(unsafeRes, GetLatestBlockhashRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get latest blockhash');
    }

    return res.result;
  }
  /**
   * Fetch the node version
   */


  async getVersion() {
    const unsafeRes = await this._rpcRequest('getVersion', []);
    const res = create(unsafeRes, jsonRpcResult(VersionResult));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get version');
    }

    return res.result;
  }
  /**
   * Fetch the genesis hash
   */


  async getGenesisHash() {
    const unsafeRes = await this._rpcRequest('getGenesisHash', []);
    const res = create(unsafeRes, jsonRpcResult(string()));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get genesis hash');
    }

    return res.result;
  }
  /**
   * Fetch a processed block from the cluster.
   */


  async getBlock(slot, opts) {
    const args = this._buildArgsAtLeastConfirmed([slot], opts && opts.commitment);

    const unsafeRes = await this._rpcRequest('getBlock', args);
    const res = create(unsafeRes, GetBlockRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get confirmed block');
    }

    const result = res.result;
    if (!result) return result;
    return { ...result,
      transactions: result.transactions.map(({
        transaction,
        meta
      }) => {
        const message = new Message(transaction.message);
        return {
          meta,
          transaction: { ...transaction,
            message
          }
        };
      })
    };
  }
  /*
   * Returns the current block height of the node
   */


  async getBlockHeight(commitmentOrConfig) {
    const {
      commitment,
      config
    } = extractCommitmentFromConfig(commitmentOrConfig);

    const args = this._buildArgs([], commitment, undefined
    /* encoding */
    , config);

    const unsafeRes = await this._rpcRequest('getBlockHeight', args);
    const res = create(unsafeRes, jsonRpcResult(number()));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get block height information');
    }

    return res.result;
  }
  /*
   * Returns recent block production information from the current or previous epoch
   */


  async getBlockProduction(configOrCommitment) {
    let extra;
    let commitment;

    if (typeof configOrCommitment === 'string') {
      commitment = configOrCommitment;
    } else if (configOrCommitment) {
      const {
        commitment: c,
        ...rest
      } = configOrCommitment;
      commitment = c;
      extra = rest;
    }

    const args = this._buildArgs([], commitment, 'base64', extra);

    const unsafeRes = await this._rpcRequest('getBlockProduction', args);
    const res = create(unsafeRes, BlockProductionResponseStruct);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get block production information');
    }

    return res.result;
  }
  /**
   * Fetch a confirmed or finalized transaction from the cluster.
   */


  async getTransaction(signature, opts) {
    const args = this._buildArgsAtLeastConfirmed([signature], opts && opts.commitment);

    const unsafeRes = await this._rpcRequest('getTransaction', args);
    const res = create(unsafeRes, GetTransactionRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get transaction');
    }

    const result = res.result;
    if (!result) return result;
    return { ...result,
      transaction: { ...result.transaction,
        message: new Message(result.transaction.message)
      }
    };
  }
  /**
   * Fetch parsed transaction details for a confirmed or finalized transaction
   */


  async getParsedTransaction(signature, commitment) {
    const args = this._buildArgsAtLeastConfirmed([signature], commitment, 'jsonParsed');

    const unsafeRes = await this._rpcRequest('getTransaction', args);
    const res = create(unsafeRes, GetParsedTransactionRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get transaction');
    }

    return res.result;
  }
  /**
   * Fetch parsed transaction details for a batch of confirmed transactions
   */


  async getParsedTransactions(signatures, commitment) {
    const batch = signatures.map(signature => {
      const args = this._buildArgsAtLeastConfirmed([signature], commitment, 'jsonParsed');

      return {
        methodName: 'getTransaction',
        args
      };
    });
    const unsafeRes = await this._rpcBatchRequest(batch);
    const res = unsafeRes.map(unsafeRes => {
      const res = create(unsafeRes, GetParsedTransactionRpcResult);

      if ('error' in res) {
        throw new SolanaJSONRPCError(res.error, 'failed to get transactions');
      }

      return res.result;
    });
    return res;
  }
  /**
   * Fetch transaction details for a batch of confirmed transactions.
   * Similar to {@link getParsedTransactions} but returns a {@link TransactionResponse}.
   */


  async getTransactions(signatures, commitment) {
    const batch = signatures.map(signature => {
      const args = this._buildArgsAtLeastConfirmed([signature], commitment);

      return {
        methodName: 'getTransaction',
        args
      };
    });
    const unsafeRes = await this._rpcBatchRequest(batch);
    const res = unsafeRes.map(unsafeRes => {
      const res = create(unsafeRes, GetTransactionRpcResult);

      if ('error' in res) {
        throw new SolanaJSONRPCError(res.error, 'failed to get transactions');
      }

      const result = res.result;
      if (!result) return result;
      return { ...result,
        transaction: { ...result.transaction,
          message: new Message(result.transaction.message)
        }
      };
    });
    return res;
  }
  /**
   * Fetch a list of Transactions and transaction statuses from the cluster
   * for a confirmed block.
   *
   * @deprecated Deprecated since v1.13.0. Please use {@link getBlock} instead.
   */


  async getConfirmedBlock(slot, commitment) {
    const args = this._buildArgsAtLeastConfirmed([slot], commitment);

    const unsafeRes = await this._rpcRequest('getConfirmedBlock', args);
    const res = create(unsafeRes, GetConfirmedBlockRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get confirmed block');
    }

    const result = res.result;

    if (!result) {
      throw new Error('Confirmed block ' + slot + ' not found');
    }

    const block = { ...result,
      transactions: result.transactions.map(({
        transaction,
        meta
      }) => {
        const message = new Message(transaction.message);
        return {
          meta,
          transaction: { ...transaction,
            message
          }
        };
      })
    };
    return { ...block,
      transactions: block.transactions.map(({
        transaction,
        meta
      }) => {
        return {
          meta,
          transaction: Transaction.populate(transaction.message, transaction.signatures)
        };
      })
    };
  }
  /**
   * Fetch confirmed blocks between two slots
   */


  async getBlocks(startSlot, endSlot, commitment) {
    const args = this._buildArgsAtLeastConfirmed(endSlot !== undefined ? [startSlot, endSlot] : [startSlot], commitment);

    const unsafeRes = await this._rpcRequest('getBlocks', args);
    const res = create(unsafeRes, jsonRpcResult(array(number())));

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get blocks');
    }

    return res.result;
  }
  /**
   * Fetch a list of Signatures from the cluster for a block, excluding rewards
   */


  async getBlockSignatures(slot, commitment) {
    const args = this._buildArgsAtLeastConfirmed([slot], commitment, undefined, {
      transactionDetails: 'signatures',
      rewards: false
    });

    const unsafeRes = await this._rpcRequest('getBlock', args);
    const res = create(unsafeRes, GetBlockSignaturesRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get block');
    }

    const result = res.result;

    if (!result) {
      throw new Error('Block ' + slot + ' not found');
    }

    return result;
  }
  /**
   * Fetch a list of Signatures from the cluster for a confirmed block, excluding rewards
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getBlockSignatures} instead.
   */


  async getConfirmedBlockSignatures(slot, commitment) {
    const args = this._buildArgsAtLeastConfirmed([slot], commitment, undefined, {
      transactionDetails: 'signatures',
      rewards: false
    });

    const unsafeRes = await this._rpcRequest('getConfirmedBlock', args);
    const res = create(unsafeRes, GetBlockSignaturesRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get confirmed block');
    }

    const result = res.result;

    if (!result) {
      throw new Error('Confirmed block ' + slot + ' not found');
    }

    return result;
  }
  /**
   * Fetch a transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getTransaction} instead.
   */


  async getConfirmedTransaction(signature, commitment) {
    const args = this._buildArgsAtLeastConfirmed([signature], commitment);

    const unsafeRes = await this._rpcRequest('getConfirmedTransaction', args);
    const res = create(unsafeRes, GetTransactionRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get transaction');
    }

    const result = res.result;
    if (!result) return result;
    const message = new Message(result.transaction.message);
    const signatures = result.transaction.signatures;
    return { ...result,
      transaction: Transaction.populate(message, signatures)
    };
  }
  /**
   * Fetch parsed transaction details for a confirmed transaction
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getParsedTransaction} instead.
   */


  async getParsedConfirmedTransaction(signature, commitment) {
    const args = this._buildArgsAtLeastConfirmed([signature], commitment, 'jsonParsed');

    const unsafeRes = await this._rpcRequest('getConfirmedTransaction', args);
    const res = create(unsafeRes, GetParsedTransactionRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get confirmed transaction');
    }

    return res.result;
  }
  /**
   * Fetch parsed transaction details for a batch of confirmed transactions
   *
   * @deprecated Deprecated since Solana v1.8.0. Please use {@link getParsedTransactions} instead.
   */


  async getParsedConfirmedTransactions(signatures, commitment) {
    const batch = signatures.map(signature => {
      const args = this._buildArgsAtLeastConfirmed([signature], commitment, 'jsonParsed');

      return {
        methodName: 'getConfirmedTransaction',
        args
      };
    });
    const unsafeRes = await this._rpcBatchRequest(batch);
    const res = unsafeRes.map(unsafeRes => {
      const res = create(unsafeRes, GetParsedTransactionRpcResult);

      if ('error' in res) {
        throw new SolanaJSONRPCError(res.error, 'failed to get confirmed transactions');
      }

      return res.result;
    });
    return res;
  }
  /**
   * Fetch a list of all the confirmed signatures for transactions involving an address
   * within a specified slot range. Max range allowed is 10,000 slots.
   *
   * @deprecated Deprecated since v1.3. Please use {@link getConfirmedSignaturesForAddress2} instead.
   *
   * @param address queried address
   * @param startSlot start slot, inclusive
   * @param endSlot end slot, inclusive
   */


  async getConfirmedSignaturesForAddress(address, startSlot, endSlot) {
    let options = {};
    let firstAvailableBlock = await this.getFirstAvailableBlock();

    while (!('until' in options)) {
      startSlot--;

      if (startSlot <= 0 || startSlot < firstAvailableBlock) {
        break;
      }

      try {
        const block = await this.getConfirmedBlockSignatures(startSlot, 'finalized');

        if (block.signatures.length > 0) {
          options.until = block.signatures[block.signatures.length - 1].toString();
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes('skipped')) {
          continue;
        } else {
          throw err;
        }
      }
    }

    let highestConfirmedRoot = await this.getSlot('finalized');

    while (!('before' in options)) {
      endSlot++;

      if (endSlot > highestConfirmedRoot) {
        break;
      }

      try {
        const block = await this.getConfirmedBlockSignatures(endSlot);

        if (block.signatures.length > 0) {
          options.before = block.signatures[block.signatures.length - 1].toString();
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes('skipped')) {
          continue;
        } else {
          throw err;
        }
      }
    }

    const confirmedSignatureInfo = await this.getConfirmedSignaturesForAddress2(address, options);
    return confirmedSignatureInfo.map(info => info.signature);
  }
  /**
   * Returns confirmed signatures for transactions involving an
   * address backwards in time from the provided signature or most recent confirmed block
   *
   *
   * @param address queried address
   * @param options
   */


  async getConfirmedSignaturesForAddress2(address, options, commitment) {
    const args = this._buildArgsAtLeastConfirmed([address.toBase58()], commitment, undefined, options);

    const unsafeRes = await this._rpcRequest('getConfirmedSignaturesForAddress2', args);
    const res = create(unsafeRes, GetConfirmedSignaturesForAddress2RpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get confirmed signatures for address');
    }

    return res.result;
  }
  /**
   * Returns confirmed signatures for transactions involving an
   * address backwards in time from the provided signature or most recent confirmed block
   *
   *
   * @param address queried address
   * @param options
   */


  async getSignaturesForAddress(address, options, commitment) {
    const args = this._buildArgsAtLeastConfirmed([address.toBase58()], commitment, undefined, options);

    const unsafeRes = await this._rpcRequest('getSignaturesForAddress', args);
    const res = create(unsafeRes, GetSignaturesForAddressRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, 'failed to get signatures for address');
    }

    return res.result;
  }
  /**
   * Fetch the contents of a Nonce account from the cluster, return with context
   */


  async getNonceAndContext(nonceAccount, commitment) {
    const {
      context,
      value: accountInfo
    } = await this.getAccountInfoAndContext(nonceAccount, commitment);
    let value = null;

    if (accountInfo !== null) {
      value = NonceAccount.fromAccountData(accountInfo.data);
    }

    return {
      context,
      value
    };
  }
  /**
   * Fetch the contents of a Nonce account from the cluster
   */


  async getNonce(nonceAccount, commitment) {
    return await this.getNonceAndContext(nonceAccount, commitment).then(x => x.value).catch(e => {
      throw new Error('failed to get nonce for account ' + nonceAccount.toBase58() + ': ' + e);
    });
  }
  /**
   * Request an allocation of lamports to the specified address
   *
   * ```typescript
   * import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
   *
   * (async () => {
   *   const connection = new Connection("https://api.testnet.solana.com", "confirmed");
   *   const myAddress = new PublicKey("2nr1bHFT86W9tGnyvmYW4vcHKsQB3sVQfnddasz4kExM");
   *   const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
   *   await connection.confirmTransaction(signature);
   * })();
   * ```
   */


  async requestAirdrop(to, lamports) {
    const unsafeRes = await this._rpcRequest('requestAirdrop', [to.toBase58(), lamports]);
    const res = create(unsafeRes, RequestAirdropRpcResult);

    if ('error' in res) {
      throw new SolanaJSONRPCError(res.error, `airdrop to ${to.toBase58()} failed`);
    }

    return res.result;
  }
  /**
   * @internal
   */


  async _blockhashWithExpiryBlockHeight(disableCache) {
    if (!disableCache) {
      // Wait for polling to finish
      while (this._pollingBlockhash) {
        await sleep(100);
      }

      const timeSinceFetch = Date.now() - this._blockhashInfo.lastFetch;

      const expired = timeSinceFetch >= BLOCKHASH_CACHE_TIMEOUT_MS;

      if (this._blockhashInfo.latestBlockhash !== null && !expired) {
        return this._blockhashInfo.latestBlockhash;
      }
    }

    return await this._pollNewBlockhash();
  }
  /**
   * @internal
   */


  async _pollNewBlockhash() {
    this._pollingBlockhash = true;

    try {
      const startTime = Date.now();
      const cachedLatestBlockhash = this._blockhashInfo.latestBlockhash;
      const cachedBlockhash = cachedLatestBlockhash ? cachedLatestBlockhash.blockhash : null;

      for (let i = 0; i < 50; i++) {
        const latestBlockhash = await this.getLatestBlockhash('finalized');

        if (cachedBlockhash !== latestBlockhash.blockhash) {
          this._blockhashInfo = {
            latestBlockhash,
            lastFetch: Date.now(),
            transactionSignatures: [],
            simulatedSignatures: []
          };
          return latestBlockhash;
        } // Sleep for approximately half a slot


        await sleep(MS_PER_SLOT / 2);
      }

      throw new Error(`Unable to obtain a new blockhash after ${Date.now() - startTime}ms`);
    } finally {
      this._pollingBlockhash = false;
    }
  }
  /**
   * Simulate a transaction
   */


  async simulateTransaction(transactionOrMessage, signers, includeAccounts) {
    let transaction;

    if (transactionOrMessage instanceof Transaction) {
      let originalTx = transactionOrMessage;
      transaction = new Transaction();
      transaction.feePayer = originalTx.feePayer;
      transaction.instructions = transactionOrMessage.instructions;
      transaction.nonceInfo = originalTx.nonceInfo;
      transaction.signatures = originalTx.signatures;
    } else {
      transaction = Transaction.populate(transactionOrMessage); // HACK: this function relies on mutating the populated transaction

      transaction._message = transaction._json = undefined;
    }

    if (transaction.nonceInfo && signers) {
      transaction.sign(...signers);
    } else {
      let disableCache = this._disableBlockhashCaching;

      for (;;) {
        const latestBlockhash = await this._blockhashWithExpiryBlockHeight(disableCache);
        transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
        transaction.recentBlockhash = latestBlockhash.blockhash;
        if (!signers) break;
        transaction.sign(...signers);

        if (!transaction.signature) {
          throw new Error('!signature'); // should never happen
        }

        const signature = transaction.signature.toString('base64');

        if (!this._blockhashInfo.simulatedSignatures.includes(signature) && !this._blockhashInfo.transactionSignatures.includes(signature)) {
          // The signature of this transaction has not been seen before with the
          // current recentBlockhash, all done. Let's break
          this._blockhashInfo.simulatedSignatures.push(signature);

          break;
        } else {
          // This transaction would be treated as duplicate (its derived signature
          // matched to one of already recorded signatures).
          // So, we must fetch a new blockhash for a different signature by disabling
          // our cache not to wait for the cache expiration (BLOCKHASH_CACHE_TIMEOUT_MS).
          disableCache = true;
        }
      }
    }

    const message = transaction._compile();

    const signData = message.serialize();

    const wireTransaction = transaction._serialize(signData);

    const encodedTransaction = wireTransaction.toString('base64');
    const config = {
      encoding: 'base64',
      commitment: this.commitment
    };

    if (includeAccounts) {
      const addresses = (Array.isArray(includeAccounts) ? includeAccounts : message.nonProgramIds()).map(key => key.toBase58());
      config['accounts'] = {
        encoding: 'base64',
        addresses
      };
    }

    if (signers) {
      config.sigVerify = true;
    }

    const args = [encodedTransaction, config];
    const unsafeRes = await this._rpcRequest('simulateTransaction', args);
    const res = create(unsafeRes, SimulatedTransactionResponseStruct);

    if ('error' in res) {
      let logs;

      if ('data' in res.error) {
        logs = res.error.data.logs;

        if (logs && Array.isArray(logs)) {
          const traceIndent = '\n    ';
          const logTrace = traceIndent + logs.join(traceIndent);
          console.error(res.error.message, logTrace);
        }
      }

      throw new SendTransactionError('failed to simulate transaction: ' + res.error.message, logs);
    }

    return res.result;
  }
  /**
   * Sign and send a transaction
   */


  async sendTransaction(transaction, signers, options) {
    if (transaction.nonceInfo) {
      transaction.sign(...signers);
    } else {
      let disableCache = this._disableBlockhashCaching;

      for (;;) {
        const latestBlockhash = await this._blockhashWithExpiryBlockHeight(disableCache);
        transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.sign(...signers);

        if (!transaction.signature) {
          throw new Error('!signature'); // should never happen
        }

        const signature = transaction.signature.toString('base64');

        if (!this._blockhashInfo.transactionSignatures.includes(signature)) {
          // The signature of this transaction has not been seen before with the
          // current recentBlockhash, all done. Let's break
          this._blockhashInfo.transactionSignatures.push(signature);

          break;
        } else {
          // This transaction would be treated as duplicate (its derived signature
          // matched to one of already recorded signatures).
          // So, we must fetch a new blockhash for a different signature by disabling
          // our cache not to wait for the cache expiration (BLOCKHASH_CACHE_TIMEOUT_MS).
          disableCache = true;
        }
      }
    }

    const wireTransaction = transaction.serialize();
    return await this.sendRawTransaction(wireTransaction, options);
  }
  /**
   * Send a transaction that has already been signed and serialized into the
   * wire format
   */


  async sendRawTransaction(rawTransaction, options) {
    const encodedTransaction = toBuffer(rawTransaction).toString('base64');
    const result = await this.sendEncodedTransaction(encodedTransaction, options);
    return result;
  }
  /**
   * Send a transaction that has already been signed, serialized into the
   * wire format, and encoded as a base64 string
   */


  async sendEncodedTransaction(encodedTransaction, options) {
    const config = {
      encoding: 'base64'
    };
    const skipPreflight = options && options.skipPreflight;
    const preflightCommitment = options && options.preflightCommitment || this.commitment;

    if (options && options.maxRetries != null) {
      config.maxRetries = options.maxRetries;
    }

    if (options && options.minContextSlot != null) {
      config.minContextSlot = options.minContextSlot;
    }

    if (skipPreflight) {
      config.skipPreflight = skipPreflight;
    }

    if (preflightCommitment) {
      config.preflightCommitment = preflightCommitment;
    }

    const args = [encodedTransaction, config];
    const unsafeRes = await this._rpcRequest('sendTransaction', args);
    const res = create(unsafeRes, SendTransactionRpcResult);

    if ('error' in res) {
      let logs;

      if ('data' in res.error) {
        logs = res.error.data.logs;
      }

      throw new SendTransactionError('failed to send transaction: ' + res.error.message, logs);
    }

    return res.result;
  }
  /**
   * @internal
   */


  _wsOnOpen() {
    this._rpcWebSocketConnected = true;
    this._rpcWebSocketHeartbeat = setInterval(() => {
      // Ping server every 5s to prevent idle timeouts
      this._rpcWebSocket.notify('ping').catch(() => {});
    }, 5000);

    this._updateSubscriptions();
  }
  /**
   * @internal
   */


  _wsOnError(err) {
    this._rpcWebSocketConnected = false;
    console.error('ws error:', err.message);
  }
  /**
   * @internal
   */


  _wsOnClose(code) {
    this._rpcWebSocketConnected = false;
    this._rpcWebSocketGeneration++;

    if (this._rpcWebSocketHeartbeat) {
      clearInterval(this._rpcWebSocketHeartbeat);
      this._rpcWebSocketHeartbeat = null;
    }

    if (code === 1000) {
      // explicit close, check if any subscriptions have been made since close
      this._updateSubscriptions();

      return;
    } // implicit close, prepare subscriptions for auto-reconnect


    this._subscriptionCallbacksByServerSubscriptionId = {};
    Object.entries(this._subscriptionsByHash).forEach(([hash, subscription]) => {
      this._subscriptionsByHash[hash] = { ...subscription,
        state: 'pending'
      };
    });
  }
  /**
   * @internal
   */


  async _updateSubscriptions() {
    if (Object.keys(this._subscriptionsByHash).length === 0) {
      if (this._rpcWebSocketConnected) {
        this._rpcWebSocketConnected = false;
        this._rpcWebSocketIdleTimeout = setTimeout(() => {
          this._rpcWebSocketIdleTimeout = null;

          try {
            this._rpcWebSocket.close();
          } catch (err) {
            // swallow error if socket has already been closed.
            if (err instanceof Error) {
              console.log(`Error when closing socket connection: ${err.message}`);
            }
          }
        }, 500);
      }

      return;
    }

    if (this._rpcWebSocketIdleTimeout !== null) {
      clearTimeout(this._rpcWebSocketIdleTimeout);
      this._rpcWebSocketIdleTimeout = null;
      this._rpcWebSocketConnected = true;
    }

    if (!this._rpcWebSocketConnected) {
      this._rpcWebSocket.connect();

      return;
    }

    const activeWebSocketGeneration = this._rpcWebSocketGeneration;

    const isCurrentConnectionStillActive = () => {
      return activeWebSocketGeneration === this._rpcWebSocketGeneration;
    };

    await Promise.all( // Don't be tempted to change this to `Object.entries`. We call
    // `_updateSubscriptions` recursively when processing the state,
    // so it's important that we look up the *current* version of
    // each subscription, every time we process a hash.
    Object.keys(this._subscriptionsByHash).map(async hash => {
      const subscription = this._subscriptionsByHash[hash];

      if (subscription === undefined) {
        // This entry has since been deleted. Skip.
        return;
      }

      switch (subscription.state) {
        case 'pending':
        case 'unsubscribed':
          if (subscription.callbacks.size === 0) {
            /**
             * You can end up here when:
             *
             * - a subscription has recently unsubscribed
             *   without having new callbacks added to it
             *   while the unsubscribe was in flight, or
             * - when a pending subscription has its
             *   listeners removed before a request was
             *   sent to the server.
             *
             * Being that nobody is interested in this
             * subscription any longer, delete it.
             */
            delete this._subscriptionsByHash[hash];

            if (subscription.state === 'unsubscribed') {
              delete this._subscriptionCallbacksByServerSubscriptionId[subscription.serverSubscriptionId];
            }

            await this._updateSubscriptions();
            return;
          }

          await (async () => {
            const {
              args,
              method
            } = subscription;

            try {
              this._subscriptionsByHash[hash] = { ...subscription,
                state: 'subscribing'
              };
              const serverSubscriptionId = await this._rpcWebSocket.call(method, args);
              this._subscriptionsByHash[hash] = { ...subscription,
                serverSubscriptionId,
                state: 'subscribed'
              };
              this._subscriptionCallbacksByServerSubscriptionId[serverSubscriptionId] = subscription.callbacks;
              await this._updateSubscriptions();
            } catch (e) {
              if (e instanceof Error) {
                console.error(`${method} error for argument`, args, e.message);
              }

              if (!isCurrentConnectionStillActive()) {
                return;
              } // TODO: Maybe add an 'errored' state or a retry limit?


              this._subscriptionsByHash[hash] = { ...subscription,
                state: 'pending'
              };
              await this._updateSubscriptions();
            }
          })();
          break;

        case 'subscribed':
          if (subscription.callbacks.size === 0) {
            // By the time we successfully set up a subscription
            // with the server, the client stopped caring about it.
            // Tear it down now.
            await (async () => {
              const {
                serverSubscriptionId,
                unsubscribeMethod
              } = subscription;

              if (this._subscriptionsAutoDisposedByRpc.has(serverSubscriptionId)) {
                /**
                 * Special case.
                 * If we're dealing with a subscription that has been auto-
                 * disposed by the RPC, then we can skip the RPC call to
                 * tear down the subscription here.
                 *
                 * NOTE: There is a proposal to eliminate this special case, here:
                 * https://github.com/solana-labs/solana/issues/18892
                 */
                this._subscriptionsAutoDisposedByRpc.delete(serverSubscriptionId);
              } else {
                this._subscriptionsByHash[hash] = { ...subscription,
                  state: 'unsubscribing'
                };

                try {
                  await this._rpcWebSocket.call(unsubscribeMethod, [serverSubscriptionId]);
                } catch (e) {
                  if (e instanceof Error) {
                    console.error(`${unsubscribeMethod} error:`, e.message);
                  }

                  if (!isCurrentConnectionStillActive()) {
                    return;
                  } // TODO: Maybe add an 'errored' state or a retry limit?


                  this._subscriptionsByHash[hash] = { ...subscription,
                    state: 'subscribed'
                  };
                  await this._updateSubscriptions();
                  return;
                }
              }

              this._subscriptionsByHash[hash] = { ...subscription,
                state: 'unsubscribed'
              };
              await this._updateSubscriptions();
            })();
          }

          break;
      }
    }));
  }
  /**
   * @internal
   */


  _handleServerNotification(serverSubscriptionId, callbackArgs) {
    const callbacks = this._subscriptionCallbacksByServerSubscriptionId[serverSubscriptionId];

    if (callbacks === undefined) {
      return;
    }

    callbacks.forEach(cb => {
      try {
        cb( // I failed to find a way to convince TypeScript that `cb` is of type
        // `TCallback` which is certainly compatible with `Parameters<TCallback>`.
        // See https://github.com/microsoft/TypeScript/issues/47615
        // @ts-ignore
        ...callbackArgs);
      } catch (e) {
        console.error(e);
      }
    });
  }
  /**
   * @internal
   */


  _wsOnAccountNotification(notification) {
    const {
      result,
      subscription
    } = create(notification, AccountNotificationResult);

    this._handleServerNotification(subscription, [result.value, result.context]);
  }
  /**
   * @internal
   */


  _makeSubscription(subscriptionConfig,
  /**
   * When preparing `args` for a call to `_makeSubscription`, be sure
   * to carefully apply a default `commitment` property, if necessary.
   *
   * - If the user supplied a `commitment` use that.
   * - Otherwise, if the `Connection::commitment` is set, use that.
   * - Otherwise, set it to the RPC server default: `finalized`.
   *
   * This is extremely important to ensure that these two fundamentally
   * identical subscriptions produce the same identifying hash:
   *
   * - A subscription made without specifying a commitment.
   * - A subscription made where the commitment specified is the same
   *   as the default applied to the subscription above.
   *
   * Example; these two subscriptions must produce the same hash:
   *
   * - An `accountSubscribe` subscription for `'PUBKEY'`
   * - An `accountSubscribe` subscription for `'PUBKEY'` with commitment
   *   `'finalized'`.
   *
   * See the 'making a subscription with defaulted params omitted' test
   * in `connection-subscriptions.ts` for more.
   */
  args) {
    const clientSubscriptionId = this._nextClientSubscriptionId++;
    const hash = fastStableStringify$1([subscriptionConfig.method, args]);
    const existingSubscription = this._subscriptionsByHash[hash];

    if (existingSubscription === undefined) {
      this._subscriptionsByHash[hash] = { ...subscriptionConfig,
        args,
        callbacks: new Set([subscriptionConfig.callback]),
        state: 'pending'
      };
    } else {
      existingSubscription.callbacks.add(subscriptionConfig.callback);
    }

    this._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId] = async () => {
      delete this._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId];
      const subscription = this._subscriptionsByHash[hash];
      assert(subscription !== undefined, `Could not find a \`Subscription\` when tearing down client subscription #${clientSubscriptionId}`);
      subscription.callbacks.delete(subscriptionConfig.callback);
      await this._updateSubscriptions();
    };

    this._updateSubscriptions();

    return clientSubscriptionId;
  }
  /**
   * Register a callback to be invoked whenever the specified account changes
   *
   * @param publicKey Public key of the account to monitor
   * @param callback Function to invoke whenever the account is changed
   * @param commitment Specify the commitment level account changes must reach before notification
   * @return subscription id
   */


  onAccountChange(publicKey, callback, commitment) {
    const args = this._buildArgs([publicKey.toBase58()], commitment || this._commitment || 'finalized', // Apply connection/server default.
    'base64');

    return this._makeSubscription({
      callback,
      method: 'accountSubscribe',
      unsubscribeMethod: 'accountUnsubscribe'
    }, args);
  }
  /**
   * Deregister an account notification callback
   *
   * @param id client subscription id to deregister
   */


  async removeAccountChangeListener(clientSubscriptionId) {
    await this._unsubscribeClientSubscription(clientSubscriptionId, 'account change');
  }
  /**
   * @internal
   */


  _wsOnProgramAccountNotification(notification) {
    const {
      result,
      subscription
    } = create(notification, ProgramAccountNotificationResult);

    this._handleServerNotification(subscription, [{
      accountId: result.value.pubkey,
      accountInfo: result.value.account
    }, result.context]);
  }
  /**
   * Register a callback to be invoked whenever accounts owned by the
   * specified program change
   *
   * @param programId Public key of the program to monitor
   * @param callback Function to invoke whenever the account is changed
   * @param commitment Specify the commitment level account changes must reach before notification
   * @param filters The program account filters to pass into the RPC method
   * @return subscription id
   */


  onProgramAccountChange(programId, callback, commitment, filters) {
    const args = this._buildArgs([programId.toBase58()], commitment || this._commitment || 'finalized', // Apply connection/server default.
    'base64'
    /* encoding */
    , filters ? {
      filters: filters
    } : undefined
    /* extra */
    );

    return this._makeSubscription({
      callback,
      method: 'programSubscribe',
      unsubscribeMethod: 'programUnsubscribe'
    }, args);
  }
  /**
   * Deregister an account notification callback
   *
   * @param id client subscription id to deregister
   */


  async removeProgramAccountChangeListener(clientSubscriptionId) {
    await this._unsubscribeClientSubscription(clientSubscriptionId, 'program account change');
  }
  /**
   * Registers a callback to be invoked whenever logs are emitted.
   */


  onLogs(filter, callback, commitment) {
    const args = this._buildArgs([typeof filter === 'object' ? {
      mentions: [filter.toString()]
    } : filter], commitment || this._commitment || 'finalized' // Apply connection/server default.
    );

    return this._makeSubscription({
      callback,
      method: 'logsSubscribe',
      unsubscribeMethod: 'logsUnsubscribe'
    }, args);
  }
  /**
   * Deregister a logs callback.
   *
   * @param id client subscription id to deregister.
   */


  async removeOnLogsListener(clientSubscriptionId) {
    await this._unsubscribeClientSubscription(clientSubscriptionId, 'logs');
  }
  /**
   * @internal
   */


  _wsOnLogsNotification(notification) {
    const {
      result,
      subscription
    } = create(notification, LogsNotificationResult);

    this._handleServerNotification(subscription, [result.value, result.context]);
  }
  /**
   * @internal
   */


  _wsOnSlotNotification(notification) {
    const {
      result,
      subscription
    } = create(notification, SlotNotificationResult);

    this._handleServerNotification(subscription, [result]);
  }
  /**
   * Register a callback to be invoked upon slot changes
   *
   * @param callback Function to invoke whenever the slot changes
   * @return subscription id
   */


  onSlotChange(callback) {
    return this._makeSubscription({
      callback,
      method: 'slotSubscribe',
      unsubscribeMethod: 'slotUnsubscribe'
    }, []
    /* args */
    );
  }
  /**
   * Deregister a slot notification callback
   *
   * @param id client subscription id to deregister
   */


  async removeSlotChangeListener(clientSubscriptionId) {
    await this._unsubscribeClientSubscription(clientSubscriptionId, 'slot change');
  }
  /**
   * @internal
   */


  _wsOnSlotUpdatesNotification(notification) {
    const {
      result,
      subscription
    } = create(notification, SlotUpdateNotificationResult);

    this._handleServerNotification(subscription, [result]);
  }
  /**
   * Register a callback to be invoked upon slot updates. {@link SlotUpdate}'s
   * may be useful to track live progress of a cluster.
   *
   * @param callback Function to invoke whenever the slot updates
   * @return subscription id
   */


  onSlotUpdate(callback) {
    return this._makeSubscription({
      callback,
      method: 'slotsUpdatesSubscribe',
      unsubscribeMethod: 'slotsUpdatesUnsubscribe'
    }, []
    /* args */
    );
  }
  /**
   * Deregister a slot update notification callback
   *
   * @param id client subscription id to deregister
   */


  async removeSlotUpdateListener(clientSubscriptionId) {
    await this._unsubscribeClientSubscription(clientSubscriptionId, 'slot update');
  }
  /**
   * @internal
   */


  async _unsubscribeClientSubscription(clientSubscriptionId, subscriptionName) {
    const dispose = this._subscriptionDisposeFunctionsByClientSubscriptionId[clientSubscriptionId];

    if (dispose) {
      await dispose();
    } else {
      console.warn('Ignored unsubscribe request because an active subscription with id ' + `\`${clientSubscriptionId}\` for '${subscriptionName}' events ` + 'could not be found.');
    }
  }

  _buildArgs(args, override, encoding, extra) {
    const commitment = override || this._commitment;

    if (commitment || encoding || extra) {
      let options = {};

      if (encoding) {
        options.encoding = encoding;
      }

      if (commitment) {
        options.commitment = commitment;
      }

      if (extra) {
        options = Object.assign(options, extra);
      }

      args.push(options);
    }

    return args;
  }
  /**
   * @internal
   */


  _buildArgsAtLeastConfirmed(args, override, encoding, extra) {
    const commitment = override || this._commitment;

    if (commitment && !['confirmed', 'finalized'].includes(commitment)) {
      throw new Error('Using Connection with default commitment: `' + this._commitment + '`, but method requires at least `confirmed`');
    }

    return this._buildArgs(args, override, encoding, extra);
  }
  /**
   * @internal
   */


  _wsOnSignatureNotification(notification) {
    const {
      result,
      subscription
    } = create(notification, SignatureNotificationResult);

    if (result.value !== 'receivedSignature') {
      /**
       * Special case.
       * After a signature is processed, RPCs automatically dispose of the
       * subscription on the server side. We need to track which of these
       * subscriptions have been disposed in such a way, so that we know
       * whether the client is dealing with a not-yet-processed signature
       * (in which case we must tear down the server subscription) or an
       * already-processed signature (in which case the client can simply
       * clear out the subscription locally without telling the server).
       *
       * NOTE: There is a proposal to eliminate this special case, here:
       * https://github.com/solana-labs/solana/issues/18892
       */
      this._subscriptionsAutoDisposedByRpc.add(subscription);
    }

    this._handleServerNotification(subscription, result.value === 'receivedSignature' ? [{
      type: 'received'
    }, result.context] : [{
      type: 'status',
      result: result.value
    }, result.context]);
  }
  /**
   * Register a callback to be invoked upon signature updates
   *
   * @param signature Transaction signature string in base 58
   * @param callback Function to invoke on signature notifications
   * @param commitment Specify the commitment level signature must reach before notification
   * @return subscription id
   */


  onSignature(signature, callback, commitment) {
    const args = this._buildArgs([signature], commitment || this._commitment || 'finalized' // Apply connection/server default.
    );

    const clientSubscriptionId = this._makeSubscription({
      callback: (notification, context) => {
        if (notification.type === 'status') {
          callback(notification.result, context); // Signatures subscriptions are auto-removed by the RPC service
          // so no need to explicitly send an unsubscribe message.

          try {
            this.removeSignatureListener(clientSubscriptionId); // eslint-disable-next-line no-empty
          } catch (_err) {// Already removed.
          }
        }
      },
      method: 'signatureSubscribe',
      unsubscribeMethod: 'signatureUnsubscribe'
    }, args);

    return clientSubscriptionId;
  }
  /**
   * Register a callback to be invoked when a transaction is
   * received and/or processed.
   *
   * @param signature Transaction signature string in base 58
   * @param callback Function to invoke on signature notifications
   * @param options Enable received notifications and set the commitment
   *   level that signature must reach before notification
   * @return subscription id
   */


  onSignatureWithOptions(signature, callback, options) {
    const {
      commitment,
      ...extra
    } = { ...options,
      commitment: options && options.commitment || this._commitment || 'finalized' // Apply connection/server default.

    };

    const args = this._buildArgs([signature], commitment, undefined
    /* encoding */
    , extra);

    const clientSubscriptionId = this._makeSubscription({
      callback: (notification, context) => {
        callback(notification, context); // Signatures subscriptions are auto-removed by the RPC service
        // so no need to explicitly send an unsubscribe message.

        try {
          this.removeSignatureListener(clientSubscriptionId); // eslint-disable-next-line no-empty
        } catch (_err) {// Already removed.
        }
      },
      method: 'signatureSubscribe',
      unsubscribeMethod: 'signatureUnsubscribe'
    }, args);

    return clientSubscriptionId;
  }
  /**
   * Deregister a signature notification callback
   *
   * @param id client subscription id to deregister
   */


  async removeSignatureListener(clientSubscriptionId) {
    await this._unsubscribeClientSubscription(clientSubscriptionId, 'signature result');
  }
  /**
   * @internal
   */


  _wsOnRootNotification(notification) {
    const {
      result,
      subscription
    } = create(notification, RootNotificationResult);

    this._handleServerNotification(subscription, [result]);
  }
  /**
   * Register a callback to be invoked upon root changes
   *
   * @param callback Function to invoke whenever the root changes
   * @return subscription id
   */


  onRootChange(callback) {
    return this._makeSubscription({
      callback,
      method: 'rootSubscribe',
      unsubscribeMethod: 'rootUnsubscribe'
    }, []
    /* args */
    );
  }
  /**
   * Deregister a root notification callback
   *
   * @param id client subscription id to deregister
   */


  async removeRootChangeListener(clientSubscriptionId) {
    await this._unsubscribeClientSubscription(clientSubscriptionId, 'root change');
  }

}
/**
 * Params for creating an ed25519 instruction using a public key
 */

struct([u8('numSignatures'), u8('padding'), u16('signatureOffset'), u16('signatureInstructionIndex'), u16('publicKeyOffset'), u16('publicKeyInstructionIndex'), u16('messageDataOffset'), u16('messageDataSize'), u16('messageInstructionIndex')]);
new PublicKey('Ed25519SigVerify111111111111111111111111111');

/**
 * Address of the stake config account which configures the rate
 * of stake warmup and cooldown as well as the slashing penalty.
 */

new PublicKey('StakeConfig11111111111111111111111111111111');

/**
 * Stake account lockup info
 */
class Lockup {
  /** Unix timestamp of lockup expiration */

  /** Epoch of lockup expiration */

  /** Lockup custodian authority */

  /**
   * Create a new Lockup object
   */
  constructor(unixTimestamp, epoch, custodian) {
    this.unixTimestamp = void 0;
    this.epoch = void 0;
    this.custodian = void 0;
    this.unixTimestamp = unixTimestamp;
    this.epoch = epoch;
    this.custodian = custodian;
  }
  /**
   * Default, inactive Lockup value
   */


}
Lockup.default = new Lockup(0, 0, PublicKey.default);
/**
 * An enumeration of valid StakeInstructionType's
 */

/**
 * An enumeration of valid stake InstructionType's
 * @internal
 */
Object.freeze({
  Initialize: {
    index: 0,
    layout: struct([u32('instruction'), authorized(), lockup()])
  },
  Authorize: {
    index: 1,
    layout: struct([u32('instruction'), publicKey('newAuthorized'), u32('stakeAuthorizationType')])
  },
  Delegate: {
    index: 2,
    layout: struct([u32('instruction')])
  },
  Split: {
    index: 3,
    layout: struct([u32('instruction'), ns64('lamports')])
  },
  Withdraw: {
    index: 4,
    layout: struct([u32('instruction'), ns64('lamports')])
  },
  Deactivate: {
    index: 5,
    layout: struct([u32('instruction')])
  },
  Merge: {
    index: 7,
    layout: struct([u32('instruction')])
  },
  AuthorizeWithSeed: {
    index: 8,
    layout: struct([u32('instruction'), publicKey('newAuthorized'), u32('stakeAuthorizationType'), rustString('authoritySeed'), publicKey('authorityOwner')])
  }
});
/**
 * Stake authorization type
 */

/**
 * An enumeration of valid StakeAuthorizationLayout's
 */
Object.freeze({
  Staker: {
    index: 0
  },
  Withdrawer: {
    index: 1
  }
});
new PublicKey('Stake11111111111111111111111111111111111111');
/**
 * Params for creating an secp256k1 instruction using a public key
 */

struct([u8('numSignatures'), u16('signatureOffset'), u8('signatureInstructionIndex'), u16('ethAddressOffset'), u8('ethAddressInstructionIndex'), u16('messageDataOffset'), u16('messageDataSize'), u8('messageInstructionIndex'), blob(20, 'ethAddress'), blob(64, 'signature'), u8('recoveryId')]);
new PublicKey('KeccakSecp256k11111111111111111111111111111');

new PublicKey('Va1idator1nfo111111111111111111111111111111');
/**
 * @internal
 */

type({
  name: string(),
  website: optional(string()),
  details: optional(string()),
  keybaseUsername: optional(string())
});

new PublicKey('Vote111111111111111111111111111111111111111');

/**
 * See https://github.com/solana-labs/solana/blob/8a12ed029cfa38d4a45400916c2463fb82bbec8c/programs/vote_api/src/vote_state.rs#L68-L88
 *
 * @internal
 */
struct([publicKey('nodePubkey'), publicKey('authorizedWithdrawer'), u8('commission'), nu64(), // votes.length
seq(struct([nu64('slot'), u32('confirmationCount')]), offset(u32(), -8), 'votes'), u8('rootSlotValid'), nu64('rootSlot'), nu64(), // authorizedVoters.length
seq(struct([nu64('epoch'), publicKey('authorizedVoter')]), offset(u32(), -8), 'authorizedVoters'), struct([seq(struct([publicKey('authorizedPubkey'), nu64('epochOfLastAuthorizedSwitch'), nu64('targetEpoch')]), 32, 'buf'), nu64('idx'), u8('isEmpty')], 'priorVoters'), nu64(), // epochCredits.length
seq(struct([nu64('epoch'), nu64('credits'), nu64('prevCredits')]), offset(u32(), -8), 'epochCredits'), struct([nu64('slot'), nu64('timestamp')], 'lastTimestamp')]);
/**
 * An enumeration of valid VoteInstructionType's
 */

Object.freeze({
  InitializeAccount: {
    index: 0,
    layout: struct([u32('instruction'), voteInit()])
  },
  Authorize: {
    index: 1,
    layout: struct([u32('instruction'), publicKey('newAuthorized'), u32('voteAuthorizationType')])
  },
  Withdraw: {
    index: 3,
    layout: struct([u32('instruction'), ns64('lamports')])
  }
});
/**
 * VoteAuthorize type
 */

/**
 * An enumeration of valid VoteAuthorization layouts.
 */
Object.freeze({
  Voter: {
    index: 0
  },
  Withdrawer: {
    index: 1
  }
});
new PublicKey('Vote111111111111111111111111111111111111111');

export { Connection };
