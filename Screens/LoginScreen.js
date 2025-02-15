import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const navigation = useNavigation();

  // Refs for each PIN input
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (value, index) => {
    let newPin = [...pin];

    // Only allow numeric input
    if (/^[0-9]?$/.test(value)) {
      newPin[index] = value;
      setPin(newPin);

      // Move to the next input if a number is entered
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleBackspace = (event, index) => {
    if (event.nativeEvent.key === "Backspace" && index > 0) {
      let newPin = [...pin];
      newPin[index] = "";
      setPin(newPin);

      // Move back to the previous input box
      inputRefs[index - 1].current.focus();
    }
  };

  const handleLogin = () => {
    if (pin.join("") === "1234") {
      navigation.replace("Home");
    } else {
      Alert.alert("Invalid PIN", "Please enter the correct PIN");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/verinova-logo.png")}
        style={styles.logo}
      />
      <View style={styles.loginBox}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subText}>Let's Login</Text>

        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleChange(value, index)}
              onKeyPress={(event) => handleBackspace(event, index)}
              secureTextEntry
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.forgotText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  logo: { width: 120, height: 120, marginBottom: 40 },
  loginBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  welcomeText: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  subText: { fontSize: 14, color: "gray", marginBottom: 15 },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginBottom: 20,
  },
  pinInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  loginText: { color: "white", fontSize: 16, fontWeight: "bold" },
  forgotText: { color: "#007bff", fontSize: 14, marginTop: 5 },
});
