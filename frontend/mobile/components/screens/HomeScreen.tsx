import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import { fetchProducts } from "../../api/api";
import { ProductCard } from "@/components/ui/ProductCard/ProductCard";
import { Promo } from "../ui/Promo/Promo";
import { SearchInput } from "../ui/Search/SearchInput";

const BASE_URL = "http://localhost:3000/api";

export const HomeScreen = () => {
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
      <SearchInput
        placeholder="Search Product"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Promo promoText="30% Off" />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
        contentContainerStyle={styles.flatListContainer}
        numColumns={2}
        // scrollEnabled={false}
        renderItem={({ item}) => (
          <ProductCard item={item}/>
        )}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { 
    paddingTop: 50,
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
