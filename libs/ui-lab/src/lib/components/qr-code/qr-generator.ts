// Simple QR Code Generator
// Based on ISO/IEC 18004 standard

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

const EC_LEVELS: Record<ErrorCorrectionLevel, number> = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2,
};

// Generator polynomials for Reed-Solomon error correction
const GEN_POLY: Record<number, number[]> = {
  7: [87, 229, 146, 149, 238, 102, 21],
  10: [251, 67, 46, 61, 118, 70, 64, 94, 32, 45],
  13: [74, 152, 176, 100, 86, 100, 106, 104, 130, 218, 206, 140, 78],
  15: [8, 183, 61, 91, 202, 37, 51, 58, 58, 237, 140, 124, 5, 99, 105],
  16: [
    120, 104, 107, 109, 102, 161, 76, 3, 91, 191, 147, 169, 182, 194, 225, 120,
  ],
  17: [
    43, 139, 206, 78, 43, 239, 123, 206, 214, 147, 24, 99, 150, 39, 243, 163,
    136,
  ],
  18: [
    215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179, 5, 98,
    96, 153,
  ],
  20: [
    17, 60, 79, 50, 61, 163, 26, 187, 202, 180, 221, 225, 83, 239, 156, 164,
    212, 212, 188, 190,
  ],
  22: [
    210, 171, 247, 242, 93, 230, 14, 109, 221, 53, 200, 74, 8, 172, 98, 80, 219,
    134, 160, 105, 165, 231,
  ],
  24: [
    229, 121, 135, 48, 211, 117, 251, 126, 159, 180, 169, 152, 192, 226, 228,
    218, 111, 0, 117, 232, 87, 96, 227, 21,
  ],
  26: [
    173, 125, 158, 2, 103, 182, 118, 17, 145, 201, 111, 28, 165, 53, 161, 21,
    245, 142, 13, 102, 48, 227, 153, 145, 218, 70,
  ],
  28: [
    168, 223, 200, 104, 224, 234, 108, 180, 110, 190, 195, 147, 205, 27, 232,
    201, 21, 43, 245, 87, 42, 195, 212, 119, 242, 37, 9, 123,
  ],
  30: [
    41, 173, 145, 152, 216, 31, 179, 182, 50, 48, 110, 86, 239, 96, 222, 125,
    42, 173, 226, 193, 224, 130, 156, 37, 251, 216, 238, 40, 192, 180,
  ],
};

// Galois field tables
const EXP_TABLE: number[] = [];
const LOG_TABLE: number[] = [];

// Initialize Galois field tables
(function initGaloisField() {
  let x = 1;
  for (let i = 0; i < 256; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x *= 2;
    if (x >= 256) x ^= 285;
  }
})();

function gfMultiply(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP_TABLE[(LOG_TABLE[a] + LOG_TABLE[b]) % 255];
}

// Version capacity table (L, M, Q, H)
const VERSION_CAPACITY: number[][] = [
  [0, 0, 0, 0], // Placeholder for version 0
  [19, 16, 13, 9],
  [34, 28, 22, 16],
  [55, 44, 34, 26],
  [80, 64, 48, 36],
  [108, 86, 62, 46],
  [136, 108, 76, 60],
  [156, 124, 88, 66],
  [194, 154, 110, 86],
  [232, 182, 132, 100],
  [274, 216, 154, 122],
  [324, 254, 180, 140],
  [370, 290, 206, 158],
  [428, 334, 244, 180],
  [461, 365, 261, 197],
  [523, 415, 295, 223],
  [589, 453, 325, 253],
  [647, 507, 367, 283],
  [721, 563, 397, 313],
  [795, 627, 445, 341],
  [861, 669, 485, 385],
];

// Error correction codewords per block
const EC_CODEWORDS: number[][] = [
  [0, 0, 0, 0],
  [7, 10, 13, 17],
  [10, 16, 22, 28],
  [15, 26, 18, 22],
  [20, 18, 26, 16],
  [26, 24, 18, 22],
  [18, 16, 24, 28],
  [20, 18, 18, 26],
  [24, 22, 22, 26],
  [30, 22, 20, 24],
  [18, 26, 24, 28],
  [20, 30, 28, 24],
  [24, 22, 26, 28],
  [26, 22, 24, 22],
  [30, 24, 20, 24],
  [22, 24, 30, 24],
  [24, 28, 24, 30],
  [28, 28, 28, 28],
  [30, 26, 28, 28],
  [28, 26, 26, 26],
  [28, 26, 30, 28],
];

function getVersion(data: string, ecLevel: ErrorCorrectionLevel): number {
  const ecIndex = EC_LEVELS[ecLevel];
  const byteLen = new TextEncoder().encode(data).length;

  for (let v = 1; v <= 20; v++) {
    // Byte mode capacity (subtract mode indicator and count indicator)
    const capacity = VERSION_CAPACITY[v][ecIndex] - (v < 10 ? 2 : 3);
    if (capacity >= byteLen) return v;
  }
  return 20; // Max supported version
}

