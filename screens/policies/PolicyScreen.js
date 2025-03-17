import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Ensure Ionicons is imported

const policies = [
  {
    id: 1,
    name: "Health Insurance Policy",
    description:
      "Our Health Insurance Policy provides financial coverage for medical expenses, including hospitalization, surgeries, and treatments. It also offers cashless treatment at partner hospitals.",
    link: "https://www.unionbankofindia.co.in/en/health-insurance-policy",
  },
  {
    id: 2,
    name: "Life Insurance Policy",
    description:
      "Secure your family's future with our Life Insurance Policy, offering financial protection in case of unfortunate events. Choose from term plans, whole life insurance, and endowment policies.",
    link: "https://www.unionbankofindia.co.in/en/life-insurance-policy",
  },
  {
    id: 3,
    name: "Home Insurance Policy",
    description:
      "Protect your home against natural disasters, fire, and theft with our Home Insurance Policy. It covers structural damages and loss of valuable belongings.",
    link: "https://www.unionbankofindia.co.in/en/home-insurance-policy",
  },
  {
    id: 4,
    name: "Vehicle Insurance Policy",
    description:
      "Our Vehicle Insurance Policy ensures coverage against accidents, damages, and third-party liabilities. Choose from comprehensive or third-party plans.",
    link: "https://www.unionbankofindia.co.in/en/vehicle-insurance-policy",
  },
  {
    id: 5,
    name: "Travel Insurance Policy",
    description:
      "Enjoy a worry-free journey with our Travel Insurance Policy, covering trip cancellations, medical emergencies, lost baggage, and more.",
    link: "https://www.unionbankofindia.co.in/en/travel-insurance-policy",
  },
  {
    id: 6,
    name: "Retirement Pension Policy",
    description:
      "Plan for a secure future with our Retirement Pension Policy, ensuring regular income post-retirement to maintain your lifestyle.",
    link: "https://www.unionbankofindia.co.in/en/retirement-pension-policy",
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
              onPress={() =>
                navigation.navigate("PolicyDetailsScreen", {
                  name: policy.name,
                  description: policy.description,
                  link: policy.link,
                })
              }
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
    margin: 15,
    // marginBottom: 10,
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
