import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/tr'
import { useSelector } from 'react-redux'

import { moneyConvertor } from '../helper'
import { Receipt as ReceiptType } from '../store/account/accountSlice'

function Receipt() {
    const receipt = useSelector((state: any) => state.account.receipt) as Array<ReceiptType>
    const [total, setTotal] = useState(0)
    const [show, setShow] = useState(false)

    useEffect(() => {
        let total = 0
        receipt.forEach((item: ReceiptType) => {
            total += item.price * item.quantity
        })
        setTotal(total)
        if (total > 0) setShow(true)
        else setShow(false)
    }, [receipt])

    return (
        <div className='fixed bottom-0 right-0 w-96 p-3 bg-white rounded-md border transition-opacity' style={{opacity: show ? 1 : 0}}>
            <h2 className='text-center text-2xl font-semibold italic mb-3'>Receipt</h2>
            <hr />
            <div className='flex justify-between p-3'>
                <span>Date: {moment().format("DD-MM-YYYY")}</span>
                <span>{moment().format("hh:mm")}</span>
            </div>
            <div className='px-3 py-1'>
                <div className='flex justify-between'>
                    <span className='w-12'><b>QTY</b></span>
                    <span className='flex-1'><b>ITEM</b></span>
                    <span><b>PRICE</b></span>
                </div>
                {
                    receipt
                        .filter((item: ReceiptType) => item.quantity > 0)
                        .map((item: any, index: number) => (
                            <div key={index} className='flex justify-between'>
                                <span className='w-12'>{item.quantity}</span>
                                <span className='flex-1'>{item.title}</span>
                                <span>{moneyConvertor(item.price)}</span>
                            </div>
                        ))
                }
            </div>
            <hr />
            <div className='px-3 py-1'>
                <div className='flex justify-between'>
                    <span><b>Total</b></span>
                    <span><b>{moneyConvertor(total)}</b></span>
                </div>
            </div>
        </div>
    )
}

export default Receipt