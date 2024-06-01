import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";

import planeScene from "../assets/3d/plane.glb";

interface Props {
    isRotating: boolean;
    planeScale: [x: number, y: number, z: number];
    planePosition: [x: number, y: number, z: number];
    rotation: [x: number, y: number, z: number];
}

function Plane(props: Props) {
    const ref =
        useRef<
            THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
        >(null);
    const { scene, animations } = useGLTF(planeScene);
    const { actions } = useAnimations(animations, ref);

    //
    useEffect(() => {
        if (props.isRotating) {
            actions["Take 001"]?.play();
        } else {
            actions["Take 001"]?.stop();
        }
    }, [actions, props.isRotating]);

    return (
        <mesh
            ref={ref}
            scale={props.planeScale}
            position={props.planePosition}
            rotation={props.rotation}
        >
            <primitive object={scene} />
        </mesh>
    );
}

export default Plane;
