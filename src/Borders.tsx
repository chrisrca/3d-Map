import { MeshStandardMaterial, Color, Vector3, Mesh } from 'three';
import { useGLTF } from '@react-three/drei';
import "./App.css"

const Stairs: React.FC<{ position: Vector3 }> = ({ position }) => {
    const { nodes } = useGLTF('/borders.glb');
    const floormap = nodes.CustomObject as Mesh;

    const customMaterial = new MeshStandardMaterial({
        color: new Color(0x334d7e),
    });

    return (
        <>
            <mesh
                castShadow={true}
                receiveShadow={true}
                geometry={floormap.geometry}
                material={customMaterial}
                position={[(position.x - 49.99), 0, (position.z + 34)]}
                scale={0.4}
            />
        </>
    );
};

export default Stairs;
