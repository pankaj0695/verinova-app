import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ServiceBotScreen() {
  const navigation = useNavigation();
  
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi, I am Vyom’s AI service Bot", sender: "bot" },
    {
      id: "2",
      text: "Please describe how I can help you...",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Math.random().toString(),
      text: inputText,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        {/* Back Button on Left */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Chatbot Title in Center */}
        <Text style={styles.topBarText}>Chatbot</Text>
        
        {/* Empty View to Keep Title Centered */}
        <View style={{ width: 24 }} />
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.chatArea}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.sender === "user" ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Ask Query Button */}
      <TouchableOpacity
        style={styles.askQueryButton}
        onPress={() => navigation.navigate("AskQuery")}
      >
        <Ionicons name="videocam" size={26} color="white" />
        <Text style={styles.askQueryText}>Ask Query</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 25, // Moved down
    paddingHorizontal: 16,
    backgroundColor: "#EAEAEA",
    borderBottomWidth: 1,
    borderColor: "#CCC",
  },
  backButton: {
    padding: 5,
  },
  topBarText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // Makes title centered
  },
  chatArea: {
    flex: 1,
    padding: 1,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: "75%",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  messageText: {
    fontSize: 14,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#FFF",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 20,
    backgroundColor: "#FFF",
  },
  sendButton: {
    marginLeft: 10,
    padding: 8,
  },
  askQueryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  askQueryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});

