import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function LoanDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { loanName } = route.params;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animatePressIn = () =>
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  const animatePressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  const loanDetails = {
    "Regular Home Loan": {
      description: "A standard home loan for purchasing a house.",
      documents: [
        "Identity Proof",
        "Address Proof",
        "Salary Slip",
        "Property Documents",
      ],
    },
    "NRI Home Loan": {
      description: "Specialized home loan for Non-Resident Indians.",
      documents: [
        "Passport",
        "Visa Copy",
        "NRI Bank Account Statement",
        "Income Proof",
      ],
    },
    "New Car Loan": {
      description: "Loan for purchasing a brand-new car.",
      documents: [
        "Identity Proof",
        "Address Proof",
        "Salary Slip",
        "Car Invoice",
      ],
    },
    "Used Car Loan": {
      description: "Loan for purchasing a used or second-hand car.",
      documents: ["Identity Proof", "Address Proof", "Salary Slip", "RC Book"],
    },
    "Salary Loan": {
      description: "Instant loan for salaried individuals.",
      documents: ["Salary Slip", "Bank Statement", "ID Proof"],
    },
    "Medical Loan": {
      description: "Loan for medical emergencies and treatments.",
      documents: ["Doctor's Prescription", "Medical Bill", "Identity Proof"],
    },
  };

  return (
    <View style={styles.container}>
      {/* Vyom Logo */}
      <Image
        source={require("../../assets/images/verinova-logo.png")}
        style={styles.logo}
      />

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{loanName}</Text>
      <Text style={styles.description}>
        {loanDetails[loanName]?.description}
      </Text>

      <Text style={styles.sectionTitle}>Required Documents</Text>
      {loanDetails[loanName]?.documents.map((doc, index) => (
        <Text key={index} style={styles.document}>{`• ${doc}`}</Text>
      ))}

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.applyButton}
          onPressIn={animatePressIn}
          onPressOut={animatePressOut}
        >
          <Text style={styles.applyText}>Apply Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 20 },
  logo: { width: 80, height: 80, alignSelf: "center", marginBottom: 10 },
  backButton: { marginBottom: 15, padding: 5 },
  backText: { fontSize: 16, color: "#035697", fontWeight: "bold" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  document: { fontSize: 16, color: "#444", marginBottom: 5 },
  applyButton: {
    backgroundColor: "#E2261C",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  applyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
