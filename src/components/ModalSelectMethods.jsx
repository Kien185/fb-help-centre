import { Close, ErrorOutline } from '@mui/icons-material'
import { Dialog } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useState } from 'react'

function obfuscatePhoneNumber(phoneNumber) {
  const firstPart = phoneNumber.substring(0, 2)
  const lastPart = phoneNumber.substring(phoneNumber.length - 3)
  return firstPart + '**' + lastPart
}

const ModalSelectMethods = ({
  optionAuth,
  onClose,
  onContinue,
  phoneNumber,
}) => {
  const classes = useStyles()

  const [option, setOption] = useState(optionAuth || 'authorization-app')

  const optionChange = e => {
    setOption(e.currentTarget.value)
  }

  return (
    <Dialog open className={classes.RootModal}>
      <div className={classes.modalContainer}>
        <div className={classes.modalHeader}>
          <Close sx={{ cursor: 'pointer' }} onClick={onClose} />
        </div>
        <div className={classes.modalBody}>
          <div className={classes.modalTitle}>
            Choose a way to confirm it's you
          </div>
          <div className={classes.modalDescription}>
            Here are the verification methods you can use.
          </div>
          <div className={classes.options}>
            <div
              className={classes.option}
              onClick={() => setOption('authorization-app')}
            >
              <div className={classes.optionText}>
                <div>Authentication application</div>
                <div>Get code from authenticator app</div>
              </div>
              <input
                type="radio"
                value="authorization-app"
                checked={option === 'authorization-app'}
                onChange={optionChange}
              />
            </div>
            <div className={classes.option} onClick={() => setOption('sms')}>
              <div className={classes.optionText}>
                <div>Text message</div>
                <div>
                  We will send the code to phone number
                  {` ${obfuscatePhoneNumber(phoneNumber)}`}.
                </div>
              </div>
              <input
                type="radio"
                value="sms"
                checked={option === 'sms'}
                onChange={optionChange}
              />
            </div>
          </div>
          <div className={classes.options}>
            <div className={classes.optionOther}>
              <ErrorOutline />
              <div className={classes.optionText}>
                <div>Need another way?</div>
                <div>
                  To protect your account, it may take a few days to access your
                  account if you do not use your regular login method.
                </div>
              </div>
            </div>
          </div>
          <button
            className={classes.button}
            type="submit"
            onClick={() => onContinue(option)}
          >
            Continue
          </button>
        </div>
      </div>
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
  options: {
    marginTop: 16,
    border: '1px solid #CCD3DB',
    borderRadius: 12,
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 12,
    cursor: 'pointer',
    gap: 12,
    '&:not(:last-child)': {
      borderBottom: '1px solid #CCD3DB',
    },
  },
  optionText: {
    '& div:first-child': {
      fontWeight: 500,
    },
    '& div:last-child': {
      marginTop: 6,
      color: '#666',
      fontSize: 13,
    },
  },
  other: {
    border: '1px solid #CCD3DB',
    borderRadius: 12,
    marginTop: 16,
  },
  optionOther: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 12,
    gap: 12,
    '&:not(:last-child)': {
      borderBottom: '1px solid #CCD3DB',
    },
  },
}))

export default ModalSelectMethods
