import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "./invoiceSlice";

export const store = configureStore({
  reducer: {
    invoice: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
