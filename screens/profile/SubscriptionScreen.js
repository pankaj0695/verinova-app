import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubscriptionScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Subscribe to Our Premium Plan</Text>
            <Text style={styles.subtitle}>
                Enjoy exclusive benefits such as:
            </Text>
            <View style={styles.benefitsContainer}>
                <Text style={styles.benefit}>✔ Priority in query resolution</Text>
                <Text style={styles.benefit}>✔ Access to premium features</Text>
                <Text style={styles.benefit}>✔ Personalized support</Text>
                <Text style={styles.benefit}>✔ Exclusive offers and discounts</Text>
            </View>
            <Text style={styles.choosePlanText}>Choose Your Plan:</Text>
            <TouchableOpacity
                style={[
                    styles.planButton,
                    selectedPlan === 'monthly' && styles.selectedPlan,
                ]}
                onPress={() => setSelectedPlan('monthly')}
            >
                <Text style={styles.planText}>Monthly - ₹799</Text> {/* Ensure text is wrapped in <Text> */}
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.planButton,
                    selectedPlan === 'yearly' && styles.selectedPlan,
                ]}
                onPress={() => setSelectedPlan('yearly')}
            >
                <Text style={styles.planText}>Yearly - ₹7,999</Text> {/* Ensure text is wrapped in <Text> */}
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.subscribeButton,
                    !selectedPlan && styles.disabledButton,
                ]}
                onPress={() => navigation.navigate('SubscriptionScreen')}
                disabled={!selectedPlan}
            >
                <Text style={styles.subscribeText}>Subscribe Now</Text> {/* Ensure text is wrapped in <Text> */}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    benefitsContainer: {
        marginBottom: 20,
        alignItems: 'flex-start',
        width: '80%',
    },
    benefit: {
        fontSize: 16,
        marginVertical: 5,
        color: '#333',
    },
    choosePlanText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    planButton: {
        width: '80%',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: '#ddd',
        alignItems: 'center',
    },
    selectedPlan: {
        backgroundColor: '#4caf50',
    },
    planText: {
        fontSize: 18,
        color: '#000',
    },
    subscribeButton: {
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#007bff',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#aaa',
    },
    subscribeText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default SubscriptionScreen;