function getSize(version: number): number {
  return 17 + version * 4;
}

function createMatrix(size: number): (boolean | null)[][] {
  return Array.from({ length: size }, () => Array(size).fill(null));
}

function addFinderPattern(
  matrix: (boolean | null)[][],
  row: number,
  col: number,
): void {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const rr = row + r;
      const cc = col + c;
      if (rr < 0 || rr >= matrix.length || cc < 0 || cc >= matrix.length)
        continue;

      if (r === -1 || r === 7 || c === -1 || c === 7) {
        matrix[rr][cc] = false; // Separator
      } else if (r === 0 || r === 6 || c === 0 || c === 6) {
        matrix[rr][cc] = true; // Border
      } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
        matrix[rr][cc] = true; // Center
      } else {
        matrix[rr][cc] = false;
      }
    }
  }
}

function addAlignmentPattern(
  matrix: (boolean | null)[][],
  row: number,
  col: number,
): void {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const rr = row + r;
      const cc = col + c;
      if (matrix[rr][cc] !== null) continue;

      if (r === -2 || r === 2 || c === -2 || c === 2) {
        matrix[rr][cc] = true;
      } else if (r === 0 && c === 0) {
        matrix[rr][cc] = true;
      } else {
        matrix[rr][cc] = false;
      }
    }
  }
}

function addTimingPatterns(matrix: (boolean | null)[][]): void {
  const size = matrix.length;
  for (let i = 8; i < size - 8; i++) {
    const bit = i % 2 === 0;
    if (matrix[6][i] === null) matrix[6][i] = bit;
    if (matrix[i][6] === null) matrix[i][6] = bit;
  }
}

function addFormatInfo(
  matrix: (boolean | null)[][],
  ecLevel: ErrorCorrectionLevel,
  mask: number,
): void {
  const size = matrix.length;
  const formatBits = getFormatBits(ecLevel, mask);

  // Around top-left finder
  for (let i = 0; i <= 5; i++) {
    matrix[8][i] = ((formatBits >> (14 - i)) & 1) === 1;
  }
  matrix[8][7] = ((formatBits >> 8) & 1) === 1;
  matrix[8][8] = ((formatBits >> 7) & 1) === 1;
  matrix[7][8] = ((formatBits >> 6) & 1) === 1;
  for (let i = 0; i <= 5; i++) {
    matrix[5 - i][8] = ((formatBits >> i) & 1) === 1;
  }

  // Around top-right and bottom-left finders
  for (let i = 0; i <= 7; i++) {
    matrix[size - 1 - i][8] = ((formatBits >> i) & 1) === 1;
  }
  for (let i = 0; i <= 7; i++) {
    matrix[8][size - 8 + i] = ((formatBits >> (14 - i)) & 1) === 1;
  }

  // Dark module
  matrix[size - 8][8] = true;
}

function getFormatBits(ecLevel: ErrorCorrectionLevel, mask: number): number {
  const data = (EC_LEVELS[ecLevel] << 3) | mask;
  let bits = data << 10;

  // BCH error correction
  for (let i = 14; i >= 10; i--) {
    if ((bits >> i) & 1) {
      bits ^= 0x537 << (i - 10);
    }
  }
  bits = (data << 10) | bits;

  // XOR mask
  return bits ^ 0x5412;
}

function encodeData(
  data: string,
  version: number,
  ecLevel: ErrorCorrectionLevel,
): number[] {
  const bytes = new TextEncoder().encode(data);
  const bits: number[] = [];

  // Mode indicator (byte mode = 0100)
  bits.push(0, 1, 0, 0);

  // Character count indicator
  const countBits = version < 10 ? 8 : 16;
  for (let i = countBits - 1; i >= 0; i--) {
    bits.push((bytes.length >> i) & 1);
  }

  // Data bytes
  for (const byte of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((byte >> i) & 1);
    }
  }

  // Terminator
  const ecIndex = EC_LEVELS[ecLevel];
  const capacity = VERSION_CAPACITY[version][ecIndex] * 8;
  const terminatorLen = Math.min(4, capacity - bits.length);
  for (let i = 0; i < terminatorLen; i++) bits.push(0);

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);

  // Pad codewords
  const padBytes = [0xec, 0x11];
  let padIndex = 0;
  while (bits.length < capacity) {
    for (let i = 7; i >= 0; i--) {
      bits.push((padBytes[padIndex] >> i) & 1);
    }
    padIndex = (padIndex + 1) % 2;
  }

  // Convert to bytes
  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      byte = (byte << 1) | bits[i + j];
    }
    codewords.push(byte);
  }

  return codewords;
}

