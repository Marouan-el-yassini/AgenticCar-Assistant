import { Node, Edge, MarkerType } from 'reactflow';

export function parseN8nWorkflow(workflowData: any) {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  if (!workflowData || !workflowData.nodes || !workflowData.connections) {
    return { nodes, edges };
  }

  // Parse Nodes using EXACT original n8n positions
  workflowData.nodes.forEach((n8nNode: any) => {
    nodes.push({
      id: n8nNode.name,
      type: 'n8n',
      position: { 
        x: n8nNode.position[0], 
        y: n8nNode.position[1]
      },
      data: {
        label: n8nNode.name,
        type: n8nNode.type,
        parameters: n8nNode.parameters || {},
        id: n8nNode.id,
      },
    });
  });

  // Parse Edges
  Object.keys(workflowData.connections).forEach((sourceNodeName) => {
    const outputTypes = workflowData.connections[sourceNodeName];
    
    Object.keys(outputTypes).forEach((outputType) => {
      const connections = outputTypes[outputType];
      
      connections.forEach((connectionsArray: any[]) => {
        connectionsArray.forEach((connection: any) => {
          edges.push({
            id: `e-${sourceNodeName}-${connection.node}`,
            source: sourceNodeName,
            target: connection.node,
            animated: true,
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(16, 185, 129, 0.8)' },
            style: { stroke: 'rgba(16, 185, 129, 0.5)', strokeWidth: 2 },
          });
        });
      });
    });
  });

  return { nodes, edges };
}
