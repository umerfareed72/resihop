import {createStore, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';
import RootReducer from '../reducers/rootReducer';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'],
};
const persistedReducer = persistReducer(persistConfig, RootReducer);

var store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
let persistor = persistStore(store);

export {store, persistor};
