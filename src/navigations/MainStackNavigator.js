import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import splash from '../screens/Splash/splash';
import AuthStack from './stacks/AuthStack';
import UserDetailStack from './stacks/UserDetailStack';
import {DrawerNavigator} from './PassengerDrawerNav';
import {DriverDrawerNavigator} from './DriverDraweNavigator';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();
const PassengerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'PassengerHome'}>
      <Stack.Screen name={'PassengerHome'} component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

const DriverNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'DriverHome'}>
      <Stack.Screen name={'DriverHome'} component={DriverDrawerNavigator} />
    </Stack.Navigator>
  );
};

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Splash"
          component={splash}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PassengerDashboard"
          component={PassengerNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="DriverDashboard"
          component={DriverNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="AuthStack"
          component={AuthStack}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="UserDetailStack"
          component={UserDetailStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
