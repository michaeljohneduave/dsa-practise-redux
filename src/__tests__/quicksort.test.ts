import quick_sort from "../sorting/quicksort";

describe("QuickSort Test Suite", () => {
  test("standard cases", () => {
    const arr1 = [9, 3, 7, 4, 69, 420, 42];
    quick_sort(arr1);
    expect(arr1).toEqual([3, 4, 7, 9, 42, 69, 420]);

    const arr2 = [5, 4, 3, 2, 1];
    quick_sort(arr2);
    expect(arr2).toEqual([1, 2, 3, 4, 5]);
  });

  test("empty and single element arrays", () => {
    const arr1: number[] = [];
    quick_sort(arr1);
    expect(arr1).toEqual([]);

    const arr2 = [1];
    quick_sort(arr2);
    expect(arr2).toEqual([1]);
  });

  test("duplicate elements", () => {
    const arr1 = [3, 3, 3, 3];
    quick_sort(arr1);
    expect(arr1).toEqual([3, 3, 3, 3]);

    const arr2 = [4, 2, 4, 2, 4];
    quick_sort(arr2);
    expect(arr2).toEqual([2, 2, 4, 4, 4]);
  });

  test("already sorted arrays", () => {
    const arr1 = [1, 2, 3, 4, 5];
    quick_sort(arr1);
    expect(arr1).toEqual([1, 2, 3, 4, 5]);

    const arr2 = [5, 5, 5, 6, 6];
    quick_sort(arr2);
    expect(arr2).toEqual([5, 5, 5, 6, 6]);
  });

  test("reverse sorted arrays", () => {
    const arr1 = [5, 4, 3, 2, 1];
    quick_sort(arr1);
    expect(arr1).toEqual([1, 2, 3, 4, 5]);

    const arr2 = [100, 90, 80, 70, 60];
    quick_sort(arr2);
    expect(arr2).toEqual([60, 70, 80, 90, 100]);
  });

  test("negative numbers", () => {
    const arr1 = [-5, -3, -7, -1, -9];
    quick_sort(arr1);
    expect(arr1).toEqual([-9, -7, -5, -3, -1]);

    const arr2 = [-3, 0, 3, -6, 6];
    quick_sort(arr2);
    expect(arr2).toEqual([-6, -3, 0, 3, 6]);
  });

  test("large arrays", () => {
    const arr = Array.from({ length: 1000 }, (_, i) => 1000 - i);
    const sorted = [...arr].sort((a, b) => a - b);
    quick_sort(arr);
    expect(arr).toEqual(sorted);
  });

  test("arrays with repeated pivot values", () => {
    const arr1 = [5, 5, 5, 2, 2, 2, 8, 8, 8];
    quick_sort(arr1);
    expect(arr1).toEqual([2, 2, 2, 5, 5, 5, 8, 8, 8]);

    const arr2 = [1, 1, 1, 1, 0, 0, 0, 0];
    quick_sort(arr2);
    expect(arr2).toEqual([0, 0, 0, 0, 1, 1, 1, 1]);
  });

  test("arrays with alternating patterns", () => {
    const arr = [1, 3, 1, 3, 1, 3, 1, 3];
    quick_sort(arr);
    expect(arr).toEqual([1, 1, 1, 1, 3, 3, 3, 3]);
  });
});
