import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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
      {/* Navbar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{loanName}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Loan Image */}
        <Image
          source={require("../../assets/images/loan-bg.jpg")}
          style={styles.banner}
        />

        {/* Loan Description */}
        <Text style={styles.description}>{loanDetails[loanName]?.description}</Text>

        {/* Required Documents */}
        <View style={styles.documentsContainer}>
          <Text style={styles.sectionTitle}>Required Documents</Text>
          {loanDetails[loanName]?.documents.map((doc, index) => (
            <View key={index} style={styles.documentItem}>
              <Ionicons name="document-text-outline" size={20} color="#007bff" />
              <Text style={styles.document}>{doc}</Text>
            </View>
          ))}
        </View>

        {/* Apply Now Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.applyButton}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
          >
            <Text style={styles.applyText}>Apply Now</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  scrollContainer: { alignItems: "center", paddingBottom: 20 },

  /* Navbar - Matches previous screens */
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    elevation: 2,
  },
  backButton: {
    position: "absolute",
    left: 16,
    paddingTop: 30, // Ensures consistency with other screens
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 30, // Ensures text alignment with other screens
    color: "black",
  },

  /* Banner Image */
  banner: {
    width: "90%",
    height: 180,
    borderRadius: 12,
    marginVertical: 15,
  },

  /* Loan Details */
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
    width: "90%",
  },

  /* Documents Section */
  documentsContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  document: {
    fontSize: 16,
    color: "#444",
    marginLeft: 8,
  },

  /* Apply Now Button */
  applyButton: {
    backgroundColor: "#E2261C",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  applyText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
