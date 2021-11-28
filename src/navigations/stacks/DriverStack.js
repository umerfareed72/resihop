import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DriverHome from '../../screens/Driver/Home/DriverHome';
import EditCard from '../../screens/Passenger/Payment/AddPaymentMethod/EditCard';
import TransactionHistory from '../../screens/Passenger/Payment/PaymentHistory';
import CreateDrive from '../../screens/Driver/CreateDrive/CreateDrive';
import StartLocationDriver from '../../screens/Driver/StartLocationDriver/StartLocationDriver';
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
import Faq from '../../screens/Passenger/Faq/Faq';
import Contribution from '../../screens/Passenger/Contribution/Contribuion';
import Invite from '../../screens/Passenger/Invite/Invite';
import Offers from '../../screens/Passenger/Offers/Offers';
import Reports from '../../screens/Passenger/Reports/Reports';
import BlockedList from '../../screens/Passenger/BlockedList';
import MultiLanguage from '../../screens/Passenger/MultiLanguage';
import SelectRoute from '../../screens/Driver/SelectRoute/SelectRoute';
import AvailableDrivers from '../../screens/AvailableDrivers';
import BookReturnTrip from '../../screens/BookReturnTrip';
import BookingDetails from '../../screens/BookingDetails';
import Favourites from '../../screens/Passenger/Favourites/Favourites';
import AvailablePassenger from '../../screens/Driver/AvailablePassenger/AvailablePassenger';
import DriveStatus from '../../screens/Driver/DriverStatus/DriveStatus';
import UpdateDrive from '../../screens/Driver/UpdateDrive/UpdateDrive';
const Stack = createStackNavigator();
function DriverStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="DriverHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name="DriverHome"
        component={DriverHome}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Favourites"
        component={Favourites}
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
        name="CreateDrive"
        component={CreateDrive}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="StartLocationDriver"
        component={StartLocationDriver}
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
        name="Reports"
        component={Reports}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Offers"
        component={Offers}
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
      <Stack.Screen
        options={{headerShown: false}}
        name="Invite"
        component={Invite}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Contribution"
        component={Contribution}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="BlockedList"
        component={BlockedList}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MultiLanguage"
        component={MultiLanguage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SelectRoute"
        component={SelectRoute}
      />
      <Stack.Screen options={{headerShown: false}} name="Faq" component={Faq} />
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
      <Stack.Screen
        options={{headerShown: false}}
        name="AvailablePassenger"
        component={AvailablePassenger}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DriveStatus"
        component={DriveStatus}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="UpdateDrive"
        component={UpdateDrive}
      />
    </Stack.Navigator>
  );
}
export default DriverStack;
