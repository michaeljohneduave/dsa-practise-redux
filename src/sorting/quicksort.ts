function sort(arr: number[], lo: number, hi: number) {
  if (lo >= hi) {
    return;
  }

  const pivotIdx = partition(arr, lo, hi);

  sort(arr, lo, pivotIdx - 1);
  sort(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number) {
  const pivot = arr[hi];
  let positionIdx = lo - 1;

  for (let i = lo; i < hi; i++) {
    if (arr[i] < pivot) {
      positionIdx++;
      // Swap
      const tmp = arr[i];
      arr[i] = arr[positionIdx];
      arr[positionIdx] = tmp;
    }
  }

  positionIdx++;
  arr[hi] = arr[positionIdx];
  arr[positionIdx] = pivot;

  return positionIdx;
}

export default function quicksort(arr: number[]) {
  sort(arr, 0, arr.length - 1);
}
