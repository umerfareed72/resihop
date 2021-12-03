import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Header} from '../../components';
import {theme} from '../../theme';
import {Text, Icon, Button} from 'react-native-elements';
import MediaPicker from '../../components/Modal/MediaPicker';

const UploadImageBrick = ({title, onPress, pic}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          height: 200,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme.colors.borderColor,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        {pic ? (
          <Image
            source={{uri: pic.uri}}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
              borderRadius: 10,
            }}
          />
        ) : (
          <Icon
            name={'camera'}
            type={'entypo'}
            color={theme.colors.primary}
            reverse
            size={30}
            containerStyle={{
              width: 100,
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}
      </View>
      <Text style={[theme.Text.h4Normal, {textAlign: 'center'}]}>
        ({title})
      </Text>
    </TouchableOpacity>
  );
};

const UploadLicence = () => {
  const [picFront, setPicFront] = useState();
  const [picBack, setPicBack] = useState();
  const [picType, setPicType] = useState(0);
  const [pickerVisible, setPickerVisible] = useState(false);

  const controlPicker = picType => {
    picType === 'front' ? setPicType(0) : setPicType(1);
    setPickerVisible(!pickerVisible);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header leftAction={() => props.navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}>
        <Text style={[theme.Text.h1Bold, {marginVertical: 10}]}>
          Upload Driving Licence
        </Text>
        <UploadImageBrick
          title={'Front Side'}
          pic={picFront}
          onPress={() => controlPicker('front')}
        />
        <UploadImageBrick
          title={'Back Side'}
          pic={picBack}
          onPress={() => controlPicker('back')}
        />
        <Button
          title={I18n.t('next')}
          onPress={() => {
            // Navigation.push(AUTH_NAV_ID, PersonalDetailScreen);
            // controlIsDriver(true);
            // controlHasLicense(true);
            // Navigation.pop(HOME_NAV_ID);
          }}
          disabled={!picFront && !picBack}
          icon={
            <Icon
              name={'arrowright'}
              type={'antdesign'}
              style={{marginRight: 20}}
              color={theme.colors.white}
            />
          }
          iconPosition={'right'}
          buttonStyle={[
            theme.Button.buttonStyle,
            {justifyContent: 'space-between'},
          ]}
          titleStyle={[theme.Button.titleStyle, {paddingLeft: 20}]}
          disabledTitleStyle={theme.Button.disabledTitleStyle}
          containerStyle={{
            width: '100%',
            alignSelf: 'center',
            marginTop: 20,
          }}
        />
      </ScrollView>
      <MediaPicker
        show={pickerVisible}
        onClosePress={() => {
          setPickerVisible(!pickerVisible);
        }}
        onImageSelected={asset => {
          picType === 0 ? setPicFront(asset) : setPicBack(asset);
          setPickerVisible(!pickerVisible);
        }}
      />
    </View>
  );
};

export default UploadLicence;
