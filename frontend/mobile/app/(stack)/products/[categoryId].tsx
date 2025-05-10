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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('WE HAVE A CATID ', categoryId)
    const fetchProductsByCategory = async () => {
      try {
        // http://localhost:3000/api/products/${productId}
        const res = await fetch(`http://localhost:3000/api/products/by-category/${categoryId}`);
        const data = await res.json();
        setProducts(data);
        console.log(data, " <-- CATEGORY DATA!!!")
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

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.masterContainer}>
      <SearchInput
        placeholder="Search Product"
        style={{width: '100%'}}
        // value={name}
        // onChangeText={setName}
      />
      <CategoryFilter
  categories={['Dresses', 'Jackets', 'Jeans', 'Shoes']}
  onSelectCategory={(cat) => console.log('Selected category:', cat)}
/>
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
      <ScrollView style={styles.popularView}>
        <PopularCard
          imageUrl="https://link-to-your-sneaker-image.jpg"
          brand="Axel Arigato"
          description="Clean 90 Triple Sneakers"
          price="245.00"
          onPress={() => console.log("Go to product screen")}
        />
        <PopularCard
          imageUrl="https://link-to-your-sneaker-image.jpg"
          brand="Inforcers"
          description="The one and only"
          price="445.00"
          onPress={() => console.log("Go to product screen")}
        />
        
      </ScrollView>
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