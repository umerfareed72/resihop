import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import splash from '../screens/Splash/splash';
import AuthStack from './stacks/AuthStack';
import NotificationSettings from '../screens/NotificationSettings/NotificationSetting';
import TransactionDetails from '../screens/TransactionDetails/TransactionDetails';
import {DrawerNavigator} from './PassengerDrawerNav';
import NotificationTune from '../screens/NotificationTune/NotificationTune';
import Reports from '../screens/Passenger/Reports/Reports';

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
          name="NotificationSettings"
          component={NotificationSettings}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="NotificationTune"
          component={NotificationTune}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="TransactionDetails"
          component={TransactionDetails}
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
