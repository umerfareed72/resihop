import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '../utilities';
import I18n from '../utilities/translations';
import {AddFavLocation} from '../redux/actions/favLocation.actions';
import {useDispatch, useSelector} from 'react-redux';

const AddFavrouteLocation = ({
  addfavrouiteAddressRef,
  setfavName,
  favName,
  modalName,
}) => {
  let dispatch = useDispatch();

  const origin = useSelector(state => state.map.origin);
  const destinationMap = useSelector(state => state.map.destination);
  const user = useSelector(state => state.auth.userdata);

  const handleAddFavLocation = item => {
    const body = {
      type: 'LOCATION',
      user: {
        _id: user.user.id,
      },
      location: {
        latitude:
          modalName === 'startLocation'
            ? origin.location.lat
            : destinationMap.location.lat,
        longitude:
          modalName === 'startLocation'
            ? origin.location.lng
            : destinationMap.location.lng,
        name: favName,
        description:
          modalName === 'startLocation'
            ? origin.description
            : destinationMap.description,
      },
    };

    dispatch(
      AddFavLocation(body, response => {
        alert('Location added as favourite');
      }),
    );
    addfavrouiteAddressRef.current.close();
    setfavName('');
  };

  return (
    <RBSheet
      ref={addfavrouiteAddressRef}
      height={329}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(16,16,16,0.5)',
        },
        container: {
          borderTopRightRadius: 35,
          borderTopLeftRadius: 35,
        },
      }}>
      <Text style={styles.addfavTxt}>{I18n.t('add_to_fav_location')}</Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.favAddressBtn}>
          <Text style={styles.favBtnTxt}>{I18n.t('home')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favAddressBtn}>
          <Text style={styles.favBtnTxt}>{I18n.t('office')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favAddressBtn}>
          <Text style={styles.favBtnTxt}>{I18n.t('other')}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Add name (Optional)"
        placeholderTextColor={colors.btnGray}
        value={favName}
        onChangeText={setfavName}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => handleAddFavLocation()}>
        <Text style={styles.saveTxt}>{I18n.t('save')}</Text>
      </TouchableOpacity>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  addfavTxt: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.txtBlack,
    marginTop: 31,
    marginLeft: 22,
  },
  favAddressBtn: {
    height: 32,
    paddingHorizontal: 20,
    backgroundColor: colors.green,
    alignSelf: 'flex-start',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    marginLeft: 22,
    marginTop: 30,
  },
  favBtnTxt: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.white,
  },
  input: {
    height: 53,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    width: '80%',
    marginLeft: 23,
    borderRadius: 10,
    paddingLeft: 16,
    marginTop: 32,
  },
  saveBtn: {
    height: 56,
    width: '75%',
    backgroundColor: colors.green,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  saveTxt: {
    fontSize: 16,
    lineHeight: 26,
    color: colors.white,
  },
});

export default AddFavrouteLocation;
