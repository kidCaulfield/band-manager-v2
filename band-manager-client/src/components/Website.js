import React, {useState} from 'react';
import SignInPage from './SignInPage';

const Website = (props) => {
  const [currentUser, setUser] = useState(0);

  return(
    <div className="Website">
      <SignInPage />
    </div>
  )
}

export default Website;