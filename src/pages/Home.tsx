import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../Components/Loader";
import { Island } from "../models/Island";
import Sky from "../models/Sky";
import Bird from "../models/Bird";
import Plane from "../models/Plane";
import HomeInfo from "../Components/HomeInfo";
import { soundoff, soundon } from "../assets/icons";

{
    /* <div className="absolute top-28 left-0 right-0 z-10 flex justify-center items-center">
    POPUP
</div> */
}

import sakura from "../assets/sakura.mp3";
function Home() {
    // REFs
    const audioRef = useRef(new Audio(sakura));
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;

    // STATE
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);
    const [isPlayingMusic, setIsPlayingMusic] = useState(true);

    const adjustIslandForScreenSize = () => {
        let screenScale: [x: number, y: number, z: number] = [0, 0, 0];
        const screenPosition: [x: number, y: number, z: number] = [
            0, -6.5, -43,
        ];
        const rotation: [x: number, y: number, z: number] = [0.1, 4.7, 0];

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1, 1, 1];
        }

        return [screenScale, screenPosition, rotation];
    };

    const [islandScale, islandPosition, rotation] = adjustIslandForScreenSize();

    // PLANE
    const adjustPlaneForScreenSize = () => {
        let screenScale: [x: number, y: number, z: number],
            screenPosition: [x: number, y: number, z: number];

        if (window.innerWidth < 768) {
            screenScale = [1.5, 1.5, 1.5];
            screenPosition = [0, -1.5, 0];
        } else {
            screenScale = [3, 3, 3];
            screenPosition = [0, -4, -4];
        }

        return [screenScale, screenPosition];
    };

    const [planeScale, planePosition] = adjustPlaneForScreenSize();

    //
    useEffect(() => {
        if (isPlayingMusic) {
            audioRef.current.play();
        }

        return () => {
            audioRef.current.pause();
        };
    }, [isPlayingMusic]);

    return (
        <section className={`w-full h-screen relative overflow-hidden`}>
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage !== 0 && <HomeInfo currentStage={currentStage} />}
            </div>
            <Canvas
                className={`w-full h-screen bg-transparent ${
                    isRotating ? "cursor-grabbing" : "cursor-grab"
                }`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    {/* sun */}
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    {/* environment */}
                    <ambientLight intensity={0.5} />
                    {/* <pointLight />
                    <spotLight /> */}
                    {/* gradient color */}
                    <hemisphereLight
                        color="#b1e1ff"
                        groundColor="#000000"
                        intensity={1}
                    />

                    <Bird />
                    <Sky isRotating={isRotating} />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={rotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane
                        isRotating={isRotating}
                        planeScale={planeScale}
                        planePosition={planePosition}
                        rotation={[0, 20, 0]}
                    />
                </Suspense>
            </Canvas>

            <div className="absolute bottom-2 left-2">
                <img
                    src={!isPlayingMusic ? soundoff : soundon}
                    alt="jukebox"
                    onClick={() => setIsPlayingMusic(!isPlayingMusic)}
                    className="w-10 h-10 cursor-pointer object-contain"
                />
            </div>
        </section>
    );
}

export default Home;
