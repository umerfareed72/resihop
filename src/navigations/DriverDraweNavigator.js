import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {WP} from '../utilities';
import PassengerStack from './stacks/PassengerStack';
import DriverStack from './stacks/DriverStack';
import DriverDrawerComponent from '../components/Drawer/DriverDrawerComp';

const Drawer = createDrawerNavigator();

export const DriverDrawerNavigator = ({route}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DriverDrawerComponent {...props} />}
      drawerStyle={styles.drawer}
      screenOptions={{headerShown: false}}
      initialRouteName="DrivHome"
      drawerPosition={'left'}>
      <Drawer.Screen
        // options={{headerShown: false}}
        name="DrivHome"
        component={DriverStack}
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
