export default function bfsGraphMatrix(
  matrix: WeightedAdjacencyMatrix,
  source: number,
  needle: number
): number[] {
  const q = [source];
  const seen = new Array(matrix.length).fill(false);
  const prev = new Array(matrix.length).fill(-1);
  const path: number[] = [];

  while (q.length) {
    const node = q.shift();

    if (!node) {
      break;
    }

    const connections = matrix[node];

    if (seen[node]) {
      continue;
    }

    seen[node] = true;

    for (let i = 0; i < connections.length; i++) {
      if (connections[i]) {
        q.push(connections[i]);
      }
    }
  }

  return path;
}
