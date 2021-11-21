import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import splash from '../screens/Splash/splash';
import AuthStack from './stacks/AuthStack';
import Terms from '../screens/Terms/Terms';
import Privacy from '../screens/Privacy/Privacy';
import {DrawerNavigator} from './PassengerDrawerNav';
import AboutUs from '../screens/AboutUs/AboutUs';
import Settings from '../screens/Settings/Settings';
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

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Settings"
          component={Settings}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="About Us"
          component={AboutUs}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="Privacy"
          component={Privacy}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Terms"
          component={Terms}
        />

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
          name="AuthStack"
          component={AuthStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
