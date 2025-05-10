import CustomTextInput from '@/components/ui/CustomTextInput/CustomTextInput';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type DropDownItem = {
  label: string;
  value: string;
};

export default function AddProductScreen({ navigation }: any) {
  const [items, setItems] = useState<DropDownItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3000/api/categories');
        const formatted = res.data.map((cat: any) => ({
          label: cat.name,
          value: cat._id,
        }));
        console.log(formatted, 'Formatted Categories')
        setItems(formatted);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    console.log(form, '<--Do we have all data values?');
    const { name, description, price, category, stock, imageUrl } = form;

    if (!name || !price || !category) {
      Alert.alert('Validation', 'Please fill in all required fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/api/products', {
        name,
        description,
        price: Number(price),
        category: category,
        stock: Number(stock),
        imageUrl,
      });

      Alert.alert('Success', 'Product added successfully!');
      setForm({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrl: '',
      });
    } catch (err: any) {
      console.error(err);
      Alert.alert('Error', err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Add a Product</Text>

      <CustomTextInput
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <CustomTextInput
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => handleChange('description', text)}
      />
      <CustomTextInput
        placeholder="Price"
        value={form.price}
        onChangeText={(text) => handleChange('price', text)}
      />
      <CustomTextInput
        placeholder="Stock"
        value={form.stock}
        onChangeText={(text) => handleChange('stock', text)}
      />

      <CustomTextInput
        placeholder="Image URL"
        value={form.imageUrl}
        onChangeText={(text) => handleChange('imageUrl', text)}
      />

<DropDownPicker
  open={open}
  items={items}
  setItems={setItems}
  setOpen={setOpen}
  value={form.category}
  onChangeValue={(val: any) => {
    console.log('Selected Category', val);
    // handleChange('category', val);
  }}
  placeholder="Select category"
  style={{ borderColor: '#ccc' }}
/>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setForm({
          name: '',
          description: '',
          price: '',
          category: '',
          stock: '',
          imageUrl: '',
        })}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    overflow: 'hidden',
    flex: 1
  },
  picker: {
    height: 50,
    paddingHorizontal: 10,
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
});