
import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useAssets } from "expo-asset";
import * as Speech from "expo-speech";

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

  if (!assets) return null;

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
  const descriptionText = `Earth is the 3rd planet from the Sun. It has 5 oceans: the Pacific, Atlantic, Indian, Southern, and Arctic. Earth is the only planet known to support life and has a diverse range of ecosystems.`;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quizVisible, setQuizVisible] = useState(false); 
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleTextToSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(descriptionText, {
        onDone: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  const handleLearnMore = () => {
    Linking.openURL("https://en.wikipedia.org/wiki/Earth");
  };

  const handleQuizButton = () => {
    setQuizVisible(!quizVisible); // Toggle the visibility of the quiz
  };

  const quizQuestions = [
    {
      question: "How many oceans does Earth have?",
      options: ["3", "5", "7", "4"],
      correctAnswer: "5",
    },
    {
      question: "Which is the largest ocean?",
      options: ["Pacific", "Atlantic", "Indian", "Arctic"],
      correctAnswer: "Pacific",
    },
  ];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === quizQuestions[0].correctAnswer) {
      alert("Correct Answer!");
    } else {
      alert("Wrong Answer. The correct answer is " + quizQuestions[0].correctAnswer);
    }
    setQuizCompleted(true);
  };

  return (
    <ImageBackground
      source={require("./assets/space.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Canvas
          style={{ width: "100%", height: "70%" }}
          camera={{ position: [0, 0, 20], fov: 75, near: 0.1, far: 100 }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Earth />
          <OrbitControls
            enableZoom={true}
            zoomSpeed={0.5}
            minDistance={10}
            maxDistance={50}
            enablePan={true}
          />
        </Canvas>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{descriptionText}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handleLearnMore}
              style={styles.learnMoreButton}
            >
              <Text style={styles.learnMoreText}>Learn more</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleTextToSpeech}
              style={styles.volumeButton}
            >
              <Text style={styles.volumeText}>🔊</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleQuizButton}
          style={styles.quizButtonTopRight}
        >
          <Text style={styles.quizText}>Quiz</Text>
        </TouchableOpacity>

        {quizVisible && !quizCompleted && (
          <View style={styles.quizContainer}>
            <Text style={styles.quizQuestion}>{quizQuestions[0].question}</Text>
            {quizQuestions[0].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option)}
                style={[
                  styles.quizOption,
                  selectedAnswer === option && styles.selectedOption,
                ]}
              >
                <Text style={styles.quizOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {quizCompleted && (
          <Text style={styles.quizCompleteText}>Quiz Completed!</Text>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "justify",
    margin: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  learnMoreButton: {
    marginRight: 20,
  },
  learnMoreText: {
    color: "skyblue",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  volumeButton: {
    marginLeft: 20,
    marginRight: 20,
  },
  volumeText: {
    fontSize: 20,
    color: "white",
  },
  quizButtonTopRight: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  quizText: {
    color: "white",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  quizContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
  },
  quizQuestion: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  quizOption: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  quizOptionText: {
    color: "black",
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: "lightgreen",
  },
  quizCompleteText: {
    color: "lightgreen",
    fontSize: 20,
    marginTop: 20,
  },
});

export default Scan;
