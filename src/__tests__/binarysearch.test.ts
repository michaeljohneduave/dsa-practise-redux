import binary_fn from "../algos/binarysearch";

describe("Binary Search Test Suite", () => {
  test("standard cases - element present", () => {
    const arr = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
    expect(binary_fn(arr, 69)).toEqual(true);
    expect(binary_fn(arr, 69420)).toEqual(true);
    expect(binary_fn(arr, 1)).toEqual(true);
    expect(binary_fn(arr, 99)).toEqual(true);
  });

  test("standard cases - element not present", () => {
    const arr = [1, 3, 4, 69, 71, 81, 90, 99, 420, 1337, 69420];
    expect(binary_fn(arr, 1336)).toEqual(false);
    expect(binary_fn(arr, 69421)).toEqual(false);
    expect(binary_fn(arr, 0)).toEqual(false);
    expect(binary_fn(arr, 100)).toEqual(false);
  });

  test("leetcode edge cases - empty and minimal arrays", () => {
    expect(binary_fn([], 1)).toEqual(false);
    expect(binary_fn([1], 1)).toEqual(true);
    expect(binary_fn([1], 0)).toEqual(false);
    expect(binary_fn([1, 2], 1)).toEqual(true);
    expect(binary_fn([1, 2], 2)).toEqual(true);
  });

  test("leetcode edge cases - repeated elements", () => {
    const arr1 = [1, 1, 1, 1, 1];
    expect(binary_fn(arr1, 1)).toEqual(true);
    expect(binary_fn(arr1, 0)).toEqual(false);

    const arr2 = [1, 2, 2, 2, 2, 2];
    expect(binary_fn(arr2, 2)).toEqual(true);
    expect(binary_fn(arr2, 3)).toEqual(false);
  });

  test("leetcode edge cases - alternating patterns", () => {
    const arr = [1, 3, 3, 5, 5, 7, 7];
    expect(binary_fn(arr, 3)).toEqual(true);
    expect(binary_fn(arr, 6)).toEqual(false);
  });

  test("leetcode boundary cases - powers of two", () => {
    const arr = [1, 2, 4, 8, 16, 32, 64, 128];
    expect(binary_fn(arr, 1)).toEqual(true);
    expect(binary_fn(arr, 128)).toEqual(true);
    expect(binary_fn(arr, 0)).toEqual(false);
    expect(binary_fn(arr, 256)).toEqual(false);
  });

  test("leetcode boundary cases - sparse arrays", () => {
    const arr = [1, 1000, 2000, 3000, 4000, 5000];
    expect(binary_fn(arr, 1)).toEqual(true);
    expect(binary_fn(arr, 5000)).toEqual(true);
    expect(binary_fn(arr, 1500)).toEqual(false);
  });

  test("leetcode edge cases - negative and zero", () => {
    const arr = [-10, -5, 0, 5, 10];
    expect(binary_fn(arr, -10)).toEqual(true);
    expect(binary_fn(arr, 0)).toEqual(true);
    expect(binary_fn(arr, 10)).toEqual(true);
    expect(binary_fn(arr, -7)).toEqual(false);
  });

  test("leetcode edge cases - sequential boundaries", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binary_fn(arr, 0)).toEqual(false);
    expect(binary_fn(arr, 1)).toEqual(true);
    expect(binary_fn(arr, 5)).toEqual(true);
    expect(binary_fn(arr, 6)).toEqual(false);
  });
});
