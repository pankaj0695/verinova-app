import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function OtpVerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { mobile } = route.params;
  const [otp, setOtp] = useState("");
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animatePressIn = () => Animated.spring(buttonScale, { toValue: 0.9, useNativeDriver: true }).start();
  const animatePressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/verinova-logo.png")} style={styles.logo} />

      <View style={styles.signupBox}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.label}>We have sent an OTP to {mobile}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("PersonalDetails")}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
          >
            <Text style={styles.nextText}>Verify OTP</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8" },
  logo: { width: 140, height: 140, marginBottom: 30 },
  signupBox: { width: "90%", backgroundColor: "white", padding: 25, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  label: { fontSize: 16, marginBottom: 8, color: "#444" },
  input: { width: "100%", padding: 12, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, backgroundColor: "#f9f9f9", fontSize: 16, marginBottom: 20 },
  nextButton: { backgroundColor: "#E2261C", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  nextText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
