import {combineReducers} from 'redux';
import auth from './auth';
import map from './map';
<<<<<<< HEAD
import favLocation from './favLocation';
=======
import payment from './payment';

>>>>>>> 98f977ddd21508533c5fc0f300773799452a51bd
import * as Types from '../types/auth.types';

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  auth: auth,
  map: map,
<<<<<<< HEAD
  favLocation: favLocation,
=======
  payment: payment,
>>>>>>> 98f977ddd21508533c5fc0f300773799452a51bd
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  // if (action.type === Types.Logout_Success) {
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default rootReducer;
