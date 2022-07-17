import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Input, Text, Button, Avatar, Icon} from 'react-native-elements';
import {CustomHeader, Loader} from '../../../components';
import * as Yup from 'yup';
import {
  appIcons,
  baseURL,
  colors,
  GetToken,
  header,
  profileIcon,
} from '../../../utilities';
import {theme} from '../../../theme';
import {UploadImage, GenderChips} from '../../../components';
import I18n from '../../../utilities/translations';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {Alert} from 'react-native';
import {updateInfo} from '../../../redux/actions/auth.action';

const formFields = {
  firstName: '',
  lastName: '',
  refCode: '',
  email: '',
};
export const formSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
  refCode: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!'),
  email: Yup.string().email('Invalid email'),
});

const gender = {
  Male: I18n.t('male'),
  Female: I18n.t('female'),
  Other: I18n.t('other'),
};

const littleChips = [
  {
    key: 0,
    text: gender.Male,
    isSelected: false,
  },
  {
    key: 1,
    text: gender.Female,
    isSelected: false,
  },
  {
    key: 2,
    text: gender.Other,
    isSelected: false,
  },
];

function index(props) {
  const [imagePicker, setImagePicker] = useState(false);
  const [genderType, setGenderType] = useState(gender.Male);
  const [isLoading, setIsLoading] = useState(false);

  const [pic, setPic] = useState(undefined);
  const [photo, setPhoto] = useState(undefined);
  const refFirstName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch(null);

  //Update Profile

  const userDetailsApi = inputData => {
    setIsLoading(true);

    const {firstName, lastName, email} = inputData;
    //Call Image Upload Function
    var sizeInMB = (pic.fileSize / (1024 * 1024)).toFixed(2);
    if (sizeInMB > 20) {
      alert('File size should not be more than 20MB');
      setIsLoading(false);
    } else {
      imageUpload(pic, res => {
        const requestBody = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          picture: res,
          gender: genderType,
        };
        dispatch(
          updateInfo(
            auth?.profile_info.id,
            requestBody,
            () => {
              setIsLoading(false);
              Alert.alert(
                'Success',
                'Your Profile Updated Successfully!',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('Updated');
                    },
                  },
                ],
                {cancelable: false},
              );
            },
            error => {
              console.log('Failed to update data', error);
              setIsLoading(false);
            },
          ),
        );
      });
    }
  };

  //Image Uploading
  const imageUpload = async (data, callBack) => {
    try {
      if (photo) {
        callBack(photo._id);
      } else {
        var form = new FormData();
        form.append('files', {
          name: data?.fileName,
          type: data?.type,
          uri: data?.uri,
        });
        axios
          .post(`${baseURL}upload`, form, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await GetToken()}`,
            },
          })
          .then(res => {
            if (res.data) {
              callBack(res?.data[0]._id);
            }
          })
          .catch(error => {
            console.log('error', error?.response?.data);
            Alert.alert('Error', 'Failed to Upload Image');
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', margin: 5}}>
      <CustomHeader
        title={I18n.t('edit_profile')}
        backButton={true}
        navigation={props?.navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={formFields}
          isInitialValid={false}
          validationSchema={formSchema}
          onSubmit={values => {
            userDetailsApi(values);
            Keyboard.dismiss();
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
            handleBlur,
            setFieldValue,
          }) => {
            useEffect(() => {
              setFieldValue('firstName', auth?.profile_info.firstName);
              setFieldValue('lastName', auth?.profile_info.lastName);
              setPic({
                uri: auth?.profile_info.picture?.url || profileIcon,
              });
              setPhoto(auth?.profile_info.picture);
              setFieldValue('email', auth?.profile_info.email);

              littleChips.map((item, index) => {
                if (
                  item?.text.toLocaleLowerCase() ===
                  auth?.profile_info?.gender?.toLocaleLowerCase()
                ) {
                  littleChips[index].isSelected = true;
                  return item;
                }
              });
            }, []);

            return (
              <View>
                {pic ? (
                  <View style={{alignSelf: 'center'}}>
                    <Avatar
                      source={{
                        uri: pic.uri || 'https://unsplash.it/400/400?image=1',
                      }}
                      size={'xlarge'}
                      rounded
                    />
                  </View>
                ) : (
                  <View style={styles.profileImg}>
                    <Icon
                      onPress={() => setImagePicker(!imagePicker)}
                      name={'adduser'}
                      type={'antdesign'}
                      size={40}
                      color={theme.colors.grey}
                    />
                  </View>
                )}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setImagePicker(!imagePicker)}
                  style={styles.editContainer}>
                  <Image
                    style={styles.imgStyle}
                    source={appIcons.edit_profile}
                  />
                </TouchableOpacity>
                <KeyboardAvoidingView style={styles.inputCon}>
                  <Input
                    ref={refFirstName}
                    keyboardAppearance="light"
                    onChangeText={handleChange('firstName')}
                    placeholder={'Enter First Name'}
                    autoFocus={false}
                    autoCapitalize="none"
                    style={theme.Input.inputStyle}
                    autoCorrect={false}
                    value={values?.firstName}
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
                    value={values?.lastName}
                    style={theme.Input.inputStyle}
                    placeholder={'Last Name'}
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      refEmail.current.focus();
                    }}
                    inputContainerStyle={
                      errors.lastName
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.lastName}
                  />
                  <Input
                    editable={true}
                    ref={refEmail}
                    keyboardAppearance="light"
                    onChangeText={handleChange('email')}
                    placeholder={'Enter email'}
                    value={values?.email}
                    style={theme.Input.inputStyle}
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType={'done'}
                    inputContainerStyle={
                      errors.email
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.email}
                  />
                  <Text style={[theme.Text.h2Bold, {marginStart: '3%'}]}>
                    {I18n.t('gender_text')}
                  </Text>
                  <GenderChips
                    genderArray={littleChips}
                    onChipPress={chips => {
                      setGenderType(chips[0].text);
                    }}
                  />
                  <Button
                    title={I18n.t('update')}
                    onPress={handleSubmit}
                    buttonStyle={[theme.Button.buttonStyle]}
                    titleStyle={[theme.Button.titleStyle, {fontSize: 13}]}
                    disabledTitleStyle={theme.Button.disabledTitleStyle}
                    containerStyle={{
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: '10%',
                    }}
                  />
                  <Button
                    title={I18n.t('change_phone')}
                    onPress={() => props.navigation.navigate('ChangePhone')}
                    buttonStyle={[
                      theme.Button.buttonStyle,
                      {backgroundColor: 'black'},
                    ]}
                    titleStyle={[theme.Button.titleStyle, {fontSize: 13}]}
                    disabledTitleStyle={theme.Button.disabledTitleStyle}
                    containerStyle={{
                      width: '90%',
                      alignSelf: 'center',
                      marginTop: '5%',
                    }}
                  />
                </KeyboardAvoidingView>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
      {isLoading ? <Loader /> : null}

      {imagePicker ? (
        <>
          <UploadImage
            show
            close={() => {
              setImagePicker(false);
            }}
            getPicUri={asset => {
              if (asset) {
                setPic(asset);
                setImagePicker(false);
              }
            }}
          />
        </>
      ) : null}
    </View>
  );
}

export default index;

const styles = StyleSheet.create({
  profileImg: {
    width: '40%',
    height: 150,
    backgroundColor: colors.lightGray,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  editContainer: {
    width: 45,
    height: 45,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    alignSelf: 'center',
    bottom: 25,
  },
  imgStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  inputCon: {
    margin: 10,
  },
});
