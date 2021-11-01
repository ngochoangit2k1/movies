import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
     width: "80%",
    position: "fixed",
    backgroundColor: "#000000",
    right: "0",
    zIndex: 100,
   
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => {
    if(value === 0) history.push("/")
    else if(value === 1) history.push("/Series")
    else if(value === 2) history.push("/Live")
    else if(value === 3) history.push("/Search")

  }, [value, history]);

  return (
    <>
  
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction 
        style = {{color: "white"}}
        label="Trending" 
        icon={<WhatshotIcon />} />
      <BottomNavigationAction  
        style = {{color: "white"}}
        label="Series" 
        icon={<MovieIcon />} />
    
      <BottomNavigationAction  
       style = {{color: "white"}}
       label="LiveTV" 
       icon={<LiveTvIcon />} />
         <BottomNavigationAction  
        style = {{color: "white"}}
        label="Search" 
        icon={<SearchIcon />} />
    </BottomNavigation>
    </>
  );
}