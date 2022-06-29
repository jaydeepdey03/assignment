import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const invoiceApi = createApi({
    name: "invoice",
    reducerPath: 'invoiceApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://rscdev.taxadda.com/api/invoice/',
    }),
    endpoints: (builder) => ({
        getInvoice: builder.query({
            query: () => 'list',
        }),
        addInvoice: builder.mutation({
            query: (invoice)=> ({
                url: "add",
                method: "POST",
                body: invoice,
            }),
        })
        
    }),
})


export const { useGetInvoiceQuery,  useAddInvoiceMutation } = invoiceApi