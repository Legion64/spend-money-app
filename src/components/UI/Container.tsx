import React from 'react'
import classNames from 'classnames'

type PropType = {
    children: React.ReactNode,
    className?: string
}

function Container(props: PropType) {
  return (
    <div className={classNames(props.className)}>
        <div className='container m-auto h-full'>
            {props.children}
        </div>
    </div>
  )
}

export default Container