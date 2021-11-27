import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {CustomHeader} from '../../components';
import {theme} from '../../theme';
import {colors} from '../../utilities';

const info = [
  {
    id: 0,
    fieldName: 'Licence Plate',
    fieldValue: 'XT32TTU8',
  },
  {
    id: 1,
    fieldName: 'Car Company',
    fieldValue: 'Ford',
  },
  {
    id: 3,
    fieldName: 'Model Name',
    fieldValue: 'Focus',
  },
  {
    id: 4,
    fieldName: 'Vahicle Colour',
    fieldValue: 'White',
  },
  {
    id: 5,
    fieldName: 'CO2 EMISSIONS (g CO2 / km)',
    fieldValue: 'g CO 2 / km',
  },
  {
    id: 6,
    fieldName: 'Preset cost for each passenger',
    fieldValue: 'SEK 20',
  },
];

function index(props) {
  return (
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
          {info.map(item => {
            return (
              <View style={styles.textContainer}>
                <Text style={theme.Text.h4Normal}>{item?.fieldName}</Text>
                <View style={{width: '30%'}}>
                  <Text style={theme.Text.h4Normal}>{item?.fieldValue}</Text>
                </View>
              </View>
            );
          })}
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
