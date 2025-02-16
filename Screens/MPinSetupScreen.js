import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
  Alert,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MpinSetupScreen() {
  const navigation = useNavigation();
  const [mpin, setMpin] = useState(["", "", "", ""]);
  const [confirmMpin, setConfirmMpin] = useState(["", "", "", ""]);
  const [fingerprint, setFingerprint] = useState(false);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const mpinRefs = Array.from({ length: 4 }, () => useRef(null));
  const confirmMpinRefs = Array.from({ length: 4 }, () => useRef(null));

  const handleMpinChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newMpin = [...mpin];
      newMpin[index] = value;
      setMpin(newMpin);
      if (value !== "" && index < 3) mpinRefs[index + 1].current.focus();
    }
  };

  const handleMpinKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && mpin[index] === "" && index > 0) {
      mpinRefs[index - 1].current.focus();
    }
  };

  const handleConfirmMpinChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newConfirmMpin = [...confirmMpin];
      newConfirmMpin[index] = value;
      setConfirmMpin(newConfirmMpin);
      if (value !== "" && index < 3) confirmMpinRefs[index + 1].current.focus();
    }
  };

  const handleConfirmMpinKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && confirmMpin[index] === "" && index > 0) {
      confirmMpinRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const mpinStr = mpin.join("");
    const confirmMpinStr = confirmMpin.join("");

    if (mpinStr.length !== 4 || confirmMpinStr.length !== 4) {
      Alert.alert("Error", "Please fill all 4 digits for both MPIN fields!");
      return;
    }
    if (mpinStr !== confirmMpinStr) {
      Alert.alert("Error", "MPIN and Confirm MPIN do not match!");
      return;
    }
    navigation.navigate("Login");
  };

  // Button Press Animation
  const animatePressIn = () => Animated.spring(buttonScale, { toValue: 0.9, useNativeDriver: true }).start();
  const animatePressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/verinova-logo.png")} style={styles.logo} />

      <View style={styles.signupBox}>
        <Text style={styles.title}>Set Your Mobile PIN</Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Enter MPIN</Text>
          <View style={styles.pinContainer}>
            {mpin.map((digit, index) => (
              <TextInput
                key={index}
                ref={mpinRefs[index]}
                style={styles.pinInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleMpinChange(value, index)}
                onKeyPress={(e) => handleMpinKeyPress(e, index)}
                secureTextEntry
              />
            ))}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Confirm MPIN</Text>
          <View style={styles.pinContainer}>
            {confirmMpin.map((digit, index) => (
              <TextInput
                key={index}
                ref={confirmMpinRefs[index]}
                style={styles.pinInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleConfirmMpinChange(value, index)}
                onKeyPress={(e) => handleConfirmMpinKeyPress(e, index)}
                secureTextEntry
              />
            ))}
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Enable Fingerprint Login</Text>
          <Switch value={fingerprint} onValueChange={setFingerprint} />
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleSubmit}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
          >
            <Text style={styles.nextText}>Submit</Text>
          </TouchableOpacity>
        </Animated.View>
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
    paddingHorizontal: 20
  },
  logo: { 
    width: 140, 
    height: 140, 
    marginBottom: 30 
  },
  signupBox: { 
    width: "90%", 
    backgroundColor: "white", 
    padding: 25, 
    borderRadius: 12, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    alignItems: "center" 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 15, 
    color: "#333" 
  },
  fieldContainer: { 
    width: "100%", 
    marginBottom: 20 
  },
  label: { 
    fontSize: 16, 
    marginBottom: 8, 
    color: "#444" 
  },
  pinContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    width: "100%" 
  },
  pinInput: { 
    width: 60, 
    height: 60, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    textAlign: "center", 
    fontSize: 22, 
    backgroundColor: "#f9f9f9", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4 
  },
  switchContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    width: "100%", 
    marginBottom: 15 
  },
  nextButton: { 
    backgroundColor: "#E2261C", 
    padding: 15, 
    borderRadius: 10, 
    width: "100%", 
    alignItems: "center", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4 
  },
  nextText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});
