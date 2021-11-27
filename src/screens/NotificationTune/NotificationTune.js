import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CustomHeader} from '../../components';
import {appIcons, appImages, colors, family, HP, size} from '../../utilities';
import {Switch} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native';
import {TextInput} from 'react-native-gesture-handler';

const NotificationTune = ({navigation}) => {
  // ../../assets/icons/png/ticketBg.png

  // let img =require('../../assets/icons/png/ticketBg.png');
  const [data, setData] = useState([
    {name: 'Sound 1', icon: true},
    {name: 'Sound 2', icon: false},
    {name: 'Sound 3', icon: false},
  ]);

  const TuneComp = ({data}) => {
    console.log('DATA', data);
    return (
      <>
        <View style={styles.rowContainer}>
          <Text style={styles.nameText}>{data?.item?.name}</Text>
          {/* {data?.item?.icon && <Image source={} />} */}
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: colors.g3}} />
      </>
    );
  };

  return (
    <>
      <CustomHeader
        navigation={navigation}
        title="Notifications Tone"
        backButton={true}
      />
      <SafeAreaView style={styles.container}>
        <FlatList data={data} renderItem={item => <TuneComp data={item} />} />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: HP('2'),
    marginHorizontal: HP('2.5'),
  },
  nameText: {
    fontSize: size.large,
    fontFamily: family.product_sans_regular,
    color: colors.light_black,
  },
});

export default NotificationTune;
