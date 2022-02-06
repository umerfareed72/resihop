import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import landingUser from '../../screens/WelcomeScreens/landingUser';
import walkThrough from '../../screens/WelcomeScreens/walkThrough';
import languageSelect from '../../screens/WelcomeScreens/LanguageSelect/languageSelect';
import SignIn from '../../screens/Auth/SignInScreen/SignIn';
import SignUp from '../../screens/Auth/SignUpScreen/SignUp';
import UserDetailStack from './UserDetailStack';

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
        name="UserDetailStack"
        component={UserDetailStack}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
