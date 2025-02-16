import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function DocumentUploadScreen() {
  const navigation = useNavigation();
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const buttonScale = useRef(new Animated.Value(1)).current;

  const animatePressIn = () => Animated.spring(buttonScale, { toValue: 0.9, useNativeDriver: true }).start();
  const animatePressOut = () => Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  // Pick image or PDF
  const pickDocument = async (setFile) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
    });

    if (result.canceled) return;

    const fileType = result.assets[0].mimeType;
    if (fileType === "image/jpeg" || fileType === "image/png" || fileType === "application/pdf") {
      setFile(result.assets[0]);
    } else {
      alert("Only JPG, PNG, or PDF files are allowed.");
    }
  };

  // Capture selfie
  const takeSelfie = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelfie(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/verinova-logo.png")} style={styles.logo} />

      <View style={styles.uploadBox}>
        <Text style={styles.title}>Upload Your Documents</Text>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Upload Aadhar Card (JPG, PNG, PDF)</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(setAadharFile)}>
            <Text style={styles.uploadText}>Select Aadhar</Text>
          </TouchableOpacity>
          {aadharFile && <Text style={styles.fileName}>{aadharFile.name}</Text>}
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Upload PAN Card (JPG, PNG, PDF)</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={() => pickDocument(setPanFile)}>
            <Text style={styles.uploadText}>Select PAN</Text>
          </TouchableOpacity>
          {panFile && <Text style={styles.fileName}>{panFile.name}</Text>}
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Take a Selfie</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={takeSelfie}>
            <Text style={styles.uploadText}>Take Selfie</Text>
          </TouchableOpacity>
          {selfie && <Image source={{ uri: selfie }} style={styles.imagePreview} />}
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("MpinSetup")}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8f8f8", paddingHorizontal: 20 },
  logo: { width: 140, height: 140, marginBottom: 30 },
  uploadBox: { width: "90%", backgroundColor: "white", padding: 25, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  uploadSection: { width: "100%", marginBottom: 20, alignItems: "center" },
  label: { fontSize: 16, marginBottom: 8, color: "#444", textAlign: "center" },
  uploadButton: { backgroundColor: "#035697", padding: 12, borderRadius: 8, width: "100%", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  uploadText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  fileName: { fontSize: 14, marginTop: 5, color: "#555" },
  imagePreview: { width: 100, height: 100, borderRadius: 8, marginTop: 10 },
  nextButton: { backgroundColor: "#E2261C", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, marginTop: 10 },
  nextText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
