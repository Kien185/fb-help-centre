import { makeStyles } from '@mui/styles'
import fromMeta from '../images/from-meta.png'

const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.footerContent}>
          <div className={classes.contentCol}>
            <div className={classes.contentName}>About</div>
            <div className={classes.contentName}>Ad choices</div>
            <div className={classes.contentName}>Create ad</div>
          </div>
          <div className={classes.contentCol}>
            <div className={classes.contentName}>Privacy</div>
            <div className={classes.contentName}>Careers</div>
            <div className={classes.contentName}>Create Page</div>
          </div>
          <div className={classes.contentCol}>
            <div className={classes.contentName}>Terms and policies</div>
            <div className={classes.contentName}>Cookies</div>
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.copyrightContent}>
          <img src={fromMeta} />
          <div className={classes.meta2024}>© 2024 Meta</div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  footer: {
    padding: '40px 32px 16px 32px',
    background: '#F0F2F5',
  },
  container: {
    maxWidth: 840,
    margin: '0 auto',
    padding: 8,
  },
  footerContent: {
    borderBottom: '1px solid #dcdcdc',
    paddingBottom: 40,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down(769)]: {
      flexDirection: 'column',
      gap: 16,
    },
  },
  contentCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    [theme.breakpoints.down(769)]: {
      gap: 16,
    },
  },
  contentName: {
    color: '#666',
    fontSize: 14,
    cursor: 'pointer',
  },
  copyrightContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    '& img': {
      width: 100,
    },
  },
  meta2024: {
    color: '#666',
    fontSize: 12,
  },
}))

export default Footer
