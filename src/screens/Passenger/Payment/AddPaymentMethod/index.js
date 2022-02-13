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
import {
  createToken,
  useConfirmPayment,
  confirmPayment,
} from '@stripe/stripe-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  add_stripe_card,
  checkout_current_card,
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
    modalRef?.current?.close();
    setpaymentSuccessonFailed(false);
    setpaymentSuccessonSuccess(false);
    // navigation?.navigate('StartMatching', {modalName: 'pickUpInfo'});
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
          console.log('Cards');
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
        type: 'Card',
      });

      if (data?.token) {
        const requestBody = {
          tokenID: data?.token?.id,
          name: cardHolderName,
        };
        console.log(requestBody);
        dispatch(
          add_stripe_card(requestBody, res => {
            Alert.alert(
              'Success',
              'Card Added Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    setLoading(false);
                    setCardScreen(!cardScreen);
                    getCards();
                  },
                },
              ],
              {cancelable: false},
            );
          }),
        );
      }
    } catch (error) {
      Alert.alert('Error', error?.response?.message);
      setLoading(false);
    }
  };
  //Select Card
  const selectCard = item => {
    setcardDetail(item);
    setToggleCheckBox(item?.id);
  };

  //Pay from Card
  const payFromCard = () => {
    const requestBody = {
      customerID: cardDetail?.customer,
      cardID: cardDetail?.id,
      rideID: '6204bd91cd0fab4617d2ccf6',
      driverUserID: '6204b89ccd0fab4617d2ccf5',
    };
    dispatch(
      checkout_current_card(requestBody, res => {
        console.log(res);
        Alert.alert(
          'Confirmation!',
          'Do you want to pay?',
          [
            {text: 'Yes', onPress: () => confirm_payment(res)},
            {text: 'No', onPress: () => console.log('Cancelled')},
          ],
          {cancelable: false},
        );
      }),
    );
  };
  const confirm_payment = async data => {
    const {error, paymentIntent} = await confirmPayment(data?.clientSecret, {
      type: 'Card',
      setupFutureUsage: 'OffSession',
    });
    if (paymentIntent) {
      modalRef.current.open();
      setpaymentSuccessonSuccess(true);
    }
    if (error) {
      console.log(error);
      modalRef.current.open();
      setpaymentSuccessonFailed(true);
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
                setCardScreen(!cardScreen);
              }}
              style={[
                styles.btnContainer,
                {backgroundColor: colors.green, flexDirection: 'row'},
              ]}>
              <Image source={appIcons.plus} style={styles.btnImage} />
              <Text style={[styles.btnText, {color: colors.white}]}>
                {I18n.t('add_card')}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
          </View>
          {/* <PaymentCard
            onPressAddMoney={() => {
              modalRef?.current?.open();
              onAddMoney(true);
              setpaymentSuccessonSuccess(false);
              setpaymentSuccessonFailed(false);
            }}
            title={I18n.t('wallet_balance')}
            add_Money={I18n.t('add_cards')}
          /> */}
          <FlatList
            numColumns={2}
            data={payment?.card_list}
            renderItem={({item}) => {
              return (
                <BankCard
                  name={item?.name}
                  cardno={item?.last4}
                  brand={item?.brand}
                  value={item?.id == toggleCheckBox ? true : false}
                  onPressCard={() => {
                    dispatch(
                      save_current_card(item, () => {
                        navigation?.navigate('CardDetail');
                      }),
                    );
                  }}
                  onPress={() => {
                    selectCard(item);
                  }}
                  boxType={'circle'}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
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
              onCardChange={details => {}}
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
                  disabled={cardDetail ? false : true}
                  onPress={() => {
                    payFromCard();
                  }}
                  bgColor={cardDetail ? colors.green : colors.g1}
                  title={I18n.t('pay_with_card')}
                  txtColor={colors.white}
                />
              </View>
              {/* <PaymentButtons
                onPress={() => {
                  modalRef.current.open();
                  setpaymentSuccessonSuccess(true);
                  setpaymentSuccessonFailed(false);
                  onAddMoney(false);
                }}
                bgColor={colors.g1}
                title={I18n.t('pay_with_wallet')}
                txtColor={colors.white}
              /> */}
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
        h2={
          (paymentSuccess && 'Funds transfered successfully') ||
          (paymentFailed && 'Funds transfered failed')
        }
      />
      {payment?.loading ? <Loader /> : null}
    </>
  );
};

export default index;
