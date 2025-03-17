import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

export default function LoanScreen() {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width; // Get the screen width

  const loanCategories = [
    {
      id: "1",
      name: "Home Loan",
      icon: "home",
      description:
        "Get easy home loans at low interest rates. Flexible tenure up to 30 years.",
      color: ["#FF9A8B", "#FF6A88"],
    },
    {
      id: "2",
      name: "Car Loan",
      icon: "car",
      description:
        "Drive your dream car with our car loan options. Quick approval and low EMIs.",
      color: ["#42E695", "#3BB2B8"],
    },
    {
      id: "3",
      name: "Personal Loan",
      icon: "user",
      description:
        "Quick and hassle-free personal loans for your needs. No collateral required.",
      color: ["#FAD961", "#F76B1C"],
    },
    {
      id: "4",
      name: "Business Loan",
      icon: "chart-line",
      description:
        "Expand your business with our flexible loan plans. High loan amounts available.",
      color: ["#A18CD1", "#FBC2EB"],
    },
    {
      id: "5",
      name: "Educational Loan",
      icon: "book-open",
      description:
        "Finance your education with our affordable loan options. Low-interest rates available.",
      color: ["#6DD5FA", "#FFFFFF"],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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

      {/* Loan Categories List */}
      <View style={styles.grid}>
        {loanCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.loanBox, { width: screenWidth * 0.9 }]}
            onPress={() =>
              navigation.navigate("LoanCategory", { category: category.name })
            }
          >
            <View style={styles.iconContainer}>
              <FontAwesome5 name={category.icon} size={28} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.loanText}>{category.name}</Text>
              <Text style={styles.loanDescription}>{category.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingBottom: 20,
  },
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
    paddingTop: 30,
    left: 16,
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 30,
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
    width: "100%",
    alignItems: "center",
  },
  loanBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  loanText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  loanDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});
