import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Divider, Icon, Input, Text} from 'react-native-elements';
import {CustomHeader} from '../../components';
import * as Yup from 'yup';
import {fonts, theme} from '../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import {get} from '../../services';
import {appIcons, colors} from '../../utilities';
import I18n from '../../utilities/translations';

const vahicleFormFields = {
  licencePlate: '',
  carCompany: '',
  modelName: '',
  refCode: '',
  email: '',
};

export const vahicleFormSchema = Yup.object().shape({
  licencePlate: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  carCompany: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  modelName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

function index(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'SEK 10', value: 'sek 10'},
    {label: 'SEK 15', value: 'sek 15'},
    {label: 'SEK 20', value: 'sek 20'},
    {label: 'SEK 25', value: 'sek 25'},
  ]);
  const [getDetailsBtn, setgetDetailsBtn] = React.useState(true);
  const licencePlate = React.useRef();
  const carCompany = React.useRef();
  const modelName = React.useRef();
  const vahicleColor = React.useRef();
  const getVehcileData = () => {};
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white', margin: 5}}>
        <CustomHeader backButton={true} navigation={props?.navigation} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Formik
            initialValues={vahicleFormFields}
            isInitialValid={false}
            validationSchema={vahicleFormSchema}
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
              <>
                <View style={styles.viewCon}>
                  <Text style={[theme.Text.h1Bold, styles.heading]}>
                    {I18n.t('vehicle_information')}
                  </Text>
                  <Text
                    style={[
                      theme.Text.h2Bold,
                      {fontSize: 16, marginStart: 10},
                    ]}>
                    {I18n.t('enter_vehcile_info')}
                  </Text>
                </View>
                <KeyboardAvoidingView style={styles.inputCon}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '75%',
                    }}>
                    <Input
                      maxLength={8}
                      ref={licencePlate}
                      keyboardAppearance="light"
                      onChangeText={handleChange('licencePlate')}
                      inputContainerStyle={{width: '100%'}}
                      placeholder={I18n.t('license_plate')}
                      autoFocus={false}
                      autoCapitalize="none"
                      style={theme.Input.inputStyle}
                      autoCorrect={false}
                      returnKeyType="next"
                      inputContainerStyle={
                        errors.licencePlate
                          ? theme.Input.inputErrorContainerStyle
                          : theme.Input.inputContainerStyle
                      }
                      errorMessage={errors.licencePlate}
                    />
                    <Button
                      title={I18n.t('get_details')}
                      onPress={() => getVehcileData()}
                      buttonStyle={[theme.Button.buttonStyle]}
                      titleStyle={[theme.Button.titleStyle, {fontSize: 13}]}
                      disabledTitleStyle={theme.Button.disabledTitleStyle}
                      containerStyle={{
                        width: '35%',
                        alignSelf: 'center',
                        bottom: 10,
                      }}
                    />
                  </View>
                  <Input
                    ref={carCompany}
                    keyboardAppearance="light"
                    onChangeText={handleChange('carCompany')}
                    placeholder={I18n.t('car_company')}
                    autoFocus={false}
                    autoCapitalize="none"
                    style={theme.Input.inputStyle}
                    autoCorrect={false}
                    returnKeyType="next"
                    inputContainerStyle={
                      errors.carCompany
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.carCompany}
                  />
                  <Input
                    ref={modelName}
                    keyboardAppearance="light"
                    onChangeText={handleChange('modelName')}
                    placeholder={I18n.t('modal_name')}
                    autoFocus={false}
                    autoCapitalize="none"
                    style={theme.Input.inputStyle}
                    autoCorrect={false}
                    returnKeyType="next"
                    inputContainerStyle={
                      errors.modelName
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.modelName}
                  />
                  <Input
                    ref={modelName}
                    keyboardAppearance="light"
                    onChangeText={handleChange('modelName')}
                    placeholder={I18n.t('vehicle_colour')}
                    autoFocus={false}
                    autoCapitalize="none"
                    style={theme.Input.inputStyle}
                    autoCorrect={false}
                    returnKeyType="next"
                    inputContainerStyle={
                      errors.modelName
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.modelName}
                  />

                  <Input
                    ref={modelName}
                    keyboardAppearance="light"
                    onChangeText={handleChange('modelName')}
                    placeholder={I18n.t('vehicle_emission')}
                    autoFocus={false}
                    autoCapitalize="none"
                    style={theme.Input.inputStyle}
                    autoCorrect={false}
                    returnKeyType="next"
                    inputContainerStyle={
                      errors.modelName
                        ? theme.Input.inputErrorContainerStyle
                        : theme.Input.inputContainerStyle
                    }
                    errorMessage={errors.modelName}
                  />
                  <DropDownPicker
                    style={styles.pickerStyle}
                    placeholder={I18n.t('cost_percentage')}
                    placeholderStyle={{color: 'grey'}}
                    dropDownContainerStyle={styles.itemListStyle}
                    showTickIcon={false}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    disableBorderRadius={true}
                  />
                  <Text
                    style={[
                      theme.Text.h1Bold,
                      {
                        fontSize: 13,
                        marginStart: 10,
                        marginTop: 10,
                        color: 'grey',
                      },
                    ]}>
                    {I18n.t('cost_detail')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ReviewDetails')}
                    activeOpacity={0.8}
                    style={[
                      styles.reviewBtn,
                      {borderColor: 'grey', borderWidth: 1},
                    ]}>
                    <Text>{I18n.t('review_details')}</Text>
                  </TouchableOpacity>
                  <View style={{margin: 12}}>
                    <Text style={theme.Text.h4Normal}>
                      {I18n.t('by_clicking_bank_id_text')}
                    </Text>
                    <View style={styles.textCon}>
                      <Text
                        style={[theme.Text.h4Normal, {paddingHorizontal: 2}]}>
                        {I18n.t('i_agree_to_res_ihop')}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('Terms');
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: fonts.bold,
                            textDecorationLine: 'underline',
                            color: theme.colors.black,
                          }}>
                          {I18n.t('terms_and_condition_text')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <TouchableOpacity
                    activeOpacity={props.disabled ? 1 : 0.2}
                    onPress={() => props.navigation.navigate('Pledge')}
                    style={[
                      props.disabled
                        ? theme.Button.disabledStyle
                        : theme.Button.buttonStyle,
                      {
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: 'row',
                        marginTop: 10,
                        backgroundColor: colors.green,
                      },
                    ]}>
                    <View style={styles.bankIDBtnCon}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[theme.Button.titleStyle]}>
                          {I18n.t('sign_in_with_bank_id')}
                        </Text>
                        <Image
                          source={appIcons.bank_id}
                          style={{
                            width: 50,
                            height: 35,
                            resizeMode: 'contain',
                          }}
                        />
                      </View>

                      <Image
                        style={{height: 14, width: 21}}
                        source={appIcons.rightArrow}
                      />
                    </View>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </>
  );
}

export default index;

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
  reviewBtn: {
    width: '52%',
    height: 55,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textCon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bankIDBtnCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  pickerStyle: {
    width: '93%',
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderBottomColor: 'grey',
    borderRadius: 0,
  },
  itemListStyle: {
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5,
    width: '93%',
    alignSelf: 'center',
    marginTop: '1%',
    backgroundColor: '#FFFFFF',
  },
});
