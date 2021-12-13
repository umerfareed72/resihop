import * as Types from '../types/auth.types';
import {header} from '../../utilities/constants';
import {post} from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responseValidator} from '../../utilities/helpers';
import {AUTH_CONST, AUTH_PW_CONST} from '../../utilities/routes';

/////////////////////////////////////////  Login   ////////////////////////////

export const userEmailLogin = (body, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_loader, payload: true});
    const response = await post(`auth/local`, body);
    AsyncStorage.setItem('usertoken', response.data.jwt);
    dispatch({
      type: Types.Login_Success,
      payload: response?.data,
    });
    console.log('Login Successfully', response.data);
    callBack(response.data);
  } catch (error) {
    let status = error.name;
    let msg = error.message;
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

export const userEmailSignup = (body, callBack) => async dispatch => {
  try {
    dispatch({type: Types.Set_loader, payload: true});
    console.log('body-', body);
    await post(`${AUTH_CONST}register`, body)
      .then(response => {
        console.log('Res------->', response);
        AsyncStorage.setItem('usertoken', response?.data?.jwt);
        dispatch({
          type: Types.Signup_Success,
          payload: response?.data,
        });
        callBack(response?.data);
      })
      .catch(err => {
        console.log('Error------->', JSON.stringify(err));
        dispatch({
          type: Types.Signup_Failure,
          payload: null,
        });
        let msg = err.message;
        let status = err.name;
        responseValidator(msg, status);
      });
  } catch (error) {
    console.log('Error:', JSON.stringify(error));
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
