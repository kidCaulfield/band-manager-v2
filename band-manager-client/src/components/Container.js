import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import AuthRoute from './AuthRoute';
import TourNewPage from './TourNewPage';
import TourIndexPage from './TourIndexPage';
import TourPlanner from './TourPlanner';
import TourShowPage from './TourShowPage';

const Container = (props) => {
  return(
    <main className="Container">
      <BrowserRouter>
        <Navbar />
        <div className="Website">
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/`} exact component={HomePage} />
            <AuthRoute
              path={`${process.env.PUBLIC_URL}/tours/new`} exact
              component={TourNewPage}
            />
            <AuthRoute
              path={`${process.env.PUBLIC_URL}/tours`} exact
              component={TourIndexPage}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/tours/:id`} exact
              component={TourPlanner}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/tour/:id`} exact
              component={TourShowPage}
            />
            <Route path={`${process.env.PUBLIC_URL}/sign_in`} exact
              render={routeProps => (
                <SignInPage
                  {...routeProps}
                />
              )}
            />
            <Route path={`${process.env.PUBLIC_URL}/sign_up`} exact
              render={routeProps => (
              <SignUpPage
                {...routeProps}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default Container;