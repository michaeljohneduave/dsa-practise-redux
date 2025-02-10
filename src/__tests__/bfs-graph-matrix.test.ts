import bfs from "../algos/graphs/bfs-graph-matrix";

//     >(1)<--->(4) ---->(5)
//    /          |       /|
// (0)     ------|------- |
//    \   v      v        v
//     >(2) --> (3) <----(6)
const matrix2: WeightedAdjacencyMatrix = [
  [0, 3, 1, 0, 0, 0, 0], // 0
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 7, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 5, 0, 2, 0],
  [0, 0, 18, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 0, 1],
];


describe("BFS Graph Matrix Algorithm", () => {
  // Create a simple test matrix for isolated cases
  const simpleMatrix: WeightedAdjacencyMatrix = [
    [0, 1, 0],
    [0, 0, 1],
    [0, 0, 0],
  ];

  // Create a disconnected graph matrix
  const disconnectedMatrix: WeightedAdjacencyMatrix = [
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
  ];

  describe("Basic Path Finding", () => {
    test("should find the correct path from start to end", () => {
      expect(bfs(matrix2, 0, 6)).toEqual([0, 1, 4, 5, 6]);
    }, 1000);

    test("should return null when no path exists", () => {
      expect(bfs(matrix2, 6, 0)).toEqual(null);
    }, 1000);

    test("should handle path to self", () => {
      expect(bfs(matrix2, 0, 0)).toEqual([0]);
    }, 1000);
  });

  describe("Edge Cases", () => {
    test("should handle invalid vertices", () => {
      expect(bfs(matrix2, -1, 5)).toEqual(null);
      expect(bfs(matrix2, 0, 10)).toEqual(null);
      expect(bfs(matrix2, 10, 0)).toEqual(null);
    }, 1000);

    test("should handle empty matrix", () => {
      expect(bfs([], 0, 0)).toEqual(null);
    }, 1000);
  });

  describe("Simple Graph Scenarios", () => {
    test("should find direct path in simple graph", () => {
      expect(bfs(simpleMatrix, 0, 2)).toEqual([0, 1, 2]);
    }, 1000);

    test("should handle disconnected components", () => {
      expect(bfs(disconnectedMatrix, 0, 3)).toEqual(null);
      expect(bfs(disconnectedMatrix, 2, 3)).toEqual([2, 3]);
    }, 1000);
  });

  describe("Complex Path Scenarios", () => {
    test("should find paths of varying lengths", () => {
      // Short path
      expect(bfs(matrix2, 0, 1)).toEqual([0, 1]);
      // Medium path
      expect(bfs(matrix2, 0, 3)).toEqual([0, 1, 4, 3]);
      // Long path
      expect(bfs(matrix2, 0, 6)).toEqual([0, 1, 4, 5, 6]);
    }, 1000);

    test("should handle cycles in the graph", () => {
      // Path to a vertex that's part of a cycle (6 -> 3 -> 6)
      expect(bfs(matrix2, 5, 3)).toEqual([5, 6, 3]);
    }, 1000);
  });
});