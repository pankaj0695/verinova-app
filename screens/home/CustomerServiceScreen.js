import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomerServiceScreen = () => {
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [details, setDetails] = useState('');
    const [openCategory, setOpenCategory] = useState(false);
    const [openSubCategory, setOpenSubCategory] = useState(false);
    const navigation = useNavigation();

    const categories = [
        { label: 'Loan', value: 'Loan' },
        { label: 'Policy', value: 'Policy' },
        { label: 'Account', value: 'Account' },
        { label: 'Fraud', value: 'Fraud' },
    ];

    const subCategories = {
        Loan: [
            { label: 'Home Loan', value: 'Home Loan' },
            { label: 'Personal Loan', value: 'Personal Loan' },
            { label: 'Car Loan', value: 'Car Loan' },
        ],
        Policy: [
            { label: 'Health Insurance', value: 'Health Insurance' },
            { label: 'Life Insurance', value: 'Life Insurance' },
            { label: 'Travel Insurance', value: 'Travel Insurance' },
        ],
        Account: [
            { label: 'Savings Account', value: 'Savings Account' },
            { label: 'Current Account', value: 'Current Account' },
            { label: 'Fixed Deposit', value: 'Fixed Deposit' },
        ],
        Fraud: [
            { label: 'Unauthorized Transactions', value: 'Unauthorized Transactions' },
            { label: 'Phishing', value: 'Phishing' },
            { label: 'Identity Theft', value: 'Identity Theft' },
        ],
    };

    const handleSubmit = () => {
        if (!category || !subCategory || !details.trim()) {
            Alert.alert('Error', 'Please fill out all fields before submitting.');
            return;
        }

        // Log the form data
        const formData = {
            category,
            subCategory,
            details,
        };
        console.log('Form Data:', formData);

        Alert.alert('Success', 'Your query has been submitted.');
        setCategory(null);
        setSubCategory(null);
        setDetails('');
    };

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Customer Service</Text>
                <View style={{ width: 28 }} /> {/* Placeholder for alignment */}
            </View>

            <Text style={styles.subtitle}>Submit your query below:</Text>

            {/* Category Dropdown */}
            <Text style={styles.label}>Category</Text>
            <View style={{ zIndex: openCategory ? 2 : 1 }}>
                <DropDownPicker
                    open={openCategory}
                    value={category}
                    items={categories}
                    setOpen={setOpenCategory}
                    setValue={setCategory}
                    placeholder="Select a category"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    onChangeValue={() => setSubCategory(null)} // Reset subcategory when category changes
                />
            </View>

            {/* Subcategory Dropdown */}
            {category && (
                <>
                    <Text style={styles.label}>Subcategory</Text>
                    <View style={{ zIndex: openSubCategory ? 2 : 1 }}>
                        <DropDownPicker
                            open={openSubCategory}
                            value={subCategory}
                            items={subCategories[category] || []}
                            setOpen={setOpenSubCategory}
                            setValue={setSubCategory}
                            placeholder="Select a subcategory"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                            onChangeValue={(value) => setSubCategory(value)} // Ensure subCategory is updated
                        />
                    </View>
                </>
            )}

            {/* Details Input */}
            <Text style={styles.label}>Query</Text>
            <TextInput
                style={[styles.input, styles.detailsInput]}
                placeholder="Provide additional details..."
                value={details}
                onChangeText={setDetails}
                multiline
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
    },
    topBarTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#555',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    dropdown: {
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
    },
    dropdownContainer: {
        borderColor: '#ccc',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        marginBottom: 20,
    },
    detailsInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomerServiceScreen;
