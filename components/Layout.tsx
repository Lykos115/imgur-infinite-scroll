import Navigation from "./Navigation"
import type { ReactElement } from 'react'


type layoutType = {
  children: ReactElement
}

const Layout = ({children}: layoutType) => {
  return(
    <>
      <Navigation />
      <main>{children}</main>
    </>
  )
}

export default Layout
