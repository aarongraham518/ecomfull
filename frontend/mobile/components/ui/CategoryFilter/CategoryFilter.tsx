import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

type CategoryFilterProps = {
  categories?: [];
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter = ({ categories, onSelectCategory }: CategoryFilterProps) => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoryArray, setCategoryArray] = useState([]);

  const router = useRouter();

  const handlePress = (category: []) => {
    setSelectedCategory(category);
    router.push(`/(stack)/products/${category}`);
  };

  const BASE_URL = "http://localhost:3000/api";

  useEffect(() => {
    const FetchCategories = async () => {
    try {    
        const response = await fetch(`${BASE_URL}/categories`);
        const categoryData = await response.json();
        setCategoryArray(categoryData);
        console.log(categoryData, ' <--category data');
      } catch (error) {
        console.log('Sorry, Error, ', error)
    }  
  } 
  FetchCategories()
},[])

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 12 }}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryArray.map((category: any) => (
          <TouchableOpacity
            key={category}
            onPress={() => handlePress(category._id)}
            style={{
              backgroundColor: selectedCategory === category ? '#000' : '#fff',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              marginRight: 10,
              borderWidth: 1,
              borderColor: '#ccc',
            }}
          >
            <Text
              style={{
                color: selectedCategory === category ? '#fff' : '#000',
                fontWeight: '600',
              }}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    marginBottom: 10
  }
})