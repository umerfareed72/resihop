import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {colors, family, HP, size, WP, appIcons} from '../../utilities';
import {
  app_logo,
  drawerIcon,
  rides_history,
  my_payment_methods,
  favourites,
  reports,
  offers,
  invite,
  my_contribution,
  settings,
  logout,
} from '../../assets';
import {ListItem} from 'react-native-elements';
import Right from 'react-native-vector-icons';
import {Icon} from 'react-native-elements';

import {StackActions} from '@react-navigation/native';

const DrawerComponent = ({navigation}) => {
  const list = [
    {
      icon: rides_history,
      label: 'Rides History',
      onPress: () => {
        navigation.navigate('Contacts');
        // navigation.navigate('DashboardTabs', {
        //   routeName: 'Contacts',
        // });

        // routeName: 'Contacts',
        // });
      },
    },
    {
      icon: my_payment_methods,
      label: 'My Payment Methods',
      onPress: () => {
        navigation.push('DashboardTabs', {
          routeName: 'Dashboard',
        });
        navigation.closeDrawer();
      },
    },
    {
      icon: favourites,
      label: 'Favourites',
      onPress: () => {
        navigation.navigate('AccountSettings');
      },
    },

    {
      icon: reports,
      label: 'Reports',
      onPress: () => {
        navigation.navigate('Logout');
      },
    },
    {
      icon: offers,
      label: 'Offers',
      onPress: () => {
        navigation.navigate('Logout');
      },
    },
    {
      icon: invite,
      label: 'Invite',
      onPress: () => {
        navigation.navigate('Logout');
      },
    },
    {
      icon: my_contribution,
      label: 'My Contribution',
      onPress: () => {
        navigation.navigate('Logout');
      },
    },
    {
      icon: settings,
      label: 'Settings',
      onPress: () => {
        navigation.navigate('Logout');
      },
    },
    {
      icon: logout,
      label: 'Log out',
      onPress: () => {
        navigation.navigate('Logout');
      },
    },
  ];
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.userInfoContainer}>
        <View style={styles.infoContainer}>
          <Image
            resizeMode={'contain'}
            style={styles.imgStyle}
            source={app_logo}
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
      <View style={styles.drawerIconContainer}>
        {list.map((item, i) => (
          <ListItem key={i} onPress={item.onPress}>
            <Image style={{width: 20, height: 20}} source={item.icon} />

            <ListItem.Content>
              <ListItem.Title style={styles.drawerItemLabel}>
                {item.label}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: WP('70'),
    backgroundColor: colors.white,
  },
  userInfoContainer: {
    // backgroundColor: 'orange',
    // marginVertical: HP('8'),
    marginTop: HP('8'),
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
    backgroundColor: colors.white,
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
