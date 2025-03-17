import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Ensure Ionicons is imported

const policies = [
  {
    id: 1,
    name: "Privacy Policy",
    description: "This policy outlines how we collect, use, store, and protect your personal information. It covers data security, sharing of information, and your rights regarding data privacy.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal", // Updated link
  },
  {
    id: 2,
    name: "Grievance Redressal Policy",
    description: "Our Grievance Redressal Policy provides a framework to address customer complaints and service-related issues. It details response timelines, escalation levels, and resolution processes.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal", // Updated link
  },
  {
    id: 3,
    name: "Terms and Conditions for Internet Banking",
    description: "Learn about the terms, conditions, and security measures for using Union Bank's internet banking services, including login credentials, transaction limits, and fraud prevention guidelines.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal",
  },
  {
    id: 4,
    name: "Anti-Money Laundering Policy",
    description: "Union Bank follows strict anti-money laundering regulations to prevent illegal financial activities. This policy includes Know Your Customer (KYC) norms, transaction monitoring, and reporting obligations.",
    link: "https://www.unionbankofindia.co.in/en/common/anti-money-laundering",
  },
  {
    id: 5,
    name: "Deposit Policy",
    description: "This policy explains the terms, interest rates, and operational guidelines for making deposits with Union Bank. It also covers premature withdrawal rules and nomination facilities.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal",
  },
  {
    id: 6,
    name: "Compensation Policy",
    description: "This policy details the circumstances under which customers are compensated for financial losses due to banking errors, service deficiencies, or system failures.",
    link: "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures",
  },
  {
    id: 7,
    name: "Customer Rights Policy",
    description: "Our Customer Rights Policy defines fundamental rights, such as fair treatment, transparency, privacy, and grievance redressal mechanisms, ensuring ethical and responsible banking practices.",
    link: "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures",
  },
];

const AnimatedCard = ({ children }) => {
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  return <Animated.View style={[styles.card, { opacity: fadeAnim }]}>{children}</Animated.View>;
};

export default function PolicyScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Policies</Text>
      </View>
      <View style={styles.policiesContainer}>
        {policies.map((policy) => (
          <AnimatedCard key={policy.id}>
            <Text style={styles.policyName}>{policy.name}</Text>
            <Text style={styles.policyDescription}>{policy.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("PolicyDetailsScreen", { 
                name: policy.name, 
                description: policy.description, 
                link: policy.link 
              })}
            >
              <Text style={styles.buttonText}>Visit</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f8f8f8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  policiesContainer: { flex: 1, marginTop: 10 },
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
  },
  policyName: { fontSize: 18, fontWeight: "bold", color: "#1a1a1a", marginBottom: 5 },
  policyDescription: { fontSize: 14, color: "#666", marginBottom: 10 },
  button: { backgroundColor: "#007bff", paddingVertical: 10, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
