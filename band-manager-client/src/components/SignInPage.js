import React from 'react'

const SignInPage = (props) => {

  return(
    <div className="App">    
      <div className="Venue-form-box">
        <h1 className="Title Blue">Sign In</h1>
        <form className="Venue-form" onSubmit={props.signIn}>
          <div>
            <label htmlFor="email">email</label><br/>
            <input type="text" name="email" defaultValue="j@job.com"></input>
          </div>
          <div>
            <label htmlFor="password">password</label><br/>
            <input type="text" name="password" defaultValue="p1234"></input>
          </div>
          <input className="Button-form" type="submit" value="Sign In" />
        </form>
      </div>
      <button className="Button-form" onClick={props.destroy}>Sign Out</button>
    </div>
  )
}

export default SignInPage;