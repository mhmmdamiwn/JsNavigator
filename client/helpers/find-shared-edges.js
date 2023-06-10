export function findSharedEdges(network, nodes) {
  const sharedEdges = [];

  for (let i = 0; i < nodes.length; ++i) {
    const edges = network.getConnectedEdges(nodes[i]);

    for (let j = 0; j < edges.length; ++j) {
      const item = edges[j];
      const edge = network.body.data.edges.get(item);
      if (
        nodes.includes(edge.to) &&
        nodes.includes(edge.from) &&
        !sharedEdges.includes(item)
      )
        sharedEdges.push(item);
    }
  }

  return sharedEdges;
}
