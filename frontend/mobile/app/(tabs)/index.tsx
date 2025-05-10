import React from "react";
import { View, StyleSheet } from "react-native";
import { HomeScreen } from "@/components/screens/HomeScreen";

const Promo = () => {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { padding: 8 },
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

export default Promo;
