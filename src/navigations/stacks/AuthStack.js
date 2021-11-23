import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import landingUser from '../../screens/landingUser';
import walkThrough from '../../screens/walkThrough';
import languageSelect from '../../screens/LanguageSelect/languageSelect';
import SignIn from '../../screens/SignInScreen/SignIn';
import SignUp from '../../screens/SignUpScreen/SignUp';
import PersonalDetails from '../../screens/PersonalDetails/PersonalDetails';

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
      <Stack.Screen
        options={{headerShown: false}}
        name="SignInScreen"
        component={SignIn}
      />
       <Stack.Screen
        options={{headerShown: false}}
        name="SignUpScreen"
        component={SignUp}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PersonalDetails"
        component={PersonalDetails}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
