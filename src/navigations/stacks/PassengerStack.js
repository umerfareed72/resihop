import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PassengerHome from '../../screens/Passenger/Home/PassengerHome';
import EditCard from '../../screens/Passenger/Payment/AddPaymentMethod/EditCard';
import TransactionHistory from '../../screens/Passenger/Payment/PaymentHistory';
import CreateRide from '../../screens/CreateRide';
import StartLocation from '../../screens/StartLocation';
import WithDrawPayment from '../../screens/Passenger/Payment/AddPaymentMethod/WithdrawPayment';
import NotificationList from '../../screens/Passenger/NotificationList/NotificationList';
import AddCard from '../../screens/Passenger/Payment/AddPaymentMethod/AddCard';
import CardDetail from '../../screens/Passenger/Payment/AddPaymentMethod/CardDetail';
import Payment from '../../screens/Passenger/Payment/AddPaymentMethod';
import Help from '../../screens/Passenger/Help/Help';
import Terms from '../../screens/Passenger/Terms/Terms';
import Privacy from '../../screens/Passenger/Privacy/Privacy';
import Settings from '../../screens/Passenger/Settings/Settings';
import AboutUs from '../../screens/Passenger/AboutUs/AboutUs';
import RideHistory from '../../screens/Passenger/Rides/RideHistory';

const Stack = createStackNavigator();

function PassengerStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="PassengerHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="PassengerHome"
        component={PassengerHome}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="Payment"
        component={Payment}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="AddCard"
        component={AddCard}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="WithDrawPayment"
        component={WithDrawPayment}
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
        name="CreateRide"
        component={CreateRide}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="StartLocation"
        component={StartLocation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="NotificationList"
        component={NotificationList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Help"
        component={Help}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AboutUs"
        component={AboutUs}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="Privacy"
        component={Privacy}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Terms"
        component={Terms}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="RideHistory"
        component={RideHistory}
      />
    </Stack.Navigator>
  );
}

export default PassengerStack;
