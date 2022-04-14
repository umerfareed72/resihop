import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {colors} from '../../../utilities';
import I18n from '../../../utilities/translations';

const CopyRideModal = ({
  modalVisible,
  setModalVisible,
  handleCopyRide,
  title,
}) => {
  return (
    <>
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={{margin: 20, textAlign: 'center'}}>{title}</Text>
            <View style={styles.btnMainContainer}>
              <TouchableOpacity
                style={styles.yesBtnContainer}
                onPress={() => handleCopyRide()}>
                <Text style={{color: colors.white}}>{I18n.t('yes')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtnContainer}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: colors.black}}>{I18n.t('cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export {CopyRideModal};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  btnMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yesBtnContainer: {
    padding: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    borderBottomLeftRadius: 10,
  },
  cancelBtnContainer: {
    padding: 10,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomRightRadius: 10,
  },
});
