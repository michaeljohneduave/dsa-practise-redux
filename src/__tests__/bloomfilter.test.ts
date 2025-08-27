import { randomBytes } from "node:crypto";
import BloomFilter from "../algos/hash/bloomFilter";

const randString = (len = 16) => {
	const r = randomBytes(len).toString("hex");
	return r.slice(0, len);
};

// theoretical false positive probability p = (1 - e^{-k*n/m})^k
const theoreticalFP = (m: number, k: number, n: number) => {
	if (k === 0) return 0;
	const exp = Math.exp(-(k * n) / m);
	return (1 - exp) ** k;
};
describe("bloomFilter - basic properties", () => {
	test("no false negatives: all inserted items are reported present", () => {
		const m = 10_000;
		const k = 7;
		const n = 2000;
		const bf = BloomFilter(m, k);
		const items: string[] = [];
		for (let i = 0; i < n; i++) {
			const s = randString(12) + i;
			items.push(s);
			bf.add(s);
		}
		// each inserted item must be present (no false negatives)
		for (const it of items) {
			expect(bf.has(it)).toBe(true);
		}
	});

	test("observed false positive rate roughly follows theory", () => {
		const m = 50_000;
		const k = 5;
		const n = 3_000;
		const bf = new BloomFilter(m, k);

		const added = new Set<string>();
		for (let i = 0; i < n; i++) {
			const s = `item-${i}-${randString(6)}`;
			added.add(s);
			bf.add(s);
		}

		// test on a big sample of negatives
		const trials = 10_000;
		let positives = 0;
		for (let i = 0; i < trials; i++) {
			let candidate: string;
			do {
				candidate = `q-${randString(12)}-${i}`;
			} while (added.has(candidate));
			if (bf.has(candidate)) positives++;
		}

		const observed = positives / trials;
		const expected = theoreticalFP(m, k, n);

		// Allow some slack due to randomness. Require observed <= expected * 1.5 + 0.01
		const threshold = expected * 1.5 + 0.01;
		// Print for debugging if something fails
		// eslint-disable-next-line no-console
		console.info(
			"observedFP=",
			observed.toFixed(4),
			"expectedFP=",
			expected.toFixed(4),
		);
		expect(observed).toBeLessThanOrEqual(threshold);
	});

	test("duplicate adds do not create false negatives and do not inflate bitCount", () => {
		const m = 2000;
		const k = 3;
		const bf = new BloomFilter(m, k);
		const a = "duplicate-item-xyz";
		const before = bf.bitCount();
		bf.add(a);
		const afterFirst = bf.bitCount();
		bf.add(a);
		const afterSecond = bf.bitCount();
		// bitCount should not decrease and should be same after repeated adds
		expect(afterFirst).toBeGreaterThanOrEqual(before);
		expect(afterSecond).toBe(afterFirst);
		expect(bf.has(a)).toBe(true);
	});

	test("k=0 behavior: nothing is ever present", () => {
		const m = 100;
		const k = 0;
		const bf = new BloomFilter(m, k);
		bf.add("anything");
		expect(bf.bitCount()).toBe(0);
		expect(bf.has("anything")).toBe(false);
		expect(bf.has("other")).toBe(false);
	});

	test("positions are deterministic and in range", () => {
		const m = 1024;
		const k = 10;
		const bf = new BloomFilter(m, k);
		const item = "deterministic-key";
		const p1 = bf.positions(item);
		const p2 = bf.positions(item);
		expect(p1.length).toBe(k);
		expect(p1).toEqual(p2);
		for (const pos of p1) {
			expect(pos).toBeGreaterThanOrEqual(0);
			expect(pos).toBeLessThan(m);
			expect(Number.isInteger(pos)).toBe(true);
		}
	});

	test("serialize/deserialize preserves state", () => {
		const m = 500;
		const k = 4;
		const bf = new BloomFilter(m, k);
		const items = ["a", "b", "c", "d", "x1", "x2"];
		items.forEach((it) => bf.add(it));
		const json = bf.toJSON();
		const restored = BloomFilter.fromJSON(json);
		expect(restored.m).toBe(bf.m);
		expect(restored.k).toBe(bf.k);
		expect(restored.bitCount()).toBe(bf.bitCount());
		for (const it of items) expect(restored.has(it)).toBe(true);
	});

	test("union of two filters equals filter built from combined items", () => {
		const m = 8000;
		const k = 6;
		const aItems: string[] = [];
		const bItems: string[] = [];
		const a = new BloomFilter(m, k);
		const b = new BloomFilter(m, k);
		for (let i = 0; i < 700; i++) {
			const sa = `A-${i}-${randString(6)}`;
			const sb = `B-${i}-${randString(6)}`;
			aItems.push(sa);
			bItems.push(sb);
			a.add(sa);
			b.add(sb);
		}
		const u = a.union(b);
		// everything from a and b should be present in union
		for (const it of aItems) expect(u.has(it)).toBe(true);
		for (const it of bItems) expect(u.has(it)).toBe(true);

		// Build a fresh filter from combined set and compare bitCount-ish properties
		const merged = new BloomFilter(m, k);
		[...aItems, ...bItems].forEach((x) => merged.add(x));
		// merged.must be subset of u (but due to same algorithm they should be equal)
		// check bitCount equality (stronger)
		expect(u.bitCount()).toBe(merged.bitCount());
		// optional: check has on some combined items
		for (let i = 0; i < 50; i++) {
			const it = `A-${i}-${""}`; // likely not actual; instead pick from aItems/bItems
			// choose from existing lists:
			expect(u.has(aItems[i])).toBe(true);
			expect(u.has(bItems[i])).toBe(true);
		}
	});

	test("clear resets filter to empty", () => {
		const bf = new BloomFilter(1000, 5);
		bf.add("one");
		expect(bf.bitCount()).toBeGreaterThan(0);
		bf.clear();
		expect(bf.bitCount()).toBe(0);
		expect(bf.has("one")).toBe(false);
	});
});
