import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const withdrawals = [
  {
    id: "1",
    amount: "Rs. 500",
    date: "2025-03-01",
    icon: "money-bill-alt",
    status: "Completed",
  },
  {
    id: "2",
    amount: "Rs. 250",
    date: "2025-02-25",
    icon: "money-bill-alt",
    status: "Pending",
  },
  {
    id: "3",
    amount: "Rs. 1000",
    date: "2025-02-20",
    icon: "money-bill-alt",
    status: "Completed",
  },
  {
    id: "4",
    amount: "Rs. 150",
    date: "2025-01-15",
    icon: "money-bill-alt",
    status: "Failed",
  },
  {
    id: "5",
    amount: "Rs. 2000",
    date: "2025-01-10",
    icon: "money-bill-alt",
    status: "Completed",
  },
  {
    id: "6",
    amount: "Rs. 300",
    date: "2025-02-10",
    icon: "money-bill-alt",
    status: "Pending",
  },
  {
    id: "7",
    amount: "Rs. 2000",
    date: "2025-02-15",
    icon: "money-bill-alt",
    status: "Completed",
  },
  {
    id: "8",
    amount: "Rs. 3000",
    date: "2025-02-15",
    icon: "money-bill-alt",
    status: "Completed",
  },
  // Add more dummy data if needed
];

export default function WithdrawalScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Funds Transfer</Text>
      <View style={styles.cardContainer}>
        {withdrawals.map((withdrawal) => (
          <TouchableOpacity
            key={withdrawal.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("WithdrawalDetails", {
                withdrawalId: withdrawal.id,
              })
            }
          >
            <View style={styles.cardContent}>
              <FontAwesome5
                name="money-bill-alt"
                size={20}
                color="black"
                style={styles.icon}
              />
              <View style={styles.cardText}>
                <Text style={styles.amount}>{withdrawal.amount}</Text>
                <Text style={styles.date}>{withdrawal.date}</Text>
                <Text
                  style={[
                    styles.status,
                    { color: withdrawal.status === "Completed" ? "green" : "red" },
                  ]}
                >
                  {withdrawal.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center", // Center the content inside the ScrollView
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginVertical: 20,
    paddingVertical:15,
    textAlign: "center",
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    marginRight: 15,
  },
  cardText: {
    flex: 1,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
