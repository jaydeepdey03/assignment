import React from 'react'

const Status = ({status}) => {
    return (
        <>
            <div className='flex justify-center items-center'>
                <div className={`${status == "Due" || "due  " ? "bg-yellow-50": "bg-green-50"} py-1 px-7 mx-4 flex justify-center items-center rounded cursor-pointer `}>
                    <h1 className={`h-2 w-2 mr-2 rounded-full ${status == "Due" || "due  " ? "bg-yellow-400": "bg-green-400"}`}></h1>
                    <span className={`${status == "Due" || "due  " ? "text-yellow-400": "text-green-400"} font-semibold mt-1`}>{status == "Due" || "due  "? "Due": "Paid"}</span>
                </div>
            </div>
        </>
    )
}

export default Status
