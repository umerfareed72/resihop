import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CustomHeader} from '../../components';
import {appIcons, appImages, colors, family, HP, size} from '../../utilities';
import {Switch} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import {TextInput} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

const NotificationSettings = ({navigation}) => {
  const [toggleEnabled, setToggleEnabled] = useState(false);
  return (
    <>
      <CustomHeader
        title="Notifications Settings"
        backButton={true}
        navigation={navigation}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.marginContainer}>
          <View style={styles.notifTune}>
            <Text style={styles.notifTuneText}>Notifications Tone</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.notifTuneText}>Sound 1</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('NotificationTune')}>
                <Icon
                  type={'antdesign'}
                  color={colors.g1}
                  style={{marginLeft: HP('1')}}
                  //   style={{marginLeft: HP('1'), marginTop: HP('0.5')}}
                  size={15}
                  name={'right'}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.notifTune}>
            <Text style={styles.notifTuneText}>Turn off All Notifications</Text>
            <ToggleSwitch
              isOn={toggleEnabled}
              onColor={colors.green}
              offColor={colors.btnGray}
              size="small"
              onToggle={isOn => setToggleEnabled(isOn)}
            />
          </View>
          <View style={styles.notifTune}>
            <Text style={styles.notifTuneText}>Do Not Disturb</Text>
            <ToggleSwitch
              isOn={toggleEnabled}
              onColor={colors.green}
              offColor={colors.btnGray}
              size="small"
              onToggle={isOn => setToggleEnabled(isOn)}
            />
          </View>
          <View style={styles.notifTune}>
            <Text style={styles.notifTuneText}>Do not Disturb Period</Text>
          </View>

          <View style={styles.fromToContainer}>
            <View style={{width: '50%'}}>
              <Text style={styles.fromText}>From</Text>
              <TextInput
                placeholderTextColor={colors.notificationBorder}
                placeholder="18:00"
                style={styles.input}
              />
            </View>
            <View style={{width: '50%'}}>
              <Text style={styles.fromText}>To</Text>
              <TextInput
                placeholderTextColor={colors.notificationBorder}
                placeholder="7:00"
                style={styles.input}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  input: {
    width: 140,
    height: 44,
    borderRadius: 13,
    borderWidth: 1,
    marginTop: HP('1'),
    paddingHorizontal: 10,
    borderColor: colors.notificationBorder,
  },
  marginContainer: {
    marginTop: HP('3'),
    marginHorizontal: HP('2.5'),

    borderRadius: 13,
  },
  notifTune: {
    flexDirection: 'row',
    marginBottom: HP('4'),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifTuneText: {
    fontSize: size.normal,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
  fromToContainer: {
    flexDirection: 'row',
  },
  fromText: {
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: colors.notificationBorder,
  },
});

export default NotificationSettings;
