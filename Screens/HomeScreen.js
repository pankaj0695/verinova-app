import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import { useNavigation } from "@react-navigation/native";

// Color Palette (Only Essential Colors)
const COLORS = {
  primary: "#E2261C",
  secondary: "#035697",
  white: "#FEFEFE",
  black: "#1C1C1C",
  subText: "#4a4a4a",
};

export default function HomeScreen() {
  const navigation = useNavigation();

  // Quick Task Data (Minimal Colors)
  const quickTasks = [
    { id: "1", title: "Bills" },
    { id: "2", title: "Withdraw" },
    { id: "3", title: "Loan" },
    { id: "4", title: "Subsidy" },
    { id: "5", title: "Transfer" },
    { id: "6", title: "Recharge" },
    { id: "7", title: "Insurance" },
    { id: "8", title: "Investments" },
    { id: "9", title: "Offers" },
    { id: "10", title: "More" },
  ];

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Image
          source={require("../assets/images/verinova-logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <Text style={styles.greeting}>Hi, Varun</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
        placeholderTextColor={COLORS.subText}
      />

      {/* Quick Tasks Section */}
      <Text style={styles.sectionTitle}>Quick Tasks</Text>
      <FlatList
        data={quickTasks}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskBox}>
            <Text style={styles.taskText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={COLORS.primary} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color={COLORS.black} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={24} color={COLORS.black} />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("ServiceBot")}
        >
          <Ionicons name="chatbubbles" size={24} color={COLORS.black} />
          <Text style={styles.navText}>Service Bot</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 30,
    resizeMode: "contain",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 10,
  },
  searchBox: {
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 10,
  },
  flatListContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 0,
  },
  taskBox: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
    margin: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.subText,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: COLORS.subText,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignSelf: "center",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: COLORS.black,
  },
});
