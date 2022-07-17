import {useIsFocused, useNavigation} from '@react-navigation/core';
import {Formik} from 'formik';
import I18n from 'i18n-js';
import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomHeader} from '../../components';
import {setCityCostPerSeat} from '../../redux/actions/map.actions';
import {
  colors,
  costFormFields,
  CostFormSchema,
  family,
  HP,
  size,
} from '../../utilities';

const CostPerSeat = ({navigation, route}) => {
  const {availableSeats, cityCost} = useSelector(state => state?.map);
  const dispatch = useDispatch(null);
  const isFocus = useIsFocused();
  const onSubmit = values => {
    const requestBody = {
      distance: cityCost?.distance,
      price: values?.totalCost,
      pricePerKM: values?.costPerSeat,
    };
    dispatch(
      setCityCostPerSeat(requestBody, () => {
        navigation?.goBack();
      }),
    );
  };
  return (
    <>
      <CustomHeader
        title={I18n.t('cost_per_seat')}
        backButton={true}
        navigation={navigation}
      />
      <Formik
        initialValues={costFormFields}
        isInitialValid={false}
        validationSchema={CostFormSchema}
        onSubmit={values => {
          onSubmit(values);
        }}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldValue,
          handleBlur,
          touched,
        }) => {
          useEffect(() => {
            if (isFocus) {
              setFieldValue('totalCost', (+cityCost?.price).toFixed(0));
              setFieldValue('costPerSeat', (+cityCost?.pricePerKM).toFixed(0));
            }
          }, [isFocus]);
          return (
            <SafeAreaView style={styles.container}>
              <View style={{flex: 0.7}}>
                <View style={styles.marginContainer}>
                  <View style={styles.headingTextContainer}>
                    <Text style={styles.headingText}>Total Cost of Trip</Text>
                    <Text style={styles.headingText}>
                      {cityCost?.distance?.toFixed(0)} KM
                    </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <View style={styles.inputText}>
                      <Text style={styles.sekText}>NOK</Text>
                    </View>
                    <View style={styles.inputTextReplica}>
                      <TextInput
                        placeholder={'Amount'}
                        placeholderTextColor={colors.black}
                        value={values?.totalCost}
                        onChangeText={handleChange('totalCost')}
                        onBlur={handleBlur('totalCost')}
                        onEndEditing={() => {
                          setFieldValue(
                            'costPerSeat',
                            (values.totalCost / availableSeats)?.toFixed(0),
                          );
                        }}
                        onSubmitEditing={() => {
                          setFieldValue(
                            'costPerSeat',
                            (values.totalCost / availableSeats)?.toFixed(0),
                          );
                        }}
                        returnKeyType={'done'}
                        keyboardType={'decimal-pad'}
                      />
                    </View>
                  </View>
                  {errors.totalCost && touched.totalCost && (
                    <View style={{marginVertical: 5}}>
                      <Text style={styles.errorStyle}>{errors?.totalCost}</Text>
                    </View>
                  )}

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
                        placeholderTextColor={colors.black}
                        placeholder={'Amount'}
                        value={values.costPerSeat}
                        onChangeText={handleChange('costPerSeat')}
                        onBlur={handleBlur('costPerSeat')}
                        onEndEditing={() => {
                          setFieldValue(
                            'totalCost',
                            (values.costPerSeat * availableSeats)?.toFixed(0),
                          );
                        }}
                        onSubmitEditing={() => {
                          setFieldValue(
                            'totalCost',
                            (values.costPerSeat * availableSeats)?.toFixed(0),
                          );
                        }}
                        returnKeyType={'done'}
                        keyboardType={'decimal-pad'}
                      />
                    </View>
                  </View>
                  {errors.costPerSeat && touched.costPerSeat && (
                    <View style={{marginVertical: 5}}>
                      <Text style={styles.errorStyle}>
                        {errors?.costPerSeat}
                      </Text>
                    </View>
                  )}
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
                    onPress={handleSubmit}
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
          );
        }}
      </Formik>
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
  errorStyle: {
    fontSize: 12,
    color: 'red',
  },
});

export default CostPerSeat;
