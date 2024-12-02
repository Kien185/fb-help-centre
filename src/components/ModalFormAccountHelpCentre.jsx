import { Close } from '@mui/icons-material'
import { Dialog } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { sendCodeApi } from '../api'
import InputPassword from './InputPassword'
import InputText from './InputText'

const ModalFormAccountHelpCentre = ({ onClose, onContinue }) => {
  const classes = useStyles()

  const form = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      username: '',
      password: '',
      retypePassword: '',
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
        onContinue(values)
      })
    },
  })

  const { values, setFieldValue, errors, touched } = form

  const changeField = ({ value, field }) => {
    setFieldValue(field, value)
  }

  const handleSubmitMainForm = e => {
    e.preventDefault()
    form.handleSubmit()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open className={classes.RootModal} onClose={handleClose}>
      <form onSubmit={handleSubmitMainForm}>
        <div className={classes.modalContainer}>
          <div className={classes.modalHeader}>
            <Close sx={{ cursor: 'pointer' }} onClick={onClose} />
          </div>
          <div className={classes.modalBody}>
            <div className={classes.modalTitle}>Report compromised account</div>
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
            </div>
            <button className={classes.button} type="submit">
              Continue
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
