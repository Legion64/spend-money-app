import { useDispatch, useSelector } from 'react-redux'

import './App.css';
import Container from './components/UI/Container';
import Header from './components/UI/Header';
import Section from './components/UI/Section';
import BillGates from './assets/images/billgates.jpg';
import Card from './components/UI/Card';

import Receipt from './components/Receipt';
import { Receipt as ReceiptType, updateMoney } from './store/account/accountSlice';
import React, { useEffect, useRef, useState } from 'react';
import { moneyConvertor } from './helper';

function App() {
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const money = useSelector((state: any) => state.account.money)
  const initalMoney = useRef(money)
  const receipt = useSelector((state: any) => state.account.receipt) as Array<ReceiptType>

  const handleMoneyKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setEdit(false)
    }
  }

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const money = Number(e.target.value)
    dispatch(updateMoney(money))
    initalMoney.current = money
  }

  useEffect(() => {
    let total = 0
    receipt.forEach((item: ReceiptType) => {
      total += item.price * item.quantity
    })
    dispatch(updateMoney(initalMoney.current - total))
  })

  return (
    <>
      <Header />
      <Container>
        <Section>
          <div className='bg-white py-10 flex items-center justify-center flex-col gap-8 w-full'>
            <div className='w-28 h-28 relative rounded-full overflow-hidden'>
              <img src={BillGates} alt="Bill Gates" />
            </div>
            <h2 className='text-3xl font-semibold text-gray-700 px-2 text-center'>Spend Bill Gates' Money</h2>
            <small className='-mt-5 text-sm'>What would you buy if you were a billionaire?</small>
          </div>
        </Section>
        <Section className='sticky'>
          <div className='bg-indigo-700 py-6 flex items-center justify-center flex-col gap-8 w-full'>
            {!edit && <span className='text-white text-3xl font-semibold cursor-pointer' onClick={() => setEdit(true)}>{moneyConvertor(money)}</span>}
            {edit && (
              <div className='group relative'>
                <input className='mt-3 bg-transparent h-16 w-96 text-3xl text-white text-center focus:outline-none' onChange={handleMoneyChange} onKeyDown={handleMoneyKey} />
                <span className='text-white absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold w-max pointer-events-none'>Spend your own money!</span>
              </div>
            )}
          </div>
        </Section>
        <Section>
          <small className='text-sm text-gray-500 block'>*Click on your balance to change your balance amount</small>
        </Section>
        <Section className='sm:rounded-none'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
            {
              receipt.map((item, index) => (
                <Card key={index} title={item.title} price={Number(item.price)} image={item.image} />
              ))
            }
          </div>
        </Section>
      </Container>
      <Receipt />
    </>
  );
}

export default App;
