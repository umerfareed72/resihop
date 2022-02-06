import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
  AddWalletModal,
  BankCard,
  CustomHeader,
  Header,
  PaymentButtons,
  PaymentCard,
  PaymentHistory,
  Loader,
} from '../../../../components';
import I18n from '../../../../utilities/translations';
import styles from './style';
import {appIcons, checkConnected, colors} from '../../../../utilities';
import AddCard from './AddCard';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {createToken, useConfirmPayment} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  add_stripe_card,
  get_card_list,
  save_current_card,
} from '../../../../redux/actions/payment.action';
import {Alert} from 'react-native';
import {FlatList} from 'react-native';
const index = ({navigation}) => {
  const [cardScreen, setCardScreen] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [paymentSuccess, setpaymentSuccessonSuccess] = useState(false);
  const [paymentFailed, setpaymentSuccessonFailed] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('');
  const [addMoney, onAddMoney] = useState(false);
  const [cardDetail, setcardDetail] = useState('');
  const [Loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  const isFocus = useIsFocused();

  //Redux State
  const auth = useSelector(state => state.auth);
  const payment = useSelector(state => state.payment);

  const dispatch = useDispatch(null);

  //onpress
  const onPressModalButton = () => {
    if (addMoney) {
      setpaymentSuccessonFailed(true);
      onAddMoney(false);
      setpaymentSuccessonSuccess(false);
    } else {
      modalRef?.current?.close();
      onAddMoney(false);
      setpaymentSuccessonFailed(false);
      setpaymentSuccessonSuccess(false);
      navigation?.navigate('StartMatching', {modalName: 'pickUpInfo'});
    }
  };

  useEffect(() => {
    if (isFocus) {
      getCards();
    }
  }, [isFocus]);
  //Card List
  const getCards = async () => {
    const check = await checkConnected();
    if (check) {
      dispatch(
        get_card_list(auth?.profile_info?.stripe_customer?.stripeID, res => {
          console.log(res);
        }),
      );
    }
  };

  //Add Card
  const addPayment = async () => {
    setLoading(true);
    try {
      const data = await createToken({
        name: cardHolderName,
        address: 'Lahore',
        type: 'Card',
      });

      if (data?.token) {
        const requestBody = {
          tokenID: data?.token?.id,
          name: cardHolderName,
        };
        dispatch(
          add_stripe_card(requestBody, res => {
            Alert.alert(
              'Success',
              'Card Added Successfully',
              [{text: 'Ok', onPress: () => getCards()}],
              {cancelable: false},
            );
            setLoading(false);
          }),
        );
      }
    } catch (error) {
      Alert.alert('Error', error?.response?.message);
      setLoading(false);
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
              disabled
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
              setpaymentSuccessonSuccess(false);
              setpaymentSuccessonFailed(false);
            }}
            title={I18n.t('wallet_balance')}
            add_Money={I18n.t('add_cards')}
          />
          <FlatList
            horizontal={true}
            data={payment?.card_list}
            renderItem={({item}) => {
              return (
                <BankCard
                  name={item?.name}
                  cardno={item?.last4}
                  brand={item?.brand}
                  value={toggleCheckBox}
                  onPressCard={() => {
                    dispatch(
                      save_current_card(item, () => {
                        navigation?.navigate('CardDetail');
                      }),
                    );
                  }}
                  onPress={setToggleCheckBox}
                  boxType={'circle'}
                />
              );
            }}
          />

          <PaymentHistory
            onPress={() => {
              navigation?.navigate('TransactionHistory');
            }}
            title={I18n.t('trnsaction_history')}
            image={appIcons.sort}
          />
          {cardScreen && (
            <AddCard
              onChangeText={text => {
                setCardHolderName(text);
              }}
              disabled={!Loading && cardHolderName ? false : true}
              btn={true}
              onCardChange={details => {
                setcardDetail(details);
              }}
              onPressCard={card => {
                addPayment();

                // setCardScreen(false);
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
        height={Dimensions.get('screen').height / 2.2}
        btnText={I18n.t('ok')}
        title={I18n.t('add_to_wallet')}
        addMoney={addMoney}
        onSuccess={paymentSuccess}
        onFailed={paymentFailed}
        onPress={() => {
          onPressModalButton();
        }}
        icon={paymentSuccess ? appIcons.tickBg : appIcons.cancel}
        h1={
          paymentFailed
            ? I18n.t('failed_payment')
            : '' || paymentSuccess
            ? I18n.t('success_payment')
            : ''
        }
        show={modalRef}
        h2={I18n.t('lorem')}
      />
      {Loading ? <Loader /> : null}
    </>
  );
};

export default index;
