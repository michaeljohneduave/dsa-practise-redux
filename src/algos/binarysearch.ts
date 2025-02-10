export default function binarysearch(arr: number[], needle: number): boolean {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const m = lo + Math.floor((hi - lo) / 2);

    if (arr[m] === needle) {
      return true;
    }

    // Right side
    if (arr[m] < needle) {
      lo = m + 1;
    // Left side
    } else {
      hi = m - 1;
    }
  }

  return false;
}