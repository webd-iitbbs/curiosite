import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

import { store } from './store'

function App() {
  return (
        <Provider store={store}>
                <Router>
                        <Route component={Home} path="/" exact/>
                        <Route component={Login} path="/login"/>
                </Router>
        </Provider>
  );
}

export default App;
