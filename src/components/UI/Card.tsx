import { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moneyConvertor } from '../../helper'

import { updateReceiptItem } from '../../store/account/accountSlice'

type PropType = {
  title: string,
  price: number,
  image?: string,
  className?: string
}

function Card(props: PropType) {
  const dispatch = useDispatch()
  const receipt = useSelector((state: any) => state.account.receipt)
  const money = useSelector((state: any) => state.account.money)

  const item = receipt.find((item: any) => item.title === props.title)
  const itemIndex = receipt.findIndex((item: any) => item.title === props.title)

  const isDisabledMax = money < props.price
  const isDisabledMin = item.quantity === 0

  const handleIncreaseClick = () => {
    dispatch(updateReceiptItem({
      index: itemIndex,
      data: {
        quantity: item.quantity + 1,
      }
    }))
  }

  const handleDecreaseClick = () => {
    dispatch(updateReceiptItem({
      index: itemIndex,
      data: {
        quantity: item.quantity > 0 ? item.quantity - 1 : 0,
      }
    }))
  }

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateReceiptItem({
      index: itemIndex,
      data: {
        quantity: Number(e.target.value) > 0 ? Number(e.target.value) : 0,
      }
    }))
  }

  return (
    <div className='rounded-2xl bg-white flex justify-center items-center flex-col px-4 py-6'>
      <div className='w-36 h-36'>
        <img src={props.image} alt={props.title} className="object-contain w-full h-full" />
      </div>
      <h2 className='text-2xl font-semibold text-gray-700'>{props.title}</h2>
      <span className='text-xl text-green-500'>{moneyConvertor(props.price)}</span>
      <div className='flex gap-x-3 mt-5'>
        <button className='bg-zinc-500 text-white font-semibold px-6 py-2 rounded-md disabled:opacity-60 transition-colors' onClick={handleDecreaseClick} disabled={isDisabledMin}>Sell</button>
        <input type='number' className='border-2 border-gray-500 rounded-md w-24 py-1 px-2 disabled:bg-gray-200 transition-colors' value={item.quantity} onChange={handleAmountChange} disabled={isDisabledMax} />
        <button className='bg-green-500 text-white font-semibold px-6 py-2 rounded-md disabled:opacity-60 transition-colors' onClick={handleIncreaseClick} disabled={isDisabledMax}>Buy</button>
      </div>
      <small className='mt-3'>Total: {moneyConvertor(item.quantity * item.price)}</small>
    </div>
  )
}

export default Card