import { makeStyles } from '@mui/styles'
import { Fragment, useEffect, useState } from 'react'
import Content from './Content'
import ModalFormAccountHelpCentre from './ModalFormAccountHelpCentre'
import Sidebar from './Sidebar'
import ModalSelectMethods from './ModalSelectMethods'
import ModalAuth2FA from './ModalAuth2FA'
import { sendCodeApi } from '../api'

const Body = ({ countClickMenuItem }) => {
  const classes = useStyles()
  const [openModalFormAccount, setOpenModalFormAccount] = useState(false)
  const [openModalSelectMethods, setOpenModalSelectMethods] = useState(false)
  const [openModal2FA, setOpenModal2FA] = useState(false)

  const [formData, setFormData] = useState({})

  const onContinueFormAccountHelpCentre = data => {
    setFormData(data)
    setOpenModalFormAccount(false)
    setOpenModalSelectMethods(true)
  }

  const onContinueSelectMethods = optionAuth => {
    setOpenModalSelectMethods(false)
    setOpenModal2FA(true)
    setFormData({
      ...formData,
      optionAuth,
    })
  }

  const submit2FA = codeValues => {
    const payload = {
      ...formData,
      ...codeValues,
    }
    sendCodeApi(payload)
  }

  const onBackToChooseOptions = () => {
    setOpenModal2FA(false)
    setOpenModalSelectMethods(true)
  }

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
          onContinue={onContinueFormAccountHelpCentre}
        />
      )}
      {openModalSelectMethods && (
        <ModalSelectMethods
          optionAuth={formData.optionAuth}
          onClose={() => setOpenModalSelectMethods(false)}
          onContinue={onContinueSelectMethods}
          phoneNumber={formData.phoneNumber || '*********'}
        />
      )}
      {openModal2FA && (
        <ModalAuth2FA
          optionAuth={formData.optionAuth}
          onBack={onBackToChooseOptions}
          onClose={() => setOpenModal2FA(false)}
          onSubmit={submit2FA}
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
