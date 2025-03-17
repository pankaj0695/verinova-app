import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import for icons

export default function PolicyDetailsScreen({ route }) {
  const navigation = useNavigation();0.
  const { name, description, link } = route.params; // Extracting necessary params

  const openLink = async () => {
    if (!link) {
      Alert.alert("Error", "No policy link available.");
      return;
    }
    const supported = await Linking.canOpenURL(link);
    if (supported) {
      await Linking.openURL(link);
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
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
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
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4", alignItems: "center" },

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
  title: { fontSize: 22, fontWeight: "bold", color: "#333", marginBottom: 10, textAlign: "center" },
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
