import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from './Components/List';
import Detail from './Components/Details';

export const Routes = () => (
    <Router>
        <Switch>
         <Route
            exact
            path="/"
            component={(props) => (
              <div style={{margin: 10}}>
               <List/>
              </div>
            )}
          />
          <Route
            path="/detail/:market"
            component={(props) => (
               <Detail />
            )}
          />
        </Switch>
      </Router>
);



export default Routes;
