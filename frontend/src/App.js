import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import SignUpFormPage from "./components/SignUpForm";
import LoginFormPage from "./components/LoginFormPage";
import Feed from './components/Feed';

function App() {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div> 
      {/* {sessionUser && <h2>Welcome, {sessionUser.fname}!</h2>} */}
          <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/login' component={LoginFormPage} />
          <Route exact path="/signup" component={SignUpFormPage} />
          <Route exact path='/feed' component={Feed} />
          </Switch>
    </div>
  );
}

export default App;
