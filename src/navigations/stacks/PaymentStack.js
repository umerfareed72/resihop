import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AddPayment from "../../screens/Passenger/Payment/AddPaymentMethod"
const Stack = createStackNavigator();

function PaymentStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Payment"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AddPayment" component={AddPayment} />
    </Stack.Navigator>
  );
}

export default PaymentStack;
