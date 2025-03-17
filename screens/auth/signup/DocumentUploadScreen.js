import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import uploadFileToS3 from "../../../helper/helper";
import { UserContext } from "../../../store/UserContext";
import { COLORS } from "../../../constants/colors";
import Checkbox from "expo-checkbox"; // Import checkbox

export default function DocumentUploadScreen() {
  const navigation = useNavigation();
  const [aadharFile, setAadharFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const buttonScale = useRef(new Animated.Value(1)).current;
  const { setUserData } = useContext(UserContext);

  const handleNext = async () => {
    if (!isChecked) {
      Alert.alert("Agreement Required", "You must agree to the terms and conditions.");
      return;
    }

    setIsLoading(true);

    if (!aadharFile) {
      Alert.alert("No Aadhar card selected", "Upload your Aadhar card");
      setIsLoading(false);
      return;
    }
    if (!panFile) {
      Alert.alert("No PAN card selected", "Upload your PAN card");
      setIsLoading(false);
      return;
    }
    if (!selfie) {
      Alert.alert("Invalid Selfie", "Upload your selfie");
      setIsLoading(false);
      return;
    }

    let aadharUrl = await uploadFileToS3(aadharFile);
    let panUrl = await uploadFileToS3(panFile);
    let selfieUrl = await uploadFileToS3(selfie);

    if (!aadharUrl || !panUrl || !selfieUrl) {
      Alert.alert("Upload Error", "Failed to upload one or more documents.");
      setIsLoading(false);
      return;
    }

    setUserData({ aadharUrl, panUrl, selfieUrl });
    setIsLoading(false);
    navigation.navigate("MpinSetup");
  };

  const animatePressIn = () =>
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  const animatePressOut = () =>
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();

  // Pick Document (JPG, PNG, PDF)
  const pickDocument = async (setFile) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ["image/jpeg", "image/png", "application/pdf"],
    });

    if (result.canceled) return;

    const fileType = result.assets[0].mimeType;
    if (
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "application/pdf"
    ) {
      setFile(result.assets[0]);
    } else {
      alert("Only JPG, PNG, or PDF files are allowed.");
    }
  };

  // Capture Selfie
  const takeSelfie = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelfie({ uri: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/verinova-logo.png")}
        style={styles.logo}
      />

      <View style={styles.uploadBox}>
        <Text style={styles.title}>Upload Your Documents</Text>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Upload Aadhar Card (JPG, PNG, PDF)</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickDocument(setAadharFile)}
          >
            <Text style={styles.uploadText}>Select Aadhar</Text>
          </TouchableOpacity>
          {aadharFile && <Text style={styles.fileName}>{aadharFile.name}</Text>}
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Upload PAN Card (JPG, PNG, PDF)</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickDocument(setPanFile)}
          >
            <Text style={styles.uploadText}>Select PAN</Text>
          </TouchableOpacity>
          {panFile && <Text style={styles.fileName}>{panFile.name}</Text>}
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.label}>Take a Selfie</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={takeSelfie}>
            <Text style={styles.uploadText}>Take Selfie</Text>
          </TouchableOpacity>
          {selfie && (
            <Image source={{ uri: selfie.uri }} style={styles.imagePreview} />
          )}
        </View>

        {/* Terms and Conditions Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#E2261C" : undefined}
          />
          <Text style={styles.checkboxText}>
            I agree to the{" "}
            <Text
              style={styles.linkText}
              onPress={() =>
                Alert.alert(
                  "Terms and Conditions",
                  "1. The bank reserves the right to modify account policies at any time.\n\n" +
                  "2. Customers must maintain a minimum balance as per the account type.\n\n" +
                  "3. Transactions are subject to security checks and regulatory guidelines.\n\n" +
                  "4. The bank is not responsible for unauthorized transactions due to customer negligence.\n\n" +
                  "5. Interest rates on deposits are subject to change as per RBI regulations.",
                  [{ text: "X", style: "cancel" }]
                )
              }
                          >
              Terms and Conditions
            </Text>
          </Text>
        </View>

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            disabled={!isChecked || isLoading}
            style={[styles.nextButton, (!isChecked || isLoading) && styles.disabledButton]}
            onPress={handleNext}
            onPressIn={animatePressIn}
            onPressOut={animatePressOut}
          >
            <Text style={styles.nextText}>
              {isLoading ? "Uploading..." : "Next"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
  },
  logo: { width: 140, height: 140, marginBottom: 30 },
  uploadBox: {
    width: "100%",
    backgroundColor: "white",
    padding: 25,
    borderRadius: 12,
    elevation: 4,
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, color: "#333" },
  uploadSection: { width: "100%", marginBottom: 20, alignItems: "center" },
  label: { fontSize: 16, marginBottom: 8, color: "#444", textAlign: "center" },
  uploadButton: {
    backgroundColor: "#035697",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  uploadText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  fileName: { fontSize: 14, marginTop: 5, color: "#555" },
  imagePreview: { width: 100, height: 100, borderRadius: 8, marginTop: 10 },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  nextButton: {
    backgroundColor: "#E2261C",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  nextText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
