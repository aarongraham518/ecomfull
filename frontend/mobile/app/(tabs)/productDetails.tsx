import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(2);
  const [selectedColor, setSelectedColor] = useState('#000');
  const { productId } = useLocalSearchParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByProductID = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${productId}`);
        const data = await res.json();
        setProduct(data);
        console.log(data, " <-- Product DATA!!!")
      } catch (err) {
        console.error('Failed to fetch products by category:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductsByProductID();
    }
  }, [productId]);

  if (loading) return <Text>Loading...</Text>;

  const colors = ['#000', '#6e7d92', '#7b5a43', '#8e46c2', '#aa6ccb'];

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    setQuantity(prev => {
      if (type === 'inc') return prev + 1;
      if (type === 'dec' && prev > 1) return prev - 1;
      return prev;
    });
  };

  const imageSource = require("../../assets/images/placeholder.png");

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Image
        source={imageSource}
        style={styles.productImage}
        resizeMode="contain"
      />

      <View style={styles.indicator} />

      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.title}>Vinia Headphone</Text>
          <Ionicons name="heart-outline" size={24} color="black" />
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.soldTag}>
            <Text style={styles.soldText}>7,474 sold</Text>
          </View>
          <Ionicons name="star" color="#000" />
          <Text style={styles.rating}>4.9 (5,389 reviews)</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
        </Text>

        <Text style={styles.sectionTitle}>Color</Text>
        <View style={styles.colorRow}>
          {colors.map(color => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColorCircle,
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity onPress={() => handleQuantityChange('dec')} style={styles.quantityButton}>
            <Text style={styles.quantityText}>–</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => handleQuantityChange('inc')} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Total price</Text>
          <Text style={styles.totalPrice}>${(720 * quantity).toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="cart-outline" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
    },
    productImage: {
      width: '100%',
      height: 320,
    },
    indicator: {
      alignSelf: 'center',
      width: 40,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#ccc',
      marginVertical: 10,
    },
    content: {
      padding: 20,
    },
    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginVertical: 10,
    },
    soldTag: {
      backgroundColor: '#eee',
      borderRadius: 6,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginRight: 8,
    },
    soldText: {
      fontSize: 12,
      color: '#333',
    },
    rating: {
      fontSize: 14,
      color: '#333',
    },
    sectionTitle: {
      fontWeight: '600',
      fontSize: 16,
      marginTop: 20,
      marginBottom: 6,
    },
    description: {
      fontSize: 14,
      color: '#666',
    },
    colorRow: {
      flexDirection: 'row',
      gap: 12,
      marginVertical: 10,
    },
    colorCircle: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: 'transparent',
    },
    selectedColorCircle: {
      borderColor: '#000',
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginVertical: 10,
    },
    quantityButton: {
      backgroundColor: '#eee',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 6,
    },
    quantityText: {
      fontSize: 18,
      fontWeight: '500',
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
    },
    totalText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333',
    },
    totalPrice: {
      fontSize: 20,
      fontWeight: '700',
    },
    addButton: {
      flexDirection: 'row',
      backgroundColor: '#000',
      borderRadius: 50,
      paddingVertical: 14,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  