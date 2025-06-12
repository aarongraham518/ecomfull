import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

type Category = {
  _id: string;
  name: string;
};

export const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryArray, setCategoryArray] = useState([]);
  const router = useRouter();

  const handlePress = (categoryId: string) => {
    setSelectedCategory(categoryId);
    router.push(`/(stack)/products/${categoryId}`);
  };

  const BASE_URL = "http://localhost:3000/api";

  useEffect(() => {
    const FetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories`);
        const categoryData = await response.json();
        setCategoryArray(categoryData);
        // console.log(categoryData, ' <--category data');
      } catch (error) {
        console.log('Sorry, Error, ', error);
      }
    };

    FetchCategories();
  }, []);

  const renderCategoryItem = ({ item }: {item: Category}) => (
    <TouchableOpacity
      onPress={() => handlePress(item._id)}
      style={{
        backgroundColor: selectedCategory === item._id ? '#000' : '#fff',
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
          color: selectedCategory === item._id ? '#fff' : '#000',
          fontWeight: '600',
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        horizontal
        data={categoryArray}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
});
