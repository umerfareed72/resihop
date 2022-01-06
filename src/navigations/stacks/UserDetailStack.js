import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PersonalDetails from '../../screens/PersonalDetails/PersonalDetails';
import UploadLicence from '../../screens/UploadLicence/UploadLicence';
import Pledge from '../../screens/Pledge';
import PermissionScreen from '../../screens/PermissionScreen';
import VahicleInfo from '../../screens/VahicleInfo';
import Terms from '../../screens/Passenger/Terms/Terms';
import ReviewDetails from '../../screens/ReviewDetails';

const Stack = createStackNavigator();

function UserDetailStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
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
    </Stack.Navigator>
  );
}

export default UserDetailStack;
