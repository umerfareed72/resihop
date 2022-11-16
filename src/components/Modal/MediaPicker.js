import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {BottomSheet, Button, Text} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {Icon} from 'react-native-elements/dist/icons/Icon';
import {theme} from '../../theme';
import I18n from '../../utilities/translations';
import {Alert} from 'react-native';
const MediaPicker = ({show = false, onClosePress, onImageSelected}) => {
  const options = {
    mediaType: 'photo',
    compressImageQuality: 0.8,
  };
  const onGalleryPressed = () => {
    launchImageLibrary(options, response => {
      if (response.assets !== undefined) {
        return onImageSelected(response.assets[0]);
      } else {
        return undefined;
      }
    });
  };

  const onCameraPressed = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(options, response => {
          if (response.assets !== undefined) {
            return onImageSelected(response.assets[0]);
          } else {
            return undefined;
          }
        });
      } else {
        Alert.alert('Error', 'Camera permission denied!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.con}>
      {/* the white sheet */}
      <BottomSheet
        isVisible={show}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
        <View
          style={{
            backgroundColor: theme.colors.white,
            paddingBottom: 10,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => onCameraPressed()}>
              <Icon
                name={'camera'}
                type={'entypo'}
                color={theme.colors.primary}
                reverseColor={theme.colors.white}
                reverse
                size={30}
                containerStyle={{
                  width: 100,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <Text style={theme.Text.h3Bold}>{I18n.t('camera')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => onGalleryPressed()}>
              <Icon
                name={'images'}
                type={'font-awesome-5'}
                color={theme.colors.primary}
                reverseColor={theme.colors.white}
                reverse
                size={30}
                containerStyle={{
                  width: 100,
                  height: 80,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <Text style={theme.Text.h3Bold}>{I18n.t('gallery')}</Text>
            </TouchableOpacity>
          </View>

          <Button
            title={'Cancel'}
            onPress={onClosePress}
            buttonStyle={[
              theme.Button.buttonStyle,
              {backgroundColor: theme.colors.black},
            ]}
            titleStyle={[theme.Button.titleStyle]}
            disabledTitleStyle={theme.Button.disabledTitleStyle}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default MediaPicker;

const styles = StyleSheet.create({
  con: {
    paddingVertical: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
