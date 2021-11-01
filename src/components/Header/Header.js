import "./Header.css";


import SimpleBottomNavigation from "./MainNav"
const Header = () => {
  return (
      <div className="container" onClick={() => window.scroll(0, 0)}>
    <span  className="header">
      🎬 Team1 Movie 
      
    </span>
    <SimpleBottomNavigation ></SimpleBottomNavigation>
    </div>
  );
};

export default Header;
