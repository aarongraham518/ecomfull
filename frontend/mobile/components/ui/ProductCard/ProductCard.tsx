import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import imageMapper from "../../../utils/imageMapper";
import { useRouter } from 'expo-router';

type Product = {
  id: string,
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string
};

export const ProductCard = ({item}: {item: Product}) => {
  const router = useRouter();

  const imageSource = imageMapper[item.imageUrl] || require("../../../assets/images/placeholder.png");

  const { name, description, price, id, imageUrl, category} = item;

  const handleCardPress = (category: string) => {
    console.log(category, ' Clicked on category');
    // console.log(`/(stack)/products/${category}`)
    router.push(`/(stack)/products/${category}`);
  };

  // Placeholder for the heart press function
  const handleHeartPress = () => {
    console.log(`${name} added to favorites!`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(category)}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.productImage} resizeMode='center'/>
        <TouchableOpacity onPress={handleHeartPress} style={styles.heartIcon}>
          <Icon name="heart-o" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productDescription}>{description}</Text>
      <Text style={styles.productPrice}>${price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 5,
    width: 165,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    marginBottom: 10,
    paddingTop: 30
  },
  productImage: {
    width: '100%',
    height: '90%',
    marginTop: 7,
    borderRadius: 6,
  },
  heartIcon: {
    backgroundColor: '#4c4c4c',
    padding: 6,
    borderRadius: 50,
    position: 'absolute',
    top: 5,
    right: 0,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
});
