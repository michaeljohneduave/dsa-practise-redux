export default function bfsGraphMatrix(
  matrix: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] | null {
  if (source < 0 || source >= matrix.length ||
    needle < 0 || needle >= matrix.length ||
    !matrix.length) {
    return null;
  }

  const q = [source];
  const seen = new Array(matrix.length).fill(false);
  const prev = new Array(matrix.length).fill(-1);
  const path: number[] = [];

  while (q.length) {
    const node = q.shift()!;
    if (node === needle) {
      path.push(needle);
      break;
    }

    const connections = matrix[node];
    seen[node] = true;

    for (let i = 0; i < connections.length; i++) {
      if (connections[i]) {
        if (seen[i]) {
          continue;
        }

        prev[i] = node;
        q.push(i);
      }
    }
  }

  let node = prev[needle];
  while (node !== -1) {
    path.push(node)
    node = prev[node];
  }

  if (!path.length) {
    return null;
  }

  path.reverse()

  return path;
}
