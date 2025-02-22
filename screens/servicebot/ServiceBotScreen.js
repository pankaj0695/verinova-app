import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import * as DocumentPicker from "expo-document-picker"; // Updated package
import { Ionicons } from "@expo/vector-icons"; // Icons
import { useNavigation } from "@react-navigation/native";

export default function ServiceBotScreen() {
  const navigation = useNavigation();

  // State to store chat messages
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi, I am Vyom’s AI service Bot", sender: "bot" },
    {
      id: "2",
      text: "Please upload a video of yourself explaining how I can help you...",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");

  // Handle user message submission
  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Math.random().toString(),
      text: inputText,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInputText(""); // Clear input after sending
  };

  // Handle video upload
  const handleUploadVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
      });

      if (result.type === "success") {
        const newMessage = {
          id: Math.random().toString(),
          text: "📹 Video uploaded: " + result.name,
          sender: "user",
        };

        setMessages([...messages, newMessage]);
      }
    } catch (error) {
      console.error("Document selection error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Customer Service Bot</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Chat Area */}
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
        <TouchableOpacity
          onPress={handleUploadVideo}
          style={styles.uploadButton}
        >
          <Ionicons name="cloud-upload" size={20} color="black" />
        </TouchableOpacity>
      </View>
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
    padding: 16,
    backgroundColor: "#EAEAEA",
    borderBottomWidth: 1,
    borderColor: "#CCC",
  },
  topBarText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatArea: {
    flex: 1,
    padding: 10,
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
  uploadButton: {
    marginLeft: 10,
    padding: 8,
  },
});
