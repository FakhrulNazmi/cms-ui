import React, { Fragment, useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { toast } from "react-toastify"

const Login = ({ setAuth }) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const { username, password } = inputs

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async(e) => {
        e.preventDefault()
        try {
            const body = { username, password }
            const response = await fetch('http://localhost:27017/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()
            if (parseRes.token) {
                // Assuming a successful response contains a token
                localStorage.setItem("token", parseRes.token); // Save the token locally
                setAuth(true); // Set user as authenticated
                navigate('/dashboard'); // Redirect to the dashboard
                toast.success("Login Sucessfully!")
            } else {
                setAuth(false);
                toast.error(parseRes.message || "Login failed. Please try again.");
            }
            console.log(parseRes)
            
        } catch (error) {
            console.error(error.message)
            toast.error("An error occurred during login.");
        }
    }


    return (
        <Fragment>
            <h1>Login</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder='Username' 
                    className="form-control my-3" 
                    value={username} 
                    onChange={e => onChange(e)}
                /> 
                <input type="passwword" name="password" placeholder='Password' className="form-control my-3" value={password} onChange={e => onChange(e)}/> 
                <button  className='btn btn-success btn-block' >Login</button>
            </form>
            <Link to="/register">Register</Link>
        </Fragment>
  )
}

export default Login

