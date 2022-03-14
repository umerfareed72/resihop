import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {appImages, colors} from '../utilities';
import {fonts} from '../theme/theme';
import I18n from '../utilities/translations';
import {useSelector, useDispatch} from 'react-redux';
import {CreateDriveRequest, SearchRides} from '../redux/actions/map.actions';
import moment from 'moment';

const SelectRouteCard = ({setModal, setHeight, onPressCreateDrive}) => {
  let dispatch = useDispatch();
  const [data, setData] = useState([1, 2, 3, 4]);

  const distanceAndTime = useSelector(state => state.map.distanceAndTime);
  const routes = useSelector(state => state.map.all_routes);
  const availableSeats = useSelector(state => state.map.availableSeats);
  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);
  const searchRideResponse = useSelector(state => state.map.searchRideResponse);

  useEffect(() => {
    let array = [];
    setHeight(Dimensions.get('screen').height - 320);
    for (let i = 0; i < availableSeats; i++) {
      array[i] = i + 1;
    }
    setData(array);
    dispatch(
      SearchRides({
        startLocation: [origin?.location.lat, origin?.location.lng],
        destinationLocation: [
          destinationMap?.location.lat,
          destinationMap?.location.lng,
        ],
      }),
    );
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.detail}>
        {`${distanceAndTime?.duration} (${distanceAndTime?.distance}) | ${searchRideResponse?.length} Passengers`}
      </Text>
      <View style={styles.addressContainer}>
        <Text style={styles.addressTxt}>{origin?.description}</Text>
        <View style={styles.addressCircle} />
      </View>
      <View style={[styles.addressContainer, {marginTop: 21}]}>
        <Text style={styles.addressTxt}>{destinationMap?.description}</Text>
        <View style={styles.addressSquare} />
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateTxt}>
          {moment(routes?.date).format('DD MMM') == 'Invalid date'
            ? ''
            : moment(routes?.date).format('DD MMM')}{' '}
          {moment(routes?.date).format('hh:mm') == 'Invalid date'
            ? ''
            : moment(routes?.date).format('hh:mm')}
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {data.map(() => (
            <Image
              source={appImages.seatGreen}
              resizeMode="contain"
              style={styles.green}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={onPressCreateDrive}>
        <Text style={styles.btnTxt}>{I18n.t('select_route')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectRouteCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  addressContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    marginTop: 23,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  addressTxt: {
    fontSize: 13,
    lineHeight: 20,
    paddingLeft: 40,
    fontFamily: fonts.regular,
    color: colors.txtBlack,
  },
  addressCircle: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    backgroundColor: colors.green,
    position: 'absolute',
    left: 13,
  },
  addressSquare: {
    height: 16,
    width: 16,
    borderRadius: 5,
    backgroundColor: colors.blue,
    position: 'absolute',
    left: 13,
  },
  detail: {
    fontFamily: fonts.regular,
    fontSize: 18,
    lineHeight: 38,
    color: colors.txtBlack,
    marginHorizontal: 21,
    marginTop: 20,
  },
  green: {
    height: 25,
    width: 18,
    marginLeft: 9,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  dateTxt: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 30,
    color: colors.txtBlack,
  },
  btnContainer: {
    height: 56,
    width: 300,
    backgroundColor: colors.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
  },
  btnTxt: {
    fontFamily: fonts.bold,
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
});
