import { MeshStandardMaterial, Color, Vector3 } from 'three';
import { useGLTF } from '@react-three/drei';
import { THREE } from 'aframe';
import "./App.css"

const Stairs: React.FC<{ position: Vector3 }> = ({ position }) => {
    const { nodes } = useGLTF('/stairs.glb')

    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x2b5685),
    });

    return (
        <>
            <group>
                <group rotation={[Math.PI / 2, 0, Math.PI / 1]} position={[(position.x + 6.225), 0, (position.z - 11.3)]} scale={0.2}>
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.Stair1_1 as THREE.Mesh).geometry}
                    material={customMaterial}
                    />
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.Stair1_2 as THREE.Mesh).geometry}
                    material={customMaterial}
                    />
                    <mesh
                    castShadow
                    receiveShadow
                    geometry={(nodes.Stair1_3 as THREE.Mesh).geometry}
                    material={customMaterial}
                    />
                </group>
            </group>
        </>
        
    );
};

export default Stairs;
