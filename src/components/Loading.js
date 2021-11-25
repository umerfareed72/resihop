import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {theme} from '../theme';

function Loading({}) {
  return (
    <View style={styles.loadingCon}>
      <ActivityIndicator size={'large'} color={theme.colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  loadingCon: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: theme.colors.loadingBgColor,
    alignItems: 'center',
  },
  alert: {
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    width: 250,
    elevation: 4,
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
  message: {
    marginVertical: 8,
  },
});

Loading.options = props => {
  return {
    overlay: {
      interceptTouchOutside: true,
    },
  };
};

export default Loading;
