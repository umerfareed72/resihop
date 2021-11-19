import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import splash from '../screens/splash';
import languageSelect from '../screens/languageSelect';
import walkThrough from '../screens/walkThrough';
import landingUser from '../screens/landingUser';

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
          name="WalkThrough"
          component={walkThrough}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="LandingUser"
          component={landingUser}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
