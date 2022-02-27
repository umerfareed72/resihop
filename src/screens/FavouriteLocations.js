import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../utilities';
import I18n from '../utilities/translations';
import {GetFavLocations} from '../redux/actions/favLocation.actions';
import {
  setOrigin,
  setMapDestination,
  setReturnOrigin,
  setReturnMapDestination,
} from '../redux/actions/map.actions';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
const FavouriteLocations = ({favourteLocationRef, favPress, setFavPress}) => {
  let dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [locations, setLocations] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFocus) {
      dispatch(
        GetFavLocations(setLoading, response => {
          setLocations(response);
        }),
      );
    }
  }, [isFocus]);

  const handleSetStartFav = item => {
    if (favPress === 'startLocation') {
      dispatch(
        setOrigin({
          location: {
            lat: item?.location?.latitude,
            lng: item?.location?.longitude,
          },
          description: item?.location?.description,
        }),
      );

      dispatch(
        setReturnMapDestination({
          location: {
            lat: item?.location?.latitude,
            lng: item?.location?.longitude,
          },
          description: item?.location?.description,
        }),
      );
    }

    if (favPress === 'destination') {
      dispatch(
        setMapDestination({
          location: {
            lat: item?.location?.latitude,
            lng: item?.location?.longitude,
          },
          description: item?.location?.description,
        }),
      );

      dispatch(
        setReturnOrigin({
          location: {
            lat: item?.location?.latitude,
            lng: item?.location?.longitude,
          },
          description: item?.location?.description,
        }),
      );
    }
    if (favPress === 'returndestination') {
      dispatch(
        setReturnMapDestination({
          location: {
            lat: item?.location?.latitude,
            lng: item?.location?.longitude,
          },
          description: item?.location?.description,
        }),
      );
    }

    if (favPress === 'returnstartLocation') {
      dispatch(
        setReturnOrigin({
          location: {
            lat: item?.location?.latitude,
            lng: item?.location?.longitude,
          },
          description: item?.location?.description,
        }),
      );
    }

    favourteLocationRef.current.close();
  };

  return (
    <RBSheet
      ref={favourteLocationRef}
      height={512}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}>
      <Text style={styles.selectTxt}>{I18n.t('select_from_fav_location')}</Text>

      {locations?.length > 0 ? (
        <FlatList
          data={locations}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.line} />}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 10}}
          renderItem={({item}) => (
            <>
              <TouchableOpacity onPress={() => handleSetStartFav(item)}>
                <View style={styles.favTagBtnContainer}>
                  <Text style={styles.tagTxt}>{item?.location?.name}</Text>
                </View>
                <Text style={styles.address}>
                  {item?.location?.description}
                </Text>
              </TouchableOpacity>
            </>
          )}
        />
      ) : (
        <Text style={styles.nofavLocation}>No Favourite Location</Text>
      )}

      <TouchableOpacity
        style={styles.cancelBtnContainer}
        onPress={() => {
          setFavPress('');
          favourteLocationRef?.current?.close();
        }}>
        <Text style={styles.cancelTxt}>{I18n.t('cancel')}</Text>
      </TouchableOpacity>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  selectTxt: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.txtBlack,
    marginTop: 32,
    marginLeft: 24,
  },
  favAddressWrapper: {
    marginTop: 25,
  },
  favTagBtnContainer: {
    height: 28,
    paddingHorizontal: 15,
    backgroundColor: colors.green,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 8,
    marginLeft: 24,
  },
  tagTxt: {
    fontSize: 14,
    lineHeight: 18,
    color: colors.white,
  },
  line: {
    borderWidth: 1,
    borderColor: colors.lineGray,
    marginVertical: 18,
  },
  address: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.inputTxtGray,
    marginLeft: 24,
    maxWidth: '90%',
  },
  cancelBtnContainer: {
    height: 56,
    width: '75%',
    backgroundColor: colors.txtBlack,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 33,
  },
  cancelTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
  nofavLocation: {
    fontSize: 16,
    lineHeight: 20,
    color: colors.black,
    textAlign: 'center',
  },
});

export default FavouriteLocations;
