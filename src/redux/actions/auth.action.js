import * as Types from '../types/auth.types';
import {header} from '../../Theme/Constants';
import {post} from '../../Services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responseValidator} from './helper';
import {AUTH_CONST, AUTH_PW_CONST} from '../../Theme/routes';

/////////////////////////////////////////  Login   ////////////////////////////

export const userEmailLogin = (user, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_loader, payload: true});
    const response = await post(`${AUTH_CONST}login`, user);
    AsyncStorage.setItem('usertoken', response.data.result.access_token);
    dispatch({
      type: Types.Login_Success,
      payload: response?.data?.result,
    });
    console.log('Login Successfully', response.data.result.access_token);
    callBack();
  } catch (error) {
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
    dispatch({
      type: Types.Login_Failure,
      payload: null,
    });
  }
};
/////////////////////////////////////////  Logout  ////////////////////////////

export const logout = (token, callBack) => async dispatch => {
  try {
    var form = new FormData();
    form.append('token_value', token);
    const response = await post(`${AUTH_CONST}logout`, form, await header());
    dispatch({
      type: Types.Logout_Success,
      payload: null,
    });
    dispatch({
      type: Types.Logout_Success,
      payload: null,
    });
    if (response) {
      // console.log('Data',response.data.result);
      AsyncStorage.clear();
      callBack();
    }
  } catch (error) {
    console.log('errr', error);
    dispatch({
      type: Types.Logout_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;

    responseValidator(status, msg);
  }
};

/////////////////////////////////////////  Registeration ////////////////////////////

export const userEmailSignup = (user, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_loader, payload: true});
    const response = await post(AUTH_CONST + 'signup', user);
    AsyncStorage.setItem('usertoken', response.data.result.access_token);
    dispatch({
      type: Types.Signup_Success,
      payload: response?.data?.result,
    });
    callBack();
  } catch (error) {
    dispatch({
      type: Types.Signup_Failure,
      payload: null,
    });
    let msg = error.response.data.message;
    let status = JSON.stringify(error.message);
    responseValidator(status, msg);
  }
};

/////////////////////////////////////////Forgot Password////////////////////////////

export const forgotPassword = (user, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_loader, payload: true});
    let email = user.email;
    let FirstEmail = email.split('@');
    let obj = {
      username: FirstEmail[0],
    };
    const response = await post(AUTH_PW_CONST + 'forgot', obj);
    callBack();
    dispatch({
      type: Types.Forgot_Password_Success,
      payload: {code: response.data.result, username: obj.username},
    });
  } catch (error) {
    dispatch({
      type: Types.Forgot_Password_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;

    responseValidator(status, msg);
  }
};

/////////////////////////////////////////Reset Password///////////////////////

export const resetPassword = (user, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_loader, payload: true});
    const response = await post(AUTH_PW_CONST + 'reset', user);
    callBack();
    // console.log(response.data);
    dispatch({
      type: Types.Reset_Password_Success,
      payload: response.data.result,
    });
  } catch (error) {
    dispatch({
      type: Types.Reset_Password_Failure,
      payload: null,
    });
    let status = JSON.stringify(error.message);
    let msg = error.response.data.message;
    responseValidator(status, msg);
  }
};
