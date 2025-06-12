import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Pressable } from "react-native";

let promoImage = require("../../../assets/images/favoritesbannerimage.png");

export const PromoFavorites = () => {
  // const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, {borderColor: 'grey'}]} onPress={() => (console.log('pressed Promo'))}>
      <ImageBackground
        source={promoImage}
        resizeMode="cover"
        style={styles.promoContainer}
      >

        <View style={[styles.promoTextContainer, { backgroundColor: 'rgba(0, 0, 0, 0.65)' }]}>
          {/* <Text style={[styles.promoText]}>{promoText}</Text> */}
          <Text style={[styles.promoTextSmall]}>Your favorite clothing in one spot, let's checkout soon.
          </Text>
        </View>
       <Pressable style={[styles.buttonSpecs,{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }]}>
        <Text style={styles.buttonText}>Great Deals</Text>
       </Pressable>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: "white",
    height: 180,
    marginTop: 0,
    overflow: "hidden",
  },
  promoContainer: {
    backgroundColor: '#c5c5c5',
    height: 180,
  },
  promoTextContainer: {
    paddingLeft: 14,
    marginTop: 25,
    backgroundColor: 'white',
    width: 220,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 20,
    marginLeft: 20,
    
  },
  buttonSpecs:{
    backgroundColor: 'black',
    width: 132,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
  },
  promoSubTextContainer:{
    paddingLeft: 8,
    marginTop: 100,
  },  
  promoText:{
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  }, 
  promoOffText: {
    fontSize: 18,
    marginTop: 18,
    color: 'black',
    fontWeight: 'bold',
    // borderColor: 'white',
    // borderWidth: 1
  },
  promoTextSmall: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    width: '100%',
    marginTop: 10
  },
  premiumContainer:{
    backgroundColor: 'tomato',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginTop: 10
  },
  premiumText: {
    color: 'white',
    fontWeight: 'bold'
  },
  gradient: {
    flex: 1,
  },
});
