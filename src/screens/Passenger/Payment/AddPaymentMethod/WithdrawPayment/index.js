import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  BlockInput,
  CustomHeader,
  PaymentButtons,
  PaymentCard,
} from '../../../../../components';
import {colors} from '../../../../../utilities';
import styles from './styles';
import I18n from '../../../../../utilities/translations';

const index = ({navigation}) => {
  const [addMoney, setaddMoney] = useState('');
  return (
    <>
      <CustomHeader
        title={I18n.t('withdraw')}
        backButton={true}
        navigation={navigation}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <PaymentCard title={I18n.t('balance')} />
          <View>
            <Text style={styles.headerText}>{I18n.t('wp_title')}</Text>
          </View>
          <View>
            <BlockInput
              onChangeText={text => {
                setaddMoney(text);
              }}
              placeholder={'Amount'}
              placeholderTextColor={colors.g1}
            />
          </View>
          <View style={{padding: 20}}>
            <PaymentButtons
              onPress={() => {
                navigation?.navigate('TransactionDetails');
              }}
              txtColor={colors.white}
              bgColor={addMoney ? colors.green : colors.g1}
              title={I18n.t('withdraw')}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default index;
