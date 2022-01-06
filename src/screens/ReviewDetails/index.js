import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {CustomHeader} from '../../components';
import Loader from '../../components/Loader/Loader';
import {theme} from '../../theme';
import {colors} from '../../utilities';

function index(props) {
  const [info, setInfo] = useState([
    {
      id: 6,
      fieldName: 'Preset cost for each passenger',
      fieldValue: 'SEK 20',
    },
  ]);
  const [carMakerCompany, setCarMakerCompany] = useState('');
  const [carModel, setcarModel] = useState('');
  const [carColor, setcarColor] = useState('');
  const [engineSize, setEngineSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const {plateNumber} = props.route.params;
    const url = `https://www.regcheck.org.uk/api/reg.asmx/CheckSweden?RegistrationNumber=${plateNumber}&username=DawoodAbrar`;
    var parseString = require('react-native-xml2js').parseString;
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.text())
      .then(responseData => {
        setIsLoading(false);
        try {
          if (responseData) {
            parseString(responseData, {trim: true}, function (err, result) {
              if (result) {
                setIsLoading(false);
                const {CarMake, CarModel, Colour, EngineSize} = JSON.parse(
                  result?.Vehicle?.vehicleJson,
                );
                setCarMakerCompany(CarMake.CurrentTextValue);
                setcarModel(CarModel.CurrentTextValue);
                setcarColor(Colour);
                setEngineSize(EngineSize.CurrentTextValue);
              }
            });
          }
        } catch (err) {
          setIsLoading(false);
          console.log('Error:', err);
        }
      })
      .done();
  }, []);

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white', margin: 5}}>
        <CustomHeader
          title={'Review Your Details'}
          backButton={true}
          navigation={props?.navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{margin: 20}}>
            <Text style={[theme.Text.h2Bold, {fontSize: 16}]}>
              {'Vahicle information'}
            </Text>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{'Licence Plate'}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>
                  {props.route.params.plateNumber}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{'Car Company'}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{carMakerCompany}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{'Model Name'}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{carModel}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{'Vahicle Colour'}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{carColor}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>
                {'CO2 EMISSIONS (g CO2 / km)'}
              </Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>{engineSize}</Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>
                {'Preset cost for each passenger'}
              </Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>
                  {props.route.params.PresetCost}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: '15%',
              }}>
              <Button
                title={'OK'}
                onPress={() => console.log('Pressed!')}
                buttonStyle={[theme.Button.buttonStyle]}
                titleStyle={[theme.Button.titleStyle, {fontSize: 13}]}
                disabledTitleStyle={theme.Button.disabledTitleStyle}
                containerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                }}
              />
              <Button
                title={'Edit'}
                onPress={() => console.log('Pressed!')}
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
