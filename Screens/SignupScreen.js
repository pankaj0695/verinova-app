import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Enter Name" />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Create PIN"
        secureTextEntry
      />
      <Button
        title="Create Account"
        onPress={() => navigation.replace("Home")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
