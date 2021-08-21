import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import logo from '../../assets/images/logo-consequence-white.svg'

const Layout = (props) => {
  return (
    <>
      <header>
        <a href="/" rel="noopener noreferrer">
          <Link href="/">
            <div className="logo-wrapper">
              <Image src={logo} />
            </div>
          </Link>
        </a>
      </header>
      <div className="main-content">{props.children}</div>
      <footer>
        <a href="/" rel="noopener noreferrer">
          <Link href="/">
            <div className="logo-wrapper">
              <Image src={logo} />
            </div>
          </Link>
        </a>
      </footer>
    </>
  )
}

export default Layout
