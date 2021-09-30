import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

// import Home from '../../../pages/Home';
import Layout from "./Layout";
import Profile from "./Profile";
import Create from "./Create";
import LandingPage from "./LandingPage";
import SingleQuestion from "../Feeds/SingleQuestion";

export default function MainNavigation() {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route path="/" exact>
            <LandingPage page={"home"} />
          </Route>

          <Route path="/following">
            <LandingPage page={"follows"} />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/create_post">
            <Create />
          </Route>
          <Route component={SingleQuestion} path="/singleQuestion/:id" exact />
        </Layout>
      </Switch>
    </Router>
  );
}
