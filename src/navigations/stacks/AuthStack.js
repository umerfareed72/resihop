import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import landingUser from '../../screens/landingUser';
import walkThrough from '../../screens/walkThrough';
import languageSelect from '../../screens/LanguageSelect/languageSelect';
import SignIn from '../../screens/SignInScreen/SignIn';
import SignUp from '../../screens/SignUpScreen/SignUp';
import PersonalDetails from '../../screens/PersonalDetails/PersonalDetails';
import UploadLicence from '../../screens/UploadLicence/UploadLicence';
import Pledge from '../../screens/Pledge';
import PermissionScreen from '../../screens/PermissionScreen';
import VahicleInfo from '../../screens/VahicleInfo';
import Terms from '../../screens/Passenger/Terms/Terms';
import ReviewDetails from '../../screens/ReviewDetails';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="LanguageSelect"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="PersonalDetails"
        component={PersonalDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UploadLicence"
        component={UploadLicence}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Pledge"
        component={Pledge}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PermissionScreen"
        component={PermissionScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VahicleInformation"
        component={VahicleInfo}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Terms"
        component={Terms}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ReviewDetails"
        component={ReviewDetails}
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
    </Stack.Navigator>
  );
}

export default AuthStack;
