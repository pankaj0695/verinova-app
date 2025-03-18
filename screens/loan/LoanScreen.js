import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const loans = [
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

const AnimatedCard = ({ children }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return <Animated.View style={[styles.card, { opacity: fadeAnim }]}>{children}</Animated.View>;
};

export default function LoanScreen() {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Loan Types</Text>
      </View>

      {!selectedLoan ? (
        <View>
          {loans.map((loan) => (
            
              <AnimatedCard key={loan.id}>
                <Image source={loan.image} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{loan.type}</Text>
                <Text style={styles.cardDescription}>{loan.description}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("LoanDetails", {
                      name: loan.type,
                    })
                  }
                >
                <Text style={styles.buttonText}>Visit</Text>

                </TouchableOpacity>
              </AnimatedCard>
          ))}
        </View>
      ) : (
        <View style={styles.detailsBox}>
          <Image source={selectedLoan.image} style={styles.detailsImage} />
          <Text style={styles.detailsTitle}>{selectedLoan.type}</Text>
          <Text style={styles.detailsDescription}>{selectedLoan.description}</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Features:</Text>
            {selectedLoan.features.map((feature, index) => (
              <Text key={index} style={styles.infoText}>• {feature}</Text>
            ))}
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Requirements:</Text>
            {selectedLoan.requirements.map((requirement, index) => (
              <Text key={index} style={styles.infoText}>• {requirement}</Text>
            ))}
          </View>
          <TouchableOpacity style={styles.applyButton} onPress={() => alert(`Applying for ${selectedLoan.type}`)}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedLoan(null)} style={styles.goBackButton}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f8f8" },
  header: { flexDirection: "row", alignItems: "center", margin: 15 },
  backButton: { marginRight: 10 },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", flex: 1, textAlign: "center" },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  cardImage: { width: "100%", height: 150, resizeMode: "cover", borderRadius: 8 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#1a1a1a", marginTop: 10 },
  cardDescription: { fontSize: 14, color: "#666", marginTop: 5, textAlign: "center" },
  detailsBox: { alignItems: "center", padding: 20 },
  detailsImage: { width: "100%", height: 200, resizeMode: "contain", marginBottom: 20 },
  detailsTitle: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 10 },
  detailsDescription: { fontSize: 16, color: "#666", textAlign: "center", marginBottom: 20 },
  infoBox: { width: "100%", padding: 10, marginBottom: 10 },
  infoTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  infoText: { fontSize: 16, color: "#333", marginBottom: 5 },
  applyButton: { backgroundColor: "#007bff", padding: 15, borderRadius: 5, alignItems: "center", width: "100%" },
  applyButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  goBackButton: { marginTop: 15, padding: 10, backgroundColor: "#ccc", borderRadius: 5, alignItems: "center" },
  buttonText: { color: "black", fontSize: 16, fontWeight: "bold" },
});
