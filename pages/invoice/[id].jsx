import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import { useGetInvoiceQuery } from '../../redux/services/InvoiceAPI' 
import Status from '../../components/Status'
// import sendEmail from '../../utils/sendEmail'

const InvoiceDetails = () => {

    const router = useRouter()
    const { id } = router.query
    const { data, isSuccess } = useGetInvoiceQuery()

    let dataM;
    if (isSuccess) {
        dataM = data.invoices.slice(-10)
    }

    //filter query based on id
    let resultInvoice;
    if (isSuccess) {
        resultInvoice = dataM.filter(item => item._id === id)
        console.log(resultInvoice)
    }

    // calculate total price
    let totalPriceArr = []
    let totalPrice = 0
    const products = resultInvoice[0].lineItem.forEach((item) => {
        totalPrice += (item.amount + ((item.gstRate / 100) * item.amount))
        totalPriceArr.push(totalPrice)
    })

    const totalAmount = totalPriceArr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    });

    return (
        <div className='font-sm font-spartan text-lg flex flex-col items-center justify-center max-w-2xl m-auto mt-20 bg-gray-50'>
            <div className='flex font-bold text-sm justify-center items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-700 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <Link href={`/`} className='mt-1'>Go Back</Link>
            </div>
            <div className='w-full mt-10 pl-6 pr-6'>
                <div className='w-[100%] bg-white mb-[1rem] p-[1.5rem] -z-20 rounded drop-shadow-md cursor-pointer transition-all duration-[0.3s] ease-in'>
                    <div className='flex justify-between pr-7 pl-7 items-center text-lg '>
                        <div className='flex justify-center items-center'>
                            <p className='text-gray-400'>Status</p>
                           <Status status={resultInvoice[0].status}/>
                        </div>
                        <div className='space-x-6 justify-end hidden md:flex'>
                            <button className="bg-gray-500 text-sm hover:bg-gray-600 text-white font-bold py-2 px-4  rounded">
                                Send Email
                            </button>
                            <button className="bg-red-500 text-sm hover:bg-red-600 text-white font-bold py-2 px-4  rounded">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-[100%] bg-white mb-[1rem] p-4 -z-20 rounded drop-shadow-md cursor-pointer transition-all duration-[0.3s] ease'>
                    <div className='flex justify-between pr-7 pl-7 items-center text-lg'>
                        <div>
                            <p className='font-bold'>{resultInvoice[0]._id}</p>
                            <p className='font-light text-gray-500'>Bill no: {resultInvoice[0].billNo}</p>
                        </div>
                        <div className='text-gray-500'>{resultInvoice[0].name} </div>
                        <div>
                            <p className='text-gray-500' >Bill Date: <span className='font-bold'> {moment(resultInvoice.billDate).format('DD-MM-YYYY')}</span> </p>
                            <p className='text-gray-500' >Due Date: <span className='font-bold'>{moment(resultInvoice.dueDate).format('DD-MM-YYYY')}</span></p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table className="min-w-full">
                                        <thead className="">
                                            <tr>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    ID
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Product Name
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Amount
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    GST
                                                </th>
                                                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                    Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {resultInvoice[0].lineItem.map((item, i) => {
                                                return (<tr className="border-b" key={i}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item._id.slice(0, 3) + "..." + item._id.slice(-3)}</td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.productName}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.quantity}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.amount}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.gstRate}
                                                    </td>
                                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                        {item.amount + (item.amount * ((item.gstRate) / 100))}
                                                    </td>
                                                </tr>)
                                            })
                                            }
                                        </tbody>
                                    </table>
                                    <div className='flex justify-end pt-3 pr-6 items-center'>
                                        <p className='text-gray-500'>Total: &nbsp;</p>
                                        <p className='font-bold'>{totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='space-x-6 mt-5 justify-center flex md:hidden'>
                        <button className="bg-gray-500 text-sm hover:bg-gray-600 text-white font-bold py-2 px-4  rounded">
                            New Invoice
                        </button>
                        <button className="bg-red-500 text-sm hover:bg-red-600 text-white font-bold py-2 px-4  rounded">
                            Delete
                        </button>
                    </div>
                </div>
                <div className='bg-white w-full drop-shadow-md'>
                   <p className='m-4 mb-7 p-4'><span className='font-bold text-2xl'>Notes: &nbsp;</span> <span className=''>{resultInvoice[0].notes}</span></p>
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetails
