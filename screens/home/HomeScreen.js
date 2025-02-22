import React, { useEffect, useRef, useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../store/UserContext";
import { COLORS } from "../../constants/colors";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const { userData } = useContext(UserContext);
  const scrollViewRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const displayCards = [
    require("../../assets/images/display-card1.jpeg"),
    require("../../assets/images/display-card2.jpeg"),
    require("../../assets/images/display-card3.jpg"),
    require("../../assets/images/display-card4.jpeg"),
  ];

  const quickTasks = [
    { id: "1", title: "Customer Service", icon: "headset-outline" },
    { id: "2", title: "Loan", icon: "cash-outline" },
    { id: "3", title: "Withdrawal", icon: "card-outline" },
    { id: "4", title: "Policies", icon: "document-text-outline" },
  ];

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Auto Scroll Every 3 Seconds if User is Not Interacting
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isScrolling) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % displayCards.length;
          scrollViewRef.current?.scrollTo({
            x: nextIndex * width,
            animated: true,
          });
          return nextIndex;
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isScrolling]);

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color={COLORS.black} />
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/verinova-plain.png")}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <Text style={styles.greeting}>Hi, {userData.name.split(" ")[0]}</Text>
      <TextInput
        style={styles.searchBox}
        placeholder="Search"
        placeholderTextColor={COLORS.subText}
      />

      {/* Sliding Cards Section */}
      <View style={styles.cardContainer}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScrollBeginDrag={() => setIsScrolling(true)}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
            setIsScrolling(false);
          }}
        >
          {displayCards.map((card, index) => (
            <View key={index} style={styles.cardWrapper}>
              <Image source={card} style={styles.cardImage} />
            </View>
          ))}
        </ScrollView>

        {/* Dots Indicator */}
        <View style={styles.indicatorContainer}>
          {displayCards.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, { opacity: currentIndex === i ? 1 : 0.3 }]}
            />
          ))}
        </View>
      </View>

      {/* Quick Tasks */}
      <Text style={styles.sectionTitle}>Quick Tasks</Text>
      <View style={styles.quickTaskGrid}>
        {quickTasks.map((task, index) => (
          <TouchableOpacity key={index} style={styles.taskBox}>
            <Ionicons name={task.icon} size={35} color={COLORS.primary} />
            <Text style={styles.taskText}>{task.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Floating Chatbot */}
      <Animated.View
        style={[styles.chatbotIcon, { transform: [{ translateY: floatAnim }] }]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("ServiceBot")}>
          <Ionicons name="chatbubbles" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={COLORS.primary} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={24} color={COLORS.black} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={24} color={COLORS.black} />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="help-circle" size={24} color={COLORS.black} />
          <Text style={styles.navText}>Help</Text>
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
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: "contain",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop: 10,
  },
  searchBox: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: COLORS.black,
    marginTop: 10,
  },
  cardContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  cardImage: {
    width: width - 32,
    height: 180,
    borderRadius: 10,
    marginRight: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop: 20,
  },
  quickTaskGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  taskBox: {
    backgroundColor: COLORS.gray,
    height: 120,
    borderRadius: 10,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.black,
    textAlign: "center",
    marginTop: 5,
  },
  chatbotIcon: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 50,
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
