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
import { ipAddress } from "../../helper/helper";
import Markdown from "react-native-markdown-display";

export default function ServiceBotScreen() {
  const navigation = useNavigation();

  const [messages, setMessages] = useState([
    { id: "1", text: "Hi, I am Vyom’s AI Service Bot", sender: "bot" },
    {
      id: "2",
      text: "Please describe how I can help you...",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = {
      id: Math.random().toString(),
      text: inputText,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      const response = await fetch(`http://${ipAddress}:4000/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        const botMessage = {
          id: Math.random().toString(),
          text: data.response,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        alert("Bot error: " + data.error);
      }
    } catch (error) {
      setLoading(false);
      alert("Network error. Check server connection.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.topBarText}>Chatbot</Text>
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
            {item.sender === "bot" ? (
              <Markdown style={styles.markdownText}>{item.text}</Markdown> // Render Markdown properly
            ) : (
              <Text style={styles.messageText}>{item.text}</Text>
            )}
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

      {/* Loading Indicator */}
      {loading && <Text style={styles.loadingText}>Bot is typing...</Text>}

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
