import React from "react";
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';

type CustomTextInputProps = TextInputProps & {
    label?: string;
    errorMessage?: string;
}

export function SearchInput({
    label,
    errorMessage,
    style,
    ...props
}: CustomTextInputProps) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[styles.input, style]}
                placeholderTextColor="#888"
                {...props}
            />
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
        color: '#555',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    error: {
        marginTop: 4,
        fontSize: 12,
        color: 'red',
    },
});