import {
  Error,
  Explore,
  KeyboardArrowDown,
  Lock,
  ManageAccounts,
  Search,
} from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const MenuMobile = ({ onMenuItemClick }) => {
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
    <div className={classes.menuMobile}>
      <div className={classes.searchBox}>
        <Search />
        <input placeholder="Search help articles..." />
      </div>
      <div className={classes.listMenuItems}>
        {listMenuItems.map(item => (
          <div
            key={item.id}
            className={classes.menuItem}
            onClick={onMenuItemClick}
          >
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
  menuMobile: {
    padding: 12,
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
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    background: '#F0F2F5',
    borderRadius: 100,
    height: 42,
    padding: '0 12px',
    marginBottom: 16,
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
}))

export default MenuMobile
