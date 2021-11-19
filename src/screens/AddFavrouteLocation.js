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

const AddFavrouteLocation = ({addfavrouiteAddressRef}) => {
  const [name, setName] = useState('');

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
      <Text style={styles.addfavTxt}>Add to Favorite Locations List</Text>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.favAddressBtn}>
          <Text style={styles.favBtnTxt}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favAddressBtn}>
          <Text style={styles.favBtnTxt}>Office</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favAddressBtn}>
          <Text style={styles.favBtnTxt}>Other</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Add name (Optional)"
        placeholderTextColor={colors.btnGray}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveTxt}>Save</Text>
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
