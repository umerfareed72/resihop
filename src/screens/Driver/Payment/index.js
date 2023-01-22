import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Linking,
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
  BlankField,
} from '../../../components';
import I18n from '../../../utilities/translations';
import styles from './styles';
import { appIcons, checkConnected, colors, header } from '../../../utilities';
import { useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { createToken, confirmPayment } from '@stripe/stripe-react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  add_stripe_card,
  checkout_current_card,
  check_driver_registered,
  get_card_list,
  move_from_drawer,
  save_current_card,
} from '../../../redux/actions/payment.action';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { LinkHelper } from '../../../utilities/helpers/LinkHelper';
import { post } from '../../../services';
const index = ({ navigation, route }) => {
  const [cardScreen, setCardScreen] = useState(false);

  const [cardDetail, setcardDetail] = useState('');
  const [checkAccount, setCheckAccount] = useState('');
  const [Loading, setLoading] = useState(false);

  //Redux State
  const dispatch = useDispatch(null);

  //Create Account
  const create_Connected_Account = async () => {
    setLoading(true);
    try {
      const ShareableLink = await LinkHelper();
      const requestBody = {
        firebaseURL: ShareableLink,
      };
      const res = await post(
        `wallets/connectedAccount`,
        requestBody,
        await header(),
      );
      if (res.data) {
        console.log(res.data);
        setLoading(false);
        Linking.openURL(res?.data?.accountLink);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDynamicLink = link => {
    try {
      // Handle dynamic link inside your own application
      if (link.url === 'https://resihop.page.link/N8fh') {
        console.log('Dynamic link', link.url);
        dispatch(
          check_driver_registered(res => {
            console.log('Check Account', res);
            setCheckAccount(res);
          }),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        if (link.url === 'https://resihop.page.link/N8fh') {
        }
      });
  }, []);

  //Check Account
  useEffect(() => {
    dispatch(
      check_driver_registered(res => {
        setCheckAccount(res);
      }),
    );
  }, []);

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
            title={I18n.t('wallet_balance')}
            // add_Money={I18n.t('add_cards')}
          /> */}
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
              //disabled={!Loading && cardHolderName ? false : true}
              btn={true}
              onCardChange={details => {
                console.log('Card Added', details);
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
          {checkAccount == 'inactive' || checkAccount == undefined ? (
            <View style={{ paddingVertical: 30 }}>
              <View style={{ paddingVertical: 20 }}>
                <PaymentButtons
                  onPress={() => {
                    create_Connected_Account();
                  }}
                  bgColor={colors.green}
                  title={'Create Payout Account'}
                  txtColor={colors.white}
                />
              </View>
            </View>
          ) : (
            <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 30 }}>
              Hurry! You have successfully added your payout account.
            </Text>
          )}
        </View>
      </KeyboardAwareScrollView>
      {Loading && <Loader />}
    </>
  );
};

export default index;
