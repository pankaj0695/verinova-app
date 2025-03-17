import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Sidebar = ({ visible, onClose, navigation }) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.sidebar} activeOpacity={1}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Settings</Text>

          {/* Multilingual Option */}
          <TouchableOpacity 
            style={styles.option} 
            onPress={() => {
              onClose();
              navigation.navigate("LanguageSettings");
            }}
          >
            <Ionicons name="language" size={22} color="black" />
            <Text style={styles.optionText}>Change Language</Text>
          </TouchableOpacity>

          {/* Logout Option */}
          <TouchableOpacity 
            style={styles.option} 
            onPress={() => {
              onClose();
              navigation.navigate("Login"); // Redirect to Login screen
            }}
          >
            <Ionicons name="log-out-outline" size={22} color="black" />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "flex-start", // Align sidebar to the left
  },
  sidebar: {
    width: "75%",
    height: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Sidebar;
