import React, {
  Component,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import {SafeAreaView, Text, StyleSheet, View, Image} from 'react-native';
import {CustomHeader} from '../../components/Header/CustomHeader';
import styles from './styles';
import RtcEngine from 'react-native-agora';
import {requestCameraAndAudioPermission} from '../../utilities/helpers/permissions';
import {appIcons, appId, colors, profileIcon} from '../../utilities';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

const index = ({navigation}) => {
  const [channelName, setChannelName] = useState('');
  const [speaker, setSpeaker] = useState(true);
  const [joinsucceed, setJoinSucceed] = useState(false);
  const [peerIds, setPeerIds] = useState([]);
  const rtcEngine = useRef(null);
  const app_reducer = useSelector(state => state.app_reducer);
  console.log(app_reducer);
  //Init Agora
  const initAgora = useCallback(async () => {
    rtcEngine.current = await RtcEngine.create(appId);
    await rtcEngine.current.enableAudio();
    await rtcEngine.current.setEnableSpeakerphone(false);
    await rtcEngine.current.muteLocalAudioStream(false);
    if (requestCameraAndAudioPermission()) {
      _joinChannel();
    }
    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    rtcEngine.current.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      if (peerIds.indexOf(uid) === -1) {
        setPeerIds([...peerIds, uid]);
      }
    });

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    rtcEngine.current.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      setPeerIds(peerIds.filter(id => id !== uid));
    });

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    rtcEngine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        setJoinSucceed(true);
      },
    );
  }, []);
  const _joinChannel = async () => {
    const join = await rtcEngine.current?.joinChannel(
      app_reducer?.agora_info?.agora_token,
      app_reducer?.agora_info?.agora_data?.channel,
      null,
      app_reducer?.agora_info?.agora_data?.uid,
    );
  };
  // Turn the microphone on or off.
  const _switchMicrophone = () => {
    rtcEngine.current
      ?.enableLocalAudio(speaker)
      .then(() => {
        setSpeaker(!speaker);
      })
      .catch(err => {
        console.warn('enableLocalAudio', err);
      });
  };
  const _leaveChannel = async () => {
    await rtcEngine.current?.leaveChannel();
    setPeerIds([]);
    setJoinSucceed(false);
    navigation?.goBack();
  };
  // Switch the audio playback device.
  const _switchSpeakerphone = () => {
    rtcEngine.current
      ?.setEnableSpeakerphone(!speaker)
      .then(() => {
        setSpeaker(!speaker);
      })
      .catch(err => {
        console.warn('setEnableSpeakerphone', err);
      });
  };
  const destroyEngine = useCallback(async () => {
    await rtcEngine.current.destroy();
  }, []);

  useEffect(() => {
    initAgora();
    return () => {
      destroyEngine();
    };
  }, [destroyEngine, initAgora]);
  return (
    <>
      <CustomHeader
        headerColor={colors.lightGreen}
        navigation={navigation}
        barColor={colors.lightGreen}
        backButton={true}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.view1}>
            <Image style={styles.imageStyle} source={{uri: profileIcon}} />
            <Text style={styles.username}>Umer Fareed</Text>
            <Text style={styles.ringingText}>
              {joinsucceed ? 'Connected' : 'Ringing'}
            </Text>
          </View>
          <View style={styles.card_container}>
            <View style={styles.innerContainer}>
              {!speaker ? (
                <TouchableOpacity onPress={_switchSpeakerphone}>
                  <Image style={styles.icon25} source={appIcons.speaker} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={_switchMicrophone}>
                  <Image style={styles.icon25} source={appIcons.microphone} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.btnContainer}
                onPress={_leaveChannel}>
                <Image style={styles.icon45} source={appIcons.phone} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default index;
