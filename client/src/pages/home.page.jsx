import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table"
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import React from 'react'
import '../styles/home.page.css'

function Home () {
    window.onload = function() {
        if(!window.location.hash) {
            window.location = window.location + '#loaded';
            window.location.reload();
        }
    }
    const navigate = useNavigate()
    var [data, setData] = useState([])

    const getData = () => {
        
        return fetch(`http://localhost:2248/tickets/`, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then((tick) => tick.json()).then((data) => setData(data))
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate("/login", {replace: true})
            } else {
                getData()
            }
         }
    }, [])

    console.log(data)

    return(
        <div id="home">
        <Table>
            <h1>Issues</h1>
            <tr>
                <th>Creator</th>
                <th>Subject</th>
                <th>Priority</th>
                <th>Description</th>
                <th>Asignee</th>
            </tr>
            {
                data.map(v => {
                   return(<tr>
                        <td>{v.creator}</td>
                        <td>{v.subject}</td>
                        <td>{v.priority}</td>
                        <td>{v.description}</td>
                        <td>{v.asignee}</td>
                    </tr>)
                })
            }
        </Table>
        </div>
    )
}

export default Home;