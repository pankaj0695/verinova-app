import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../store/UserContext";
import { COLORS } from "../../constants/colors";

export default function PersonalDetailsScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [dob, setDob] = useState(null); // Initially null, so the field is empty
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [address, setAddress] = useState("");
  const { setUserData } = useContext(UserContext);

  const handleNext = () => {
    if (name.trim().length == 0) {
      Alert.alert("Invalid Name", "Enter your name");
      return;
    }
    if (dob == null) {
      Alert.alert("Invalid DOB", "Enter your date of birth");
      return;
    }
    if (address.trim().length == 0) {
      Alert.alert("Invalid Address", "Enter your address");
      return;
    }
    setUserData({ name, dob, address });
    navigation.navigate("DocumentUpload");
  };

  // Called when the date picker value changes
  const onChange = (event, selectedDate) => {
    if (event.type === "set" && selectedDate) {
      setDob(selectedDate);
    }
    // For Android, hide the picker once a date is selected
    setShowDatePicker(Platform.OS === "ios");
  };

  return (
    <View style={styles.container}>
      {/* Vyom Logo */}
      <Image
        source={require("../../assets/images/verinova-logo.png")}
        style={styles.logo}
      />

      <View style={styles.signupBox}>
        <Text style={styles.title}>Personal Details</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[styles.input, styles.dateInput]}
        >
          <Text style={styles.dateText}>
            {dob ? dob.toDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob || new Date()} // Pass today's date if dob is null
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
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
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  signupBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  dateInput: {
    justifyContent: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#E2261C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
