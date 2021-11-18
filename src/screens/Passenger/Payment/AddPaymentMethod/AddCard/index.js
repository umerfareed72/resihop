import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styles from './style';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {colors, size} from '../../../../../utilities';
import {PaymentButtons, PaymentInput} from '../../../../../components';
import I18n from '../../../../../utilities/translations';

const AddCard = ({title, onPressCard, onPressWallet,btn}) => {
  return (
    <View>
      {title && (
        <View style={styles.h1container}>
          <Text style={styles.h1}>{title}</Text>
        </View>
      )}
      <View style={styles.fieldContainer}>
        <CardField
          placeholder={{
            number: I18n.t('card_number'),
          }}
          postalCodeEnabled={false}
          cardStyle={styles.cardStyle}
          style={styles.payStyle}
          onCardChange={cardDetails => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
      </View>
      <PaymentInput
        placeholder={I18n.t('cardholder_name')}
        placeholderTextColor={colors.g1}
      />
      <View>
        <Text style={styles.infoStyle}>{I18n.t('add_card_info')}</Text>
      </View>
      {btn && (
        <View style={{paddingVertical: 30}}>
          <View style={{paddingVertical: 20}}>
            <PaymentButtons
              onPress={onPressCard}
              bgColor={colors.green}
              title={I18n.t('add_card')}
              txtColor={colors.white}
            />
          </View>

          <PaymentButtons
            onPress={onPressWallet}
            bgColor={colors.g1}
            title={'Pay From Wallet'}
            txtColor={colors.white}
          />
        </View>
      )}
    </View>
  );
};

export default AddCard;
