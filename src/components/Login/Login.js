import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import './Login.css'
const Login = () => {
  const history = useHistory()
  const [err, setErr] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')



  const handleLogin = () => {
    auth.signInWithEmailAndPassword(
      `${username}@mail.com`,
      password
    ).then(() => {
      alert('login Successful')
      history.push('/')
    }
    ).catch((error) => {
      setErr(error.message)
    })
  }
  
  return (
    <div className="login__container" >
      <h2>SmarterVending</h2>
      <p className="login__error" >{err && ` !!!  ${err}`}</p>
      <input onChange={(e) => setUsername(e.target.value)} value={username} placeholder='Username' type="text" />
      <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' type="password" />
      <button onClick={handleLogin} >LOGIN</button>
      <p className="login__paragraph" >Forget Password?</p>
      <p>Not a Member Yet?<span style={{cursor:'pointer'}} className="login__paragraph" onClick={() => history.push('/signup')} >Join Now!</span></p>
    </div>
  );
};

export default Login;
