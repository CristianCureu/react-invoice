import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Invoice } from "../types/invoiceTypes";

interface InvoiceState {
  selectedInvoice: Invoice | null;
  isModalOpen: boolean;
}

const initialState: InvoiceState = {
  selectedInvoice: null,
  isModalOpen: false,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    setSelectedInvoice(state, action: PayloadAction<Invoice | null>) {
      state.selectedInvoice = action.payload;
    },
    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
  },
});

export const { setSelectedInvoice, toggleModal, closeModal } = invoiceSlice.actions;
export default invoiceSlice.reducer;
