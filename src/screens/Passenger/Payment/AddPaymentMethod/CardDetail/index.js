import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import styles from './style';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {appIcons, appImages, colors, size} from '../../../../../utilities';
import {
  CustomHeader,
  DeleteCardModal,
  Header,
  PaymentButtons,
  PaymentInput,
} from '../../../../../components';
import I18n from '../../../../../utilities/translations';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {checkBrand} from '../../../../../utilities/helpers/checkBrand';
import {delete_stripe_card} from '../../../../../redux/actions/payment.action';

const CardDetail = ({navigation}) => {
  const [show, setshow] = useState(false);
  const [selected, setSelected] = useState(false);
  const payment = useSelector(state => state.payment);
  const dispatch = useDispatch(null);
  const confirmRemoveCard = () => {
    const requestBody = {
      card_id: payment?.current_card?.id,
      cid: payment?.current_card?.customer,
    };
    dispatch(
      delete_stripe_card(requestBody, res => {
        console.log(res);
        setSelected(true);
        // navigation?.navigate('WithDrawPayment');
        navigation?.navigate('Payment');

        setshow(false);
      }),
    );
  };
  return (
    <>
      <CustomHeader
        backButton={true}
        navigation={navigation}
        title={I18n.t('card_detail')}
      />
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
          <LinearGradient
            colors={colors.gradientpaidCard}
            style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.imageStyle}
                source={checkBrand(payment?.current_card?.brand)}
              />
            </View>
            <Text style={styles.textStyle}>{payment?.current_card?.name}</Text>
            <Text style={styles.textStyle}>
              ****{payment?.current_card?.last4}
            </Text>
          </LinearGradient>
          <View style={styles.cardContainer}>
            <PaymentButtons
              width={'45%'}
              onPress={() => {
                navigation?.navigate('EditCard');
              }}
              bgColor={colors.green}
              title={I18n.t('edit_card')}
              txtColor={colors.white}
            />
            <PaymentButtons
              width={'45%'}
              onPress={() => {
                setshow(true);
              }}
              bgColor={colors.black}
              title={I18n.t('remove_card')}
              txtColor={colors.white}
            />
          </View>
          <View style={{padding: 20}}>
            <PaymentButtons
              bgColor={colors.green}
              title={I18n.t('set_default_card')}
              txtColor={colors.white}
            />
          </View>
        </ScrollView>
      </View>
      {show && (
        <DeleteCardModal
          image={appIcons.dumpBox}
          onPressHide={() => {
            setshow(false);
          }}
          selected={selected}
          h1={I18n.t('delete_h1')}
          h2={I18n.t('delete_h2')}
          btn1Text={I18n.t('yes')}
          btn2Text={I18n.t('no')}
          show={show}
          bgColor={colors.green}
          textColor={colors.white}
          onPressYes={() => {
            confirmRemoveCard();
          }}
          onPressNo={() => {
            setSelected(false);
            setshow(false);
          }}
        />
      )}
    </>
  );
};

export default CardDetail;
