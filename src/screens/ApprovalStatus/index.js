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
      settime(true);
    }, 3000);
  }, []);
  return (
    <>
      <CustomHeader backButton={true} navigation={navigation} />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          {!time && (
            <ApprovalCard
              h1={'Waiting For Approval'}
              h2={
                ' Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumyeirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diamvoluptua.'
              }
              btnText={'Switch to Passenger'}
              height={120}
              width={111}
              h4={
                'You can always switch back to Driver in the app with just one click!'
              }
              image={appIcons.timer}
              fontSize={size.normal}
              textColor={colors.g3}
              fontFamily={family.product_sans_regular}
              onPress={() => {
                navigation?.replace('PassengerHome');
              }}
            />
          )}
          {time && (
            <ApprovalCard
              h1={'Congratulations!'}
              h2={'Your Driver Registration has \n been Approved'}
              btnText={'Set your First Drive'}
              height={120}
              width={111}
              h3={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
              }
              fontSize={size.large}
              textColor={colors.light_black}
              fontFamily={family.product_sans_bold}
              image={appIcons.tickBg}
              onPress={() => {
                navigation?.replace('DriverDashboard');
              }}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default index;
