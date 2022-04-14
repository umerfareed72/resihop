import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../../utilities';
import I18n from '../../../utilities/translations';

export const CancelRideModal = ({show, onPressCancel, onPressClose}) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        onPress={onPressCancel}
        style={{width: '48%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.modalTitle}>{I18n.t('delete_ride')}</Text>
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 30, color: 'white', paddingBottom: 5}}>|</Text>
      </View>
      <TouchableOpacity
        onPress={onPressClose}
        style={{width: '48%', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.modalText}>{I18n.t('close_modal')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 14,
    color: colors.white,
  },
  modalText: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
});
