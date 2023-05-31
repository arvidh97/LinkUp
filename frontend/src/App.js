import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./components/LoginForm";
import SignUpFormPage from "./components/SignUpForm";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <div> 
      <h1>Hello from LinkUp</h1>
      {sessionUser && <h2>Welcome, {sessionUser.fname}!</h2>}
          <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/login' component={LoginForm} />
          <Route exact path="/signup" component={SignUpFormPage} />
          </Switch>
      <h2> arvid was here</h2>
    </div>
  );
}

export default App;
