import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import splash from '../screens/Splash/splash';
import AuthStack from './stacks/AuthStack';
import Offers from '../screens/Offers/Offers';
import Reports from '../screens/Reports/Reports';
import {DrawerNavigator} from './PassengerDrawerNav';

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
          name="Reports"
          component={Reports}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Offers"
          component={Offers}
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
