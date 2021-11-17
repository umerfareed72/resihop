import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styles from './style';
import {CardField, useStripe} from '@stripe/stripe-react-native';

const AddCard = () => {
  return (
    <View>
      <View>
        <Text style={styles.h1}>Add Card</Text>
      </View>
    </View>
  );
};

export default AddCard;
