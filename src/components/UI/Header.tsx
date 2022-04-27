import React from 'react'
import Container from './Container'

function Header() {
  return (
    <Container className='h-24 bg-white'>
      <div className='flex items-center h-full'>
        <span className='font-semibold text-2xl'>Melih Budak</span>
      </div>
    </Container>
  )
}

export default Header