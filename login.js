import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

const Login = ({ navigation }) => {
  const handleLogin = () => {
    // Perform login actions here
    // For now, just navigate to the Home screen
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>VisuLearn</Text>
      <View style={styles.formContainer}>
        <TextInput placeholder="Username" style={styles.input} />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.forgotContainer}>
          <TouchableOpacity>
            <Text style={styles.forgotLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.subContent}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signUpLink}> Sign up</Text>
        </TouchableOpacity>
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
  },
  headerText: {
    fontSize: 42,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    marginBottom: 20,
  },
  formContainer: {
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  forgotContainer: {
    alignItems: "center",
  },
  forgotLink: {
    color: "blue",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "white",
  },
  subContent: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  sPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpLink: {
    color: "blue",
  },
});

export default Login;
