import { useState, Fragment } from 'react'
import Router from 'next/router'
const Field = ({ setCount, count, products, setProducts, setLastData, index }) => {

    const [data, setData] = useState({
        productName: "",
        quantity: 0,
        price: 0,
        amount: 0,
        gstRate: 0
    },)

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        if(index == count-1){
            setLastData(data)
        }
    }

    let totalAmount = (data.price)*(data.quantity) + ((data.gstRate / 100))

    return (

        <tbody className=''>
            <tr className="">
                <td className="text-sm text-gray-900 font-light px-[1.1rem] py-4 whitespace-nowrap">
                    {index + 1}
                </td>
                <td className="text-sm text-gray-900 font-light px-[1.1rem] py-4 whitespace-nowrap">

                    <input value={data.productName} name="productName" onChange={handleOnChange} className="w-32 h-10 appearance-none block bg-gray-200 text-gray-700 border border-none rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                </td>
                <td className="text-sm text-gray-900 font-light px-[1.1rem] py-4 whitespace-nowrap">

                    <input value={data.quantity} onChange={handleOnChange} name="quantity" className="appearance-none block w-10 h-10 bg-gray-200 text-gray-700 border border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                </td>
                <td className="text-sm text-gray-900 font-light px-[1.1rem] py-4 whitespace-nowrap">

                    <input value={data.price} onChange={handleOnChange} name="price" className="appearance-none block w-14 h-10 bg-gray-200 text-gray-700 border border-none rounded  mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                </td>
                <td className="text-sm text-gray-900 font-light px-[1.1rem] py-4 whitespace-nowrap">

                    <input value={data.gstRate} onChange={handleOnChange} name="gstRate" className="appearance-none block w-10 h-10 bg-gray-200 text-gray-700 border border-none rounded  mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                </td>
                <td className="flex items-center space-x-7 text-sm text-gray-900 font-light px-[1.1rem] py-4 whitespace-nowrap">
                    {/* Display total */}
                    <span className="text-gray-900 font-light" onChange={()=>setData({amount: totalAmount})}>{totalAmount}</span>
                    <svg onClick={() => setCount(count - 1)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-red-600 transition-all duration-75 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </td>
            </tr>
        </tbody>
    )
}

export default Field
