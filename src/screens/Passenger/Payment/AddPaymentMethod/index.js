import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {
  BankCard,
  CustomHeader,
  Header,
  PaymentButtons,
  PaymentHistory,
} from '../../../../components';
import I18n from '../../../../utilities/translations';
import styles from './style';
import {appIcons, colors} from '../../../../utilities';
import LinearGradient from 'react-native-linear-gradient';
import AddCard from './AddCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const index = ({navigation}) => {
  const [cardScreen, setCardScreen] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <>
      <CustomHeader
        title={I18n.t('my_payment_method')}
        backButton={true}
        navigation={navigation}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                setCardScreen(true);
              }}
              style={[
                styles.btnContainer,
                {backgroundColor: cardScreen ? colors.green : colors.white},
              ]}>
              <Text
                style={[
                  styles.btnText,
                  {color: cardScreen ? colors.white : colors.black},
                ]}>
                {I18n.t('add_card')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setCardScreen(false);
              }}
              style={[
                styles.btnContainer2,
                {backgroundColor: !cardScreen ? colors.green : colors.white},
              ]}>
              <Text
                style={[
                  styles.btnText2,
                  {color: !cardScreen ? colors.white : colors.black},
                ]}>
                {I18n.t('credit_card')}
              </Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={colors.gradientBoxColor}
            style={styles.linearGradient}>
            <View style={styles.rowAlign}>
              <View style={styles.leftContainer}>
                <Text style={styles.header2Text}>
                  {I18n.t('wallet_balance')}
                </Text>
                <TouchableOpacity style={styles.btnStyle}>
                  <Image source={appIcons.filter} style={styles.btnImage} />
                  <Text style={styles.btntext}>{I18n.t('add_cards')}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.header2Bold}>00.00 SEK</Text>
            </View>
          </LinearGradient>
          <BankCard
            name={'John Doe'}
            cardno={1234}
            value={toggleCheckBox}
            onPressCard={() => {
              navigation?.navigate('CardDetail');
            }}
            onPress={setToggleCheckBox}
            boxType={'circle'}
          />

          <PaymentHistory
            onPress={() => {
              navigation?.navigate('TransactionHistory');
            }}
            title={'Transaction History'}
            image={appIcons.mobiledata}
          />
          {cardScreen && (
            <AddCard
              btn={true}
              onPressCard={() => {
                setCardScreen(false);
              }}
              onPressWallet={() => {
                setCardScreen(false);
              }}
              title={I18n.t('add_card')}
            />
          )}
          {!cardScreen && (
            <View style={{paddingVertical: 30}}>
              <View style={{paddingVertical: 20}}>
                <PaymentButtons
                  onPress={() => {
                    setCardScreen(true);
                  }}
                  bgColor={colors.g1}
                  title={I18n.t('pay_with_card')}
                  txtColor={colors.white}
                />
              </View>
              <PaymentButtons
                bgColor={colors.g1}
                title={I18n.t('pay_with_wallet')}
                txtColor={colors.white}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default index;
