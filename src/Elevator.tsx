import { MeshStandardMaterial, Color, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { THREE } from 'aframe';
import "./App.css"

const Elevator: React.FC<{ position: Vector3 }> = ({ position }) => {
    const { nodes } = useGLTF('/elevator.glb')

    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x2b5685),
    });

    return (
        <>
            <mesh
                position={[position.x - 6.2, .2 , position.z - 14.41]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
            <mesh
                position={[position.x - 13.62, .2 , position.z - 7.75]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
            <mesh
                position={[position.x - 13.62, .2 , position.z - 7.75]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
            <mesh
                position={[position.x - 14.25, .2 , position.z - 14.89]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
            <mesh
                position={[position.x - 14.25, .2 , position.z - 16.1]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
            <mesh
                position={[position.x - 2.15, .2 , position.z - 18]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
            <mesh
                position={[position.x - 3.4, .2 , position.z - 18]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
            <mesh
                position={[position.x + 4.3, .2 , position.z - 12.06]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
            <mesh
                position={[position.x - 17.85, .2 , position.z + 8.31]}
                material={customMaterial}
            >
                <boxGeometry args={[.57, .57, .57]} />
            </mesh>
        </>        
    );
};

export default Elevator;
