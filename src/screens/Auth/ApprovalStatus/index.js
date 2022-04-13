import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ApprovalCard, CustomHeader, PaymentButtons} from '../../../components';
import {appIcons, colors, family, size} from '../../../utilities';
import styles from './styles';
import I18n from '../../../utilities/translations';

const index = ({navigation, route}) => {
  const [time, settime] = useState(false);

  useEffect(() => {
    //   console.log('Inside TimeOut>>>', time);
    const timout = setTimeout(() => {
      settime(true);
    }, 3000);
    //   return () => {
    //     clearImmediate(timout);
    //   };
  }, []);
  // if (time) {
  //   if (route?.params?.isRegister) {
  //     navigation?.replace('DriverDashboard');
  //   }
  // }
  return (
    <>
      <CustomHeader backButton={true} navigation={navigation} />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {!time && (
            <ApprovalCard
              h1={I18n.t('waiting_approval')}
              h2={I18n.t('lorem_epsom3')}
              btnText={I18n.t('switch_passenger')}
              height={120}
              width={111}
              h4={I18n.t('approved_desc')}
              image={appIcons.timer}
              fontSize={size.normal}
              textColor={colors.g3}
              fontFamily={family.product_sans_regular}
              onPress={() => {
                settime(false);
                navigation?.replace('PassengerHome');
              }}
              switching={route?.params?.isRegister}
            />
          )}
          {time && (
            <ApprovalCard
              h1={I18n.t('congratulation')}
              h2={I18n.t('registered_driver')}
              btnText={I18n.t('set_driver')}
              height={120}
              width={111}
              h3={I18n.t('lorem_epsom4')}
              fontSize={size.large}
              textColor={colors.light_black}
              fontFamily={family.product_sans_bold}
              image={appIcons.tickBg}
              onPress={() => {
                if (route?.params?.isRegister) {
                  navigation?.replace('DriverDashboard');
                } else {
                  navigation?.replace('Pledge');
                }
              }}
              switching={true}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default index;
