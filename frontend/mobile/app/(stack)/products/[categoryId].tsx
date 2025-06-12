import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { ProductCard } from '../../../components/ui/ProductCard/ProductCard';
import { PopularCard } from '@/components/ui/PopularCard/PopularCard';
import { SearchInput } from '@/components/ui/Search/SearchInput';
import { CategoryFilter } from '@/components/ui/CategoryFilter/CategoryFilter';

import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProductCardForDetails } from '@/components/ui/ProductCardForDetails/ProductCardForDetails';

const ProductScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { categoryId } = useLocalSearchParams();
  const [products, setProducts] = useState([]);
  const [popularItems, setPopularItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        // http://localhost:3000/api/products/${productId}
        const res = await fetch(`http://localhost:3000/api/products/by-category/${categoryId}`);
        const data = await res.json();
        setProducts(data);
        // console.log(data, " <-- CATEGORY DATA!!!")
      } catch (err) {
        console.error('Failed to fetch products by category:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
    }
  }, [categoryId]);

  useEffect(() => {
    const fetchPopularItems = async () => {

      try {
        console.log('getting popular items...');
        const response = await fetch('http://localhost:3000/api/popularproducts');
        const data = await response.json();
        setPopularItems(data);
      } catch (error) {
        console.log(`Sorry, there was an error, ${error}`)
      }    
    }
  
    fetchPopularItems()
  },[])

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.masterContainer}>
      <SearchInput
        placeholder="Search Product"
        style={{width: '100%'}}
        // value={name}
        // onChangeText={setName}
      />
      <CategoryFilter />
      <View style={styles.container}>      
        <FlatList         
          data={products}
          keyExtractor={(item: any, index: Number) => item._id ? item._id.toString() : index.toString()}
          contentContainerStyle={styles.container}
          numColumns={2}
          renderItem={({ item, index }) => (
            <ProductCardForDetails item={item} key={index}/>
          )}
        />

      </View>
      <Text style={{fontSize: 18, marginTop: 5, fontWeight: 'bold'}}>Popular</Text>
      <View style={styles.popularView}>
        
        <FlatList 
          data={popularItems}
          renderItem={({ item, index }) => (
            <PopularCard item={item} key={index}/>
          )}
        />        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  masterContainer:{
    paddingTop: 55,
    flex: 1,
    paddingHorizontal: 22
  },
  container: {
    flex: 2.5,
    alignItems: 'center'
  },
  popularView: {
    flex: 1,
    paddingHorizontal: 4
  }
})

export default ProductScreen;