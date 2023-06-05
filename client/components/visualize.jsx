import { useRef, useEffect } from "preact/hooks";
import { Network } from "vis-network";
import { useBackendFilesContext } from "../context/backend-files-context";
import { findSharedEdges } from "../helpers/find-shared-edges";

function Visualize() {
  const inputObject = {
    1: ["1", "2", "3"],
    2: ["1", "3"],
    6: ["1", "3"],
    5: ["1", "3"],
    8: ["1", "3"],
    9: ["1", "3"],
    7: ["1", "3"],
    5: ["1"],
    4: ["6"],
  };

  const container = useRef(null);

  const { backendFiles } = useBackendFilesContext();

  useEffect(() => {
    if (!container.current) return;

    const nodes = [];
    const edges = [];

    // iterate over the object and create nodes and edges
    Object.entries(inputObject).forEach(([key, value]) => {
      nodes.push({ id: key, label: key });
      value.forEach((dependency) => {
        edges.push({ from: key, to: dependency });
      });
    });

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      nodes: {
        shape: "dot",
        size: 10,
        font: {
          color: "white",
          background: "black",
        },
        color: {
          background: "#eb6734",
          border: "#400c3b",
        },
      },
      edges: {
        width: 1,
        color: "#dbab97",
        smooth: {
          type: "curvedCW",
        },
        arrows: {
          to: {
            enabled: true,
          },
        },
      },
      interaction: {
        hover: true,
        hoverConnectedEdges: true,
        selectable: true,
        selectConnectedEdges: true,
        multiselect: true,
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 150 },
      },
      layout: {
        hierarchical: {
          sortMethod: "directed",
          nodeSpacing: 50,
          levelSeparation: 50,
          treeSpacing: 50,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: false,
          direction: "LR",
          shakeTowards: "roots",
          fixedHierarchy: false,
        },
      },
    };

    const network = new Network(container.current, data, options);

    for (let i = 0; i < backendFiles.length; i++) {
      network.body.data.nodes.update({
        id: backendFiles[i],
        color: { background: "#8133F1" },
        font: { color: "white", background: "#353535" },
      });
    }

    const backendEdges = findSharedEdges(network, backendFiles);

    for (let i = 0; i < backendEdges.length; i++) {
      network.body.data.edges.update({
        id: backendEdges[i],
        color: "#AF8FDE",
      });
    }

    network.on("selectNode", function (event) {
      var selectedNodeId = event.nodes[0];
      var selectedNode = network.body.data.nodes.get(selectedNodeId);
      console.log(selectedNode);
      var fileURL = selectedNode.id;
      const url = `${fileURL}`;
      const currentDirectory = window.location.href
        .split("/")
        .slice(0, -1)
        .join("/");
      const newUrl = url.replace("root", currentDirectory);
      window.open(newUrl, "_blank");
    });

    //network.on(events);
    // Add event listener for hoverNode event
    network.on("hoverNode", function (event) {
      var hoveredNodeId = event.node;
      var connectedEdges = network.getConnectedEdges(hoveredNodeId);
      var connectedNodes = network.getConnectedNodes(hoveredNodeId);

      network.body.data.nodes.update({
        id: hoveredNodeId,
        color: { background: "#ffff00" },
        font: { color: "white", background: "#615f5e" },
      });

      // Change font color and node color of connected nodes
      for (var i = 0; i < connectedNodes.length; i++) {
        var nodeId = connectedNodes[i];
        network.body.data.nodes.update({
          id: nodeId,
          color: {
            background: backendFiles.includes(nodeId) ? "#6C31C6" : "#ffff00",
          },
          font: { color: "white", background: "#615f5e" },
        });
      }

      // Change color of connected edges
      for (var i = 0; i < connectedEdges.length; i++) {
        var edgeId = connectedEdges[i];
        network.body.data.edges.update({
          id: edgeId,
          color: backendEdges.includes(edgeId) ? "#AF8FDE" : "yellow",
        });
      }
      var allNodes = network.body.nodes;
      for (var nodeId in allNodes) {
        if (!connectedNodes.includes(nodeId) && nodeId !== hoveredNodeId) {
          network.body.data.nodes.update({ id: nodeId, font: { size: 0 } });
        }
      }
    });

    network.on("blurNode", function (event) {
      var hoveredNodeId = event.node;
      var connectedEdges = network.getConnectedEdges(hoveredNodeId);
      var connectedNodes = network.getConnectedNodes(hoveredNodeId);

      network.body.data.nodes.update({
        id: hoveredNodeId,
        color: {
          background: backendFiles.includes(hoveredNodeId)
            ? "#8133F1"
            : "#eb6734",
        },
        font: { color: "white", background: "black", size: 14 },
      });

      for (let i = 0; i < connectedNodes.length; i++) {
        const nodeId = connectedNodes[i];
        network.body.data.nodes.update({
          id: nodeId,
          color: {
            background: backendFiles.includes(nodeId) ? "#8133F1" : "#eb6734",
          },
          font: { color: "white", background: "black", size: 14 },
        });
      }

      // Change color of connected edges
      for (var i = 0; i < connectedEdges.length; i++) {
        var edgeId = connectedEdges[i];
        network.body.data.edges.update({
          id: edgeId,
          color: backendEdges.includes(edgeId)
            ? "#AF8FDE"
            : { background: "black" },
        });
      }
    });

    return () => {
      network.destroy();
    };
  }, [container, backendFiles]);

  return <div className="w-full h-full bg-[#212121]" ref={container} />;
}

export default Visualize;
