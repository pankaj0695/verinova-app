import React, { useState, useRef, useContext, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication"; // For fingerprint
import { UserContext } from "../../store/UserContext";
import { COLORS } from "../../constants/colors";

export default function StartScreen() {
  const navigation = useNavigation();
  const [pin, setPin] = useState(["", "", "", ""]);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const { login, userData, isLoading } = useContext(UserContext);

  // Refs for each PIN input
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    if (!isLoading && userData.name === "") {
      navigation.replace("Login");
    }
  }, [isLoading, userData]);

  const animatePressIn = () =>
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  const animatePressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

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

  const handleMPINLogin = async () => {
    const res = await login({ mobile: userData.mobile, mpin: pin.join("") });
    if (res) {
      navigation.replace("Home");
    } else {
      Alert.alert("Invalid PIN", "Please enter the correct MPIN.");
    }
  };

  const handleFingerprintLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const supported =
      await LocalAuthentication.supportedAuthenticationTypesAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (
      !hasHardware ||
      !supported.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
    ) {
      Alert.alert(
        "Error",
        "Your device does not support fingerprint authentication."
      );
      return;
    }

    if (!isEnrolled) {
      Alert.alert(
        "Error",
        "No fingerprints are enrolled. Please set up fingerprint authentication in your device settings."
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Fingerprint",
      fallbackLabel: "Use MPIN",
    });

    if (result.success) {
      navigation.replace("Home");
    } else {
      Alert.alert("Authentication Failed", "Please try again.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/verinova-logo.png")}
        style={styles.logo}
      />

      <View style={styles.authBox}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Enter your 4-digit MPIN</Text>

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
            onPress={handleMPINLogin}
            style={styles.loginButton}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
          >
            <Text style={styles.loginText}>Login with MPIN</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          onPress={handleFingerprintLogin}
          style={styles.fingerprintButton}
        >
          <Image
            source={require("../../assets/images/fingerprint.png")}
            style={styles.fingerprintIcon}
          />
          <Text style={styles.fingerprintText}>Use Fingerprint</Text>
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
    backgroundColor: COLORS.background,
  },
  logo: { width: 140, height: 140, marginBottom: 30 },
  authBox: {
    width: "90%",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subText: { fontSize: 16, color: "gray", marginBottom: 20 },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 20,
  },
  pinInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#f9f9f9",
  },
  loginButton: {
    backgroundColor: "#E2261C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  fingerprintButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  fingerprintIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  fingerprintText: {
    fontSize: 16,
    color: "#007bff",
  },
  signupText: { color: "#007bff", fontSize: 16, marginTop: 20 },
  loadingText: { fontSize: 18, fontWeight: "bold", color: "#333" },
});
