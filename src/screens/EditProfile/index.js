import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
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
import {CustomHeader} from '../../components';
import * as Yup from 'yup';
import {appIcons, colors} from '../../utilities';
import {theme} from '../../theme';
import UploadImage from '../../components/UploadImage';
import GenderChips from '../../components/GenderChips';
import I18n from '../../utilities/translations';

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
  Male: 'Male',
  Female: 'Female',
  Other: 'Other',
};

function index(props) {
  const [imagePicker, setImagePicker] = useState(false);
  const [genderType, setGenderType] = useState(gender.Male);
  const [pic, setPic] = useState(undefined);

  const refFirstName = useRef();
  const refLastName = useRef();
  const refEmail = useRef();

  return (
    <View style={{flex: 1, backgroundColor: 'white', margin: 5}}>
      <CustomHeader
        title={'Edit Profile'}
        backButton={true}
        navigation={props?.navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={formFields}
          isInitialValid={false}
          validationSchema={formSchema}
          onSubmit={values => {
            Keyboard.dismiss();
          }}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            isValid,
            handleBlur,
          }) => (
            <View style={{}}>
              {pic ? (
                <View style={{alignSelf: 'center'}}>
                  <Avatar source={{uri: pic.uri}} size={'xlarge'} rounded />
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
                <Image style={styles.imgStyle} source={appIcons.edit_profile} />
              </TouchableOpacity>
              <KeyboardAvoidingView style={styles.inputCon}>
                <Input
                  ref={refFirstName}
                  keyboardAppearance="light"
                  onChangeText={handleChange('firstName')}
                  placeholder={'Dawood'}
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
                  placeholder={'Abrar'}
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
                  editable={false}
                  ref={refEmail}
                  keyboardAppearance="light"
                  onChangeText={handleChange('email')}
                  placeholder={'dawoodibrar42@gmail.com'}
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
                  onChipPress={chips => {
                    setGenderType(chips[0].text);
                  }}
                />
                <Button
                  title={'Update'}
                  onPress={() => console.log('Pressed!')}
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
                  title={'Change Mobile Number'}
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
          )}
        </Formik>
      </ScrollView>
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
