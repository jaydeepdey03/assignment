import React from 'react'

const Modal = () => {

    return (
        <>
            <Dialog as="div" open={isOpen} onClose={setIsOpen} className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto" >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500/70" />
                <div className='bg-gray-100 max-w-2xl mx-auto relative rounded shadow-2xl'>
                    <h1 className='font-bold text-3xl p-5'>Add Invoice</h1>
                    <div className='p-10 h-full overflow-scroll '>
                        <form className="w-full max-w-lg">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md mt-4 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        Name
                                    </label>
                                    <input name="name" value={data.name} onChange={handleOnChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                                </div>

                                <div className="w-full mt-4 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        Due Date
                                    </label>
                                    <input value={data.dueDate} onChange={handleOnChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="date" placeholder="" />
                                </div>
                                <div className="w-full mt-4 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                        Notes
                                    </label>
                                    <textarea value={data.notes} onChange={handleOnChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" ></textarea>
                                </div>

                            </div>
                            <h1 className='font-bold text-2xl mt-10 mb-4 flex justify-center items-center text-gray-600'>Item List</h1>
                            <table className="min-w-full ">
                                <thead className="bg-gray-200">
                                    <tr className=''>
                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Item
                                        </th>
                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Total
                                        </th>
                                    </tr>
                                </thead>

                                {arr.map(() => {
                                    return (
                                        <tbody className=''>
                                            <tr className="">
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    1.
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                                    <input className="w-52 appearance-none block bg-gray-200 text-gray-700 border border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-none rounded py-3 px-5 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                                                </td>
                                                <td onClick={() => setCount(count - 1)} className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-red-600 transition-all duration-75 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                            <div className="w-[70h] mt-5 m-auto">

                            </div>

                        </form>
                        <button onSubmit={handleSubmit} onClick={() => setCount(count + 1)} className="bg-gray-500 w-full text-sm hover:bg-gray-600 text-white font-bold py-2 px-4  rounded">New Field</button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Modal
