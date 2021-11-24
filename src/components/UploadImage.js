import React, {useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import _ from 'lodash/string';

import {theme} from '../theme';
import {Avatar, Icon, Text} from 'react-native-elements';
import {
  CAMERA_PERMISSION_TEXT,
  upload_profile_picture_text,
} from '../theme/strings';
import {permissions_types} from '../utilities';
import MediaPicker from './Modal/MediaPicker';

const UploadImage = ({getPicUri}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [isCameraPermitted, setIsCameraPermitted] = useState(true);

  const onDeniedPressed = () => {
    hideAlert();
    showToast('profile image is require please upload');
  };
  const onAllowPressed = () => {
    checkAndGrantPermission(permissions_types['camera'])
      .then(_res => {
        //open up the bottomSheet picker
        setShowPicker(!showPicker);
      })
      .catch(_err => {
        console.log(_err);
      });
  };
  return (
    <>
      <TouchableOpacity
        style={styles.uploadingCon}
        onPress={() => {
          isCameraPermitted
            ? setShowPicker(!showPicker)
            : Alert.alert(
                'Alert',
                CAMERA_PERMISSION_TEXT,
                [
                  {
                    text: 'Allow',
                    onPress: () => onAllowPressed(),
                  },
                  {text: 'Denied', onPress: () => onDeniedPressed()},
                ],
                {cancelable: false},
              );
        }}>
        <View style={styles.imgBtn}>
          {profilePic ? (
            <Avatar source={{uri: profilePic.uri}} size={'large'} rounded />
          ) : (
            <Icon
              name={'adduser'}
              type={'antdesign'}
              size={40}
              color={theme.colors.grey}
            />
          )}
        </View>
        <Text style={theme.Text.h2Bold}>
          {_.startCase(upload_profile_picture_text)}
        </Text>
      </TouchableOpacity>
      <MediaPicker
        show={showPicker}
        onImageSelected={asset => {
          if (asset) {
            setProfilePic(asset);
            getPicUri(asset);
          }
          setShowPicker(!showPicker);
        }}
        onClosePress={() => {
          setShowPicker(!showPicker);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  uploadingCon: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  imgBtn: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
    borderRadius: 40,
    marginHorizontal: 10,
  },
});

export default UploadImage;
