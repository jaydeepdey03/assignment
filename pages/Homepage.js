import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Field from '../components/Field'
import { useAddInvoiceMutation, useGetInvoiceQuery } from '../redux/services/InvoiceAPI'
import moment from 'moment'
import Status from '../components/Status'
import Link from 'next/link'
import Router from 'next/router'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Homepage = () => {

    // usestates
    const [isOpen, setIsOpen] = useState(false)
    const [count, setCount] = useState(1)

    const [invoice, setInvoice] = useState(
        {
            name: "",
            dueDate: moment(Date.now()).format('YYYY-MM-DD'),
            billNo: 1,
            billDate: Date.now(),
            grossAmount: 1000,
            gstAmount: 50,
            netAmount: 1050,
            notes: "",
            status: "Due",
        }
    )

    const [products, setProducts] = useState(
       [ {
            productName: "Samsung phone",
            quantity: 2,
            price: 1000,
            amount: 2000,
            gstRate: 5
        },])

    const [lastData, setLastData] = useState(null)

    // ends


    useEffect(() => {
        setInvoice({ ...invoice, products: products })
    }, [products])

    const handleOnChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value })
    }

    const [addInvoice, {isLoading, error}] = useAddInvoiceMutation()

    async function handleSubmit(e) {
        e.preventDefault(); 
        products.push(lastData)
        const data = {...invoice, lineItem: products}
        console.log(data)

        try{
            const response = await addInvoice(data).unwrap()
            console.log(response)
            Router.reload()
        }
        catch(err){
            console.error(err)
        }

        setIsOpen(false)
    }

    
    const { data, isSuccess } = useGetInvoiceQuery()
    
    let dataM;
    if (isSuccess) {
        dataM = data.invoices.slice(-10)
    }

    // console.log(dataM)


    return (isSuccess && (
        <div className='font-sm font-spartan text-lg flex flex-col items-center justify-center max-w-2xl m-auto mb-10'>

            <div className='flex w-full justify-between mt-20'>
                <div className='flex flex-col'>
                    <h1 className='font-extrabold text-4xl'>Invoice</h1>
                    <p className='font-light text-gray-500 opacity-70 text-md'>There are {isSuccess && dataM.length} invoices</p>
                </div>
                <div className='flex items-center'>
                    {/* Dropdown */}
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex justify-center w-full rounded-md border-none px-4 py-2  text-sm font-semibold text-gray-700 focus:outline-none focus:ring-transparent">
                                Filter
                                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1 ">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <>
                                                <button
                                                    type="submit"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block w-full text-left px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Due
                                                </button>
                                                <button
                                                    type="submit"
                                                    className={classNames(
                                                        active ? 'z-100 bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block w-full text-left px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Paid
                                                </button>
                                                <button
                                                    type="submit"
                                                    className={classNames(
                                                        active ? 'z-100 bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block w-full text-left px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Draft
                                                </button>
                                            </>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    <div className='flex items-center'>

                    </div>
                    <div>
                        {/* Button */}
                        <button onClick={() => setIsOpen(true)} className="bg-purple-500 text-sm hover:bg-purple-600 text-white font-bold py-2 px-4  rounded">
                            New Invoice
                        </button>
                    </div>
                    {/* Modal */}
                    <Transition.Root show={isOpen} as={Fragment}>
                        <Dialog as="div" onClose={setIsOpen} className="fixed inset-0 p-4 overflow-y-auto scrollbar-hide" >
                            <Transition.Child
                                enter="duration-300 ease-out"
                                enterFrom='opacity-0'
                                enterTo="opacity-100"
                                leave="duration-200 ease-in"
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <Dialog.Overlay className="fixed inset-0 bg-gray-500/70" />
                            </Transition.Child>
                            <Transition.Child
                                enter="duration-300 ease-out"
                                enterFrom='opacity- scale-95'
                                enterTo="opacity-100"
                                leave="duration-200 ease-in"
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <div className='bg-gray-100 max-w-2xl mx-auto relative rounded shadow-2xl'>
                                    <h1 className='font-bold text-3xl p-5'>Add Invoice</h1>
                                    <div className='p-10 h-full overflow-scroll scrollbar-hide'>
                                        <form className="w-full" onSubmit={(e)=>e.preventDefault()}>
                                            <div className="flex flex-wrap mb-6">
                                                <div className="w-full md mt-4 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                        Name
                                                    </label>
                                                    <input name="name" value={invoice.name} onChange={handleOnChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" />
                                                </div>

                                                <div className="w-full mt-4 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                        Due Date
                                                    </label>
                                                    <input name="dueDate" value={invoice.dueDate} onChange={handleOnChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="date" placeholder="" />
                                                </div>
                                                <div className="w-full mt-4 px-3 mb-6 md:mb-0">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                                        Notes
                                                    </label>
                                                    <textarea name="notes" value={invoice.notes} onChange={handleOnChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border-none rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" ></textarea>
                                                </div>

                                            </div>
                                            <h1 className='font-bold text-2xl mt-10 mb-4 flex justify-center items-center text-gray-600'>Item List</h1>
                                            <button
                                                className="bg-gray-500 w-full mb-4 text-sm hover:bg-gray-600 text-white font-bold py-2 px-4  rounded"
                                                onClick={() => setCount(count + 1)}
                                            >New Field</button>
                                            <table className="min-w-full ">
                                                <thead className="bg-gray-200">
                                                   {count > 0 ? <tr className=''>
                                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Item
                                                        </th>
                                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Product Name
                                                        </th>
                                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Quantity
                                                        </th>
                                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Price
                                                        </th>
                                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            GST
                                                        </th>
                                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                            Total
                                                        </th>
                                                        <th className="px-5 py-3 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                        </th>
                                                    </tr> : <h1></h1>}
                                                </thead>

                                                {/* {isSuccess && invoice.lineItem.map((item, index)=>{
                                                    return (
                                                        <Field item={item} index={index} setInvoice={setInvoice} invoice={invoice} />
                                                    )
                                                })
                                                } */}

                                                {count > 0 ? 
                                                [...Array(count)].map((_, i) => 
                                                <Field products={products} setProducts={setProducts} index={i} setCount={setCount} count={count}  key={i} setIsOpen={setIsOpen} isOpen={isOpen} setLastData={setLastData} />) 
                                                : 
                                                <h1 className='font-bold text-center text-gray-400 pt-10'>Click on Add Field to add item...</h1>
                                                }
                                            </table>

                                            {/* <div className="w-[70h] mt-5 m-auto">

                                    </div> */}
                                        </form>
                                    </div>
                                    <div className='flex justify-between p-4 items-center'>
                                        <button onClick={() => setIsOpen(false)} className="m-5 bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                                            Discard
                                        </button>
                                        <button onClick={handleSubmit} className="m-5 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
                                            Send
                                        </button>
                                    </div>
                                </div>
                            </Transition.Child>
                        </Dialog>
                    </Transition.Root>
            </div>
            </div>
            {isSuccess && dataM.reverse().map((item, i) => {
                return (<div key={i} className='mt-5 flex justify-around items-center h-24 w-full rounded bg-gray-50 drop-shadow-sm'>
                    <p className='text-sm font-bold'>{"#" + item._id.slice(1, 4) + "..." + item._id.slice(-3)}</p>
                    <p className='text-sm font-light text-gray-400'>{moment(item.dueDate).format('DD-MM-YYYY')}</p>
                    <p className='text-sm font-light text-gray-400'>{item.name}</p>
                    <p className='text-2xl font-bold'>{"$" + item.grossAmount}</p>
                    <div className='flex items-center'>
                        <Status status={item.status} />
                        <Link href={`/invoice/${item._id}`}><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg></Link>
                    </div>
                </div>)
            })}
        </div>)
        
    )
}

export default Homepage
