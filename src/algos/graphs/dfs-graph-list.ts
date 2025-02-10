function walk(list: WeightedAdjacencyList, node: number, needle: number, prev: number[], seen: boolean[], path: number[]) {
  if (node === needle) {
    path.push(node);
    return true;
  }
  
  seen[node] = true;

  const connections = list[node];

  for (let i = 0; i < connections.length; i++) {
    if (!seen[connections[i].to]) {
      prev[connections[i].to] = node;
      if (walk(list, connections[i].to, needle, prev, seen, path)) {
        path.push(node);
        return true;
      }
    }
  }

  return false;
}

export default function dfsGraphList(
  list: WeightedAdjacencyList,
  source: number,
  needle: number
): number[] | null {
  const seen = new Array(list.length).fill(false);
  const prev: number[] = new Array(list.length).fill(-1);
  const path: number[] = [];

  if (!list.length || source < 0 || needle < 0 || source >= list.length || needle >= list.length) {
    return null;
  }

  if (source === needle) {
    return [source];
  }

  if (walk(list, source, needle, prev, seen, path)) {
    path.reverse();
    return path;
  }

  return null;
}
