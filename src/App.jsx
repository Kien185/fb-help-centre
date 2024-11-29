import { useState } from 'react'
import Body from './components/Body'
import Header from './components/Header'
import MenuMobile from './components/MenuMobile'

const App = () => {
  const [openMenuMobile, setOpenMenuMobile] = useState(false)

  const [countClickMenuItem, setCountClickMenuItem] = useState(0)

  const onMenuItemClick = () => {
    setOpenMenuMobile(false)
    setCountClickMenuItem(countClickMenuItem + 1)
  }

  return (
    <div id="app">
      <Header
        openMenuMobile={openMenuMobile}
        setOpenMenuMobile={setOpenMenuMobile}
      />
      {openMenuMobile ? (
        <MenuMobile onMenuItemClick={onMenuItemClick} />
      ) : (
        <Body countClickMenuItem={countClickMenuItem} />
      )}
    </div>
  )
}

export default App
