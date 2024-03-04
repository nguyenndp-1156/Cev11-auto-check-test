import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

export const makeConfiguredStore = () => {
  return configureStore({
    reducer: {},
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeConfiguredStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeConfiguredStore);
