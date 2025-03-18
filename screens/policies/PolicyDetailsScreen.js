import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";

const policies = [
  {
    id: 1,
    name: "Privacy Policy",
    description:
      "This policy outlines how we collect, use, store, and protect your personal information. It covers data security, sharing of information, and your rights regarding data privacy.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal", // Updated link
  },
  {
    id: 2,
    name: "Grievance Redressal Policy",
    description:
      "Our Grievance Redressal Policy provides a framework to address customer complaints and service-related issues. It details response timelines, escalation levels, and resolution processes.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal", // Updated link
  },
  {
    id: 3,
    name: "Terms and Conditions for Internet Banking",
    description:
      "Learn about the terms, conditions, and security measures for using Union Bank's internet banking services, including login credentials, transaction limits, and fraud prevention guidelines.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal",
  },
  {
    id: 4,
    name: "Anti-Money Laundering Policy",
    description:
      "Union Bank follows strict anti-money laundering regulations to prevent illegal financial activities. This policy includes Know Your Customer (KYC) norms, transaction monitoring, and reporting obligations.",
    link: "https://www.unionbankofindia.co.in/en/common/anti-money-laundering",
  },
  {
    id: 5,
    name: "Deposit Policy",
    description:
      "This policy explains the terms, interest rates, and operational guidelines for making deposits with Union Bank. It also covers premature withdrawal rules and nomination facilities.",
    link: "https://www.unionbankofindia.co.in/en/common/grievance-redressal",
  },
  {
    id: 6,
    name: "Compensation Policy",
    description:
      "This policy details the circumstances under which customers are compensated for financial losses due to banking errors, service deficiencies, or system failures.",
    link: "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures",
  },
  {
    id: 7,
    name: "Customer Rights Policy",
    description:
      "Our Customer Rights Policy defines fundamental rights, such as fair treatment, transparency, privacy, and grievance redressal mechanisms, ensuring ethical and responsible banking practices.",
    link: "https://www.unionbankofindia.co.in/en/common/policies-and-disclosures",
  },
];

export default function PolicyDetailsScreen({ route }) {
  const [policy, setPolicy] = useState({});
  const { name } = route.params; // Extracting necessary params
  useEffect(() => {
    const currPolicy = policies.find((policy) => (policy.name = name));
    setPolicy(currPolicy);
  });

  const openLink = async () => {
    if (!policy.link) {
      Alert.alert("Error", "No policy link available.");
      return;
    }
    const supported = await Linking.canOpenURL(policy.link);
    if (supported) {
      await Linking.openURL(policy.link);
    } else {
      Alert.alert("Error", "Failed to open the policy page.");
    }
  };

  const downloadPolicy = async () => {
    const pdfUrl =
      "https://www.unionbankofindia.co.in/pdf/Policy%20on%20Compensation,%20Grievance%20Redressal%20&%20Customer%20Rights%202024-25.pdf";
    const supported = await Linking.canOpenURL(pdfUrl);
    if (supported) {
      await Linking.openURL(pdfUrl);
    } else {
      Alert.alert("Error", "Failed to download policy.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Policy Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{policy.name}</Text>
        <Text style={styles.description}>{policy.description}</Text>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity style={styles.readMoreButton} onPress={openLink}>
        <Text style={styles.buttonText}>🔗 Read More</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.downloadButton} onPress={downloadPolicy}>
        <Text style={styles.buttonText}>📥 Download Policy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },

  /* Card Styles */
  card: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  description: { fontSize: 16, color: "#555", textAlign: "center" },

  /* Button Styles */
  readMoreButton: {
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#007bff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  downloadButton: {
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#28a745",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
