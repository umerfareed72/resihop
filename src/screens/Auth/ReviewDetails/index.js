import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {CustomHeader, Loader} from '../../../components';
import {post} from '../../../services';
import {theme} from '../../../theme';
import {colors, header} from '../../../utilities';
import I18n from '../../../utilities/translations';
function index(props) {
  const [info, setInfo] = useState([
    {
      id: 6,
      fieldName: 'Preset cost for each passenger',
      fieldValue: 'NOK 20',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const userid = useSelector(state => state.auth?.userdata?.user?._id);
  const {plateNumber, CarMake, CarModel, Colour, EngineSize, PresetCost} =
    props?.route?.params;
  //Add vehicle info
  const addVehicelInfo = async () => {
    setIsLoading(true);
    const requestBody = {
      user: userid,
      color: Colour,
      licencePlateNumber: plateNumber,
      vehicleModelName: CarModel,
      vehicleCompanyName: CarMake,
      CO2Emissions: EngineSize,
      presetCostPerPassenger: PresetCost,
      // bankID: bankdIdToken,
    };
    try {
      const response = await post(`vehicles`, requestBody, await header());
      if (response?.data) {
        setIsLoading(false);
        Alert.alert(
          'Success',
          I18n.t('vehicle_info_success'),
          [
            {
              text: 'OK',
              onPress: () => {
                props?.navigation?.replace('ApprovalStatus');
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white', margin: 5}}>
        <CustomHeader
          title={I18n.t('review_title')}
          backButton={true}
          navigation={props?.navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{margin: 20}}>
            <Text style={[theme.Text.h2Bold, {fontSize: 16}]}>
              {I18n.t('vehicle_information')}
            </Text>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{I18n.t('license_plate')}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{plateNumber}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{I18n.t('car_company')}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{CarMake}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{I18n.t('modal_name')}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{CarModel}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>
                {I18n.t('vehicle_colour')}
              </Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{Colour}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>
                {I18n.t('vehicle_emission')}
              </Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{EngineSize}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>
                {I18n.t('cost_percentage')}
              </Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{PresetCost} NOK</Text>
              </View>
            </View>

            <View
              style={{
                marginTop: '15%',
              }}>
              <Button
                title={I18n.t('ok')}
                onPress={() => addVehicelInfo()}
                buttonStyle={[theme.Button.buttonStyle]}
                disabled={PresetCost != null && CarMake != '' ? false : true}
                titleStyle={[theme.Button.titleStyle, {fontSize: 13}]}
                disabledTitleStyle={theme.Button.disabledTitleStyle}
                containerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                }}
              />
              <Button
                title={I18n.t('edit')}
                onPress={() => {
                  props.navigation.navigate('VahicleInformation');
                }}
                buttonStyle={[
                  theme.Button.buttonStyle,
                  {
                    backgroundColor: 'white',
                    borderColor: colors.primary,
                    borderWidth: 1,
                  },
                ]}
                titleStyle={[
                  theme.Button.titleStyle,
                  {fontSize: 15, color: 'black'},
                ]}
                disabledTitleStyle={theme.Button.disabledTitleStyle}
                containerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                  marginTop: '10%',
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      {isLoading ? <Loader /> : null}
    </>
  );
}

export default index;

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: '5%',
  },
});
