import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/session';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import reset from '../styles/reset.css';
import signupformcss from '../styles/SignUpForm.css';
import linkuplogo from '../assests/LinkUpLogo.png';

function SignUpFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (password !== confirmPassword) {
      setErrors(['Passwords must match.']);
      return;
    }

    const user = {
      email,
      fname: firstName,
      lname: lastName,
      password,
    };

    dispatch(signUp(user))
    .then(() => {
        history.push('/feed');
      })
    //   .catch((res) => {
    //     if (res.data && res.data.errors) {
    //       setErrors(res.data.errors);
    //     } else {
    //       console.error('Sign up failed:', res);
    //       setErrors(['An error occurred. Please try again.']);
    //     }
    //   });
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
    <div className='signup-container'>
      <div className='main-logo-container'>
        <img src={linkuplogo} alt='LinkUp' className='signup-logo' />
      </div>
      <div className='main-title'>
        <h1>Make the most of your professional life</h1>
      </div>
      <div className='signup-form'>
    <form onSubmit={handleSubmit} className='signup-form-content'>
      <div className='signup-input'>
      <label className='signup-input-label'>
        Email <br></br>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='signup-input-field'
          />
      </label>
      </div>
      <br />
      <div className='signup-input'>
      <label className='signup-input-label'>
        First Name <br></br>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className='signup-input-field'
          />
      </label>
      </div>
      <br />
      <div className='signup-input'>
      <label className='signup-input-label'>
        Last Name <br></br>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className='signup-input-field'
          />
      </label>
      </div>
      <br />
      <div className='signup-input'>
      <label className='signup-input-label'>
        Password (6 or more characters)
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='signup-input-field'
          />
      </label>
      </div>
      <br />
      <div className='signup-input'>
      <label className='signup-input-label'>
        Confirm Password <br></br>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className='signup-input-field'
          />
      </label>
      </div>
      <br />
      <ul className='error-list'>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
          ))}
      </ul>
      <p className='agree-mes'>By clicking Agree & Join, you agree to the <span className='cool-text'>Arvid Awesomeness</span>, <span className='cool-text'>Party Policy</span>, and <span className='cool-text'>Cookie Policy</span></p>
      <button type="submit" className='submit-button'>Agree & Join</button>
      <p className='signin-mes'>Already on LinkUp? <Link to="/login" className='signin-link'>Sign In</Link></p>
    </form>
      </div>
    </div>
  );
}

export default SignUpFormPage;