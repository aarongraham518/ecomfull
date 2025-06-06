import CustomTextInput from '@/components/ui/CustomTextInput/CustomTextInput';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddCategoryScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation', 'Category name is required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/categories', {
        name
      });
  
      console.log('Success:', response.data);
      Alert.alert('Success', 'Category added successfully!');
      setName('');
      setDescription('');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Category</Text>

      <CustomTextInput
        label="Name"
        placeholder="Category name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/settingsScreen')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
      backgroundColor: '#fff',
      padding: 24,
    },
    header: {
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 24,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
    },
    cancelText: {
      fontSize: 16,
      color: '#999',
    },
    confirmButton: {
      backgroundColor: '#000',
      borderRadius: 50,
      paddingHorizontal: 24,
      paddingVertical: 12,
    },
    confirmText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
  });
  
