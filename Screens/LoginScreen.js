import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const navigation = useNavigation();
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Refs for each PIN input
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const animatePressIn = () => Animated.spring(buttonScale, { toValue: 0.9, useNativeDriver: true }).start();
  const animatePressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  const handleChange = (value, index) => {
    let newPin = [...pin];
    if (/^[0-9]?$/.test(value)) {
      newPin[index] = value;
      setPin(newPin);
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
      <Image source={require("../assets/images/verinova-logo.png")} style={styles.logo} />

      <View style={styles.loginBox}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.subText}>Enter Your 4-Digit PIN</Text>

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

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginButton}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity onPress={() => navigation.navigate("SignupMobile")}>
          <Text style={styles.signupText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8" },
  logo: { width: 140, height: 140, marginBottom: 30 },
  loginBox: { width: "90%", backgroundColor: "white", padding: 25, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, alignItems: "center" },
  welcomeText: { fontSize: 22, fontWeight: "bold", marginBottom: 10, color: "#333" },
  subText: { fontSize: 16, color: "gray", marginBottom: 20 },
  pinContainer: { flexDirection: "row", justifyContent: "space-between", width: "80%", marginBottom: 20 },
  pinInput: { width: 55, height: 55, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, textAlign: "center", fontSize: 22, backgroundColor: "#f9f9f9", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  loginButton: { backgroundColor: "#E2261C", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  signupText: { color: "#007bff", fontSize: 16, marginTop: 10 },
});
