
import Header from './components/Header/header.js';
import Feed from './components/Feeds/Feed.js';
import Sidebar from './components/SideBars/Sidebar.js';
import Widgets from './components/Widgets/Widgets.js';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
function App() {
  return (

<Router>
    <div className="App">
        
          
          {/*Header*/ }
          <Header/>
          {/*Appbody*/}
          <div className="app_body">
            {/*Appbody*/}
            <Sidebar/>
            {/*Sidebar*/}
            <Feed/>
            {/*feed*/ }
            <Widgets/>
          </div>
          {/*Sidebar*/}
          {/*feed*/ }
          {/*widgets*/}

      
    </div>
    </Router>
  );
}

export default App;
