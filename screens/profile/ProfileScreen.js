import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../store/UserContext";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { userData, logout } = useContext(UserContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => confirmLogout() },
      ],
      { cancelable: true }
    );
  };

  const confirmLogout = () => {
    logout();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* User Avatar */}
      <Image source={{ uri: userData.selfieUrl }} style={styles.avatar} />

      {/* User Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={22} color="#035697" />
          <Text style={styles.infoText}>{userData.name || "User"}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={22} color="#035697" />
          <Text style={styles.infoText}>
            {userData.mobile || "Not available"}
          </Text>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    backgroundColor: "#F5F7FA",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1C1C1C",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginTop: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#035697",
  },
  infoCard: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#E2261C",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileScreen;
