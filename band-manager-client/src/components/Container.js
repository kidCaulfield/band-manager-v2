import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import AuthRoute from './AuthRoute';
import TourNewPage from './TourNewPage';
import TourIndexPage from './TourIndexPage';
import TouringNetwork from './TouringNetwork';
import TourPlanner from './TourPlanner';
import TourShowPage from './TourShowPage';
import TourEditPage from './EventEditPage';
import EventEditPage from './EventEditPage';

const Container = (props) => {
  return(
    <main className="Container">
      <BrowserRouter>
        <Navbar />
        <div className="Website">
          <Switch>
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={HomePage} />
            <AuthRoute
              exact path={`${process.env.PUBLIC_URL}/tours/new`}
              component={TourNewPage}
            />
            <AuthRoute
              exact path={`${process.env.PUBLIC_URL}/tours`}
              component={TourIndexPage}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/network`}
              component={TouringNetwork}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/tours/:id`}
              component={TourPlanner}
            />
            <Route
              exact path={`${process.env.PUBLIC_URL}/tour/:id`}
              component={TourShowPage}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/tour/:id/edit`}
              component={TourEditPage}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/tour/:tourId/event/:eventId`}
              component={EventEditPage}
            />
            <Route path={`${process.env.PUBLIC_URL}/sign_in`}
              render={routeProps => (
                <SignInPage
                  {...routeProps}
                />
              )}
            />
            <Route path={`${process.env.PUBLIC_URL}/sign_up`}
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