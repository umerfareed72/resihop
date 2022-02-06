import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {CustomHeader, Loader} from '../../../components';
import {theme} from '../../../theme';
import {colors} from '../../../utilities';

function index(props) {
  const [info, setInfo] = useState([
    {
      id: 6,
      fieldName: 'Preset cost for each passenger',
      fieldValue: 'SEK 20',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

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
                <Text style={theme.Text.h4Normal}>
                  {props.route.params.CarMake}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{'Model Name'}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>
                  {props.route.params.CarModel}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>{'Vahicle Colour'}</Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>
                  {props.route.params.Colour}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>
                {'CO2 EMISSIONS (g CO2 / km)'}
              </Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>
                  {props.route.params.EngineSize}
                </Text>
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={theme.Text.h4Normal}>
                {'Preset cost for each passenger'}
              </Text>
              <View style={{width: '35%'}}>
                <Text style={theme.Text.h4Normal}>
                  {props.route.params.PresetCost} NOK
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: '15%',
              }}>
              <Button
                title={'OK'}
                onPress={() => props?.navigation?.navigate('ApprovalStatus')}
                buttonStyle={[theme.Button.buttonStyle]}
                disabled={
                  props.route.params?.PresetCost != null &&
                  props.route.params?.CarMake != ''
                    ? false
                    : true
                }
                titleStyle={[theme.Button.titleStyle, {fontSize: 13}]}
                disabledTitleStyle={theme.Button.disabledTitleStyle}
                containerStyle={{
                  width: '90%',
                  alignSelf: 'center',
                }}
              />
              <Button
                title={'Edit'}
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
