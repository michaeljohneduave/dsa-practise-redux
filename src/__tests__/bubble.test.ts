import bubble_sort from "../sorting/bubble";

type SetLog = {
	index: number;
	oldValue: number | undefined;
	newValue: number | undefined;
};

function makeLoggingArray(arr: number[]) {
	const state = arr.slice();
	const logs: SetLog[] = [];

	const proxy = new Proxy(state, {
		get(target, prop) {
			if (prop === "logs") return logs;
			if (prop === "state") return state;
			if (prop === "length") return target.length;
			if (typeof prop === "string" && /^\d+$/.test(prop)) {
				return target[Number(prop)];
			}
			// allow array methods if needed
			return (target as any)[prop];
		},
		set(target, prop, value) {
			if (typeof prop === "string" && /^\d+$/.test(prop)) {
				const i = Number(prop);
				const old = target[i];
				logs.push({ index: i, oldValue: old, newValue: value });
				target[i] = value;
				return true;
			}
			(target as any)[prop] = value;
			return true;
		},
	});

	return { proxy: proxy as unknown as number[], logs, state };
}

function extractSwaps(logs: SetLog[]) {
	const swaps: Array<[number, number]> = [];
	for (let k = 0; k < logs.length - 1; k++) {
		const a = logs[k];
		const b = logs[k + 1];
		// detect an exchange performed as two consecutive sets:
		// arr[j] = arr[i]; arr[i] = tmp;
		if (a.newValue === b.oldValue && b.newValue === a.oldValue) {
			swaps.push([a.index, b.index]);
			k++; // skip the next log because we've consumed it as part of a swap
		}
	}
	return swaps;
}

test("bubble_sort only performs adjacent swaps", () => {
	const original = [9, 3, 7, 4, 69, 420, 42];
	const { proxy, logs, state } = makeLoggingArray(original);

	// run the implementation under test
	bubble_sort(proxy);

	// sanity: sorted correctly
	expect(state).toEqual([3, 4, 7, 9, 42, 69, 420]);

	const swaps = extractSwaps(logs);
	const nonAdjacent = swaps.filter(([i, j]) => Math.abs(i - j) !== 1);

	// if any non-adjacent swap occurred, it's not bubble sort
	expect(nonAdjacent).toEqual([]);
});

test("sorts a small array", () => {
	const arr = [9, 3, 7, 4, 69, 420, 42];
	bubble_sort(arr);
	expect(arr).toEqual([3, 4, 7, 9, 42, 69, 420]);
});

test("empty array", () => {
	const arr: number[] = [];
	bubble_sort(arr);
	expect(arr).toEqual([]);
});

test("single element", () => {
	const arr = [1];
	bubble_sort(arr);
	expect(arr).toEqual([1]);
});

test("already sorted", () => {
	const arr = [1, 2, 3, 4, 5];
	bubble_sort(arr);
	expect(arr).toEqual([1, 2, 3, 4, 5]);
});

test("reverse sorted", () => {
	const arr = [5, 4, 3, 2, 1];
	bubble_sort(arr);
	expect(arr).toEqual([1, 2, 3, 4, 5]);
});

test("duplicates", () => {
	const arr = [2, 3, 2, 1, 3, 1];
	bubble_sort(arr);
	expect(arr).toEqual([1, 1, 2, 2, 3, 3]);
});

test("negatives and floats", () => {
	const arr = [1.5, -2, 0, 3.14, -0.01];
	bubble_sort(arr);
	expect(arr).toEqual([-2, -0.01, 0, 1.5, 3.14]);
});
