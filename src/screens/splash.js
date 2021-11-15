import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {app_logo} from '../assets';

function splash(props) {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate("LanguageSelect")
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={app_logo} resizeMode={'contain'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default splash;
