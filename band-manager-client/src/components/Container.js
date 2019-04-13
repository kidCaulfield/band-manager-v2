import React from 'react';
import SignInPage from './SignInPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';

const Container = (props) => {
  return(
    <main className="Container">
      <BrowserRouter>
        <Navbar />
        <div className="Website">
          <Switch>
            <Route path={`${process.env.PUBLIC_URL}/`} exact component={HomePage} />
            <Route path={`${process.env.PUBLIC_URL}/sign_in`}
                render={routeProps => (
                  <SignInPage
                    {...routeProps}
                  />
                )}
              />
            <SignInPage
              signIn={props.signIn}
              destroy={props.destroy}  
            />
          </Switch>
        </div>
      </BrowserRouter>
    </main>
  )
}

export default Container;