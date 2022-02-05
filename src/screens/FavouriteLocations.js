import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../utilities';
import I18n from '../utilities/translations';
import {GetFavLocations} from '../redux/actions/favLocation.actions';
import {useDispatch} from 'react-redux';

const FavouriteLocations = ({favourteLocationRef}) => {
  let dispatch = useDispatch();

  const [locations, setLocations] = useState();
  const [loading, setLoading] = useState(false);

  const data = [
    {
      id: 1,
      tag: 'Home',
      address: '123 abc apartment abc street abc abc city, abc country',
    },
    {
      id: 2,
      tag: 'Office',
      address: '123 abc apartment abc street abc abc city, abc country',
    },
    {
      id: 3,
      tag: 'Gym',
      address: '123 abc apartment abc street abc abc city, abc country',
    },
  ];

  useEffect(() => {
    dispatch(
      GetFavLocations(setLoading, response => {
        console.log(response);
      }),
    );
  }, []);

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.selectTxt}>
          {I18n.t('select_from_fav_location')}
        </Text>
        <View style={styles.favAddressWrapper}>
          {data.map(item => (
            <View key={item.id}>
              <TouchableOpacity style={styles.favTagBtnContainer}>
                <Text style={styles.tagTxt}>{item.tag}</Text>
              </TouchableOpacity>
              <Text style={styles.address}>{item.address}</Text>
              {item.id < data.length && <View style={styles.line} />}
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.cancelBtnContainer}
          onPress={() => {
            favourteLocationRef.current.close();
          }}>
          <Text style={styles.cancelTxt}>{I18n.t('cancel')}</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginTop: 33,
  },
  cancelTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
});

export default FavouriteLocations;
