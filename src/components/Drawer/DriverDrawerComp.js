import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  checkConnected,
  colors,
  family,
  HP,
  profileIcon,
  size,
  WP,
} from '../../utilities';
import {ListItem} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {appImages, drawerIcons} from '../../utilities/images';
import MyStatusBar from '../Header/statusBar';
import {LogoutModal} from '../Modal/LogoutModal/LogoutModal';
import I18n from '../../utilities/translations';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {logout} from '../../redux/actions/auth.action';

const DriverDrawerComponent = ({navigation}) => {
  const modalRef = useRef(null);
  const Userdata = useSelector(state => state.auth);
  const dispatch = useDispatch(null);
  const list = [
    {
      icon: drawerIcons.rides_history,
      label: I18n.t('driver_history'),
      onPress: () => {
        navigation?.navigate('DriverRideHistory');
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.my_payment_methods,
      label: I18n.t('my_payment_method'),
      onPress: () => {
        navigation.push('DriverPayment', {
          routeName: 'DriverPayment',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.Favourites,
      label: I18n.t('favourites'),
      onPress: () => {
        navigation.push('Favourites', {
          routeName: 'Favourites',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: appImages.green_car2,
      label: I18n.t('vehicle_information'),
      onPress: () => {
        navigation.push('VehicleInformation', {
          routeName: 'VehicleInformation',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.reports,
      label: I18n.t('reports'),
      onPress: () => {
        navigation.push('Reports', {
          routeName: 'Reports',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.offers,
      label: I18n.t('offers'),
      onPress: () => {
        navigation.push('Offers', {
          routeName: 'Offers',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.invite,
      label: I18n.t('invite'),
      onPress: () => {
        navigation.push('Invite', {
          routeName: 'Invite',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.my_contribution,
      label: I18n.t('my_contribution'),
      onPress: () => {
        navigation.push('Contribution', {
          routeName: 'Contribution',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.settings,
      label: I18n.t('settings'),
      onPress: () => {
        navigation.navigate('Settings');
      },
    },
    {
      icon: drawerIcons.logout,
      label: I18n.t('logout'),
      onPress: () => {
        navigation.closeDrawer();
        modalRef?.current?.open();
      },
    },
  ];

  async function Signout() {
    modalRef?.current?.close();
    const isConnected = await checkConnected();
    if (isConnected) {
      auth()
        .signOut()
        .then(() => {
          console.log('User signout---');
          dispatch(logout());
          navigation.reset({
            index: 0,
            routes: [{name: 'AuthStack'}],
          });
        });
    } else {
      Alert.alert('Internet Error', 'Check your internet connection');
    }
  }
  return (
    <>
      <MyStatusBar
        backgroundColor={colors.light_green}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.imgStyle}>
              <Image
                resizeMode={'cover'}
                style={styles.profileImg}
                source={{
                  uri: Userdata?.profile_info?.picture?.url || profileIcon,
                }}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('EditProfile')}
              style={styles.userNameContainer}>
              <Text style={styles.userName}>
                {Userdata?.profile_info?.firstName?.toUpperCase() +
                  ' ' +
                  Userdata?.profile_info?.lastName?.toUpperCase()}
              </Text>
              <Icon
                name={'right'}
                color={colors.light_black}
                size={22}
                type={'antdesign'}
              />
            </TouchableOpacity>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.passengerStyle}>
                  {I18n.t('fav_passenger')}
                </Text>
                <Icon
                  name={'star'}
                  type={'entypo'}
                  color={colors.white}
                  size={15}
                />
                <Text style={styles.passengerStyle}>
                  {Userdata?.profile_info?.rating_r}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer2}>
                <Text style={styles.passengerStyle}>
                  {I18n.t('fav_driver')}
                </Text>
                <Icon
                  name={'star'}
                  type={'entypo'}
                  color={colors.white}
                  size={15}
                />
                <Text style={styles.passengerStyle}>
                  {Userdata?.profile_info?.rating_d}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.drawerIconContainer}
          showsVerticalScrollIndicator={false}>
          {list.map((item, i) => (
            <ListItem
              containerStyle={{backgroundColor: colors.light_green}}
              key={i}
              onPress={item.onPress}>
              <Image
                style={{width: 24, height: 24, resizeMode: 'contain'}}
                source={item.icon}
              />

              <ListItem.Content>
                <ListItem.Title style={styles.drawerItemLabel}>
                  {item.label}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
        {
          <LogoutModal
            h1={I18n.t('logout')}
            h2={I18n.t('logout_text')}
            onPress={() => {
              Signout();
            }}
            btnText={I18n.t('yes')}
            btnText2={I18n.t('cancel')}
            show={modalRef}
            icon={drawerIcons.logout}
            onPress2={() => {
              modalRef.current?.close();
            }}
          />
        }
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.light_green,
  },
  userInfoContainer: {
    // backgroundColor: 'orange',
    // marginVertical: HP('8'),
    marginTop: HP('4'),
    marginBottom: HP('2'),
  },
  infoContainer: {
    marginHorizontal: HP('3'),
    // marginVertical: HP('10'),
  },
  imgStyle: {
    width: HP('9'),
    height: HP('9'),
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: size.h6,
    color: colors.light_black,
    marginVertical: HP('3.5'),
    marginRight: HP('2'),
    fontFamily: family.product_sans_bold,
  },
  buttonContainer: {
    width: 130,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.green,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  buttonContainer2: {
    width: 110,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.green,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  passengerStyle: {
    fontSize: size.xsmall,
    fontFamily: family.product_sans_regular,
    color: '#FFFFFF',
    marginRight: HP('1'),
    marginHorizontal: HP('1'),
  },
  // headerContainer: {
  //   backgroundColor: colors.p1,
  //   borderBottomLeftRadius: size.small,
  // },
  // headerImageContainer: {
  //   alignItems: 'center',
  //   marginVertical: HP('3'),
  // },
  drawerIconContainer: {
    // marginTop: HP('2'),
    marginHorizontal: WP('4'),
    flex: 1,
    backgroundColor: colors.light_green,
  },
  // darwerItemsContainer: {
  //   flexDirection: 'row',
  //   marginVertical: HP('1'),
  //   alignItems: 'center',
  // },
  // drawerItemImage: {
  //   width: WP('6'),
  //   height: HP('6'),

  //   resizeMode: 'contain',
  // },
  drawerItemLabel: {
    fontSize: size.normal,
    color: colors.light_black,
    fontFamily: family.product_sans_regular,
  },
  profileImg: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
});

export default DriverDrawerComponent;
