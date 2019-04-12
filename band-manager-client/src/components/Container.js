import React from 'react';
import SignInPage from './SignInPage';
import Navbar from './Navbar';

const Container = (props) => {
  console.log('props.signIn: ', props.signIn);
  return(
    <main className="Container">
      <Navbar />
      <div className="Website">
        <SignInPage
          signIn={props.signIn}
          destroy={props.destroy}  
        />
      </div>
    </main>
  )
}

export default Container;