import React from 'react';
import SignInPage from './SignInPage';

const Website = (props) => {
  console.log('props.signIn: ', props.signIn);
  return(
    <div className="Website">
      <SignInPage
        signIn={props.signIn}
        destroy={props.destroy}  
      />
    </div>
  )
}

export default Website;