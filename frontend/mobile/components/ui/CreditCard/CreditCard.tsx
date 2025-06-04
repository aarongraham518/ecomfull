import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const card = {
  balance: 300,
  last4: 1234,
  validMonth: 11,
  validYear: 27,
  cvv: 131
  
}
const CreditCard = () => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground style={styles.card}>
        <View style={styles.balCarNameCtnr}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.cardName}>VISA</Text>
        </View>
        <Text style={styles.balance}>${card.balance}</Text>
        <View style={styles.cardDetails}>
          <Text style={styles.cardNumber}>**** **** **** {card.last4}</Text>
          <View style={styles.cardInfo}>
            <Text style={styles.cardHolderText}>CARD HOLDER NAME</Text>
            <Text style={styles.cardHolderText}>Valid Thru</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardHolderName}>Aaron Graham</Text>
            <Text style={styles.cardInfoText}>{card.validMonth}/{card.validYear}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    balCarNameCtnr:{
        flexDirection: 'row'
    },
  cardContainer: {
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: '#161616',
    borderRadius: 10
  },
  card: {
    width: 350,
    height: 210,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  balanceLabel: {
    color: 'white',
    fontSize: 16,
  },
  balance: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardName:{
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginLeft: 200
  },
  cardDetails: {
    alignItems: 'flex-start',
  },
  cardNumber: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cardHolderText:{
    color: 'white',
    fontSize: 12,
  },
  cardHolderName:{
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  cardInfoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default CreditCard;
