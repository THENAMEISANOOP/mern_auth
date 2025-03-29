import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Root reducer
const rootReducer = combineReducers({ user: userReducer });

// Persist configuration
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create persistor
export const persistor = persistStore(store);
