import dijkstra from "../algos/graphs/dijkstras-path";
import MinHeap from "../algos/minheap";
import { list1 } from "./graph";


describe("Dijkstra's Algorithm", () => {
    // Test graph with various weighted paths
    const graph: WeightedAdjacencyList = [
        [{ to: 1, weight: 4 }, { to: 2, weight: 1 }],            // 0
        [{ to: 3, weight: 1 }],                                  // 1
        [{ to: 1, weight: 2 }, { to: 3, weight: 5 }],           // 2
        [{ to: 4, weight: 3 }],                                  // 3
        []                                                        // 4
    ];

    // Graph with negative weights (should handle or reject appropriately)
    const negativeGraph: WeightedAdjacencyList = [
        [{ to: 1, weight: -4 }, { to: 2, weight: 1 }],          // 0
        [{ to: 3, weight: 1 }],                                  // 1
        [{ to: 1, weight: 2 }, { to: 3, weight: 5 }],           // 2
        []                                                        // 3
    ];

    test("dijkstra via adj list", function () {
        /// waht?
        // what..
        // what...
        const result = dijkstra(list1, 0, 6);
        expect(result?.path).toEqual([0, 1, 4, 5, 6]);
        expect(result?.distance).toBe(7);
    });

    describe("Basic Path Finding", () => {
        test("should find shortest path in simple graph", () => {
            const result = dijkstra(graph, 0, 4);
            expect(result!.path).toEqual([0, 2, 1, 3, 4]);
            expect(result!.distance).toBe(7); // 4 + 1 + 3
        });

        test("should find shortest path when multiple paths exist", () => {
            const result = dijkstra(graph, 0, 3);
            expect(result?.path).toEqual([0, 2, 1, 3]);
            expect(result?.distance).toBe(4); // 1 + 2 + 1
        });

        test("should return null when no path exists", () => {
            expect(dijkstra(graph, 4, 0)).toBeNull();
        });
    });

    describe("Edge Cases", () => {
        test("should handle empty graph", () => {
            expect(dijkstra([], 0, 0)).toBeNull();
        });

        test("should handle invalid vertices", () => {
            expect(dijkstra(graph, -1, 4)).toBeNull();
            expect(dijkstra(graph, 0, 10)).toBeNull();
            expect(dijkstra(graph, 10, 0)).toBeNull();
        });

        test("should handle path to self", () => {
            const result = dijkstra(graph, 0, 0);
            expect(result?.path).toEqual([0]);
            expect(result?.distance).toBe(0);
        });
    });

    describe("Weight Handling", () => {
        test("should reject or handle negative weights appropriately", () => {
            // Implementation specific: either handle negative weights or reject them
            expect(() => dijkstra(negativeGraph, 0, 3)).toThrow();
        });

        test("should handle zero-weight edges", () => {
            const zeroWeightGraph: WeightedAdjacencyList = [
                [{ to: 1, weight: 0 }, { to: 2, weight: 1 }],
                [{ to: 2, weight: 0 }],
                []
            ];
            const result = dijkstra(zeroWeightGraph, 0, 2);
            expect(result?.path).toEqual([0, 1, 2]);
            expect(result?.distance).toBe(0);
        });
    });

    describe("Complex Path Scenarios", () => {
        const complexGraph: WeightedAdjacencyList = [
            [{ to: 1, weight: 4 }, { to: 2, weight: 2 }],            // 0
            [{ to: 2, weight: 1 }, { to: 3, weight: 5 }],           // 1
            [{ to: 3, weight: 8 }, { to: 4, weight: 10 }],          // 2
            [{ to: 4, weight: 2 }, { to: 5, weight: 6 }],           // 3
            [{ to: 5, weight: 3 }],                                  // 4
            []                                                        // 5
        ];

        test("should handle multiple alternative paths", () => {
            const result = dijkstra(complexGraph, 0, 4);
            // Shortest path should be 0->1->3->4 (4+5+2=11) instead of 0->2->4 (2+10=12)
            expect(result?.path).toEqual([0, 1, 3, 4]);
            expect(result?.distance).toBe(11);
        });
    });

    describe("Performance Scenarios", () => {
        test("should handle large graphs efficiently", () => {
            // Create a large graph with known shortest path
            const largeGraph: WeightedAdjacencyList = Array(1000).fill([]).map((_, i) => {
                if (i === 999) return [];
                return [{ to: i + 1, weight: 1 }];
            });

            const start = performance.now();
            const result = dijkstra(largeGraph, 0, 999);
            const end = performance.now();

            expect(result?.distance).toBe(999);
            expect(end - start).toBeLessThan(1000); // Should complete within 1 second
        });
    });
});