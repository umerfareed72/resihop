import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import splash from '../screens/splash';
import languageSelect from '../screens/languageSelect';
import PassengerHome from '../screens/PassengerHome';
import CreateRide from '../screens/CreateRide';
import StartLocation from '../screens/StartLocation';

const Stack = createStackNavigator();

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
          name="LanguageSelect"
          component={languageSelect}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PassengerHome"
          component={PassengerHome}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="CreateRide"
          component={CreateRide}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="StartLocation"
          component={StartLocation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
