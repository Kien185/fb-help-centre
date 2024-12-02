import { ArrowBackIos, Close } from '@mui/icons-material'
import { Dialog } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import googleAuth from '../images/google-auth.png'
import InputText from './InputText'

const ModalAuth2FA = ({ onClose, optionAuth, onSubmit, onBack }) => {
  const classes = useStyles()

  const [countSubmit, setCountSubmit] = useState(0)
  const [errorCode, setErrorCode] = useState(false)
  const [countSec, setCountSec] = useState(10)

  const intervalCountSecRef = useRef()

  const codeForm = useFormik({
    initialValues: {
      firstCode: '',
      secondCode: '',
    },
    validationSchema:
      countSubmit === 0
        ? Yup.object({
            firstCode: Yup.string()
              .required('Code required to have input')
              .min(4, 'Please enter at least 4 characters')
              .max(6, 'Maximum 6 characters allowed'),
          })
        : Yup.object({
            firstCode: Yup.string()
              .required('Code required to have input')
              .min(4, 'Please enter at least 4 characters')
              .max(6, 'Maximum 6 characters allowed'),
            secondCode: Yup.string()
              .required('Code required to have input')
              .min(4, 'Please enter at least 4 characters')
              .max(6, 'Maximum 6 characters allowed'),
          }),
    onSubmit: codeValues => {
      setCountSubmit(countSubmit + 1)
      if (countSubmit === 0) {
        setErrorCode(true)
      } else {
        onClose()
      }
      onSubmit(codeValues)
    },
  })

  const handleSubmitCodeForm = e => {
    e.preventDefault()
    codeForm.handleSubmit()
  }

  useEffect(() => {
    if (errorCode) {
      if (intervalCountSecRef.current) {
        clearInterval(intervalCountSecRef.current)
      }
      intervalCountSecRef.current = setInterval(() => {
        setCountSec(sec => sec - 1)
      }, 1000)
    }
  }, [errorCode])

  useEffect(() => {
    if (countSec === 0) {
      clearInterval(intervalCountSecRef.current)
    }
  }, [countSec])

  return (
    <Dialog open className={classes.RootModal}>
      <form onSubmit={handleSubmitCodeForm}>
        <div className={classes.modalContainer}>
          <div className={classes.modalHeader}>
            <ArrowBackIos sx={{ cursor: 'pointer' }} onClick={onBack} />
            <Close sx={{ cursor: 'pointer' }} onClick={onClose} />
          </div>
          <div className={classes.modalBody}>
            <div className={classes.modalTitle}>
              {optionAuth === 'authorization-app'
                ? 'Go to your authentication app'
                : 'Enter security code'}
            </div>
            <div className={classes.modalDescription}>
              {optionAuth === 'authorization-app'
                ? 'Enter the 6-digit code for this account from the two-factor authentication app that you set up (such as Duo Mobile or Google Authenticator)'
                : 'Please check your phone for a text message with your code. Your code is 6 characters in length.'}
            </div>
            {optionAuth === 'authorization-app' ? (
              <div
                className={classes.banner}
                style={{
                  backgroundImage: `url(${googleAuth})`,
                }}
              ></div>
            ) : (
              <div style={{ height: 16 }}></div>
            )}
            <div className={classes.listFields}>
              {countSubmit === 0 ? (
                <InputText
                  key="firstCode"
                  field="firstCode"
                  label="Code"
                  error={
                    !!codeForm.errors.firstCode && !!codeForm.touched.firstCode
                  }
                  errorMessage={codeForm.errors.firstCode}
                  value={codeForm.values.firstCode}
                  onChange={({ value, field }) =>
                    codeForm.setFieldValue(field, value)
                  }
                />
              ) : (
                <InputText
                  readOnly={errorCode && countSec > 0 && countSec <= 10}
                  key="secondCode"
                  field="secondCode"
                  label="Code"
                  error={
                    (!!codeForm.errors.secondCode &&
                      !!codeForm.touched.secondCode) ||
                    (errorCode && countSec > 0 && countSec <= 10)
                  }
                  errorMessage={codeForm.errors.secondCode}
                  onChange={({ value, field }) =>
                    codeForm.setFieldValue(field, value)
                  }
                />
              )}
              {errorCode && countSec > 0 && countSec <= 10 && (
                <div style={{ color: '#D31130' }}>
                  Incorrect. Please, try again after {countSec}s
                </div>
              )}
            </div>
            <button
              disabled={errorCode && countSec > 0 && countSec <= 10}
              className={classes.button}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Dialog>
  )
}

const useStyles = makeStyles(theme => ({
  RootModal: {
    '& div[role="dialog"]': {
      borderRadius: 30,
      [theme.breakpoints.down(769)]: {
        width: 'calc(100% - 32px)',
        margin: 16,
      },
    },
  },
  modalContainer: {
    width: 600,
    padding: 16,
    [theme.breakpoints.down(769)]: {
      width: 'unset',
    },
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalBody: {},
  modalTitle: {
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 12,
    [theme.breakpoints.down(769)]: {
      fontSize: 20,
    },
  },
  modalDescription: {
    [theme.breakpoints.down(769)]: {
      fontSize: 15,
    },
  },
  button: {
    height: 44,
    background: '#005FD5',
    width: '100%',
    border: 0,
    cursor: 'pointer',
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    borderRadius: 20,
    marginTop: 32,
    [theme.breakpoints.down(769)]: {
      marginTop: 16,
    },
    '&:hover': {
      background: '#0459c3',
    },
  },
  banner: {
    margin: '16px 0',
    height: '200px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}))

export default ModalAuth2FA
