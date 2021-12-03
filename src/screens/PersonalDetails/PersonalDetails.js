import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {theme} from '../../theme';
import _ from 'lodash/string';
import {Button, Icon, Input, Text} from 'react-native-elements';
import Chips from '../../components/Chips';
import GenderChips from '../../components/GenderChips';
import UploadImage from '../../components/UploadImage';
import SigninViaBankID from '../../components/SigninViaBankID';
import BankWebView from '../../components/BankWebView';
import {CustomHeader, Header, IncorrectRefCode} from '../../components';
import I18n from '../../utilities/translations';
const user = {
  Passenger: 'Passenger',
  Driver: 'Driver',
  Both: 'Driver/Passenger both',
};

const gender = {
  Male: I18n.t('male'),
  Female: I18n.t('female'),
  Other: I18n.t('other'),
};

function PersonalDetails(props) {
  const [imagePicker, setImagePicker] = useState(false);

  const [userType, setUserType] = useState(user.Driver);
  const [genderType, setGenderType] = useState(gender.Male);
  const [bankView, setBankView] = useState(false);
  const [pic, setPic] = useState(undefined);
  const refFirstName = useRef();
  const refLastName = useRef();
  const refReferral = useRef();
  const refEmail = useRef();
  const refCodeSheet = useRef(null);
  const userIsPassenger = user === user.Passenger;
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white', margin: 5}}>
        <CustomHeader backButton={true} navigation={props?.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={personalFormFields}
            isInitialValid={false}
            validationSchema={personalFormSchema}
            onSubmit={values => {
              Keyboard.dismiss();
              refCodeSheet?.current?.open();
              // props.navigation.navigate('Pledge');
              // values.PERSONAL_FORM.gender = genderType;
              // values.role = userType;
              // values.mobile = ${country.callingCode}${mobileNum};
              // attemptToSignUp(values, pic);
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              isValid,
              handleBlur,
            }) => (
              <>
                <View style={styles.viewCon}>
                  <Text style={[theme.Text.h1Bold, styles.heading]}>
                    {_.startCase(I18n.t('personal_details_text'))}
                  </Text>
                  <Text style={theme.Text.h2Bold}>
                    {_.startCase(I18n.t('enter_your_personal_details_text'))}
                  </Text>
                </View>
                <Chips
                  horizontal={false}
                  onChipPress={chips => {
                    const type = chips[0].text;
                    setUserType(type);
                    if (type === user.Driver) {
                      // controlIsDriver(true);
                    }
                  }}
                />

                <KeyboardAvoidingView style={styles.inputCon}>
                  <Input
                    ref={refFirstName}
                    keyboardAppearance="light"
                    onChangeText={handleChange('firstName')}
                    placeholder={
                      userType === 'Passenger'
                        ? I18n.t('first_name_text')
                        : I18n.t('first_name_driver_text')
                    }
                    autoFocus={false}
                    autoCapitalize="none"
                    style={theme.Input.inputStyle}
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      refLastName.current.focus();
                    }}
                    inputContainerStyle={
                      errors.firstName
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.firstName}
                  />
                  <Input
                    ref={refLastName}
                    keyboardAppearance="light"
                    onChangeText={handleChange('lastName')}
                    style={theme.Input.inputStyle}
                    placeholder={
                      userType === 'Passenger'
                        ? I18n.t('last_name_text')
                        : I18n.t('last_name_driver_text')
                    }
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      refReferral.current.focus();
                    }}
                    inputContainerStyle={
                      errors.lastName
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.lastName}
                  />
                  <Input
                    ref={refReferral}
                    onChangeText={handleChange('refCode')}
                    keyboardAppearance="light"
                    placeholder={I18n.t('referral_code_opt_text')}
                    style={theme.Input.inputStyle}
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      refEmail.current.focus();
                    }}
                    inputContainerStyle={
                      errors.refCode
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.refCode}
                  />
                  <Input
                    ref={refEmail}
                    keyboardAppearance="light"
                    onChangeText={handleChange('email')}
                    placeholder={I18n.t('email_address_text')}
                    style={theme.Input.inputStyle}
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType={'done'}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    inputContainerStyle={
                      errors.email
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.email}
                  />
                </KeyboardAvoidingView>
                <View style={styles.bottomCon}>
                  <Text style={[theme.Text.h2Bold]}>
                    {_.startCase(I18n.t('gender_text'))}
                  </Text>
                  <GenderChips
                    onChipPress={chips => {
                      setGenderType(chips[0].text);
                    }}
                  />
                  <UploadImage
                    getPicUri={asset => {
                      setPic(asset);
                    }}
                  />

                  {userType === 'Passenger' ? (
                    <SigninViaBankID
                      disabled={!pic || !isValid}
                      onBankIdPress={async () => {
                        try {
                          const item = await Linking.canOpenURL(
                            'http://com.bankid.bus',
                          );
                          console.log(item);
                          setBankView(true);
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    />
                  ) : (
                    <Button
                      title={I18n.t('next')}
                      onPress={() => handleSubmit()}
                      disabled={!pic || !isValid}
                      icon={
                        <Icon
                          name={'arrowright'}
                          type={'antdesign'}
                          style={{marginRight: 20}}
                          color={theme.colors.white}
                        />
                      }
                      iconPosition={'right'}
                      buttonStyle={[
                        theme.Button.buttonStyle,
                        {justifyContent: 'space-between'},
                      ]}
                      titleStyle={[theme.Button.titleStyle, {paddingLeft: 20}]}
                      disabledTitleStyle={theme.Button.disabledTitleStyle}
                      containerStyle={{
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 20,
                      }}
                    />
                  )}
                </View>
              </>
            )}
          </Formik>
        </ScrollView>
        {bankView ? (
          <View style={styles.modalView}>
            <BankWebView setBankView={setBankView} />
          </View>
        ) : null}
      </View>
      <IncorrectRefCode
        show={refCodeSheet}
        onPress={() => {
          props.navigation.navigate('VahicleInformation');
          refCodeSheet.current.close();
        }}
      />
    </>
  );
}

export default PersonalDetails;

const personalFormFields = {
  firstName: '',
  lastName: '',
  refCode: '',
  email: '',
};
export const personalFormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  refCode: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!'),
  email: Yup.string().email('Invalid email').required('Required'),
});

const styles = StyleSheet.create({
  viewCon: {
    padding: 10,
    flex: 1,
  },
  heading: {
    marginBottom: 20,
  },
  inputCon: {
    margin: 10,
  },
  pickerCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomCon: {
    marginTop: 10,
    padding: 10,
  },
  modalView: {
    width: '90%',
    height: '90%',
    backgroundColor: 'red',
    alignSelf: 'center',
    position: 'absolute',
    top: '8%',
    elevation: 10,
  },
});
