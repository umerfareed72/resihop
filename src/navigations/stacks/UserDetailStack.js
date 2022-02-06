import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PersonalDetails from '../../screens/Auth/PersonalDetails/PersonalDetails';
import Pledge from '../../screens/Auth/Pledge';
import Terms from '../../screens/Passenger/Terms/Terms';

import VehcileStack from './VehcileStack';

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
        name="VehcileStack"
        component={VehcileStack}
      />
    </Stack.Navigator>
  );
}

export default UserDetailStack;
