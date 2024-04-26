import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { WebGLRenderer, TextureLoader, Vector3, Euler, Mesh, MeshStandardMaterial, Color, PCFSoftShadowMap } from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { THREE } from 'aframe';
import img from "./img.png";
import "./App.css"

const MapCanvas: React.FC = () => {
    const renderer = new WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    function CreateMesh(file: string) {
        const { nodes } = useGLTF(file);
        return nodes;
    }
    const M2b5685 = CreateMesh('/floormap.glb').CustomObject as Mesh;
    const Mstairs = CreateMesh('/stairs.glb').CustomObject as Mesh;

    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, img);
    const aspectRatio = 5000 / 3400;
    const width = 100;
    const height = width / aspectRatio;
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(new Vector3(0, 0, 0));
    const [rotation] = useState(new Euler(-Math.PI / 2, 0, 0));  // Face up by default

    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x2b5685), // Using numeric format
    });

    const handlePointerDown = (event: { stopPropagation: () => void; }) => {
        setIsDragging(true);
        event.stopPropagation();  // Prevent event bubbling
    };

    const handlePointerMove = (event: { movementX: any; movementY: any; stopPropagation: () => void; }) => {
        if (isDragging && meshRef.current) {
            const deltaX = event.movementX;
            const deltaZ = -event.movementY;  // Change to affect Z instead of Y
            setPosition(prev => new Vector3(prev.x + deltaX * 0.013, prev.y, prev.z - deltaZ * 0.013));
        }
        event.stopPropagation();
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    return (
        <>
            <mesh
                ref={meshRef}
                position={position}
                rotation={rotation}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            <mesh
                castShadow={true}
                receiveShadow={true}
                geometry={M2b5685.geometry}
                material={customMaterial}
                position={[(position.x - 49.99), 0, (position.z + 34)]}
                scale={0.4}
            />

        </>
        
    );
};

const App: React.FC = () => {
    return (
        <div className='map-container'>
            <Canvas camera={{ fov: 75, position: new Vector3(0, 5, 5) }} style={{ height: '100vh', width: '100vw' }}>
                {/* <ambientLight intensity={3} /> */}
                <directionalLight position={new Vector3(0, 5, 0)} castShadow={true} intensity={1}/>
                <directionalLight position={new Vector3(-5, 0, 0)} castShadow={true} intensity={0.5}/>
                <directionalLight position={new Vector3(0, 0, 5)} castShadow={true} intensity={0.25}/>
                <directionalLight position={new Vector3(0, 0, -5)} castShadow={true} intensity={0.15}/>
                <directionalLight position={new Vector3(5, 0, 0)} castShadow={true} intensity={0.15}/>
                <OrbitControls enableRotate={false} enableZoom={false} enablePan={false}/>
                <MapCanvas />
            </Canvas>
        </div>
    );
};

export default App;
