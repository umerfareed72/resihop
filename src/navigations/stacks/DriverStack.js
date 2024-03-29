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
import Payment from '../../screens/Driver/Payment';
import Help from '../../screens/Passenger/Help/Help';
import Terms from '../../screens/Passenger/Terms/Terms';
import Privacy from '../../screens/Passenger/Privacy/Privacy';
import Settings from '../../screens/Passenger/Settings/Settings';
import AboutUs from '../../screens/Passenger/AboutUs/AboutUs';
import DriverRideHistory from '../../screens/Driver/Rides/DriverRideHistory';
import DriverRideDetail from '../../screens/Driver/Rides/DriverRideDetail';
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
import AvailablePassengerDriver from '../../screens/Driver/AvailablePassenger/AvailablePassenger';
import DriveStatus from '../../screens/Driver/DriverStatus/DriveStatus';
import UpdateDrive from '../../screens/Driver/UpdateDrive/UpdateDrive';
import AddFavourites from '../../screens/Driver/Favourites/AddFavourites';
import DriverCityToCity from '../../screens/Driver/Rides/DriverCityToCity';
import CostPerSeat from '../../screens/CostPerSeat/CostPerSeat';
import AvailablePassengerMap from '../../screens/AvailablePassengerMap/AvailablePassengerMap';
import AvailablePassenger from '../../screens/AvailablePassengerList/AvailablePassengerList';
import DRecurringRides from '../../screens/Driver/DRecurringRides';
import DRecurringRideDetail from '../../screens/Driver/DRecurringRideDetail';

import ChangePhone from '../../screens/Profile/ChangePhone';
import EditProfile from '../../screens/Profile/EditProfile';
import CallNow from '../../screens/CallNow';
import IncomingCall from '../../screens/IncomingCall';

import VehicleInformation from '../../screens/Driver/VehicleInformation/VehcileInformation';

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
        name="DriverCityToCity"
        component={DriverCityToCity}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DriverRideHistory"
        component={DriverRideHistory}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddFavourites"
        component={AddFavourites}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="DriverRideDetail"
        component={DriverRideDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Favourites"
        component={Favourites}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="VehicleInformation"
        component={VehicleInformation}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DriverPayment"
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
        name="CallNow"
        component={CallNow}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="IncomingCall"
        component={IncomingCall}
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
      <Stack.Screen
        options={{headerShown: false}}
        name="CostPerSeat"
        component={CostPerSeat}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DRecurringRides"
        component={DRecurringRides}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DRecurringRideDetail"
        component={DRecurringRideDetail}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="AvailablePassengerMap"
        component={AvailablePassengerMap}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AvailablePassengerDriver"
        component={AvailablePassengerDriver}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChangePhone"
        component={ChangePhone}
      />
    </Stack.Navigator>
  );
}
export default DriverStack;
