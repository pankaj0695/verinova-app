import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { CurrentRenderContext, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function LoanCategoryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params;
  const screenWidth = Dimensions.get("window").width; // Get screen width

  const loans = {
    "Home Loan": [
      { id: "1", name: "Regular Home Loan", icon: "home" },
      { id: "2", name: "NRI Home Loan", icon: "globe" },
    ],
    "Car Loan": [
      { id: "1", name: "New Car Loan", icon: "car" },
      { id: "2", name: "Used Car Loan", icon: "car-side" },
    ],
    "Personal Loan": [
      { id: "1", name: "Salary Loan", icon: "money-bill-wave" },
      { id: "2", name: "Medical Loan", icon: "briefcase-medical" },
    ],
    "Education Loan": [
      { id: "1", name: "Domestic Education Loan", icon: "book" },
      { id: "2", name: "Overseas Education Loan", icon: "plane" },
    ],
    "Business Loan": [
      { id: "1", name: "Startup Loan", icon: "lightbulb" },
      { id: "2", name: "SME Loan", icon: "chart-line" },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Header Navbar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>{category}</Text>
      </View>

      {/* Loan Type List */}
      <FlatList
        data={loans[category]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.loanBox, { width: screenWidth * 0.9 }]}
            onPress={() => navigation.navigate("LoanDetails", { loanName: item.name })}
          >
            <Image
              source={require("../../assets/images/loan-bg.jpg")}
              style={styles.backgroundImage}
            />
            <View style={styles.contentContainer}>
              <FontAwesome5 name={item.icon} size={24} color="white" style={styles.icon} />
              <Text style={styles.loanText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 12,  // Matches the first navbar
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    elevation: 2,
  },
  backButton: {
    position: "absolute",
    left: 16,
    paddingTop: 30,  // Matches the first navbar
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 30,  // Matches the first navbar
    color: "black",
  },
  listContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loanBox: {
    position: "relative",
    backgroundColor: "#035697",
    borderRadius: 16,
    height: 80,
    textAlignVertical: "center",
    overflow: "hidden",
    marginVertical: 10,
    elevation: 5,
  },
  backgroundImage: {
    width: "100%",
    height: 100,
    opacity: 0.3,
    position: "absolute",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    marginRight: 15,
  },
  loanText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
