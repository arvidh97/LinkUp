import React, { useState } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link} from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ email, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text(); 
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }


  return (
    <>
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
       Email
       <br></br>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size={60}
        />
      </label>
      <br></br>
      <label>
        Password
        <br></br>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br></br>
      <button type="submit">Log In</button>
    </form>
    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </>
  );
}

export default LoginFormPage;