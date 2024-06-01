import { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import skyScene from "../assets/3d/sky.glb";

function Sky({ isRotating }: { isRotating: boolean }) {
    const sky = useGLTF(skyScene);
    const skyRef =
        useRef<
            THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
        >(null);

    useFrame((_, delta) => {
        if (isRotating) {
            skyRef.current!.rotation.y += 0.25 * delta;
        }
    });

    return (
        <mesh ref={skyRef}>
            <primitive object={sky.scene} />
        </mesh>
    );
}

export default Sky;
