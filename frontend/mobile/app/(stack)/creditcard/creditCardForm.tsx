import React, {useState} from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CreditCard from '@/components/ui/CreditCard/CreditCard';
import CustomTextInput from '@/components/ui/CustomTextInput/CustomTextInput';
import { useRouter } from 'expo-router';

const CreditCardForm = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        cardNumber: '',
        cardDate: '',
        cardCvv: '',
      });

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
      };
    
      const handleSubmit = async () => {
        console.log(form, '<--Do we have all data values?');
        const { cardNumber, cardDate, cardCvv } = form;
    
        if (!cardNumber || !cardDate || !cardCvv) {
          Alert.alert('Validation', 'Please fill in all required fields');
          return;
        }
    
        try {
          const res = await axios.post('http://localhost:3000/api/creditcard', {
            cardNumber: Number(cardNumber),
            cardDate,
            cardCvv: Number(cardCvv)
          });
    
          Alert.alert('Success', 'Card added successfully!');
          setForm({
            cardNumber: '',
            cardDate: '',
            cardCvv: '',
          });
        } catch (err: any) {
          console.error(err);
          Alert.alert('Error', err.response?.data?.message || 'Something went wrong');
        }
      };

      const fakeSubmit = () => {
        router.push(`/(stack)/products/`);
      };
    return (
        <View style={styles.container}>
            <Text>Payment</Text>
            <CreditCard />
            <View>
                <Text style={styles.sectionTitle}>Card Details</Text>

                <CustomTextInput
                    placeholder="Card Number"
                    value={form.cardNumber}
                    onChangeText={(text) => handleChange('number', text)}
                />
                <CustomTextInput
                    placeholder="Exp Date"
                    value={form.cardDate}
                    onChangeText={(text) => handleChange('date', text)}
                />
                <CustomTextInput
                    placeholder="cvv"
                    value={form.cardCvv}
                    onChangeText={(text) => handleChange('cvv', text)}
                />

            </View>
            <View style={styles.buttonRow}>

        <TouchableOpacity style={styles.cancelButton} onPress={() => setForm({
          cardNumber: '',
          cardDate: '',
          cardCvv: '',
        })}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 50
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
      },
      cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        backgroundColor: '#f1f1f1',
      },
      confirmButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
        backgroundColor: '#000',
      },
      cancelText: {
        color: '#888',
        fontWeight: '600',
      },
      confirmText: {
        color: '#fff',
        fontWeight: '600',
      },
})

export default CreditCardForm;