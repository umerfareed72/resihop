import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {theme} from '../../../theme';
import _ from 'lodash/string';
import {Button, Icon, Input, Text} from 'react-native-elements';
import Chips from '../../../components/Chips';
import GenderChips from '../../../components/GenderChips';
import UploadImage from '../../../components/UploadImage';
import SigninViaBankID from '../../../components/SigninViaBankID';
import {
  CustomHeader,
  Header,
  IncorrectRefCode,
  Loader,
} from '../../../components';
import I18n from '../../../utilities/translations';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {baseURL, colors} from '../../../utilities';
import {GetToken} from '../../../utilities/constants';

import {SwitchDrive, updateInfo} from '../../../redux/actions/auth.action';
import useAppState from '../../../hooks/useAppState';
const user = {
  Passenger: 'Passenger', // 616e6aae6fc87c0016b7413f
  Driver: 'Driver', // 616e6a8c6fc87c0016b740e8
  Both: 'Driver/Passenger both', // 616da5478b2d5d45c479591c
};

const gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
};
const littleChips = [
  {
    key: 0,
    text: user.Driver,
    isSelected: true,
  },
  {
    key: 1,
    text: user.Passenger,
    isSelected: false,
  },
  {
    key: 2,
    text: user.Both,
    isSelected: false,
  },
];
function PersonalDetails(props) {
  const dispatch = useDispatch(null);
  const userId = useSelector(state => state.auth?.userdata?.user?.id);
  const country_data = useSelector(state => state.auth?.country_info);

  const [codeId, setCodeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(user.Driver);
  const [genderType, setGenderType] = useState(gender.Male);
  const [pic, setPic] = useState(undefined);
  const [bankdIdToken, setBankIdToken] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  const refFirstName = useRef();
  const refLastName = useRef();
  const refReferral = useRef();
  const refEmail = useRef();
  const refCodeSheet = useRef(null);
  const bank_url = useRef();

  const acr = 'urn:grn:authn:se:bankid:same-device';
  const appState = useAppState(async () => {
    if (acr === 'urn:grn:authn:se:bankid:same-device') {
      const result = await fetch(bank_url?.current).then(response => {
        return response;
      });
      const token = result?.url.split('id_token=');
      if (token) {
        setBankIdToken(token[1]);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  });
  const openBankId = async values => {
    setUserDetail(values);
    setIsLoading(true);
    const result = await axios.get(
      `https://res-ihop-test.criipto.id/dXJuOmdybjphdXRobjpzZTpiYW5raWQ6c2FtZS1kZXZpY2U=/oauth2/authorize?response_type=id_token&client_id=urn:my:application:identifier:5088&redirect_uri=https://dev-49tni-0p.us.auth0.com/login/callback&acr_values=urn:grn:authn:se:bankid:same-device&scope=openid&state=etats&login_hint=${
        Platform.OS == 'android' ? 'appswitch:android' : 'appswitch:ios'
      }`,
    );
    if (result?.data) {
      console.log(result?.data);
      bank_url.current = result?.data?.completeUrl;
      Linking.openURL(result?.data?.launchLinks?.universalLink);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (bankdIdToken) {
      userDetailsApi(userDetail);
    }
  }, [bankdIdToken]);
  //Add Personal Details
  const userDetailsApi = inputData => {
    setIsLoading(true);
    let user = '';
    if (userType === 'Driver') {
      user = 'DRIVER';
    } else if (userType === 'Passenger') {
      user = 'PASSENGER';
    } else {
      user = 'BOTH';
    }
    const {firstName, lastName, email} = inputData;
    if (!pic) {
      const requestBody = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        isDriverAndPassenger:
          userType === 'Driver/Passenger both' ? true : false,
        gender: genderType,
        referral:
          codeId != ''
            ? {
                _id: codeId,
              }
            : {
                _id: null,
              },
        type: user,
        details: true,
        country: {
          phone: country_data?.phone,
          cca2: country_data?.cca2,
          code: country_data?.code,
        },
        bankID: bankdIdToken,
      };
      dispatch(
        updateInfo(
          userId,
          requestBody,
          res => {
            setIsLoading(false);
            console.log(res);
            Alert.alert(
              'Success',
              'Your personal details successfuly saved',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    if (userType === 'Passenger') {
                      props?.navigation?.navigate('Pledge');
                    } else {
                      const body = {
                        switching: false,
                      };
                      dispatch(
                        SwitchDrive(body, () => {
                          props.navigation.navigate('VehcileStack');
                        }),
                      );
                    }
                  },
                },
              ],
              {cancelable: false},
            );
          },
          error => {
            console.log('Failed to add details', error);
            setIsLoading(false);
          },
        ),
      );
    } else {
      // Call Image Upload Function
      imageUpload(pic, res => {
        const requestBody = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          picture: res[0]?._id,
          isDriverAndPassenger:
            userType === 'Driver/Passenger both' ? true : false,
          gender: genderType,
          referral:
            codeId != ''
              ? {
                  _id: codeId,
                }
              : {
                  _id: null,
                },
          type: user,
          details: true,
          country: {
            phone: country_data?.phone,
            cca2: country_data?.cca2,
            code: country_data?.code,
          },
          bankID: token,
        };
        dispatch(
          updateInfo(
            userId,
            requestBody,
            () => {
              setIsLoading(false);
              Alert.alert(
                'Success',
                'Your personal details successfuly saved',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      if (userType === 'Passenger') {
                        props?.navigation?.navigate('Pledge');
                      } else {
                        const body = {
                          switching: false,
                        };
                        dispatch(
                          SwitchDrive(body, () => {
                            props.navigation.navigate('VehcileStack');
                          }),
                        );
                      }
                    },
                  },
                ],
                {cancelable: false},
              );
            },
            error => {
              console.log('Failed to add details', error);
              setIsLoading(false);
            },
          ),
        );
      });
    }
  };
  //Image Uploading
  const imageUpload = async (data, callBack) => {
    var form = new FormData();
    form.append('files', {
      name: data?.fileName,
      type: data?.type,
      uri: data?.uri,
    });
    console.log(data);
    axios
      .post(`${baseURL}upload/`, form, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await GetToken()}`,
        },
      })
      .then(res => {
        if (res.data) {
          callBack(res?.data);
        }
      })
      .catch(error => {
        console.log('error', error?.response?.data);
        Alert.alert('Error', 'Failed to Upload Image');
        setIsLoading(false);
      });
  };
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
              // if (userType === 'Passenger') {
              //   openBankId(values);
              // } else {
              userDetailsApi(values);
              // }
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldValue,
              handleBlur,
            }) => {
              const getReferalCode = code => {
                setIsLoading(true);
                fetch(`${baseURL}referrals?code=${code}`, {
                  method: 'GET',
                })
                  .then(response => response.json())
                  .then(responseData => {
                    if (responseData.length > 0) {
                      setIsLoading(false);
                    } else {
                      setIsLoading(false);
                      setCodeId('');
                      refCodeSheet?.current?.open();
                    }
                  })
                  .done();
              };
              return (
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
                    }}
                    littleChips={littleChips}
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
                      maxLength={4}
                      ref={refReferral}
                      onChangeText={val => {
                        setCodeId(val);
                        if (val.length == 4) {
                          getReferalCode(val);
                        }
                      }}
                      value={codeId}
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
                      profile_url={''}
                      getPicUri={asset => {
                        setPic(asset);
                      }}
                    />
                    {userType === 'Passenger' ? (
                      <SigninViaBankID
                        disabled={!isValid}
                        onBankIdPress={handleSubmit}
                        onPressTerms={() => {
                          props.navigation.navigate('Terms');
                        }}
                      />
                    ) : (
                      <Button
                        title={I18n.t('next')}
                        onPress={() => handleSubmit()}
                        disabled={!isValid}
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
                        titleStyle={[
                          theme.Button.titleStyle,
                          {paddingLeft: 20},
                        ]}
                        disabledTitleStyle={theme.Button.disabledTitleStyle}
                        containerStyle={{
                          width: '90%',
                          alignSelf: 'center',
                          paddingVertical: 10,
                        }}
                      />
                    )}
                  </View>
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </View>
      {isLoading ? <Loader /> : null}
      <IncorrectRefCode
        show={refCodeSheet}
        onPress={() => {
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
  refCode: Yup.string().min(4, 'Too Short!').max(50, 'Too Long!'),
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