function generateErrorCorrection(data: number[], ecCount: number): number[] {
  const poly = GEN_POLY[ecCount];
  if (!poly) return [];

  const result = [...data, ...Array(ecCount).fill(0)];

  for (let i = 0; i < data.length; i++) {
    const coef = result[i];
    if (coef !== 0) {
      for (let j = 0; j < poly.length; j++) {
        result[i + j + 1] ^= gfMultiply(poly[j], coef);
      }
    }
  }

  return result.slice(data.length);
}

function placeData(
  matrix: (boolean | null)[][],
  codewords: number[],
  ecCodewords: number[],
): void {
  const size = matrix.length;
  const allCodewords = [...codewords, ...ecCodewords];
  let bitIndex = 0;

  // Place bits in zigzag pattern
  let upward = true;
  for (let col = size - 1; col >= 1; col -= 2) {
    if (col === 6) col = 5; // Skip timing column

    for (let i = 0; i < size; i++) {
      const row = upward ? size - 1 - i : i;

      for (const c of [col, col - 1]) {
        if (matrix[row][c] === null) {
          const byteIndex = Math.floor(bitIndex / 8);
          const bitOffset = 7 - (bitIndex % 8);

          if (byteIndex < allCodewords.length) {
            matrix[row][c] = ((allCodewords[byteIndex] >> bitOffset) & 1) === 1;
          } else {
            matrix[row][c] = false;
          }
          bitIndex++;
        }
      }
    }
    upward = !upward;
  }
}

function applyMask(
  matrix: (boolean | null)[][],
  mask: number,
  reserved: (boolean | null)[][],
): void {
  const size = matrix.length;

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (reserved[row][col] !== null) continue;

      let invert = false;
      switch (mask) {
        case 0:
          invert = (row + col) % 2 === 0;
          break;
        case 1:
          invert = row % 2 === 0;
          break;
        case 2:
          invert = col % 3 === 0;
          break;
        case 3:
          invert = (row + col) % 3 === 0;
          break;
        case 4:
          invert = (Math.floor(row / 2) + Math.floor(col / 3)) % 2 === 0;
          break;
        case 5:
          invert = ((row * col) % 2) + ((row * col) % 3) === 0;
          break;
        case 6:
          invert = (((row * col) % 2) + ((row * col) % 3)) % 2 === 0;
          break;
        case 7:
          invert = (((row + col) % 2) + ((row * col) % 3)) % 2 === 0;
          break;
      }

      if (invert && matrix[row][col] !== null) {
        matrix[row][col] = !matrix[row][col];
      }
    }
  }
}

export function generateQRCode(
  data: string,
  ecLevel: ErrorCorrectionLevel = 'M',
): boolean[][] {
  const version = getVersion(data, ecLevel);
  const size = getSize(version);
  const matrix = createMatrix(size);

  // Add finder patterns
  addFinderPattern(matrix, 0, 0);
  addFinderPattern(matrix, 0, size - 7);
  addFinderPattern(matrix, size - 7, 0);

  // Add timing patterns
  addTimingPatterns(matrix);

  // Add alignment patterns for version >= 2
  if (version >= 2) {
    const alignPos = 6 + version * 4;
    if (version === 2) {
      addAlignmentPattern(matrix, alignPos, alignPos);
    } else {
      const positions = [6, alignPos];
      for (const r of positions) {
        for (const c of positions) {
          if (
            (r === 6 && c === 6) ||
            (r === 6 && c === alignPos) ||
            (r === alignPos && c === 6)
          ) {
            continue;
          }
          addAlignmentPattern(matrix, r, c);
        }
      }
    }
  }

  // Reserve format info areas
  const reserved = createMatrix(size);
  for (let i = 0; i < 9; i++) {
    reserved[8][i] = true;
    reserved[i][8] = true;
    reserved[8][size - 1 - i] = true;
    reserved[size - 1 - i][8] = true;
  }
  reserved[size - 8][8] = true;

  // Copy finder/timing to reserved
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (matrix[row][col] !== null) {
        reserved[row][col] = true;
      }
    }
  }

  // Encode data
  const ecIndex = EC_LEVELS[ecLevel];
  const ecCount = EC_CODEWORDS[version][ecIndex];
  const codewords = encodeData(data, version, ecLevel);
  const ecCodewords = generateErrorCorrection(codewords, ecCount);

  // Place data
  placeData(matrix, codewords, ecCodewords);

  // Apply mask (using mask 0 for simplicity)
  const mask = 0;
  applyMask(matrix, mask, reserved);

  // Add format info
  addFormatInfo(matrix, ecLevel, mask);

  // Convert to boolean array
  return matrix.map((row) => row.map((cell) => cell === true));
}
