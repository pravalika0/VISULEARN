import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import * as Speech from "expo-speech";

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleVoiceSearch = () => {
    Speech.speak(searchQuery);
    if (searchQuery.toLowerCase() === "earth") {
      // Navigate to Earth 3D model or display it
    }
  };

  const handleScan = () => {
    navigation.navigate("Scan");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search here"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={handleVoiceSearch}
        >
          <Text style={styles.voiceButtonText}>🎙️</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
        <Text style={styles.scanButtonText}>Scan</Text>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: "https://your-logo-url.com/logo.png" }} // Replace with your logo URL
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light gray background
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  voiceButton: {
    padding: 10,
  },
  voiceButtonText: {
    fontSize: 24,
    color: "#007bff",
  },
  scanButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    marginTop: 20,
  },
  scanButtonText: {
    color: "white",
    fontSize: 16,
  },
  logoContainer: {
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 50,
  },
});

export default Home;   
