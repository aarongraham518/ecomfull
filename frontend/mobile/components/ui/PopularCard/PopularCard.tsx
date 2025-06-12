import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import imageMapper from "../../../utils/imageMapper";

// type ProductCardProps = {
//   imageUrl: string;
//   name: string;
//   description: string;
//   price: string;
//   onPress: () => void;
// }

type ProductCardProps = {
  _id: string,
  name: string;
  description?: string;
  price: number;
  imageUrl: string;
  category: string
};

export const PopularCard = ({ item }: {item: ProductCardProps}) => {  
  
  const { name, description, price, _id, imageUrl, category} = item;
  const imageSource = imageMapper[imageUrl] || require("../../../assets/images/placeholder.png");
  
  return (
    <TouchableOpacity
      // onPress={onPress}
      style={styles.container}
    >
      <Image
        source={imageSource}
        style={styles.imageSpec}
        resizeMode="center" 
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{name}</Text>
        <Text style={{ color: '#888', marginTop: 2 }}>{description}</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 6 }}>${price}</Text>
      </View>

      <View
        style={{
          backgroundColor: '#000',
          padding: 8,
          borderRadius: 12,
          marginLeft: 8,
        }}
      >
        <Ionicons name="chevron-forward" size={16} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginVertical: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  imageSpec: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 2
  }
})
