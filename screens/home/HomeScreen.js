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
import { LinearGradient } from "expo-linear-gradient"; // For gradient background
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../store/UserContext";
import { COLORS } from "../../constants/colors";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const { userData } = useContext(UserContext);
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const displayCards = [
    require("../../assets/images/display-card1.jpeg"),
    require("../../assets/images/display-card3.jpg"),
    require("../../assets/images/display-card2.jpeg"),
    require("../../assets/images/display-card4.jpeg"),
  ];

  const quickTasks = [
    {
      id: "1",
      title: "Customer Service",
      icon: "headset-outline",
      screen: "CustomerService",
      gradient: ["#FF806D", "#FF345D"],
    },
    {
      id: "2",
      title: "Loan",
      icon: "cash-outline",
      screen: "Loan",
      gradient: ["#EF3AFF", "#5822BB"],
    },
    {
      id: "3",
      title: "Withdrawal",
      icon: "card-outline",
      screen: "Withdrawal",
      gradient: ["#4DF9FF", "#1280C4"],
    },
    {
      id: "4",
      title: "Policies",
      icon: "document-text-outline",
      screen: "Policies",
      gradient: ["#FFE415", "#C16407"],
    },
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
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/verinova-plain.png")}
            style={styles.logo}
          />
          <Text style={styles.logoTitle}>VeriNova</Text>
        </View>
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
          <TouchableOpacity
            key={index}
            style={styles.taskBox}
            onPress={() => navigation.navigate(task.screen)}
          >
            <LinearGradient
              colors={task.gradient}
              style={styles.gradientBackground}
            >
              <Ionicons name={task.icon} size={40} color="white" />
              <Text style={styles.taskText}>{task.title}</Text>
            </LinearGradient>
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
          <Ionicons name="home-sharp" size={26} color={COLORS.primary} />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person" size={26} color={COLORS.black} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings" size={26} color={COLORS.black} />
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="videocam" size={26} color={COLORS.black} />
          <Text style={styles.navText}>Ask Query</Text>
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 38,
    height: 30,
    resizeMode: "contain",
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
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
    backgroundColor: "white",
    height: 120,
    width: 120,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 4, // Shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  gradientBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    paddingVertical: 12,
    borderRadius: 20,
    elevation: 5, // Floating effect
    margin: 10,
    position: "absolute",
    bottom: 0,
    left: 10,
    right: 10,
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
