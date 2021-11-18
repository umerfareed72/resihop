import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import splash from '../screens/Splash/splash';
import Payment from './stacks/PaymentStack';
import languageSelect from '../screens/LanguageSelect/languageSelect';
import PassengerHome from '../screens/Passenger/Home/PassengerHome';
import CardDetail from '../screens/Passenger/Payment/AddPaymentMethod/CardDetail';
import EditCard from '../screens/Passenger/Payment/AddPaymentMethod/EditCard';
import TransactionHistory from '../screens/Passenger/Payment/PaymentHistory';

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
          name="Payment"
          component={Payment}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="CardDetail"
          component={CardDetail}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="EditCard"
          component={EditCard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="TransactionHistory"
          component={TransactionHistory}
        />

        <Stack.Screen
          options={{headerShown: false}}
          name="PassengerHome"
          component={PassengerHome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
