import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PassengerHome from '../../screens/Passenger/Home/PassengerHome';
import EditCard from '../../screens/Passenger/Payment/AddPaymentMethod/EditCard';
import TransactionHistory from '../../screens/Passenger/Payment/PaymentHistory';
import CreateRide from '../../screens/CreateRide';
import StartLocation from '../../screens/StartLocation';
import WithDrawPayment from '../../screens/Passenger/Payment/AddPaymentMethod/WithdrawPayment';
import NotificationList from '../../screens/NotificationList/NotificationList';
import AddCard from '../../screens/Passenger/Payment/AddPaymentMethod/AddCard';
import CardDetail from '../../screens/Passenger/Payment/AddPaymentMethod/CardDetail';
import Payment from '../../screens/Passenger/Payment/AddPaymentMethod';
import StartMatching from '../../screens/StartMatching';
import AvailableDrivers from '../../screens/AvailableDrivers';
import BookReturnTrip from '../../screens/BookReturnTrip';
import BookingDetails from '../../screens/BookingDetails';

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
        name="StartMatching"
        component={StartMatching}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AvailableDrivers"
        component={AvailableDrivers}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ReturnTrip"
        component={BookReturnTrip}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BookingDetails"
        component={BookingDetails}
      />
    </Stack.Navigator>
  );
}

export default PassengerStack;
