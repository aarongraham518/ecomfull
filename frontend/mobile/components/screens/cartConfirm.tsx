import React from "react";
import { View, StyleSheet } from "react-native";
import { HomeScreen } from "@/components/screens/HomeScreen";
import TrackingScreen from "../../app/(stack)/confirmationTransit/confirmationTransit";

const MyOrder = () => {
  return (
    <View style={styles.container}>
      <TrackingScreen />
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

export default MyOrder;
