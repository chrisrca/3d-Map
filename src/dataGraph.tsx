import React, { useState, useEffect } from 'react';
import { Vector3 } from 'three';
import { Line } from '@react-three/drei';

interface Node {
    id: string;
    coords: { x: number; y: number };
    floor: string;
    building: string;
    type: string;
    longName: string;
    shortName: string;
    edges: Edge[];
}

interface Edge {
    id: string;
    start: string;
    end: string;
}

const GraphMesh: React.FC<{ position: Vector3 }> = ({ position }) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    useEffect(() => {
        fetch('./nodes.csv')
            .then(response => response.text())
            .then(data => {
                const lines = data.trim().split(/\r?\n/);
                const nodesArray: Node[] = lines.slice(1).map(line => {
                    line = line.replace(/\r$/, '');
                    const [id, x, y, floor, building, type, longName, shortName] = line.split(',');
                    return {
                        id,
                        coords: { x: parseInt(x, 10), y: parseInt(y, 10) },
                        floor,
                        building,
                        type,
                        longName,
                        shortName,
                        edges: []  // Initially empty, will be populated from edges file
                    };
                }).filter(node => node.floor === 'L1');
                setNodes(nodesArray);
            });

        fetch('./edges.csv')
            .then(response => response.text())
            .then(data => {
                const lines = data.trim().split(/\r?\n/);
                const edgesArray: Edge[] = lines.slice(1).map(line => {
                    line = line.replace(/\r$/, '');
                    const [id, start, end] = line.split(',');
                    return { id, start, end };
                });
                setEdges(edgesArray);
            });
    }, []);

    return (
        <>
            {nodes.map((node, index) => (
                <mesh
                    key={index}
                    position={[((position.x - 50) + (node.coords.x / 50)), 0, ((position.z - 34) + (node.coords.y / 50))]}
                    rotation={[0, 0, 0]}
                    scale={hoveredNode === node.id ? [0.5, 0.5, 0.5] : [0.25, 0.25, 0.25]}
                    onPointerOver={() => setHoveredNode(node.id)}
                    onPointerOut={() => setHoveredNode(null)}
                >
                    <boxGeometry args={[0.75, 0.75, 0.75]} />
                    <meshBasicMaterial color="royalblue" />
                </mesh>
            ))}
            {edges.map((edge, index) => {
                const startNode = nodes.find(node => node.id === edge.start);
                const endNode = nodes.find(node => node.id === edge.end);
                if (startNode && endNode) {
                    return (
                        <Line
                            key={index}
                            points={[
                                [((position.x - 50) + (startNode.coords.x / 50)), 0, ((position.z - 34) + (startNode.coords.y / 50))],
                                [((position.x - 50) + (endNode.coords.x / 50)), 0, ((position.z - 34) + (endNode.coords.y / 50))]
                            ]}
                            color="orange"
                            lineWidth={10} 
                        />
                    );
                } else {
                    return null;
                }
            })}
        </>
    );
};

export default GraphMesh;
