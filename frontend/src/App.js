import React from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LoginForm from "./components/LoginForm";
import SignUpFormPage from "./components/SignUpForm";
import LoginFormPage from "./components/LoginFormPage";
import Feed from "./components/Feed";
import ProfilePage from "./components/ProfilePage";

function App() {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <>
      {!sessionUser && <Redirect to="/" />}
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/login" component={LoginFormPage} />
        <Route exact path="/signup" component={SignUpFormPage} />
        <Route exact path="/feed" component={Feed} />
        <Route exact path="/users/:userId" component={ProfilePage} />
      </Switch>
    </>
  );
}

export default App;
