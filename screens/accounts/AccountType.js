import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const AccountType = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  const accountDetails = [
    {
      type: "Current",
      description: "Ideal for businesses and professionals.",
      features: [
        "Overdraft facility available",
        "Unlimited transactions",
        "Dedicated relationship manager"
      ],
      requirements: [
        "Minimum balance requirement",
        "Business registration documents (if applicable)",
        "Identity proof",
        "Address proof"
      ],
      image: require("../../assets/images/currentaccount.png")
    },
    {
      type: "Saving",
      description: "Perfect for personal savings and daily transactions.",
      features: [
        "Earn interest on your savings",
        "Free debit card",
        "Access to online banking"
      ],
      requirements: [
        "Minimum initial deposit",
        "Identity proof",
        "Address proof",
        "PAN Card (if applicable)"
      ],
      image: require("../../assets/images/savingsaccount.png")
    },
    {
      type: "Fixed Deposit",
      description: "Grow your savings with fixed returns.",
      features: [
        "Guaranteed returns",
        "Flexible tenure options",
        "Loan against deposit available"
      ],
      requirements: [
        "Minimum deposit amount",
        "Identity proof",
        "Address proof",
        "Nominee details"
      ],
      image: require("../../assets/images/Fixeddepositaccount.png")
    },
    {
      type: "Recurring Deposit",
      description: "Save monthly and earn interest.",
      features: [
        "Flexible monthly deposit options",
        "Higher interest rates",
        "Premature withdrawal facility"
      ],
      requirements: [
        "Monthly deposit commitment",
        "Identity proof",
        "Address proof",
        "Bank account details"
      ],
      image: require("../../assets/images/recurringdepositaccount.png")
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with Back Button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Account Types</Text>
        </View>

        {!selectedAccount ? (
          <>
            <Text style={styles.title}>Choose an Account Type</Text>
            {accountDetails.map((account, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => setSelectedAccount(account)}
              >
                <Image source={account.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{account.type} Account</Text>
                  <Text style={styles.cardDescription}>{account.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <View style={styles.detailsBox}>
              <Image source={selectedAccount.image} style={styles.detailsImage} />
              <Text style={styles.detailsTitle}>{selectedAccount.type} Account</Text>
              <Text style={styles.detailsDescription}>{selectedAccount.description}</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Features:</Text>
                {selectedAccount.features.map((feature, index) => (
                  <Text key={index} style={styles.infoText}>
                    • {feature}
                  </Text>
                ))}
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Requirements:</Text>
                {selectedAccount.requirements.map((requirement, index) => (
                  <Text key={index} style={styles.infoText}>
                    • {requirement}
                  </Text>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedAccount(null)}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20
  },
  scrollContainer: {
    paddingBottom: 20
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  backButton: {
    marginRight: 10
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333"
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: "hidden"
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover"
  },
  cardContent: {
    padding: 15,
    alignItems: "center"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center"
  },
  detailsBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  detailsImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center"
  },
  detailsDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20
  },
  infoBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center"
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default AccountType;
