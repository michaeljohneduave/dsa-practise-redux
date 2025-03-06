import MinHeap from "../algos/minheap";

describe("Min Heap", () => {
  test("min heap", () => {
      const heap = new MinHeap();
  
      expect(heap.length).toEqual(0);
  
      heap.push({val: 5});
      heap.push({val: 3});
      heap.push({val: 69});
      heap.push({val: 420});
      heap.push({val: 4});
      heap.push({val: 1});
      heap.push({val: 8});
      heap.push({val: 7});
  
      expect(heap.length).toEqual(8);
      expect(heap.pop()).toEqual({val: 1});
      expect(heap.pop()).toEqual({val: 3});
      expect(heap.pop()).toEqual({val: 4});
      expect(heap.pop()).toEqual({val: 5});
      expect(heap.length).toEqual(4);
      expect(heap.pop()).toEqual({val: 7});
      expect(heap.pop()).toEqual({val: 8});
      expect(heap.pop()).toEqual({val: 69});
      expect(heap.pop()).toEqual({val: 420});
      expect(heap.length).toEqual(0);
  });
})
