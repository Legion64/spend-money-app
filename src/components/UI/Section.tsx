import React from 'react'
import classNames from 'classnames'

type PropType = {
    children: React.ReactNode,
    className?: string
}

function Section(props: PropType) {
  return (
    <section className={classNames(props.className, 'my-5', 'rounded-2xl', 'overflow-hidden')}>
        {props.children}
    </section>
  )
}

export default Section