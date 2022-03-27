import * as Types from '../types/auth.types';
import {get, post, put} from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responseValidator} from '../../utilities/helpers';
import {AUTH_CONST, AUTH_PW_CONST} from '../../utilities/routes';
import {header} from '../../utilities';

/////////////////////////////////////////  Login   ////////////////////////////

export const userEmailLogin =
  (body, mydata, setIsLoading, callBack) => async dispatch => {
    console.log('BODY', body);
    try {
      dispatch({type: Types.Set_loader, payload: true});
      const response = await post(`auth/local`, body);
      // if (response?.data?.user?.details) {
      AsyncStorage.setItem('usertoken', response.data.jwt);
      // }
      const responseData = {
        login_data: response?.data,
        country_data: mydata,
      };
      dispatch({
        type: Types.Login_Success,
        payload: responseData,
      });
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
  (body, mydata, setIsLoading, callBack) => async dispatch => {
    try {
      dispatch({type: Types.Set_loader, payload: true});
      await post(`${AUTH_CONST}register`, body)
        .then(response => {
          setIsLoading(false);
          AsyncStorage.setItem('usertoken', response?.data?.jwt);
          const responseData = {
            login_data: response?.data,
            country_data: mydata,
          };

          dispatch({
            type: Types.Signup_Success,
            payload: responseData,
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
export const updateInfo =
  (userId, user, onSuccess, onFailure) => async dispatch => {
    try {
      const responseData = await put(`users/${userId}`, user, await header());
      dispatch({
        type: Types.Info_Success,
        payload: responseData?.data,
      });
      onSuccess(responseData?.data);
    } catch (error) {
      onFailure(error);
      dispatch({
        type: Types.Info_Failure,
        payload: null,
      });
      let status = error?.response?.data?.statusCode;
      console.log(error?.response?.data);
      responseValidator(
        status,
        error?.response?.data?.message[0]?.messages[0]?.message ||
          error?.data?.message,
      );
    }
  };
export const LanguageInfo = (lang, callBack) => async dispatch => {
  dispatch({
    type: Types.Language_Success,
    payload: lang,
  });
  callBack();
};
export const SwitchDrive = (data, callBack) => async dispatch => {
  dispatch({
    type: Types.Switch_Driver,
    payload: data?.switching,
  });
  callBack();
};
export const isVehcile = (data, callBack) => async dispatch => {
  dispatch({
    type: Types.Is_Vehicle,
    payload: data,
  });
  callBack();
};

export const getProfileInfo =
  (userId, onSuccess, onFailure) => async dispatch => {
    try {
      const responseData = await get(`users/${userId}`, await header());
      dispatch({
        type: Types.Get_Profile_Success,
        payload: responseData?.data,
      });
      onSuccess();
    } catch (error) {
      onFailure(error);
      dispatch({
        type: Types.Get_Profile_Failure,
        payload: null,
      });
      console.log(error?.response?.data);
      let status = error?.response?.data?.statusCode;
      responseValidator(
        status,
        error?.response?.data?.message[0]?.messages[0]?.message,
      );
    }
  };
