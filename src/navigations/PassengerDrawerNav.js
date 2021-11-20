import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {WP} from '../utilities';
import DrawerComponent from '../components/Drawer/DrawerComp';
import PassengerHome from '../screens/Passenger/Home/PassengerHome';
import PassengerStack from './stacks/PassengerStack';
// import {HomeFlow} from '../screens/MainFlow';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = ({route}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComponent {...props} />}
      drawerStyle={styles.drawer}
      screenOptions={{headerShown: false}}
      initialRouteName="PassHome"
      drawerPosition={'left'}>
      <Drawer.Screen
        // options={{headerShown: false}}
        name="PassHome"
        component={PassengerStack}
      />
    </Drawer.Navigator>
  );
};

export const styles = StyleSheet.create({
  drawer: {
    width: WP('80%'),
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
