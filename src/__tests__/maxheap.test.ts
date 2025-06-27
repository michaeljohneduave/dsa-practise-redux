import PriorityQueue from "../algos/priorityqueue"; // Assuming your MaxHeap is in this path

describe("Max Heap", () => {
	// Test 1: Basic functionality - a comprehensive sequence of pushes and pops
	test("should correctly push elements and pop them in descending order", () => {
		const heap = new PriorityQueue("Max");

		expect(heap.length).toEqual(0);
		expect(heap.peek()).toBeNull(); // Initial state: peek should be null

		heap.push({ val: 5 });
		heap.push({ val: 3 });
		heap.push({ val: 69 });
		heap.push({ val: 420 });
		heap.push({ val: 4 });
		heap.push({ val: 1 });
		heap.push({ val: 8 });
		heap.push({ val: 7 });

		expect(heap.length).toEqual(8);
		expect(heap.peek()).toEqual({ val: 420 }); // Peek should show the maximum

		expect(heap.pop()).toEqual({ val: 420 });
		expect(heap.peek()).toEqual({ val: 69 }); // Peek should update

		expect(heap.pop()).toEqual({ val: 69 });
		expect(heap.pop()).toEqual({ val: 8 });
		expect(heap.pop()).toEqual({ val: 7 });
		expect(heap.length).toEqual(4);
		expect(heap.peek()).toEqual({ val: 5 }); // Peek again

		expect(heap.pop()).toEqual({ val: 5 });
		expect(heap.pop()).toEqual({ val: 4 });
		expect(heap.pop()).toEqual({ val: 3 });
		expect(heap.pop()).toEqual({ val: 1 });

		expect(heap.length).toEqual(0);
		expect(heap.pop()).toBeNull(); // Pop on empty heap
		expect(heap.peek()).toBeNull(); // Peek on empty heap
	});

	// Test 2: Edge case - operations on an initially empty heap
	test("should handle operations on an empty heap gracefully", () => {
		const heap = new PriorityQueue("Max");
		expect(heap.length).toEqual(0);
		expect(heap.pop()).toBeNull(); // Expect null or undefined, not an error
		expect(heap.peek()).toBeNull(); // Expect null or undefined
		expect(heap.length).toEqual(0);
	});

	// Test 3: Edge case - single element heap
	test("should correctly handle a single element heap", () => {
		const heap = new PriorityQueue("Max");
		heap.push({ val: 10 });
		expect(heap.length).toEqual(1);
		expect(heap.peek()).toEqual({ val: 10 });

		expect(heap.pop()).toEqual({ val: 10 });
		expect(heap.length).toEqual(0);
		expect(heap.peek()).toBeNull();
		expect(heap.pop()).toBeNull();
	});

	// Test 4: Duplicate values - ensures correct ordering and handling of same values
	test("should correctly handle duplicate values", () => {
		const heap = new PriorityQueue("Max");
		heap.push({ val: 5 });
		heap.push({ val: 3 });
		heap.push({ val: 5 });
		heap.push({ val: 1 });
		heap.push({ val: 3 });
		heap.push({ val: 0 });
		heap.push({ val: 10 });
		heap.push({ val: 10 });

		expect(heap.length).toEqual(8);
		expect(heap.peek()).toEqual({ val: 10 });

		expect(heap.pop()).toEqual({ val: 10 });
		expect(heap.pop()).toEqual({ val: 10 });
		expect(heap.pop()).toEqual({ val: 5 });
		expect(heap.pop()).toEqual({ val: 5 });
		expect(heap.pop()).toEqual({ val: 3 });
		expect(heap.pop()).toEqual({ val: 3 });
		expect(heap.pop()).toEqual({ val: 1 });
		expect(heap.pop()).toEqual({ val: 0 });
		expect(heap.length).toEqual(0);
		expect(heap.pop()).toBeNull();
	});

	// Test 5: Interleaving push and pop operations (common in LeetCode problems)
	test("should handle interleaved push and pop operations correctly", () => {
		const heap = new PriorityQueue("Max");

		heap.push({ val: 10 });
		expect(heap.peek()).toEqual({ val: 10 });

		heap.push({ val: 20 });
		expect(heap.peek()).toEqual({ val: 20 });

		heap.push({ val: 5 });
		expect(heap.peek()).toEqual({ val: 20 });

		expect(heap.pop()).toEqual({ val: 20 }); // Popping 20
		expect(heap.peek()).toEqual({ val: 10 });

		heap.push({ val: 30 });
		heap.push({ val: 15 });
		expect(heap.peek()).toEqual({ val: 30 });

		expect(heap.pop()).toEqual({ val: 30 }); // Popping 30
		expect(heap.pop()).toEqual({ val: 15 }); // Popping 15
		expect(heap.pop()).toEqual({ val: 10 }); // Popping 10
		expect(heap.pop()).toEqual({ val: 5 }); // Popping 5

		expect(heap.length).toEqual(0);
		expect(heap.pop()).toBeNull();
	});

	// Test 6: Pushing elements in ascending order (stressing the heapify-up on push)
	test("should work correctly when elements are pushed in ascending order", () => {
		const heap = new PriorityQueue("Max");
		const elements = [10, 20, 30, 40, 50];
		elements.forEach((val) => heap.push({ val }));

		expect(heap.length).toEqual(5);
		expect(heap.peek()).toEqual({ val: 50 });

		expect(heap.pop()).toEqual({ val: 50 });
		expect(heap.pop()).toEqual({ val: 40 });
		expect(heap.pop()).toEqual({ val: 30 });
		expect(heap.pop()).toEqual({ val: 20 });
		expect(heap.pop()).toEqual({ val: 10 });
		expect(heap.length).toEqual(0);
	});

	// Test 7: Pushing elements in descending order (simple case)
	test("should work correctly when elements are pushed in descending order", () => {
		const heap = new PriorityQueue("Max");
		const elements = [50, 40, 30, 20, 10];
		elements.forEach((val) => heap.push({ val }));

		expect(heap.length).toEqual(5);
		expect(heap.peek()).toEqual({ val: 50 });

		expect(heap.pop()).toEqual({ val: 50 });
		expect(heap.pop()).toEqual({ val: 40 });
		expect(heap.pop()).toEqual({ val: 30 });
		expect(heap.pop()).toEqual({ val: 20 });
		expect(heap.pop()).toEqual({ val: 10 });
		expect(heap.length).toEqual(0);
	});

	// Test 8: Stress test with a large number of random elements
	test("should handle a large number of random elements accurately", () => {
		const heap = new PriorityQueue("Max");
		const numElements = 5000; // Increased count for better stress test
		const testData = [];

		// Push random elements to the heap and also store them for verification
		for (let i = 0; i < numElements; i++) {
			const val = Math.floor(Math.random() * 1000000); // Larger range
			heap.push({ val });
			testData.push({ val });
		}

		expect(heap.length).toEqual(numElements);

		// Sort the original data in DESCENDING order to compare against the popped elements
		testData.sort((a, b) => b.val - a.val);

		// Pop all elements and verify they are in sorted descending order
		for (let i = 0; i < numElements; i++) {
			expect(heap.pop()).toEqual(testData[i]);
		}

		expect(heap.length).toEqual(0);
		expect(heap.pop()).toBeNull();
	});
});
