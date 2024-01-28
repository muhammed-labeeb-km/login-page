import './App.css';
import { jwtDecode as jwt_decode } from "jwt-decode"; 
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleSignOut(e) {
    setUser({});
    document.getElementById('signInDiv').hidden = false;
  }

  function handleCallbackResponse(response) {
    console.log("Enclosed JWT ID token " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject); 
    document.getElementById('signInDiv').hidden = true;
  }

  const validateForm = () => {
    let isValid = true;

  
    if (!email || !email.includes('@') || !email.includes('.')) {
      setEmailError('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    
    if (!password || password.length < 4) {
      setPasswordError('Password should be at least 4 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
     
      console.log('Dummy data submitted');
    } else {
      console.log('Form validation failed. Please check the fields.');
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "118128885766-9o6ba8er1323qh42prihpoamf6tpp42s.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();
  }, []);

  return (
    <div style={{ border: 'solid', borderWidth: '1px', borderColor: 'grey' }} className="App rounded container mt-5  w-75 d-flex align-items-center  flex-column">
      <div className='p-1 mt-3' >
        <form onSubmit={handleSubmit} className=''>
          <input type="text" placeholder='Email' className='form-control my-2' value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          <input type="password" placeholder='Password' className='form-control my-2' value={password} onChange={(e) => setPassword(e.target.value)} />
          {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
          <br />
          <button type="submit" className="btn btn-primary">Submit</button>
          <br />
          <br />
          OR
          <br />
          </form>
      </div>
      <div className='p-4' id='signInDiv'></div>
      {Object.keys(user).length !== 0 &&
        <button onClick={(e) => handleSignOut(e)} >Sign Out</button>
      }
      {user &&
        <div>
          <img src={user.picture} alt="" />
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
