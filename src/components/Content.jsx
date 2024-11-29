import { ArrowDropDown, KeyboardArrowRight } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import Footer from './Footer'

const Content = ({ onHelpOptionClick }) => {
  const classes = useStyles()

  const helpOptions = [
    {
      id: 1,
      name: 'Login help',
      children: [
        {
          id: 1,
          name: "Recover your Facebook account if you can't log in",
        },
        {
          id: 2,
          name: 'Troubleshoot login with a phone number on Facebook',
        },
        {
          id: 3,
          name: 'Troubleshoot finding your account on facebook.com/login/identify',
        },
        {
          id: 4,
          name: 'I have to enter a security code every time I log in to Facebook.',
        },
      ],
    },
    {
      id: 2,
      name: 'Password help',
      children: [
        {
          id: 1,
          name: 'Unable to reset password because of password reset limit',
        },
        {
          id: 2,
          name: 'Problems with resetting your Facebook password',
        },
        {
          id: 3,
          name: "Recover your Facebook account if you can't access your account email address or mobile phone number",
        },
      ],
    },
  ]

  return (
    <div className={classes.content}>
      <div className={classes.container}>
        <div className={classes.breadcrumb}>
          <div className={classes.breadcrumbItem}>Managing your account</div>
          <KeyboardArrowRight />
          <div className={classes.breadcrumbItem}>Login and password</div>
        </div>
        <div className={classes.mainTitle}>Fix a login problem</div>
        <div className={classes.helpOptions}>
          {helpOptions.map(helpItem => (
            <div
              className={classes.helpItem}
              key={helpItem.id}
              onClick={onHelpOptionClick}
            >
              <div className={classes.helpName}>
                {helpItem.name} <span className="hash">#</span>
              </div>
              {helpItem.children.map(helpOptionItem => (
                <div className={classes.helpOptionItem} key={helpOptionItem.id}>
                  <div className={classes.helpOptionItemName}>
                    {helpOptionItem.name}
                  </div>
                  <ArrowDropDown />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  content: {
    width: 'calc(100% - 360px)',
    [theme.breakpoints.down(1241)]: {
      width: 'calc(100% - 300px)',
    },
    [theme.breakpoints.down(769)]: {
      width: '100%',
    },
  },
  container: {
    maxWidth: 768,
    padding: '24px 16px 48px 16px',
    margin: '0 auto',
    marginBottom: 100,
    [theme.breakpoints.down(769)]: {
      marginBottom: 40,
    },
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: 14,
    },
  },
  breadcrumbItem: {
    fontSize: 12,
    color: '#1876F2',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginTop: 20,
    paddingBottom: 12,
    marginBottom: 80,
    borderBottom: '1px solid #dcdcdc',
    [theme.breakpoints.down(769)]: {
      marginBottom: 40,
    },
  },
  helpOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 100,
    [theme.breakpoints.down(769)]: {
      gap: 40,
    },
  },
  helpItem: {},
  helpName: {
    fontWeight: 600,
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    '&:hover .hash': {
      display: 'block',
    },
    '& .hash': {
      display: 'none',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
  helpOptionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: '8px 16px',
    marginLeft: '-16px',
    gap: 16,
    '&:hover': {
      background: '#F0F2F5',
    },
  },
  helpOptionItemName: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    [theme.breakpoints.down(769)]: {
      fontSize: 14,
    },
  },
}))

export default Content
