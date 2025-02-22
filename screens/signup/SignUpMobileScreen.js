import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../store/UserContext";
import { COLORS } from "../../constants/colors";

export default function SignupMobileScreen() {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState("");
  const buttonScale = useRef(new Animated.Value(1)).current;
  const { setUserData } = useContext(UserContext);

  const animatePressIn = () =>
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  const animatePressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  const handleNext = async () => {
    if (mobile.length !== 10) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    }
    setUserData({ mobile });
    navigation.navigate("PersonalDetails");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/verinova-logo.png")}
        style={styles.logo}
      />

      <View style={styles.signupBox}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.label}>Enter Your Mobile Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ""))} // Allow only numbers
          keyboardType="numeric"
          maxLength={10} // Restrict input to 10 digits
        />

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
          >
            <Text style={styles.nextText}>Next</Text>
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
    backgroundColor: COLORS.background,
  },
  logo: { width: 140, height: 140, marginBottom: 30 },
  signupBox: {
    width: "90%",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 12,
    elevation: 4,
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  label: { fontSize: 16, marginBottom: 8, color: "#444" },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#E2261C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  nextText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
