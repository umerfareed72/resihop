import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {theme} from '../theme';
import WebView from 'react-native-webview';
import {Icon} from 'react-native-elements';
import Loading from './Loading';

const BankWebView = ({setBankView}) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.root}>
      {!loading && (
        <TouchableOpacity onPress={() => setBankView(false)}>
          <Icon
            name={'close'}
            style={{padding: 10, alignSelf: 'flex-start', marginTop: 10}}
          />
        </TouchableOpacity>
      )}

      <WebView
        style={styles.webview}
        textZoom={120}
        startInLoadingState={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        renderLoading={() => <Loading />}
        source={{
          uri: 'http://resihopapi-932484168.eu-north-1.elb.amazonaws.com/',
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.white,
  },

  webview: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

BankWebView.options = props => {
  return {
    overlay: {
      interceptTouchOutside: true,
    },
  };
};
export default BankWebView;
