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
import {colors, family, HP, size, WP} from '../../utilities';
import {ListItem} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {appImages, drawerIcons} from '../../utilities/images';
import MyStatusBar from '../Header/statusBar';
import {LogoutModal} from '../Modal/LogoutModal/LogoutModal';
import I18n from '../../utilities/translations';

const DrawerComponent = ({navigation}) => {
  const modalRef = useRef(null);

  const list = [
    {
      icon: drawerIcons.rides_history,
      label: 'Rides History',
      onPress: () => {
        navigation?.navigate('RideHistory');
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.my_payment_methods,
      label: 'My Payment Methods',
      onPress: () => {
        navigation.push('Payment', {
          routeName: 'Payment',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.Favourites,
      label: 'Favourites',
      onPress: () => {
        // navigation.navigate('AccountSettings');
      },
    },

    {
      icon: drawerIcons.reports,
      label: 'Reports',
      onPress: () => {
        navigation.push('Reports', {
          routeName: 'Reports',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.offers,
      label: 'Offers',
      onPress: () => {
        navigation.push('Offers', {
          routeName: 'Offers',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.invite,
      label: 'Invite',
      onPress: () => {
        navigation.push('Invite', {
          routeName: 'Invite',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.my_contribution,
      label: 'My Contribution',
      onPress: () => {
        navigation.push('Contribution', {
          routeName: 'Contribution',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: drawerIcons.settings,
      label: 'Settings',
      onPress: () => {
        navigation.navigate('Settings');
      },
    },
    {
      icon: drawerIcons.logout,
      label: 'Log out',
      onPress: () => {
        navigation.closeDrawer();
        modalRef?.current?.open();
      },
    },
  ];

  return (
    <>
      <MyStatusBar
        backgroundColor={colors.light_green}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.userInfoContainer}>
          <View style={styles.infoContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.imgStyle}
              source={appImages.app_logo}
            />

            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>Umar Fareed</Text>
              <Icon
                name={'right'}
                color={colors.light_black}
                size={22}
                type={'antdesign'}
              />
            </View>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.passengerStyle}>Passenger</Text>
              <Icon
                name={'star'}
                type={'entypo'}
                color={colors.white}
                size={15}
              />
              <Text style={styles.passengerStyle}>4.5</Text>
            </TouchableOpacity>
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
              <Image style={{width: 20, height: 20}} source={item.icon} />

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
              modalRef?.current?.close();
              navigation.navigate('AuthStack');
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
    // width: WP('70'),
    backgroundColor: colors.light_green,
  },
  userInfoContainer: {
    // backgroundColor: 'orange',
    // marginVertical: HP('8'),
    marginTop: HP('4'),
    marginBottom: HP('2'),
  },
  infoContainer: {
    marginHorizontal: HP('5'),
    // marginVertical: HP('10'),
  },
  imgStyle: {
    width: HP('9'),
    height: HP('9'),
    borderRadius: 100,
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
    width: 160,
    height: 40,
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
    fontFamily: family.product_sans_bold,
  },
});

export default DrawerComponent;
