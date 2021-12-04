import I18n from 'i18n-js';
import React, {useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {CustomHeader} from '../../../components/Header/CustomHeader';
import {colors, family, HP, size} from '../../../utilities';
import {appImages, appIcons} from '../../../utilities';
import CalendarSheet from '../../CalendarSheet';

const ReportsEarning = () => {
  return (
    <View style={styles.container}>
      <Image style={{marginTop: HP('8')}} source={appIcons.noPayment} />
      <Text style={styles.headingText}>{I18n.t('rep_earn_text')}</Text>
      <Text style={styles.sampleText}>{I18n.t('lorem')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headingText: {
    fontSize: size.large,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
    marginVertical: HP('3'),
  },
  sampleText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.g3,
    lineHeight: 40,
  },
});

export default ReportsEarning;
