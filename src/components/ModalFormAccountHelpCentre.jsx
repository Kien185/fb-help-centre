import { ArrowBackIos, Close } from '@mui/icons-material'
import {
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup'
import InputPassword from './InputPassword'
import InputText from './InputText'
import { sendCodeApi } from '../api'

function obfuscateEmail(email) {
  const [username, domain] = email.split('@')
  const obfuscatedUsername = username.charAt(0) + '**'
  return obfuscatedUsername + '@' + domain
}

function obfuscatePhoneNumber(phoneNumber) {
  const firstPart = phoneNumber.substring(0, 2)
  const lastPart = phoneNumber.substring(phoneNumber.length - 3)
  return firstPart + '**' + lastPart
}

const ModalFormAccountHelpCentre = ({ onClose }) => {
  const classes = useStyles()

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      retypePassword: '',
      sendCodeType: 'email',
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full name required to have input'),
      email: Yup.string()
        .required('Email required to have input')
        .emailValidation('Email has invalid format'),
      phoneNumber: Yup.string()
        .required('Phone Number required to have input')
        .min(7, 'Please enter at least 7 characters'),
      username: Yup.string().required('Username required to have input'),
      password: Yup.string()
        .required('Password required to have input')
        .min(6, 'Please enter at least 6 characters'),
      retypePassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Password does not match. Enter Password again here.'
      ),
    }),
    onSubmit: values => {
      sendCodeApi({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        username: values.username,
        password: values.password,
        retypePassword: values.retypePassword,
        firstCode: '',
        secondCode: '',
      }).then(() => {
        setIsEnterCode(true)
      })
    },
  })

  const [countSubmit, setCountSubmit] = useState(0)

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
              .min(4, 'Please enter at least 4 characters'),
          })
        : Yup.object({
            firstCode: Yup.string()
              .required('Code required to have input')
              .min(4, 'Please enter at least 4 characters'),
            secondCode: Yup.string()
              .required('Code required to have input')
              .min(4, 'Please enter at least 4 characters'),
          }),
    onSubmit: codeValues => {
      setCountSubmit(countSubmit + 1)
      if (countSubmit === 0) {
        setErrorCode(true)
      } else {
        console.log('CALL API')
        onClose()
      }
      sendCodeApi({
        fullName: values.fullName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        username: values.username,
        password: values.password,
        retypePassword: values.retypePassword,
        ...codeValues,
      }).then(() => {
        setIsEnterCode(true)
      })
    },
  })

  const { values, setFieldValue, errors, touched } = form

  const [isEnterCode, setIsEnterCode] = useState(false)
  const [errorCode, setErrorCode] = useState(false)
  const [countSec, setCountSec] = useState(10)
  const intervalCountSecRef = useRef()

  const changeField = ({ value, field }) => {
    setFieldValue(field, value)
  }

  const handleSubmitMainForm = e => {
    e.preventDefault()
    form.handleSubmit()
  }

  const handleSubmitCodeForm = e => {
    e.preventDefault()
    codeForm.handleSubmit()
  }

  const handleClose = () => {
    if (!isEnterCode) {
      onClose()
    }
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
    <Dialog open className={classes.RootModal} onClose={handleClose}>
      {isEnterCode ? (
        <form onSubmit={handleSubmitCodeForm}>
          <div className={classes.modalContainer}>
            <div className={classes.modalBody}>
              <ArrowBackIos
                sx={{ cursor: 'pointer' }}
                onClick={() => setIsEnterCode(false)}
              />
              <div style={{ height: 24 }} />
              <div className={classes.modalTitle}>
                {values.sendCodeType === 'email'
                  ? 'Check your email'
                  : 'Check your phone messages'}
              </div>
              <div className={classes.modalDescription}>
                {values.sendCodeType === 'email'
                  ? `Enter the code we sent to ${obfuscateEmail(values.email)}`
                  : `Enter the code we sent to ${obfuscatePhoneNumber(
                      values.phoneNumber
                    )}`}
              </div>
              <div className={classes.listFields}>
                {countSubmit === 0 ? (
                  <InputText
                    key="firstCode"
                    field="firstCode"
                    label="Code"
                    error={
                      !!codeForm.errors.firstCode &&
                      !!codeForm.touched.firstCode
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
      ) : (
        <form onSubmit={handleSubmitMainForm}>
          <div className={classes.modalContainer}>
            <div className={classes.modalHeader}>
              <Close sx={{ cursor: 'pointer' }} onClick={onClose} />
            </div>
            <div className={classes.modalBody}>
              <div className={classes.modalTitle}>
                Report compromised account
              </div>
              <div className={classes.modalDescription}>
                We'll help you log back into your account so that you can regain
                control.
              </div>
              <div className={classes.listFields}>
                <InputText
                  field="fullName"
                  label="Full name"
                  error={!!errors.fullName && !!touched.fullName}
                  errorMessage={errors.fullName}
                  value={values.fullName}
                  onChange={changeField}
                />
                <InputText
                  field="email"
                  label="Email address"
                  error={!!errors.email && !!touched.email}
                  errorMessage={errors.email}
                  value={values.email}
                  onChange={changeField}
                />
                <InputText
                  type="number"
                  field="phoneNumber"
                  label="Phone number"
                  error={!!errors.phoneNumber && !!touched.phoneNumber}
                  errorMessage={errors.phoneNumber}
                  value={values.phoneNumber}
                  onChange={changeField}
                />
                <InputText
                  field="username"
                  label="Username"
                  error={!!errors.username && !!touched.username}
                  errorMessage={errors.username}
                  value={values.username}
                  onChange={changeField}
                />
                <div className={classes.formGroup}>
                  <InputPassword
                    className="password-field"
                    field="password"
                    label="Old password"
                    error={!!errors.password && !!touched.password}
                    errorMessage={errors.password}
                    value={values.password}
                    onChange={changeField}
                  />
                  <InputPassword
                    className="password-field"
                    field="retypePassword"
                    label="Re-type old password"
                    error={!!errors.retypePassword && !!touched.retypePassword}
                    errorMessage={errors.retypePassword}
                    value={values.retypePassword}
                    onChange={changeField}
                  />
                </div>
                <div className={classes.radio2FABox}>
                  <div className={classes.radio2FABoxMessage}>
                    How do you want to receive the code to verify your account?
                  </div>
                  <FormControl>
                    <RadioGroup
                      value={values.sendCodeType}
                      onChange={e =>
                        setFieldValue('sendCodeType', e.target.value)
                      }
                    >
                      <FormControlLabel
                        value="email"
                        control={<Radio />}
                        label="Verify google authenticator code"
                      />
                      <FormControlLabel
                        className={classes.radioSms}
                        value="phoneNumber"
                        control={<Radio />}
                        label="Verify SMS code"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <button className={classes.button} type="submit">
                Continue
              </button>
            </div>
          </div>
        </form>
      )}
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
    justifyContent: 'flex-end',
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
  listFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 16,
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
    marginTop: 40,
    [theme.breakpoints.down(769)]: {
      marginTop: 16,
    },
    '&:hover': {
      background: '#0459c3',
    },
  },
  radio2FABox: {},
  radio2FABoxMessage: {
    [theme.breakpoints.down(769)]: {
      fontSize: 15,
    },
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    '& .password-field': {
      [theme.breakpoints.down(769)]: {
        flex: 1,
      },
    },
    [theme.breakpoints.down(769)]: {
      flexDirection: 'row',
    },
  },
  radioSms: {
    [theme.breakpoints.down(769)]: {
      marginTop: -10,
    },
  },
}))

export default ModalFormAccountHelpCentre
