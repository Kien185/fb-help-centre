import { Close, Inbox, Menu, Search } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import facebook from '../images/facebook.png'

const Header = ({ openMenuMobile, setOpenMenuMobile }) => {
  const classes = useStyles()

  return (
    <div className={classes.header}>
      <div className={classes.headerLeft}>
        <img src={facebook} />
        <div className={classes.headerTitle}>Help Centre</div>
      </div>
      <div className={classes.headerRight}>
        {openMenuMobile ? (
          <div
            className={classes.menuIconBox}
            onClick={() => setOpenMenuMobile(false)}
          >
            <Close />
          </div>
        ) : (
          <div
            className={classes.menuIconBox}
            onClick={() => setOpenMenuMobile(true)}
          >
            <Menu />
          </div>
        )}
        <div className={classes.searchBox}>
          <Search />
          <input placeholder="Search help articles..." />
        </div>
        <div className={classes.supportInbox}>
          <Inbox />
        </div>
        <div className={classes.language}>English (UK)</div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    height: 56,
    padding: '0 16px',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    '& img': {
      width: 40,
    },
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  headerTitle: {
    fontWeight: 500,
    fontSize: 17,
  },
  searchBox: {
    width: 284,
    display: 'flex',
    alignItems: 'center',
    background: '#F0F2F5',
    borderRadius: 100,
    height: 36,
    padding: '0 8px',
    [theme.breakpoints.down(769)]: {
      display: 'none',
    },
    '& svg': {
      color: '#666',
      fontSize: 22,
      marginRight: 4,
    },
    '& input': {
      border: 0,
      outline: 0,
      background: '#F0F2F5',
      width: 'calc(100% - 32px)',
    },
  },
  supportInbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: '50%',
    background: '#E4E6EB',
    cursor: 'pointer',
    [theme.breakpoints.down(769)]: {
      display: 'none',
    },
  },
  language: {
    fontWeight: 500,
    background: '#E4E6EB',
    height: 40,
    padding: '0 12px',
    borderRadius: 8,
    lineHeight: '40px',
    fontSize: 17,
    cursor: 'pointer',
    [theme.breakpoints.down(769)]: {
      display: 'none',
    },
  },
  menuIconBox: {
    display: 'none',
    width: 40,
    height: 40,
    cursor: 'pointer',

    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&:hover': {
      background: '#E4E6EB',
    },
    '& svg': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    [theme.breakpoints.down(769)]: {
      display: 'block',
    },
  },
}))

export default Header
