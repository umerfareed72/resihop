import React, {useEffect, useState} from 'react';
import {Text, View, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {
  CustomHeader,
  Loader,
  PaymentButtons,
  PaymentInput,
} from '../../../../../components';
import {colors} from '../../../../../utilities';
import AddCard from '../AddCard';
import styles from './style';
import I18n from '../../../../../utilities/translations';
import {useDispatch, useSelector} from 'react-redux';
import {edit_stripe_card} from '../../../../../redux/actions/payment.action';

const index = ({navigation}) => {
  const [name, setname] = useState('');
  const [Loading, setLoading] = useState(false);
  const payment = useSelector(state => state.payment);
  const dispatch = useDispatch(null);

  useEffect(() => {
    setname(payment?.current_card?.name);
  }, []);
  const edit_card = async () => {
    setLoading(true);
    try {
      const requestBody = {
        customerID: payment?.current_card?.customer,
        name: name,
      };
      dispatch(
        edit_stripe_card(payment?.current_card?.id, requestBody, res => {
          console.log(res);
          Alert.alert(
            'Success',
            'Card Edited Successfully',
            [{text: 'Ok', onPress: () => navigation?.navigate('Payment')}],
            {cancelable: false},
          );
          setLoading(false);
        }),
      );
    } catch (error) {
      Alert.alert('Error', error?.response?.message);
      setLoading(false);
    }
  };

  return (
    <>
      <CustomHeader
        title={I18n.t('edit_card')}
        backButton={true}
        navigation={navigation}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {/* <AddCard
            onChangeText={text => {
              setname(text);
            }}
            btn={false}
          /> */}
          <PaymentInput
            value={name}
            onChangeText={text => {
              setname(text);
            }}
            placeholder={I18n.t('cardholder_name')}
            placeholderTextColor={colors.g1}
          />
          <View>
            <Text style={styles.infoStyle}>{I18n.t('add_card_info')}</Text>
          </View>
          <View style={{padding: 10, paddingTop: 50}}>
            <PaymentButtons
              disabled={name ? false : true}
              bgColor={name ? colors.green : colors.g1}
              title={I18n.t('save_card')}
              txtColor={colors.white}
              onPress={() => {
                edit_card();
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {Loading ? <Loader /> : null}
    </>
  );
};

export default index;
