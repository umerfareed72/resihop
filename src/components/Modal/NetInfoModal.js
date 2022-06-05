import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import I18n from '../../utilities/translations';
export const NetInfoModal = ({show, onRetry, isRetrying}) => {
  const Button = ({children, ...props}) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal isVisible={show} style={styles.modal} animationInTiming={600}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>{I18n.t('connection_error')}</Text>
        <Text style={styles.modalText}>{I18n.t('error_description')}</Text>
        <Button onPress={onRetry} disabled={isRetrying}>
          {I18n.t('try_again')}
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});
