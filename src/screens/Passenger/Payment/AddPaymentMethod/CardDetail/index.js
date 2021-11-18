import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import styles from './style';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import {appImages, colors, size} from '../../../../../utilities';
import {
  CustomHeader,
  DeleteCardModal,
  Header,
  PaymentButtons,
  PaymentInput,
} from '../../../../../components';
import I18n from '../../../../../utilities/translations';
import LinearGradient from 'react-native-linear-gradient';

const CardDetail = ({navigation}) => {
  const [show, setshow] = useState(false);
  const [selected, setSelected] = useState(false);

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
              <Image style={styles.imageStyle} source={appImages.visa} />
            </View>
            <Text style={styles.textStyle}>{'Umer'}</Text>
            <Text style={styles.textStyle}>****{1234}</Text>
          </LinearGradient>
          <View style={styles.cardContainer}>
            <PaymentButtons
              width={'45%'}
              onPress={() => {
navigation?.navigate('EditCard')
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
            setSelected(true);
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
