import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AccountType = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accountRequirements = {
    Current: [
      "Minimum balance requirement",
      "Business registration documents (if applicable)",
      "Identity proof",
      "Address proof"
    ],
    Saving: [
      "Minimum initial deposit",
      "Identity proof",
      "Address proof",
      "PAN Card (if applicable)"
    ]
  };

  return (
    <View style={styles.container}>
      {!selectedAccount ? (
        <>
          <Text style={styles.title}>Select Account Type</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedAccount("Current")}
          >
            <Text style={styles.buttonText}>Current Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setSelectedAccount("Saving")}
          >
            <Text style={styles.buttonText}>Saving Account</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>{selectedAccount} Account Requirements</Text>
          {accountRequirements[selectedAccount].map((requirement, index) => (
            <Text key={index} style={styles.requirementText}>
              • {requirement}
            </Text>
          ))}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedAccount(null)}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  requirementText: {
    fontSize: 16,
    marginBottom: 10
  },
  backButton: {
    backgroundColor: "#dc3545",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "80%",
    alignItems: "center"
  }
});

export default AccountType;
