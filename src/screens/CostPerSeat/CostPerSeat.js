import {useNavigation} from '@react-navigation/core';
import I18n from 'i18n-js';
import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from '../../components';
import MyStatusBar from '../../components/Header/statusBar';
import {colors, family, HP, size} from '../../utilities';

const CostPerSeat = ({navigation, route}) => {
  const costData = route?.params;
  return (
    <>
      <CustomHeader
        title={I18n.t('cost_per_seat')}
        backButton={true}
        navigation={navigation}
      />
      <SafeAreaView style={styles.container}>
        <View style={{flex: 0.7}}>
          <View style={styles.marginContainer}>
            <View style={styles.headingTextContainer}>
              <Text style={styles.headingText}>Total Cost of Trip</Text>
              <Text style={styles.headingText}>
                {costData?.data?.distance.toFixed(0)} KM
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputText}>
                <Text style={styles.sekText}>NOK</Text>
              </View>
              <View style={styles.inputTextReplica}>
                <TextInput
                  placeholder={
                    costData?.data?.pricePerKM.toFixed(0) || 'Amount'
                  }
                  editable={false}
                  value={costData?.data?.pricePerKM}
                />
              </View>
            </View>
            <Text style={styles.reasonText}>
              Reasonable cost could be set around 1 NOK / km
            </Text>
            <Text style={[styles.headingText, {marginVertical: HP('2')}]}>
              Per Seat
            </Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputText}>
                <Text style={styles.sekText}>NOK</Text>
              </View>
              <View style={styles.inputTextReplica}>
                <TextInput
                  placeholder={costData?.data?.price.toFixed(0) || 'Amount'}
                  editable={false}
                  value={costData?.data?.pricePerKM}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            width: '100%',
          }}>
          <View style={styles.marginContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation?.goBack();
              }}
              style={{
                height: HP('7'),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.green,
                borderRadius: 13,
              }}>
              <Text
                style={{
                  color: colors.white,
                  fontSize: size.normal,
                  fontFamily: family.product_sans_regular,
                }}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  marginContainer: {
    marginHorizontal: HP(2.5),
  },
  headingTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: HP('2'),
  },
  headingText: {
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 13,
    borderWidth: 1,
    height: HP('7'),
    borderColor: colors.greyBorder,
  },
  inputText: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    flex: 0.2,
  },
  inputTextReplica: {
    borderRadius: 13,
    flex: 0.8,
    justifyContent: 'center',
  },
  sekText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_bold,
    color: colors.light_black,
  },
  reasonText: {
    fontSize: size.xxsmall,
    fontFamily: family.product_sans_regular,
    color: colors.grimmyGray,
    marginVertical: HP('2'),
  },
});

export default CostPerSeat;
