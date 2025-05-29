import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

const CreditCard = ({ card }) => {
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
            <Text style={styles.cardInfoText}>valid thru</Text>
            <Text style={styles.cardInfoText}>{card.validThru}</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardInfoText}>cvv</Text>
            <Text style={styles.cardInfoText}>{card.cvv}</Text>
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
    backgroundColor: '#5fc382',
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
  cardInfoText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CreditCard;
