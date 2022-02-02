import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'; // Redirect

const LoaderAnimation = () => {
    return <span>Loading...</span>;
  }

const Header = lazy(() => import("../component/Header"));
const Routes = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<LoaderAnimation />}>
        <Header />
        <Switch>
          <Route
            exact
            path='/home'
            component={lazy(() => import("../component/Home"))}
          />
           <Route
            exact
            path='/trade'
            component={lazy(() => import("../component/Trade"))}
          />
          <Redirect to="/home" />
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

export default withRouter(Routes);
