import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

const TrackQueriesScreen = ({ route }) => {
  const [tickets, setTickets] = useState([
    { id: "1", title: "Issue with payment", status: "Active" },
    { id: "2", title: "Loan inquiry", status: "Resolved" },
  ]);
  const [feedback, setFeedback] = useState({});
  const [feedbackDesc, setFeedbackDesc] = useState({});

  React.useEffect(() => {
    if (route.params?.ticketId) {
      const newTicket = {
        id: route.params.ticketId,
        audioUri: route.params.audioUri,
        videoUri: route.params.videoUri,
        status: "Active",
      };
      setTickets((prevTickets) => [...prevTickets, newTicket]);
    }
  }, [route.params]);

  const handleFeedbackSubmit = (ticketId) => {
    if (!feedback[ticketId]) {
      Alert.alert("Error", "Please provide a star rating before submitting.");
      return;
    }
    if (!feedbackDesc[ticketId] || feedbackDesc[ticketId].trim() === "") {
      Alert.alert("Error", "Please provide a description for your feedback.");
      return;
    }
    Alert.alert("Thank You", "Your feedback has been submitted successfully!");
    setFeedback((prev) => ({ ...prev, [ticketId]: null }));
    setFeedbackDesc((prev) => ({ ...prev, [ticketId]: "" }));
  };

  const renderStars = (ticketId) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <View style={styles.starsContainer}>
        {stars.map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() =>
              setFeedback((prev) => ({ ...prev, [ticketId]: star }))
            }
          >
            <Ionicons
              name="star"
              size={24}
              color={feedback[ticketId] >= star ? COLORS.blue : COLORS.red}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTicket = ({ item }) => (
    <View style={styles.ticket}>
      <Text style={styles.ticketTitle}>{item.title}</Text>
      <Text
        style={[
          styles.ticketStatus,
          item.status === "Active"
            ? styles.activeStatus
            : styles.resolvedStatus,
        ]}
      >
        {item.status === "Active" ? "🟢 Active" : "✅ Resolved"}
      </Text>
      {item.status === "Active" && (
        <Text style={styles.note}>
          * Resolving can only be done by an agent.
        </Text>
      )}
      {item.status === "Resolved" && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackLabel}>Rate your experience:</Text>
          {renderStars(item.id)}
          <TextInput
            style={styles.feedbackInput}
            placeholder="Enter feedback description"
            value={feedbackDesc[item.id] || ""}
            onChangeText={(text) =>
              setFeedbackDesc((prev) => ({ ...prev, [item.id]: text }))
            }
          />
          <TouchableOpacity
            style={styles.feedbackButton}
            onPress={() => handleFeedbackSubmit(item.id)}
          >
            <Text style={styles.feedbackButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Customer Service</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={renderTicket}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: COLORS.white },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
  },
  ticket: {
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: COLORS.lightGray,
  },
  ticketTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.black },
  ticketStatus: { fontSize: 16, marginTop: 5 },
  activeStatus: { color: COLORS.warning },
  resolvedStatus: { color: COLORS.success },
  note: { fontSize: 12, color: COLORS.subText, marginTop: 5 },
  feedbackContainer: { marginTop: 10 },
  feedbackLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 10,
  },
  starsContainer: { flexDirection: "row", marginBottom: 10 },
  feedbackInput: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  feedbackButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  feedbackButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
});

export default TrackQueriesScreen;
