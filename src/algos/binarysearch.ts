export default function binarysearch(arr: number[], needle: number) {
  let lo = 0;
  let hi = arr.length - 1;

  while (lo <= hi) {
    const m = lo + Math.floor((hi - lo) / 2);

    if (arr[m] === needle) {
      return true;
    }

    if (arr[m] < needle) {
      lo = m + 1;
    } else {
      hi = m - 1;
    }
  }

  return false;
}
