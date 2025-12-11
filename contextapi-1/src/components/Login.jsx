import React from 'react'
import { useState, useContext } from 'react';
import UserContext from '../context/UserContext';

function Login() {
  const {setUser} = useContext(UserContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username, password })
  }
  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Username</label>
        <input type="text" className="input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />

        <button className="btn btn-neutral mt-4" onClick={handleSubmit}>Login</button>
      </fieldset>
    </div>
  );
}

export default Login