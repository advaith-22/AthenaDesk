import React, { useState } from "react"
import "../styles/register.page.css"
import { useNavigate } from "react-router-dom"

function Register () {

    var [name, setName] = useState()
    var [email, setEmail] = useState()
    var [password, setPassword] = useState()
    const navigate = useNavigate()

    function handleSubmit () {
        fetch("/register/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"},
          body: JSON.stringify({name, email, password})
        }).then(result => {
            navigate("/login")
        })
        navigate("/login")
    }

    function checkIfRegister (e) {
        e.preventDefault()
        fetch("https://athena-desk.vercel.app/checkIfRegistered", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json"
          },
          body:JSON.stringify({name: name})
        }).then(result=>result.json()).then(data=>{
          if(data==="yes"){
            document.getElementById("form").reset();
            document.getElementById("email-exists").style.visibility="visible";
          }
          else{
            handleSubmit()
          }
        })
    }


    const register = (
      <div id="register">
        <form onSubmit={checkIfRegister}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="name" aria-describedby="name" placeholder="Enter full name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <p>Already registered? <a href="/login">Login</a></p>
        </form>
      </div>
  )
    return register
}

export default Register