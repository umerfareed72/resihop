import React, {useState, useRef} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {
  CustomHeader,
  RecurringRideCard,
  RideFilterModal,
  SortModal,
} from '../../../components';
import {appIcons, appImages, colors} from '../../../utilities';

var TimeList = {
  id: 1,
  title: 'Time',
  items: [
    {id: 1, text: '08:00 to 12:00', status: false},
    {id: 2, text: '08:00 to 12:00', status: false},
    {id: 3, text: '08:00 to 12:00', status: false},
  ],
};

var RideStatusList = {
  id: 1,
  title: 'Ride Status',
  items: [
    {id: 1, text: 'Confirmed', status: false},
    {id: 2, text: 'Waiting for Match', status: false},
    {id: 3, text: 'Matching Done', status: false},
  ],
};

const rideTypeList = {
  id: 4,
  title: 'Ride Type',
  items: [
    {id: 1, text: 'All Rides'},
    {id: 2, text: 'Destination Rides'},
    {id: 3, text: 'Return Rides'},
  ],
};

const DateList = {
  id: 1,
  title: 'Date',
  items: [
    {id: 1, text: '12 June'},
    {id: 2, text: '13 June'},
    {id: 3, text: '14 June'},
    {id: 4, text: '15 June'},
    {id: 5, text: '16 June'},
  ],
};

const seatsList = {
  id: 5,
  title: 'Seat',
  items: [
    {id: 1, icon: appImages.seatBlue},
    {id: 2, icon: appImages.seatBlue},
    {id: 3, icon: appImages.seatBlue},
    {id: 4, icon: appImages.seatBlue},
    {id: 5, icon: appImages.seatBlue},
    {id: 6, icon: appImages.seatBlue},
  ],
};

function index(props) {
  const filterModalRef = useRef(null);
  const sortModalRef = useRef(null);

  const [time, settime] = useState('');
  const [date, setdate] = useState('');
  const [ridetype, setRideType] = useState('');
  const [status, setStatus] = useState('');
  const [seats, setSeats] = useState('');

  const selectTime = val => {
    settime(val);
  };
  const selectRideStatus = val => {
    setStatus(val);
  };
  const selectRideType = val => {
    setRideType(val);
  };
  const selectSeats = val => {
    setSeats(val);
  };
  const selectdDate = val => {
    setdate(val);
  };
  const resetFilter = () => {
    settime('');
    setdate('');
    setRideType('');
    setSeats('');
    setStatus('');
  };

  const onPress = () => {};

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
        <CustomHeader
          onPressbtnImage={() => sortModalRef.current.open()}
          onPressbtnImage1={() => filterModalRef.current.open()}
          btnImage={appIcons.mobiledata}
          btnImage1={appIcons.filter}
          title={'My Recurring Rides'}
          navigation={props?.navigation}
          backButton={true}
        />
        <View style={{flex: 1}}>
          <FlatList
            style={{height: '80%'}}
            showsVerticalScrollIndicator={false}
            data={[1, 2]}
            renderItem={() => {
              return (
                <RecurringRideCard
                  onPressCard={() => {
                    props?.navigation?.navigate('DRecurringRideDetail');
                  }}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
      <RideFilterModal
        time={TimeList}
        seats={seatsList}
        rideType={rideTypeList}
        status={RideStatusList}
        date={DateList}
        onPressdate={selectdDate}
        onPressrideType={selectRideType}
        onPressseats={selectSeats}
        onPresstime={selectTime}
        onPressstatus={selectRideStatus}
        show={filterModalRef}
        selectedTime={time}
        selectedDate={date}
        selectedStatus={status}
        selectedRideType={ridetype}
        selectedSeats={seats}
        onPressReset={resetFilter}
        onApply={() => {
          filterModalRef.current.close();
          sortModalRef.current.close();
          props.navigation.navigate('RecurringRideDetail');
        }}
      />
      <SortModal show={sortModalRef} />
    </>
  );
}

export default index;
