import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {
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

const index = ({navigation}) => {
  const [cardScreen, setCardScreen] = useState(true);
  return (
    <>
      <CustomHeader
        title={I18n.t('my_payment_method')}
        backButton={true}
        navigation={navigation}
      />
      <View style={styles.container}>
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
                <Text style={styles.header2Text}>Wallet Balance</Text>
                <TouchableOpacity style={styles.btnStyle}>
                  <Image source={appIcons.filter} style={styles.btnImage} />
                  <Text style={styles.btntext}>Add Money</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.header2Bold}>00.00 SEK</Text>
            </View>
          </LinearGradient>
          <PaymentHistory
            title={'Transaction History'}
            image={appIcons.mobiledata}
          />
          <PaymentButtons
            bgColor={colors.green}
            title={'Add Card'}
            txtColor={colors.white}
          />
          <PaymentButtons
            bgColor={colors.g1}
            title={'Pay From Wallet'}
            txtColor={colors.white}
          />
          <AddCard/>
        </View>
      </View>
    </>
  );
};

export default index;
