import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import About from "./About";
import Booking from "./Booking";
import Cars from "./Cars";
import Home from "./Home";
import QA from "./QA";
import User from "./User";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/About.us" component={About} />
        <Route path="/Booking" component={Booking} />
        <Route path="/Cars" component={Cars} />
        <Route path="/QA" component={QA} />
        <Route path="/User" component={User} />
      </Switch>
    </Router>
  );
};

export default Routes;
