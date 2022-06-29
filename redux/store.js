import { configureStore } from "@reduxjs/toolkit";
import { invoiceApi } from "./services/InvoiceAPI";


export const store = configureStore({
    reducer: {
        [invoiceApi.reducerPath]: invoiceApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(invoiceApi.middleware),
})