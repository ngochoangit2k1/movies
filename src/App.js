import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import "./App.css"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Trending from "./Pages/Trending/Trending";
import Movies from "./Pages/Live/Movies";
import Series from "./Pages/Series/Series";
import Search from "./Pages/Search/Search";


function App() {
  return (
    <BrowserRouter> 
    <Header />
    
    <div className="app">
      <Container>
        <Switch>
          <Route path="/" component={Trending} exact/>
          <Route path="/Series" component={Series}/>
          <Route path="/Live" component={Movies}/>
          <Route path="/Search" component={Search}/>
        </Switch>
      </Container>
    </div>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
