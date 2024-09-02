import React from "react";
import { View, StyleSheet } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useAssets } from "expo-asset";

function Earth() {
  const meshRef = React.useRef(null);
  const [assets] = useAssets([
    require("./assets/earthTexture.jpg"),
    require("./assets/earthBumpMap.jpg"),
  ]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (!assets) return null; // Return null or a loading spinner while assets are loading

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 60, 60]} />
      <meshPhongMaterial
        map={new THREE.TextureLoader().load(assets[0].uri)}
        bumpMap={new THREE.TextureLoader().load(assets[1].uri)}
        bumpScale={0.1}
      />
    </mesh>
  );
}

function Scan() {
  return (
    <View style={styles.container}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 20], fov: 75, near: 0.1, far: 100 }} // Added near and far planes
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Earth />
        <OrbitControls
          enableZoom={true}
          zoomSpeed={0.5}
          minDistance={10} // Minimum zoom distance
          maxDistance={50} // Maximum zoom distance
          enablePan={true} // Enable panning if needed
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Scan;
