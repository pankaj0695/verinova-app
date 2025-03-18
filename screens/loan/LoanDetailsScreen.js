import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const loanOptions = [
  {
    id: 1,
    type: "Home Loan",
    description: "Finance your dream home with flexible repayment options.",
    features: ["Low interest rates", "Flexible tenure up to 30 years", "Tax benefits on principal and interest"],
    requirements: ["Identity proof", "Address proof", "Income proof", "Property documents"],
    image: require("../../assets/images/homeloan.png"),
  },
  {
    id: 2,
    type: "Personal Loan",
    description: "Quick and easy loans for your personal needs.",
    features: ["No collateral required", "Quick disbursal", "Flexible repayment options"],
    requirements: ["Identity proof", "Address proof", "Income proof", "Bank statements"],
    image: require("../../assets/images/personalloan.png"),
  },
  {
    id: 3,
    type: "Car Loan",
    description: "Drive your dream car with our affordable car loans.",
    features: ["Low interest rates", "Flexible repayment tenure", "Quick processing"],
    requirements: ["Identity proof", "Address proof", "Income proof", "Car quotation"],
    image: require("../../assets/images/carloan.png"),
  },
  {
    id: 4,
    type: "Education Loan",
    description: "Invest in your future with our education loans.",
    features: ["Covers tuition and living expenses", "Flexible repayment options", "Low interest rates"],
    requirements: ["Identity proof", "Address proof", "Admission letter", "Income proof of co-borrower"],
    image: require("../../assets/images/educationloan.png"),
  },
];




export default function LoanDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [loan, setLoan] = useState({});
  const { name } = route.params;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const selectedLoan = loanOptions.find((item) => item.type == name);
    if (!selectedLoan) {
      Alert.alert("Error", "Loan type not found.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    }
    console.log(selectedLoan);
    setLoan(selectedLoan);
  }, [name]);

  if (!loan) return null;

  const animatePressIn = () =>
    Animated.spring(buttonScale, { toValue: 0.9, useNativeDriver: true }).start();

  const animatePressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{loan.type}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require("../../assets/images/loan-bg.jpg")} style={styles.banner} />
        <Text style={styles.description}>{loan.description}</Text>
        <View style={styles.documentsContainer}>
          <Text style={styles.sectionTitle}>Required Documents</Text>
          {loan && loan.requirements && loan.requirements.map((doc, index) => (
            <View key={index} style={styles.documentItem}>
              <Ionicons name="document-text-outline" size={20} color="#007bff" />
              <Text style={styles.document}>{doc}</Text>
            </View>
          ))}
        </View>
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
  backButton: { position: "absolute", left: 16, paddingTop: 30 },
  topBarTitle: { fontSize: 22, fontWeight: "bold", paddingTop: 30, color: "black" },
  banner: { width: "90%", height: 180, borderRadius: 12, marginVertical: 15 },
  description: { fontSize: 16, color: "#555", marginBottom: 20, textAlign: "center", width: "90%" },
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
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333" },
  documentItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  document: { fontSize: 16, color: "#444", marginLeft: 8 },
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
