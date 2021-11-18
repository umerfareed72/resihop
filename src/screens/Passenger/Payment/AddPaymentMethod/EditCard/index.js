import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {CustomHeader, PaymentButtons} from '../../../../../components';
import {colors} from '../../../../../utilities';
import AddCard from '../AddCard';
import styles from './style';
import I18n from '../../../../../utilities/translations';

const index = ({navigation}) => {
  return (
    <>
      <CustomHeader
        title={I18n.t('edit_card')}
        backButton={true}
        navigation={navigation}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <AddCard btn={false} />
          <View style={{padding: 10, paddingTop: 50}}>
            <PaymentButtons
              bgColor={colors.green}
              title={I18n.t('save_card')}
              txtColor={colors.white}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default index;
