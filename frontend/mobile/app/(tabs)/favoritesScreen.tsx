import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
// import { fetchProducts } from "../../api/api";
import { ProductCard } from "@/components/ui/ProductCard/ProductCard";
// import { Promo } from "../ui/Promo/Promo";//
import Constants from 'expo-constants';
import { SearchInput } from "@/components/ui/Search/SearchInput";
import { useCart } from "@/store/context/CartContext";
import { Promo } from "@/components/ui/Promo/Promo";
import { PromoFavorites } from "@/components/ui/Promo/PromoFavorites";
import { ProductCardForDetails } from "@/components/ui/ProductCardForDetails/ProductCardForDetails";

const BASE_URL = Constants.expoConfig?.extra?.API_URL;
// console.log(BASE_URL, "<--Local url to use!!!")

const FavoritesScreen = () => {
  const {favorites} = useCart();

  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchHomepageProducts = async () => {
    const response = await fetch(`${BASE_URL}/products/homepage`);
    if (!response.ok) throw new Error('Failed to fetch homepage products');
    return await response.json();
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = products.filter((product: any) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchHomepageProducts();
        setProducts(data);
        setFilteredProducts(data);
        console.log(data, "<--data-----");
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 12}}>
      <SearchInput
        placeholder="Search Product"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <PromoFavorites />
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
        contentContainerStyle={styles.flatListContainer}
        numColumns={2}
        // scrollEnabled={false}
        renderItem={({item, index}) => (
          <ProductCardForDetails item={item} key={index} />
        )}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { 
    paddingTop: 50,
    paddingHorizontal: 10
  },
  flatListContainer:{
    padding: 16
  },
  productCard: {
    marginBottom: 16,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  price: { marginTop: 4, color: "#555" },
});

export default FavoritesScreen;