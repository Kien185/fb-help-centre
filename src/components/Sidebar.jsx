import {
  Error,
  Explore,
  KeyboardArrowDown,
  Lock,
  ManageAccounts,
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const Sidebar = ({ onMenuClick }) => {
  const classes = useStyles()

  const listMenuItems = [
    {
      id: 1,
      name: 'Using Facebook',
      icon: <Explore />,
    },
    {
      id: 2,
      name: 'Managing your account',
      icon: <ManageAccounts />,
    },
    {
      id: 3,
      name: 'Privacy, safety and security',
      icon: <Lock />,
    },
    {
      id: 4,
      name: 'Policies and reporting',
      icon: <Error />,
    },
  ]

  return (
    <div className={classes.sidebar}>
      <div className={classes.listMenuItems}>
        {listMenuItems.map(item => (
          <div key={item.id} className={classes.menuItem} onClick={onMenuClick}>
            <div className={classes.menuItemLeft}>
              <div className={classes.menuItemLeftIconBox}>{item.icon}</div>
              <div className={classes.menuName}>{item.name}</div>
            </div>
            <KeyboardArrowDown className={classes.keyboardArrowDown} />
          </div>
        ))}
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  sidebar: {
    width: 360,
    boxShadow: '4px 0 4px -2px rgba(0, 0, 0, 0.1)',
    height: '100%',
    padding: 8,
    [theme.breakpoints.down(1241)]: {
      width: 300,
    },
    [theme.breakpoints.down(769)]: {
      display: 'none',
    },
  },
  listMenuItems: {},
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    padding: '10px 8px',
    cursor: 'pointer',
    '&:hover': {
      background: '#F0F2F5',
      borderRadius: '4px',
    },
  },
  menuItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  menuItemLeftIconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: 36,
    height: 36,
    background: '#E4E6EB',
    '& svg': {
      fontSize: 20,
    },
  },
  menuName: {
    fontSize: 16,
  },
  keyboardArrowDown: {
    color: '#666',
    fontWeight: 600,
  },
}))

export default Sidebar
