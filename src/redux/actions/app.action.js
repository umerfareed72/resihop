import * as Types from '../types/app.types';
import {get} from '../../services';
import {responseValidator} from '../../utilities/helpers';
import {AGORA_CONST} from '../../utilities/routes';
import {header} from '../../utilities';

///////////////////////////////////////// Create Agora Channel ////////////////////////////

export const create_agoral_channel = (data, callBack) => async dispatch => {
  try {
    dispatch({type: Types.app_Loader, payload: true});
    const response = await get(
      `${AGORA_CONST}/rtc/${data?.channel}/${data?.role}/${data?.tokentype}/${data?.uid}`,
      await header(),
    );
    const responseData = {
      agora_token: response?.data?.rtcToken,
      agora_data: data,
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
    responseValidator(
      status,
      error?.response?.data?.message[0]?.messages[0]?.message,
    );
    dispatch({
      type: Types.Create_Agora_Channel_Failure,
      payload: null,
    });
  }
};
