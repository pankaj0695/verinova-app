import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Animated } from "react-native";

// Updated policies data with new policies
const policies = [
  {
    id: 1,
    name: "Privacy Policy",
    description: "This policy outlines how we collect, use, and protect your personal information.",
    link: "https://www.unionbankofindia.co.in/en/common/privacy-policy", // URL to the privacy policy
    isDownloadable: false, // This policy is a link, not downloadable
  },
  {
    id: 2,
    name: "Grievance Redressal Policy",
    description: "This policy provides a framework for addressing customer complaints and grievances.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal", // URL to the grievance policy
    isDownloadable: false, // This policy is a link
  },
  {
    id: 3,
    name: "Terms and Conditions for Internet Banking",
    description: "Learn about the terms and conditions for using Union Bank's internet banking services.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal", // URL to terms and conditions
    isDownloadable: false, // This policy is a link
  },
  {
    id: 4,
    name: "Anti-Money Laundering Policy",
    description: "This policy outlines Union Bank's approach to preventing money laundering.",
    link: "https://www.unionbankofindia.co.in/en/common/anti-money-laundering", // URL to AML policy
    isDownloadable: false, // This policy is a link
  },
  {
    id: 5,
    name: "Deposit Policy",
    description: "This policy explains the terms and conditions for making deposits with Union Bank.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal", // URL to deposit policy
    isDownloadable: false, // This policy is a link
  },
  {
    id: 6,
    name: "Compensation Policy",
    description: "Outlines how the bank compensates customers for financial losses due to the bank's errors or deficiencies in service. Covers areas like unauthorized debits, delayed collections, foreign exchange issues, ATM failures, and fraud.",
    link: "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures", // Fallback URL for compensation policy
    isDownloadable: false, // This policy is a link
  },
  {
    id: 7,
    name: "Customer Rights Policy",
    description: "Defines the basic rights of bank customers, including fair treatment, transparency, suitability of products, privacy, and access to grievance redressal and compensation. Emphasizes fair and honest dealing with all customers.",
    link: "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures", // Fallback URL for customer rights policy
    isDownloadable: false, // This policy is a link
  },
];

// Custom animated card component
const AnimatedCard = ({ children }) => {
  const fadeAnim = new Animated.Value(0);  // Initial value for opacity

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      {children}
    </Animated.View>
  );
};

export default function PolicyScreen() {
  const handlePress = (url, isDownloadable) => {
    const fallbackURL = "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures"; // Default fallback URL

    // Check if the URL can be opened
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
        } else {
          // If the URL cannot be opened, redirect to the fallback URL
          Linking.openURL(fallbackURL).catch((err) => console.error("Failed to open fallback URL:", err));
        }
      })
      .catch((err) => {
        // In case of an error, open the fallback URL
        console.error("Error checking URL:", err);
        Linking.openURL(fallbackURL).catch((err) => console.error("Failed to open fallback URL:", err));
      });
  };

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
              onPress={() => handlePress(policy.link, policy.isDownloadable)}
            >
              <Text style={styles.buttonText}>Read More</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  policiesContainer: {
    flex: 1,
    marginTop: 10,
  },
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
  policyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  policyDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
