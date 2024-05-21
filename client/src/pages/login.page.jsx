import React, { useState } from "react"
import '../styles/login.page.css'
import { useNavigate } from "react-router-dom"

function Login () {
    var navigate = useNavigate()
    const isLoggedIn = window.localStorage.getItem('token');
    console.log(isLoggedIn)
    if (isLoggedIn) {navigate("/")}

    var [email, setEmail] = useState()
    var [password, setPassword] = useState()
    function handleSubmit (e) {
        e.preventDefault()
        fetch("/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
          },
          body: JSON.stringify({email, password}),
          mode: 'cors',
          credentials: 'include'
        }).then(result => { return result.json()}).then(result => {
          console.log(result)
          if(result.token){
            localStorage.setItem("token", result.token)
            alert('Login Successful')
            navigate("/")
          }
          else {
            document.getElementById("err").style.visibility="visible";
          }
        })
    }

    const login = (
        <div id="login" >
        <form className="Login" onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <p id="err" className="text-danger" style={{"visibility": "hidden"}}>Details provided seem to be incorrect</p>
        <div className="mb-3">
          <label>Email address</label>
          <input
            required
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            required
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          No account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
    )
    return login
}

export default Login