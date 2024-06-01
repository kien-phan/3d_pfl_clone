/* eslint-disable react-hooks/exhaustive-deps */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: nimzu (https://sketchfab.com/nimzuk)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907
Title: Fox's islands
*/

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { a } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";
import { Object3DEventMap } from "three/src/core/Object3D";

import islandScene from "../assets/3d/island.glb";

interface Props {
    scale: [x: number, y: number, z: number];
    position: [x: number, y: number, z: number];
    rotation: [x: number, y: number, z: number];
    isRotating: boolean;
    setIsRotating: Dispatch<SetStateAction<boolean>>;
    setCurrentStage: Dispatch<SetStateAction<number>>;
}
export function Island(props: Props) {
    const islandRef = useRef<Group<Object3DEventMap>>(null);
    const { nodes, materials } = useGLTF(islandScene);

    const { gl, viewport } = useThree();

    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;

    // HANDLE
    const handlePointerDown = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        props.setIsRotating(true);

        // Calculate the clientX based on whether it's a touch event or a mouse event
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;

        // Store the current clientX position for reference
        lastX.current = clientX;
    };
    const handlePointerUp = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        props.setIsRotating(false);
    };
    const handlePointerMove = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        if (props.isRotating) {
            // If rotation is enabled, calculate the change in clientX position
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;

            // calculate the change in the horizontal position of the mouse cursor or touch input,
            // relative to the viewport's width
            const delta = (clientX - lastX.current) / viewport.width;

            // Update the island's rotation based on the mouse/touch movement
            islandRef.current!.rotation.y += delta * 0.01 * Math.PI;

            // Update the reference for the last clientX position
            lastX.current = clientX;

            // Update the rotation speed
            rotationSpeed.current = delta * 0.01 * Math.PI;
        }
    };

    // Handle keydown events
    const handleKeyDown = (event: any) => {
        if (event.key === "ArrowLeft") {
            if (!props.isRotating) props.setIsRotating(true);

            islandRef.current!.rotation.y += 0.005 * Math.PI;
            rotationSpeed.current = 0.01;
        } else if (event.key === "ArrowRight") {
            if (!props.isRotating) props.setIsRotating(true);

            islandRef.current!.rotation.y -= 0.005 * Math.PI;
            rotationSpeed.current = -0.01;
        }
    };

    // Handle keyup events
    const handleKeyUp = (event: any) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            props.setIsRotating(false);
        }
    };

    useEffect(() => {
        const canvas = gl.domElement;
        canvas.addEventListener("pointerdown", handlePointerDown);
        canvas.addEventListener("pointerup", handlePointerUp);
        canvas.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointerup", handlePointerUp);
            canvas.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [
        gl,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
        handleKeyDown,
        handleKeyUp,
    ]);

    useFrame(() => {
        if (!props.isRotating) {
            rotationSpeed.current *= dampingFactor;

            if (Math.abs(rotationSpeed.current) < 0.001) {
                rotationSpeed.current = 0;
            }

            islandRef.current!.rotation.y += rotationSpeed.current;
        } else {
            const rotation = islandRef.current!.rotation.y;

            /**
             * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
             * The goal is to ensure that the rotation value remains within a specific range to
             * prevent potential issues with very large or negative rotation values.
             *  Here's a step-by-step explanation of what this code does:
             *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
             *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
             *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
             *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
             *     This is done to ensure that the value remains positive and within the range of
             *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
             *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
             *     modulo operation to the value obtained in step 2. This step guarantees that the value
             *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
             *     circle in radians.
             */
            const normalizedRotation =
                ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

            // Set the current stage based on the island's orientation
            switch (true) {
                case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                    props.setCurrentStage(4);
                    break;
                case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                    props.setCurrentStage(3);
                    break;
                case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                    props.setCurrentStage(2);
                    break;
                case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                    props.setCurrentStage(1);
                    break;
                default:
                    props.setCurrentStage(0);
            }
        }
    });

    return (
        <a.group ref={islandRef} {...props}>
            <mesh
                geometry={nodes.polySurface944_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface945_tree1_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface946_tree2_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface947_tree1_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface948_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.polySurface949_tree_body_0.geometry}
                material={materials.PaletteMaterial001}
            />
            <mesh
                geometry={nodes.pCube11_rocks1_0.geometry}
                material={materials.PaletteMaterial001}
            />
        </a.group>
    );
}
