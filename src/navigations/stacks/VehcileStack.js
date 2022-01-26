import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import UploadLicence from '../../screens/UploadLicence/UploadLicence';
import Pledge from '../../screens/Pledge';
import PermissionScreen from '../../screens/PermissionScreen';
import VahicleInfo from '../../screens/VahicleInfo';
import Terms from '../../screens/Passenger/Terms/Terms';
import ReviewDetails from '../../screens/ReviewDetails';
import ApprovalStatus from '../../screens/ApprovalStatus';

const Stack = createStackNavigator();

function VehcileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="VahicleInformation"
        component={VahicleInfo}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Pledge"
        component={Pledge}
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
        name="ApprovalStatus"
        component={ApprovalStatus}
      />
    </Stack.Navigator>
  );
}

export default VehcileStack;
