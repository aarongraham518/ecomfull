import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ListRenderItem, FlatList, Image } from 'react-native';
import imageMapper from "../../utils/imageMapper";
import { useCart } from '../../store/context/CartContext';
import { useRouter } from 'expo-router';

type CartItem = {
  _id: string;
  title?: string;
  price?: number;
  imageUrl: string;
  quantity?: number;
  [key: string]: any;
};

const CheckoutScreen = () => {
  const router = useRouter();
  const { cartItems, getTotal, } = useCart();

  const renderCartItem: ListRenderItem<CartItem> = ({ item }) => {
    const imageSource = imageMapper[item.imageUrl] || require("../../assets/images/placeholder.png");
    return (
      <>
        <View style={styles.cartItem}>
          <Image source={imageSource} style={styles.productImage} resizeMode="contain" />
          <View style={styles.itemDetails}>
            <Text style={styles.brand}>{item.brand || 'Shoes'}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Delivery Address</Text>
      <View style={styles.addressContainer}>
        <View style={styles.addressSpec}>
          <Text style={styles.boldText}>Street:</Text><Text style={styles.greyBold}> 123 Bingo Street</Text>
        </View>
        <View style={styles.addressSpec}>
          <Text style={styles.boldText}>City:</Text><Text style={styles.greyBold}> Clearwater</Text>
        </View>
        <View style={styles.addressSpec}>
          <Text style={styles.boldText}>State:</Text><Text style={styles.greyBold}> Florida</Text>
        </View>
        <View style={styles.addressSpec}>
          <Text style={styles.boldText}>Phone Number:</Text><Text style={styles.greyBold}> 518-275-1234</Text>
        </View>
        <View style={styles.addressSpec}>
          <Text style={styles.boldText}>Zip code:</Text><Text style={styles.greyBold}>12345</Text>
        </View>
        <View style={styles.addressSpec}>
          <Text style={styles.boldText}>Country:</Text><Text style={styles.greyBold}>United States</Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Cart Items</Text>
      </View>

      <View style={{ height: 260, marginBottom: 50, marginTop: 15 }}>

        <FlatList
          data={cartItems}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderCartItem}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      </View>

      <View style={styles.totalOrderBtnContainer}>
        <View>
          <Text style={styles.totalPriceTxt}>Total Price</Text>
          <Text style={styles.totalPrice}>${getTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/confirmationTransit/confirmationTransit')}
        >
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: .92,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 100
  },
  addressContainer:{
    // borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderRadius: 15,
    padding: 12,
    marginBottom: 20,
    marginTop: 10
  },
  addressSpec: {
    flexDirection: 'row',
    marginBottom: 10
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  greyBold: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'grey'
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    alignItems: 'center',
    width: 340
  },
  productImage: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    color: '#888',
    fontSize: 14,
  },
  price: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  totalPriceTxt: {
    fontSize: 14,
    color: 'grey'
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  quantityButton: {
    fontSize: 18,
    paddingHorizontal: 6,
  },
  quantityText: {
    marginHorizontal: 6,
    fontSize: 16,
  },
  totalOrderBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 22,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
export default CheckoutScreen;