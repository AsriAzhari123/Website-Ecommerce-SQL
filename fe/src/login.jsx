import { useState, useEffect } from "react"
import './Cart.css'
import Swal from 'sweetalert2'
export default function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    
    function login() {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Login success',
                    text: 'Welcome to my website',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login fail',
                    text: 'Username or password is incorrect',
                })
            }
        })
    }
    return (
        <>
           <h1>Login</h1>
           <div>
                <label>Username</label>
                <input type="text" onChange={
                    (e) => {
                        setusername(e.target.value)
                    }
                }/>

                <label>Password</label>
                <input type="password" onChange={
                    (e) => {
                        setpassword(e.target.value)
                    }
                }/>

                <button onClick={login}>Login </button>

                <button> <a href="/register">Register</a></button>
           </div>
        </>
    )
}

