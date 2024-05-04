import { useState, useEffect } from "react"
import './Cart.css'
import Swal from 'sweetalert2'

// buatkan saya page register

export default function Register() {


    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")


    function register() {
        fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password, email, fullname })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Register success',
                    text: 'Welcome to my website',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Register fail',
                    text: 'Username or password is incorrect',
                })
            }
        })
    }
    return (
        <>
           <h1>Register</h1>
           <div>
                <label>Email</label>
                <input type="email" onChange={
                    (e) => {
                        setemail(e.target.value)
                    }
                }/>

                <label>Password</label>
                <input type="password" onChange={
                    (e) => {
                        setpassword(e.target.value)
                    }
                }/>

                <button onClick={register}>Register </button>

                <button> <a href="/login">Login</a></button>
           </div>
        </>
    )
}