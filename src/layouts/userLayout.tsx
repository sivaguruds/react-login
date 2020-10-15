import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import VisibleItemList from '../containers/VisibleItemList' 
import GravityMenu from '../components/menu/gravityMenu';
import HospitalMenu from '../components/menu/hospitalMenu';

// INTERFACE
interface State {
  menuName: string | null
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));

const ResponsiveDrawer = (props: any) => {
  const classes = useStyles();
  let history = useHistory();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  let [values, setValues] = React.useState<State>({
    menuName: localStorage.getItem('user_type')
  });

  let drawer: any = null
  if(values.menuName === 'GA'){
    drawer = <GravityMenu/>
  } else if(values.menuName === 'OA'){
    drawer = <HospitalMenu/>
  }

  const pageChange =() => {
    let path = "/";
    history.push(path);
  }

  const logOut = () => {
    localStorage.removeItem("user_type");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
    localStorage.removeItem("user_id");
    pageChange()
  }

  
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Responsive drawer
          </Typography>
          <IconButton onClick={logOut} color="inherit">
              <SettingsPowerIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden><Hidden mdDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>  
        </Hidden>
      </nav>

      <div className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
};

export default ResponsiveDrawer;