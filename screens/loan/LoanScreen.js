import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const LoanScreen = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const navigation = useNavigation(); // Initialize navigation

  const loanDetails = [
    {
      type: "Home Loan",
      description: "Finance your dream home with flexible repayment options.",
      features: [
        "Low interest rates",
        "Flexible tenure up to 30 years",
        "Tax benefits on principal and interest"
      ],
      requirements: [
        "Identity proof",
        "Address proof",
        "Income proof",
        "Property documents"
      ],
      image: require("../../assets/images/homeloan.png")
    },
    {
      type: "Personal Loan",
      description: "Quick and easy loans for your personal needs.",
      features: [
        "No collateral required",
        "Quick disbursal",
        "Flexible repayment options"
      ],
      requirements: [
        "Identity proof",
        "Address proof",
        "Income proof",
        "Bank statements"
      ],
      image: require("../../assets/images/personalloan.png")
    },
    {
      type: "Car Loan",
      description: "Drive your dream car with our affordable car loans.",
      features: [
        "Low interest rates",
        "Flexible repayment tenure",
        "Quick processing"
      ],
      requirements: [
        "Identity proof",
        "Address proof",
        "Income proof",
        "Car quotation"
      ],
      image: require("../../assets/images/carloan.png")
    },
    {
      type: "Education Loan",
      description: "Invest in your future with our education loans.",
      features: [
        "Covers tuition and living expenses",
        "Flexible repayment options",
        "Low interest rates"
      ],
      requirements: [
        "Identity proof",
        "Address proof",
        "Admission letter",
        "Income proof of co-borrower"
      ],
      image: require("../../assets/images/educationloan.png")
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
          <Text style={styles.topBarTitle}>Loan Types</Text>
        </View>

        {!selectedLoan ? (
          <>
            <Text style={styles.title}>Choose a Loan Type</Text>
            {loanDetails.map((loan, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => setSelectedLoan(loan)}
              >
                <Image source={loan.image} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{loan.type}</Text>
                  <Text style={styles.cardDescription}>{loan.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <View style={styles.detailsBox}>
              <Image source={selectedLoan.image} style={styles.detailsImage} />
              <Text style={styles.detailsTitle}>{selectedLoan.type}</Text>
              <Text style={styles.detailsDescription}>{selectedLoan.description}</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Features:</Text>
                {selectedLoan.features.map((feature, index) => (
                  <Text key={index} style={styles.infoText}>
                    • {feature}
                  </Text>
                ))}
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Requirements:</Text>
                {selectedLoan.requirements.map((requirement, index) => (
                  <Text key={index} style={styles.infoText}>
                    • {requirement}
                  </Text>
                ))}
              </View>
              {/* Add "Apply Now" button */}
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => alert(`Applying for ${selectedLoan.type}`)}
              >
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedLoan(null)}
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
  },
  applyButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    width: "100%"
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default LoanScreen;
