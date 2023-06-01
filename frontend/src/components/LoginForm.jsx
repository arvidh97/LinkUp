import React, { useState, useEffect } from 'react';
import * as sessionActions from '../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import LoginFormCss from '../styles/LoginForm.css';
import workingpic from '../assests/workingjob.png';
import workingpic2 from '../assests/workingjob2.png';
import workingpic3 from '../assests/workingjob3.png';
import logo from '../assests/LinkUpLogo.png';
import github from '../assests/githublogo.png';
import linkedin from '../assests/linkedInlogo.png'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [workingpic, workingpic2]

  
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

  const handleDemo = (e) => {
    e.preventDefault()

    const demoUser = {
      email: "demo@user.com",
      password: 'password',
    }

    return dispatch(sessionActions.login(demoUser));
  }
  
  const handleLogo =(e) => {
    e.preventDefault();
    window.location.reload();
    // return <Redirect to='/' />
  }
  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  useEffect(() => {
    const slideshowInterval = setInterval(changeImage, 3000); // Change image every 3 seconds
    
    return () => {
      clearInterval(slideshowInterval);
    };
  }, []);
  
  if (sessionUser) return <Redirect to="/" />;
  return (
    <div className="login-page">
      <div className='splash-nav'>
        <div className='splash-logo'>
            <img src={logo} alt='Logo' className='acc-logo' onClick={handleLogo}/>
        </div>
        <div className='splash-links'>
            <div className='arvid-links'>
              <a href="https://github.com/arvidh97/LinkUp">
                <img src={github} alt='github' className='git-img'/>
              </a>
              <a href='https://www.linkedin.com/in/arvid-hossain-71576017a/'>
                <img src={linkedin} alt='linkedin' className='link-img'/>
              </a>
            </div>
            <div className='user-links'>
                <button className='nav-sign-but'>
                  <Link to="/signup" className="nav-signup">Join Now</Link>
                </button>
                <button className='nav-login-but'>
                  <Link to='/login' className='nav-login'>Sign In</Link>
                </button>
            </div>
        </div>
      </div>
      <div className="login-form-container">
        <div className="form-content">
          <h1 className="login-header">Welcome to your future, now!</h1>
          <form className="login-form" onSubmit={handleSubmit}>
          {/* <ul className="error-list">
             {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul> */}
            <div className="input-container">
              <label className="input-label">
                Email
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
              </label>
            </div>
            <div className="input-container">
              <label className="input-label">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field"
                />
              </label>
              <ul className="error-list">
             {errors.map((error) => (
                <li className='error' key={error}>{error}</li>
              ))}
            </ul>
            </div>
            <div className='the-buttons'>
            <button type="submit" className="login-button">
              Sign In
            </button>
            <button className='demo-button' onClick={handleDemo}>Demo User</button>
          <button className="signup-button">
            <Link to="/signup" className="signup-link">Don't have an account? Sign Up</Link>
          </button>
            </div>
          </form>
        </div>
        <div className="image-container">
          <img src={images[currentImageIndex]} alt="Image" className="image" />
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
