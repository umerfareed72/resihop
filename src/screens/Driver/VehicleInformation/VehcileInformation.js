import {Formik} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {Button, Divider, Icon, Input, Text} from 'react-native-elements';
import {CustomHeader, Loader} from '../../../components';
import * as Yup from 'yup';
import {theme} from '../../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import {axios, get, post, put} from '../../../services';
import I18n from '../../../utilities/translations';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-native';
import {cost_list, header} from '../../../utilities';
import xml2js from 'react-native-xml2js';
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
  email: Yup.string().email('Invalid email').required('Required'),
});

function VehicleInformation(props) {
  const auth = useSelector(state => state.auth);
  const vehicle = useSelector(state => state.auth?.is_vehicle);
  const [licencePlateNumber, setLicencePlateNumber] = useState('');
  const [carMakerCompany, setCarMakerCompany] = useState('');
  const [carModel, setcarModel] = useState('');
  const [carColor, setcarColor] = useState('');
  const [engineSize, setEngineSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState(cost_list);
  const [getDetailsBtn, setgetDetailsBtn] = React.useState(true);
  const [next, setNext] = React.useState(false);
  const licencePlate = React.useRef();
  const carCompany = React.useRef();
  const modelName = React.useRef();

  //Get Latest Car Detail
  const getVahicleDetail = () => {
    if (licencePlateNumber != '') {
      console.log(licencePlateNumber);
      const url = `https://www.regcheck.org.uk/api/reg.asmx/CheckNorway?RegistrationNumber=${licencePlateNumber}&username=Lillaskuggan`;
      setIsLoading(true);
      axios
        .get(url)
        .then(response => {
          setIsLoading(false);
          try {
            if (response?.data?.match('Out of credit')) {
              alert(response?.data);
            } else {
              const split = response?.data?.substring(17, 23);
              if (split != 'failed') {
                xml2js.parseString(
                  response?.data,
                  {trim: true},
                  function (err, result) {
                    if (result) {
                      setIsLoading(false);
                      const {CarMake, CarModel, Colour, ExtendedInformation} =
                        JSON.parse(result?.Vehicle?.vehicleJson);
                      if (ExtendedInformation) {
                        delete Object?.assign(ExtendedInformation, {
                          ['co2']: ExtendedInformation['co2-utslipp'],
                        })['co2-utslipp'];
                        delete Object?.assign(ExtendedInformation, {
                          ['color']: ExtendedInformation['farge'],
                        })['farge'];
                        setEngineSize(ExtendedInformation?.co2);
                      }
                      setCarMakerCompany(CarMake?.CurrentTextValue);
                      setcarModel(CarModel?.CurrentTextValue);
                      setcarColor(ExtendedInformation?.color);
                      setNext(true);
                    }
                  },
                );
              } else {
                Alert.alert('No Record Found!');
                setIsLoading(false);
              }
            }
          } catch (err) {
            setIsLoading(false);
            console.log('Error:', err);
          }
        })
        .catch(error => {
          alert(error?.response?.data);
          setIsLoading(false);
        });
    }
  };
  //Add vehicle info
  const addVehicelInfo = async () => {
    setIsLoading(true);
    const requestBody = {
      user: auth?.profile_info?._id,
      color: carColor,
      licencePlateNumber: licencePlateNumber,
      vehicleModelName: carModel,
      vehicleCompanyName: carMakerCompany,
      CO2Emissions: engineSize,
      presetCostPerPassenger: value,
    };
    try {
      const response = await put(
        `vehicles/${auth?.profile_info?.vehicle?._id}`,
        requestBody,
        await header(),
      );
      if (response?.data) {
        setIsLoading(false);
        Alert.alert('Success', 'Vehicle Info updated Successfully', [
          {
            text: 'Ok',
            onPress: () => {
              props?.navigation?.navigate('DriverHome');
            },
          },
        ]);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    setValue(items[0].value);
  }, []);
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white', margin: 5}}>
        <CustomHeader
          backButton={vehicle ? false : true}
          navigation={props?.navigation}
          text={'Vehicle Information'}
        />
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
                      onChangeText={val => {
                        // handleChange('licencePlate')}
                        if (val.length > 5) {
                          if (val) {
                            setgetDetailsBtn(false);
                            setLicencePlateNumber(val);
                          }
                        }
                      }}
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
                      disabled={getDetailsBtn}
                      title={I18n.t('get_details')}
                      onPress={() => getVahicleDetail()}
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
                    editable={false}
                    value={carMakerCompany}
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
                    editable={false}
                    value={carModel}
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
                    editable={false}
                    value={carColor}
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
                    editable={false}
                    value={engineSize}
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

                  <Button
                    title={'Update'}
                    disabled={value != null && next ? false : true}
                    onPress={() => {
                      addVehicelInfo();
                    }}
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
                      paddingVertical: 30,
                    }}
                  />
                </KeyboardAvoidingView>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
      {isLoading ? <Loader /> : null}
    </>
  );
}

export default VehicleInformation;

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
    marginVertical: '5%',
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
    paddingHorizontal: 0,
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
