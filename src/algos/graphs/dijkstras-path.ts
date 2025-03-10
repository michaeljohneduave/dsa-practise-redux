
type ShortestPath = {
  path: number[];
  distance: number
}

type Node = {
  val: number;
  distance: number;
}

export default function dijkstras (graph: WeightedAdjacencyList, source: number, sink: number): ShortestPath | null {
}