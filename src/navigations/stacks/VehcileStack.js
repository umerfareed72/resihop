import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Pledge from '../../screens/Auth/Pledge';
import VahicleInfo from '../../screens/Auth/VahicleInfo';
import Terms from '../../screens/Passenger/Terms/Terms';
import ReviewDetails from '../../screens/Auth/ReviewDetails';
import ApprovalStatus from '../../screens/Auth/ApprovalStatus';

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
