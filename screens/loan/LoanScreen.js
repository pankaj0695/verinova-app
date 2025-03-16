import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function LoanScreen() {
  const navigation = useNavigation();

  const loanCategories = [
    {
      id: "1",
      name: "Home Loan",
      icon: "home",
      description:
        "Get easy home loans at low interest rates. Flexible tenure up to 30 years.",
      color: "#FF9A8B",
    },
    {
      id: "2",
      name: "Car Loan",
      icon: "car",
      description:
        "Drive your dream car with our car loan options. Quick approval and low EMIs.",
      color: "#42E695",
    },
    {
      id: "3",
      name: "Personal Loan",
      icon: "user",
      description:
        "Quick and hassle-free personal loans for your needs. No collateral required.",
      color: "#FAD961",
    },
    {
      id: "4",
      name: "Business Loan",
      icon: "chart-line",
      description:
        "Expand your business with our flexible loan plans. High loan amounts available.",
      color: "#A18CD1",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Loan Categories</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Choose Your Loan Type</Text>

      {/* Loan Categories Grid */}
      <View style={styles.grid}>
        {loanCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.loanBox, { backgroundColor: category.color }]}
            onPress={() =>
              navigation.navigate("LoanCategory", { category: category.name })
            }
          >
            <FontAwesome5
              name={category.icon}
              size={34}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.loanText}>{category.name}</Text>
            <Text style={styles.loanDescription}>{category.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 40,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginVertical: 20,
    textAlign: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  loanBox: {
    width: 200,
    height: 140,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  icon: {
    marginBottom: 8,
  },
  loanText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  loanDescription: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 10,
  },
});
