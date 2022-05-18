import React from 'react'
import Navbar from './navbar'

export default function Layout({children}: any) {
  return (
    <React.Fragment>
        <Navbar />
        {children}
    </React.Fragment>
  )
}
