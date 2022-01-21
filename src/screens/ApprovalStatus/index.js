import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ApprovalCard, CustomHeader, PaymentButtons} from '../../components';
import {appIcons, colors, family, size} from '../../utilities';
import styles from './styles';
import I18n from '../../utilities/translations';

const index = ({navigation}) => {
  const [time, settime] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      navigation?.replace('Pledge');
    }, 3000);
  }, []);
  return (
    <>
      <CustomHeader backButton={true} navigation={navigation} />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {!time && (
            <ApprovalCard
              h1={I18n.t('waiting_approval')}
              h2={I18n.t('lorem')}
              // btnText={I18n.t('switch_passenger')}
              height={120}
              width={111}
              // h4={I18n.t('approved_desc')}
              image={appIcons.timer}
              fontSize={size.normal}
              textColor={colors.g3}
              fontFamily={family.product_sans_regular}
              // onPress={() => {
              //   navigation?.replace('PassengerHome');
              // }}
            />
          )}
          {/* {time && (
            <ApprovalCard
              h1={I18n.t('congratulation')}
              h2={I18n.t('registered_driver')}
              btnText={I18n.t('set_driver')}
              height={120}
              width={111}
              h3={I18n.t('lorem')}
              fontSize={size.large}
              textColor={colors.light_black}
              fontFamily={family.product_sans_bold}
              image={appIcons.tickBg}
              onPress={() => {
                navigation?.replace('DriverDashboard');
              }}
            />
          )} */}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default index;
