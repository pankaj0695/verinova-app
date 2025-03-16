import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";

const policies = [
  { id: 1, name: "Privacy Policy", description: "This policy outlines how we collect, use, and protect your personal information.", link: "https://www.unionbankofindia.co.in/en/common/privacy-policy" },
  { id: 2, name: "Grievance Redressal Policy", description: "This policy provides a framework for addressing customer complaints and grievances.", link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal" },
  { id: 3, name: "Terms and Conditions for Internet Banking", description: "Learn about the terms and conditions for using Union Bank's internet banking services.", link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal" },
  { id: 4, name: "Anti-Money Laundering Policy", description: "This policy outlines Union Bank's approach to preventing money laundering.", link: "https://www.unionbankofindia.co.in/en/common/anti-money-laundering" },
  { id: 5, name: "Deposit Policy", description: "This policy explains the terms and conditions for making deposits with Union Bank.", link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal" },
  { id: 6, name: "Compensation Policy", description: "Outlines how the bank compensates customers for financial losses due to errors or deficiencies in service.", link: "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures" },
  { id: 7, name: "Customer Rights Policy", description: "Defines the basic rights of bank customers, emphasizing fair and honest dealings.", link: "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures" },
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
      <Text style={styles.title}>Policies</Text>
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
  title: { fontSize: 24, fontWeight: "bold", color: "#333", textAlign: "center", marginVertical: 20 },
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
