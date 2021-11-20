import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import landingUser from '../../screens/landingUser';
import walkThrough from '../../screens/walkThrough';
import languageSelect from '../../screens/LanguageSelect/languageSelect';

const Stack = createStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="LanguageSelect"
      screenOptions={{headerShown: false}}>
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
  );
}

export default AuthStack;
