import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const Sidebar = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-width * 0.75)).current; // Sidebar slides from left

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            onClose();
            navigation.replace("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal transparent animationType="none" visible={visible}>
      {/* Click outside sidebar to close */}
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Settings</Text>

          {/* Multilingual Option */}
          <TouchableOpacity style={styles.option}>
            <Ionicons name="language" size={22} color="black" />
            <Text style={styles.optionText}>Change Language</Text>
          </TouchableOpacity>

          {/* Logout Option */}
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={22} color="black" />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  sidebar: {
    width: "75%",
    height: "100%",
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 10,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
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
