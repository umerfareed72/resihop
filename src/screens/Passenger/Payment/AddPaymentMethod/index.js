import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {
  AddWalletModal,
  BankCard,
  CustomHeader,
  Header,
  PaymentButtons,
  PaymentCard,
  PaymentHistory,
} from '../../../../components';
import I18n from '../../../../utilities/translations';
import styles from './style';
import {appIcons, colors} from '../../../../utilities';
import AddCard from './AddCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

const index = ({navigation}) => {
  const [cardScreen, setCardScreen] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [paymentSuccess, setpaymentSuccessonSuccess] = useState(false);
  const [paymentFailed, setpaymentSuccessonFailed] = useState(false);
  const [addMoney, onAddMoney] = useState(false);

  const modalRef = useRef(null);

  const onPressModalButton = () => {
    if (addMoney) {
      setpaymentSuccessonFailed(true);
      onAddMoney(false);
    } else {
      modalRef?.current?.close();
    }
  };
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
          <PaymentCard
            onPressAddMoney={() => {
              modalRef?.current?.open();
              onAddMoney(true);
            }}
            title={I18n.t('wallet_balance')}
            add_Money={I18n.t('add_cards')}
            onPress={() => {
              navigation?.navigate('WithDrawPayment');
            }}
          />

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
            image={appIcons.sort}
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
                onPress={() => {
                  modalRef.current.open();
                  setpaymentSuccessonSuccess(true);
                  setpaymentSuccessonFailed(false);
                  onAddMoney(false);
                }}
                bgColor={colors.g1}
                title={I18n.t('pay_with_wallet')}
                txtColor={colors.white}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      <AddWalletModal
        btnText={'OK'}
        title={'Add Money to Wallet'}
        addMoney={addMoney}
        onSuccess={paymentSuccess}
        onFailed={paymentFailed}
        onPress={() => {
          onPressModalButton();
        }}
        icon={paymentSuccess ? appIcons.tickBg : appIcons.cancel}
        h1={
          paymentFailed
            ? 'Your amount exceeds Balance'
            : '' || paymentSuccess
            ? 'Money Withdrawal Successful!'
            : ''
        }
        show={modalRef}
        h2={
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
        }
      />
    </>
  );
};

export default index;
