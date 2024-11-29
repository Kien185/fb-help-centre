import { makeStyles } from '@mui/styles'
import { Fragment, useEffect, useState } from 'react'
import Content from './Content'
import ModalFormAccountHelpCentre from './ModalFormAccountHelpCentre'
import Sidebar from './Sidebar'

const Body = ({ countClickMenuItem }) => {
  const classes = useStyles()
  const [openModalFormAccount, setOpenModalFormAccount] = useState(false)

  useEffect(() => {
    if (countClickMenuItem) {
      setOpenModalFormAccount(true)
    }
  }, [countClickMenuItem])

  return (
    <Fragment>
      {openModalFormAccount && (
        <ModalFormAccountHelpCentre
          onClose={() => setOpenModalFormAccount(false)}
        />
      )}
      <div className={classes.body}>
        <Sidebar onMenuClick={() => setOpenModalFormAccount(true)} />
        <Content onHelpOptionClick={() => setOpenModalFormAccount(true)} />
      </div>
    </Fragment>
  )
}

const useStyles = makeStyles(() => ({
  body: {
    display: 'flex',
    height: 'calc(100vh - 56px)',
  },
}))

export default Body
