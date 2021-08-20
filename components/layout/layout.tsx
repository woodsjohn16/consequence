import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import logo from '../../assets/images/logo-consequence-white.svg'

const Layout = (props) => {
  return (
    <>
      <header>
        <Link href="/">
          <Image src={logo} />
        </Link>
      </header>
      <div className="main-content">{props.children}</div>
      <footer>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Consequence <span>2021</span>
        </a>
      </footer>
    </>
  )
}

export default Layout
