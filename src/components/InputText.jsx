import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

const InputText = ({
  type,
  field,
  value,
  onChange,
  label,
  error,
  errorMessage,
  readOnly,
}) => {
  const classes = useStyles()

  const inputRef = useRef()

  const [internalValue, setInternalValue] = useState('')
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
    <div className={classes.rootInputText}>
      <div
        className={clsx(classes.inputText, error && 'error')}
        onClick={clickInput}
      >
        <div
          className={clsx(
            classes.label,
            (focused || !!internalValue) && !readOnly && classes.moveLabel,
            error && 'error'
          )}
        >
          {label}
        </div>
        <input
          readOnly={readOnly}
          ref={inputRef}
          type={type || 'text'}
          value={internalValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      {error && <div className={classes.errorMessage}>{errorMessage}</div>}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  rootInputText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  inputText: {
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

export default InputText
