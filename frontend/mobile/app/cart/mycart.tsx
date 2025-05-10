import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { useCart } from '../../store/context/CartContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import imageMapper from "../../utils/imageMapper";

// type CartItem = {
//   id: number;
//   name: string;
//   brand: string;
//   price: number;
//   quantity: number;
//   image: any;
// };

type CartItem = {
  _id: string;
  title?: string;
  price?: number;
  imageUrl: string;
  quantity?: number;
  [key: string]: any;
};

const MyCartScreen = () => {
  const { cartItems, subtotal, shippingFee, total, getTotal, removeFromCart, updateCartItemQuantity, getSubtotal } = useCart();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const renderCartItem: ListRenderItem<CartItem> = ({ item }) => {
    const imageSource = imageMapper[item.imageUrl] || require("../../assets/images/placeholder.png");
    return (
      <>
        <View style={styles.cartItem}>
          <Image source={imageSource} style={styles.productImage} resizeMode="contain" />
          <View style={styles.itemDetails}>
            {/* <TouchableOpacity onPress={() => handleQuantityChange('dec')} style={styles.quantityButton}>
            <Text style={styles.quantityText}>–</Text>
          </TouchableOpacity> */}
            {/* <Text style={styles.quantityText}>{quantity}</Text> */}
            {/* <TouchableOpacity onPress={() => handleQuantityChange('inc')} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity> */}
            <Text style={styles.brand}>{item.brand}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>

          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => updateCartItemQuantity(item.productId, 'dec')}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateCartItemQuantity(item.productId, 'inc')}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => removeFromCart(item.productId)} style={{ position: 'relative', top: -24 } }>
            <Text style={{ fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        </View>

      </>
    )
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderCartItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      <View style={styles.summaryBox}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>${getSubtotal().toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Shipping:</Text>
          <Text style={styles.value}>${shippingFee}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>BagTotal:</Text>
          <Text style={styles.value}>${getTotal().toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.promoCodeContainer}>
        <TextInput
          placeholder="Promo Code"
          style={styles.promoInput}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.applyButton}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() => navigation.navigate('Checkout')}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
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
  summaryBox: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  promoCodeContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyCartScreen;