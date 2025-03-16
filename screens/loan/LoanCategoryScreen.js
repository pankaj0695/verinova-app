import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function LoanCategoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params;

  const loans = {
    "Home Loan": [
      { id: "1", name: "Regular Home Loan" },
      { id: "2", name: "NRI Home Loan" },
    ],
    "Car Loan": [
      { id: "1", name: "New Car Loan" },
      { id: "2", name: "Used Car Loan" },
    ],
    "Personal Loan": [
      { id: "1", name: "Salary Loan" },
      { id: "2", name: "Medical Loan" },
    ],
    "Education Loan": [
      { id: "1", name: "Domestic Education Loan" },
      { id: "2", name: "Overseas Education Loan" },
    ],
    "Business Loan": [
      { id: "1", name: "Startup Loan" },
      { id: "2", name: "SME Loan" },
    ],
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

      <Text style={styles.title}>{category}</Text>

      <FlatList
        data={loans[category]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.loanBox}
            onPress={() =>
              navigation.navigate("LoanDetails", { loanName: item.name })
            }
          >
            <Text style={styles.loanText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 20 },
  logo: { width: 80, height: 80, alignSelf: "center", marginBottom: 10 },
  backButton: { marginBottom: 15, padding: 5 },
  backText: { fontSize: 16, color: "#035697", fontWeight: "bold" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loanBox: {
    backgroundColor: "#035697",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  loanText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
