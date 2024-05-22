import { useEffect, useState } from "react";
import axios from 'axios'
import React from 'react'
import '../styles/ticket.page.css'
import { useNavigate } from "react-router-dom";
const jwt = require("jsonwebtoken")

function CreateTicket () {

    const [user, setUser] = useState("")

    const getUser = () => {

        axios.get("https://athena-desk.vercel.app/user/", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((res)=>{setUser(res.data)})
    }
    useEffect(()=>{
        getUser()
    }, [])
    console.log(user)
    const navigate = useNavigate()
    var [subject, setSubject] = useState()
    const onSubjectChange = (event)=>{
        setSubject(event.target.value)
    }
    var [priority, setPriority] = useState()
    const onPriorityChange = (event)=>{
        setPriority(event.target.value)
    }
    var [description, setDescription] = useState()
    const onDescriptionChange = (event)=>{
        setDescription(event.target.value)
    }
    var [asignee, setAsignee] = useState()
    const onAsigneeChange = (event)=>{
        setAsignee(event.target.value)
    }
    const reqbod = {"creator": user, "subject": subject, "priority": priority, "description": description, "asignee": asignee}
    const uploadTicket = () => {
        axios.post("/uploadTicket", reqbod).then(() => {
            navigate("/")
        })
    }

    var [users, setUsers] = useState([])
    const getUsers = () => {
        return axios.get("/users/").then((response) => setUsers(response.data))
    }
    useEffect(()=>{
        getUsers()
    }, [])
    const displayNames = () =>{
    return users.map(user=>{
        return <option key={user._id} value={user.name}>{user.name}</option>
    })}
    const ticket_form = (
        <div id="form" >
        <form onSubmit={uploadTicket}>
        <h3>Create Issue</h3>
            <div class="form-group mb-3">
                <label for="subject">Subject</label>
                <input type="text" class="form-control" id="subject" name="subject" placeholder="Enter subject" onChange={onSubjectChange} />
            </div>
            <div class="form-group mb-3">
                <label for="priority">Priority</label>
                <select onChange={onPriorityChange} class="form-control" id="priority">
                    <option key="o1" default>Choose...</option>
                    <option key="o1">High</option>
                    <option key="o2">Medium</option>
                    <option key="o3">Low</option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="description">Description</label>
                <textarea onChange={onDescriptionChange} class="form-control" id="description" rows="3"></textarea>
            </div>
            <div class="form-group mb-3">
                <label for="asignee">Asignee</label>
                <select onChange={onAsigneeChange} class="form-control" id="asignee">
                    <option key="o1" default>Choose...</option>
                    {
                        displayNames()
                    }
                </select>
            </div>
            <div className="d-grid">
                <button type="submit" id="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
    )
    return ticket_form
}

export default CreateTicket;