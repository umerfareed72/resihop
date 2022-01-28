import * as Types from '../types/auth.types';
import {post} from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responseValidator} from '../../utilities/helpers';
import {AUTH_CONST, AUTH_PW_CONST} from '../../utilities/routes';

/////////////////////////////////////////  Login   ////////////////////////////

export const userEmailLogin =
  (body, setIsLoading, callBack) => async dispatch => {
    console.log('BODY', body);
    try {
      dispatch({type: Types.Set_loader, payload: true});
      const response = await post(`auth/local`, body);
      // if (response?.data?.user?.details) {
      AsyncStorage.setItem('usertoken', response.data.jwt);
      // }
      dispatch({
        type: Types.Login_Success,
        payload: response?.data,
      });
      console.log('Login Successfully', response.data);
      callBack(response.data);
    } catch (error) {
      setIsLoading(false);
      let status = error?.response?.data?.statusCode;
      responseValidator(
        status,
        error?.response?.data?.message[0]?.messages[0]?.message,
      );
      dispatch({
        type: Types.Login_Failure,
        payload: error,
      });
    }
  };
/////////////////////////////////////////  Logout  ////////////////////////////

export const logout = callBack => async dispatch => {
  try {
    dispatch({
      type: Types.Logout_Success,
      payload: null,
    });
    AsyncStorage.clear();
    callBack(null);
  } catch (error) {
    dispatch({
      type: Types.Logout_Failure,
      payload: null,
    });
  }
};

/////////////////////////////////////////  Registeration ////////////////////////////

export const userEmailSignup =
  (body, setIsLoading, callBack) => async dispatch => {
    try {
      dispatch({type: Types.Set_loader, payload: true});
      await post(`${AUTH_CONST}register`, body)
        .then(response => {
          setIsLoading(false);
          AsyncStorage.setItem('usertoken', response?.data?.jwt);
          dispatch({
            type: Types.Signup_Success,
            payload: response?.data,
          });
          callBack(response?.data);
        })
        .catch(err => {
          setIsLoading(false);
          dispatch({
            type: Types.Signup_Failure,
            payload: null,
          });
          let status = error?.response?.data?.statusCode;
          responseValidator(
            status,
            error?.response?.data?.message[0]?.messages[0]?.message,
          );
        });
    } catch (error) {
      console.log('Error:', JSON.stringify(error));
      alert('Something went wrong');
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
    let status = error?.response?.data?.statusCode;
    responseValidator(
      status,
      error?.response?.data?.message[0]?.messages[0]?.message,
    );
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
    let status = error?.response?.data?.statusCode;
    responseValidator(
      status,
      error?.response?.data?.message[0]?.messages[0]?.message,
    );
  }
};
export const updateInfo = user => async dispatch => {
  dispatch({
    type: Types.Info_Success,
    payload: user,
  });
};
