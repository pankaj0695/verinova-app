import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";  // Correct import

const faqs = [
  {
    question: "What is an ATM, and what services does it offer?",
    answer: "An ATM (Automated Teller Machine) is a self-service banking terminal that allows you to withdraw cash, check your account balance, transfer funds, and more."
  },
  {
    question: "Where can I find Union Bank ATMs?",
    answer: "Union Bank ATMs are strategically located across India. You can find the nearest ATM using our website or mobile app's ATM locator feature."
  },
  {
    question: "Can I withdraw cash from any Union Bank ATM?",
    answer: "Yes, you can withdraw cash from any Union Bank ATM using your debit card, subject to sufficient funds in your account."
  },
  {
    question: "Are there any charges for using Union Bank ATMs?",
    answer: "Union Bank offers a certain number of free transactions per month, and additional transactions may be subject to nominal charges."
  },
  {
    question: "What is the maximum amount I can withdraw from an ATM in a single transaction?",
    answer: "The maximum withdrawal limit per transaction varies based on your account type and the ATM's limits."
  },
  {
    question: "Can I transfer funds to other Union Bank accounts using ATMs?",
    answer: "Yes, you can transfer funds to other Union Bank accounts or third-party accounts using the NEFT/IMPS option available at ATMs."
  },
  {
    question: "How can I check my account balance at an ATM?",
    answer: "You can check your account balance by selecting the 'Balance Inquiry' option and entering your debit card PIN."
  },
  {
    question: "Can I change my ATM PIN at Union Bank ATMs?",
    answer: "Yes, you can change your ATM PIN for enhanced security by selecting the 'Change PIN' option and following the instructions."
  },
  {
    question: "What should I do if my ATM card is lost or stolen?",
    answer: "In case of a lost or stolen card, immediately contact our customer support or block your card through internet banking/mobile app to prevent unauthorized use."
  },
  {
    question: "What are cardless cash withdrawals, and how do they work?",
    answer: "Cardless cash withdrawals allow you to withdraw money from an ATM without using a physical debit card. You can generate a one-time code through our mobile app to authorize the withdrawal."
  }
];

const FAQ = () => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index); // Toggle between expanded and collapsed
  };

  const renderFAQ = (faq, index) => {
    const isExpanded = expanded === index;

    return (
      <View key={index} style={styles.card}>
        <TouchableOpacity
          style={styles.titleContainer}
          onPress={() => toggleExpand(index)} // Toggle FAQ expansion
          activeOpacity={0.7}
        >
          <Text style={styles.questionText}>{faq.question}</Text>
          <Ionicons
            name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}  // Switch icons based on expansion state
            size={20}
            color="#007bff"
            style={styles.icon}
          />
        </TouchableOpacity>
        {isExpanded && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{faq.answer}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Frequently Asked Questions</Text>
      <View style={styles.faqCardsContainer}>
        {faqs.map((faq, index) => renderFAQ(faq, index))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,  // Ensures ScrollView takes up the entire height and remains scrollable
    padding: 15,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  faqCardsContainer: {
    marginTop: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#007bff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  answerContainer: {
    padding: 15,
    backgroundColor: "#f1f1f1",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  answerText: {
    fontSize: 14,
    color: "#555",
  },
  icon: {
    transform: [{ rotate: "0deg" }],
  },
});

export default FAQ;
