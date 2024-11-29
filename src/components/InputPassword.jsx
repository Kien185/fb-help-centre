import { Visibility, VisibilityOff } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Fragment, useEffect, useRef, useState } from 'react'

const InputPassword = ({
  field,
  value,
  onChange,
  label,
  error,
  errorMessage,
  className,
}) => {
  const classes = useStyles()

  const inputRef = useRef()

  const [internalValue, setInternalValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [focused, setFocused] = useState(false)

  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  const handleChange = e => {
    const { value } = e.target

    setInternalValue(value)
    !!onChange && onChange({ value, field })
  }

  const clickInput = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    if (!!value && value !== internalValue) {
      setInternalValue(value)
    }
  }, [value])

  return (
    <div className={clsx(classes.rootInputPassword, className)}>
      <div
        className={clsx(classes.inputPassword, error && 'error')}
        onClick={clickInput}
      >
        <div
          className={clsx(
            classes.label,
            (focused || !!internalValue) && classes.moveLabel,
            error && 'error'
          )}
        >
          {label}
        </div>
        <input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          value={internalValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {!!internalValue && (
          <Fragment>
            {showPassword ? (
              <Visibility
                className={classes.eyeIcon}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <VisibilityOff
                className={classes.eyeIcon}
                onClick={() => setShowPassword(true)}
              />
            )}
          </Fragment>
        )}
      </div>
      {error && <div className={classes.errorMessage}>{errorMessage}</div>}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  rootInputPassword: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  inputPassword: {
    height: 60,
    border: '1px solid #CCD3DB',
    borderRadius: 16,
    position: 'relative',
    [theme.breakpoints.down(769)]: {
      height: 48,
    },
    '&.error': {
      borderColor: '#D31130',
    },
    '& input': {
      border: 0,
      outline: 'none',
      width: '100%',
      padding: '16px 54px 6px 16px',
      borderRadius: 16,
      height: 58,
      fontSize: 16,
      [theme.breakpoints.down(769)]: {
        height: 46,
        padding: '16px 54px 2px 16px',
      },
    },
  },
  eyeIcon: {
    cursor: 'pointer',
    position: 'absolute',
    right: 16,
    top: 15,
    [theme.breakpoints.down(769)]: {
      top: 12,
    },
  },
  label: {
    position: 'absolute',
    top: 20,
    left: 16,
    color: '#666',
    fontSize: 14,
    transition: 'all .2s',
    [theme.breakpoints.down(769)]: {
      top: 15,
      fontSize: 13,
    },
    '&.error': {
      color: '#D31130',
    },
  },
  moveLabel: {
    top: 5,
  },
  errorMessage: {
    fontSize: 14,
    color: '#D31130',
    paddingLeft: 4,
  },
}))

export default InputPassword
