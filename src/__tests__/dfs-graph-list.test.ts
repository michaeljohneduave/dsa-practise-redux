import dfs from "../algos/graphs/dfs-graph-list";

describe("DFS Graph List", () => {
  // Test graphs
  const list2: WeightedAdjacencyList = [
    [{ to: 1, weight: 3 }, { to: 2, weight: 1 }],            // 0
    [{ to: 4, weight: 1 }],                                  // 1
    [{ to: 3, weight: 7 }],                                  // 2
    [],                                                       // 3
    [{ to: 1, weight: 1 }, { to: 3, weight: 5 }, { to: 5, weight: 2 }], // 4
    [{ to: 2, weight: 18 }, { to: 6, weight: 1 }],          // 5
    [{ to: 3, weight: 1 }],                                  // 6
  ];

  // Simple linear graph
  const linearGraph: WeightedAdjacencyList = [
    [{ to: 1, weight: 1 }],     // 0
    [{ to: 2, weight: 1 }],     // 1
    [{ to: 3, weight: 1 }],     // 2
    [],                         // 3
  ];

  // Cyclic graph
  const cyclicGraph: WeightedAdjacencyList = [
    [{ to: 1, weight: 1 }],     // 0
    [{ to: 2, weight: 1 }],     // 1
    [{ to: 0, weight: 1 }],     // 2
  ];

  describe("Basic Path Finding", () => {
    test("should find path in original graph", () => {
      expect(dfs(list2, 0, 6)).toEqual([0, 1, 4, 5, 6]);
      expect(dfs(list2, 6, 0)).toEqual(null);
    }, 1000);

    test("should find path in linear graph", () => {
      expect(dfs(linearGraph, 0, 3)).toEqual([0, 1, 2, 3]);
      expect(dfs(linearGraph, 1, 3)).toEqual([1, 2, 3]);
    }, 1000);

    test("should handle cyclic graphs", () => {
      expect(dfs(cyclicGraph, 0, 2)).toEqual([0, 1, 2]);
    }, 1000);
  });

  describe("Edge Cases", () => {
    test("should handle invalid inputs", () => {
      expect(dfs([], 0, 0)).toEqual(null);
      expect(dfs(list2, -1, 5)).toEqual(null);
      expect(dfs(list2, 0, -1)).toEqual(null);
      expect(dfs(list2, list2.length, 5)).toEqual(null);
      expect(dfs(list2, 0, list2.length)).toEqual(null);
    }, 1000);

    test("should handle same source and destination", () => {
      expect(dfs(list2, 0, 0)).toEqual([0]);
      expect(dfs(list2, 3, 3)).toEqual([3]);
    }, 1000);

    test("should handle unreachable nodes", () => {
      expect(dfs(list2, 3, 0)).toEqual(null);
      expect(dfs(list2, 6, 1)).toEqual(null);
    }, 1000);
  });

  describe("Special Graph Structures", () => {
    test("should handle single-node paths", () => {
      const singleNode: WeightedAdjacencyList = [[]];
      expect(dfs(singleNode, 0, 0)).toEqual([0]);
    }, 1000);

    test("should handle disconnected components", () => {
      const disconnectedGraph: WeightedAdjacencyList = [
        [{ to: 1, weight: 1 }],  // 0
        [{ to: 0, weight: 1 }],  // 1
        [{ to: 3, weight: 1 }],  // 2
        [{ to: 2, weight: 1 }],  // 3
      ];
      expect(dfs(disconnectedGraph, 0, 2)).toEqual(null);
      expect(dfs(disconnectedGraph, 2, 3)).toEqual([2, 3]);
    }, 1000);
  });
});