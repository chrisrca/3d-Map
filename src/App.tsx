import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { WebGLRenderer, TextureLoader, Vector3, Euler, Mesh, MeshStandardMaterial, Color, PCFSoftShadowMap } from 'three';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { THREE } from 'aframe';
import img from "./img.png";
import "./App.css"
import Stairs from './Stairs';
import Borders from './Borders';
import Rooms from './Rooms';
import RoomOutlines from './RoomOutlines';

const MapCanvas: React.FC = () => {
    const renderer = new WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;

    const { nodes } = useGLTF('/floormap.glb');
    const floormap = nodes.CustomObject as Mesh;

    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(TextureLoader, img);
    const aspectRatio = 5000 / 3400;
    const width = 100;
    const height = width / aspectRatio;
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState(new Vector3(0, 0, 0));
    const [rotation] = useState(new Euler(-Math.PI / 2, 0, 0));

    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x2b5685),
    });

    const handlePointerDown = (event: { stopPropagation: () => void; }) => {
        setIsDragging(true);
        event.stopPropagation(); 
    };

    const handlePointerMove = (event: { movementX: any; movementY: any; stopPropagation: () => void; }) => {
        if (isDragging && meshRef.current) {
            const deltaX = event.movementX;
            const deltaZ = -event.movementY;
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
                geometry={floormap.geometry}
                material={customMaterial}
                position={[(position.x - 49.99), 0, (position.z + 34)]}
                scale={0.4}
            />
            <>
                <Rooms position={position}/>
                <Borders position={position}/>
                <RoomOutlines position={position}/>
            </>
            <Stairs position={position}/>
        </>
        
    );
};

const App: React.FC = () => {
    return (
        <div className='map-container'>
            <Canvas camera={{ fov: 75, position: new Vector3(0, 5, 5) }} style={{ height: '100vh', width: '100vw' }}>
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
