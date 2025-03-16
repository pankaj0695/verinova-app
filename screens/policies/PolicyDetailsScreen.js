import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

export default function PolicyDetailsScreen({ route }) {
  const { name, description, link } = route.params; // Only necessary params

  const openLink = () => {
    Linking.openURL(link).catch((err) => console.error("Failed to open URL:", err));
  };

  const downloadPolicy = () => {
    Linking.openURL("https://www.unionbankofindia.co.in/pdf/Policy%20on%20Compensation,%20Grievance%20Redressal%20&%20Customer%20Rights%202024-25.pdf").catch((err) =>
      console.error("Failed to download policy:", err)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={openLink}>
        <Text style={styles.buttonText}>Read More</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.downloadButton} onPress={downloadPolicy}>
        <Text style={styles.buttonText}>Download Policy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f8f8", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 15 },
  description: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 10 },
  button: { backgroundColor: "#007bff", padding: 12, borderRadius: 5, marginBottom: 10 },
  downloadButton: { backgroundColor: "#28a745", padding: 12, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
