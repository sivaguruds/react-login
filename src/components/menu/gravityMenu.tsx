import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';


const MainMenu = () => {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
      <ListItemText primary="Dashboard Gravity" />
      </ListItem>
    </div>
  )
}

export default MainMenu;

