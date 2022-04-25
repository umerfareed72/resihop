import * as Types from '../types/app.types';
import {get, post} from '../../services';
import {responseValidator} from '../../utilities/helpers';
import {AGORA_CONST} from '../../utilities/routes';
import {header} from '../../utilities';
import {Alert} from 'react-native';

///////////////////////////////////////// Create Agora Channel ////////////////////////////

export const create_agoral_channel = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.app_Loader, payload: true});
    const response = await post(`${AGORA_CONST}/call`, data, await header());
    const responseData = {
      agora_token: response?.data?.rtcToken,
      agora_data: response?.data,
    };
    // if (response?.data?.user?.details) {
    dispatch({
      type: Types.Create_Agora_Channel_Success,
      payload: responseData,
    });
    callBack(response.data);
  } catch (error) {
    console.log('Unable to create agora channel', error?.response?.data);
    let status = error?.response?.data?.statusCode;
    responseValidator(status, 'Something went wrong!');
    dispatch({
      type: Types.Create_Agora_Channel_Failure,
      payload: null,
    });
  }
};
export const accept_call = (data, myData, callBack) => async dispatch => {
  try {
    const res = await post(`${AGORA_CONST}/accept`, data, await header());
    if (res?.data) {
      dispatch({
        type: Types.Create_Agora_Channel_Success,
        payload: myData,
      });
      callBack();
    } else {
      Alert.alert('Error', 'Unable to Pick Call');
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to Pick Call');
  }
};

export const reject_call = (data, myData, callBack) => async dispatch => {
  try {
    const res = await post(`${AGORA_CONST}/reject`, data, await header());
    if (res?.data) {
      dispatch({
        type: Types.Reject_Call_Success,
        payload: myData,
      });
      callBack();
    } else {
      Alert.alert('Error', 'Unable to Reject Call');
    }
  } catch (error) {
    Alert.alert('Error', 'Unable to Reject Call');
  }
};

export const Call_Status = (data, callBack) => async dispatch => {
  try {
    dispatch({
      type: Types.Call_Status,
      payload: data,
    });
    callBack();
  } catch (error) {
    Alert.alert('Error', 'Unable to Reject Call');
  }
};
