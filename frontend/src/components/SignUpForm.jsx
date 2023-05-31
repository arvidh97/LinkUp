import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp, login} from '../store/session';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
      <p>Already have an account? <Link to="/login">Log In</Link></p>
    </form>
  );
}

export default SignUpFormPage;