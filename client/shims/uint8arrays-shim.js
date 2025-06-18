// Shim for uint8arrays modules
export const alloc = (size) => new Uint8Array(size);
export const allocUnsafe = (size) => new Uint8Array(size);
export const asUint8Array = (buf) => {
  if (buf instanceof Uint8Array) {
    return buf;
  }
  return new Uint8Array(buf);
};
export const concat = (arrays, length) => {
  if (!length) {
    length = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = new Uint8Array(length);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
};
export const equals = (a, b) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
export const toString = (buf, encoding = 'utf8') => {
  const decoder = new TextDecoder(encoding);
  return decoder.decode(buf);
};
export const fromString = (str, encoding = 'utf8') => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

// Export everything as a default export as well
export default {
  alloc,
  allocUnsafe,
  asUint8Array,
  concat,
  equals,
  toString,
  fromString
};
