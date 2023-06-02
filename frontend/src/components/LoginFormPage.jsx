import React, { useState, useEffect } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import LoginFormCss from '../styles/LoginFormPage.css';
import logo from '../assests/LinkUpLogo.png';
import { useHistory } from 'react-router-dom';

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  
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
  const handleLogo = (e) => {
    e.preventDefault();
    history.push('/');
  }

  const handleDemo = (e) => {
    e.preventDefault()

    const demoUser = {
      email: "demo@user.com",
      password: 'password',
    }

    return dispatch(sessionActions.login(demoUser));
  }
  
  if (sessionUser) return <Redirect to="/" />;
  return (
    <div className='log-container'>
        <div className='log-main-logo-container'>
        <img src={logo} alt='LinkUp' className='log-signup-logo' onClick={handleLogo}/>
        </div>
        <div className='log-form'>
            <h1 className='log-header'>Sign in</h1>
            <p className='log-subheader'>Stay updated on your professional world</p>
            <form className="login-log-form" onSubmit={handleSubmit}>
            <div className="log-input-container">
              <label className="log-input-label">
                Email
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="log-input-field"
                //   placeholder='Email'
                />
              </label>
            </div>
            <div className="log-input-container">
              <label className="log-input-label">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="log-input-field"
                //   placeholder='Password'
                />
              </label>
              <ul className="error-list">
             {errors.map((error) => (
                <li className='error' key={error}>{error}</li>
              ))}
            </ul>
            </div>
            <div className='log-the-buttons'>
            <button type="submit" className="log-login-button">
              Sign In
            </button>
            <div className='log-or-container'>
                <span className='log-or-line'></span>
                <span className='log-or-text'>or</span>
                <span className='log-or-line'></span>
             </div>
            <button className='log-demo-button' onClick={handleDemo}>Demo User</button>
            </div>
          </form> 
        </div>
          <button className="log-signup-button">
            New to LinkUp? <Link to="/signup" className="log-signup-link">Sign Up</Link>
          </button>
    </div>
  );
}

export default LoginFormPage;