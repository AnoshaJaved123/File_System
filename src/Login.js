import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const [email, setemail] = useState('')
    const [password, setPasword] = useState('')
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch('http://localhost:5000/api/userAuth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
        const response2 = await res.json()
        console.log(response2)
        if (response2.success) {
            toast.success('Login Success', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                navigate('/dashboard')

            }, 1000);
        }
        else {
            toast.error('Try again', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="login-page">
                <div className="form">
                    <form className="login-form " action="https://www.instagram.com/developer_nikhil27/" target="_blank">
                        <h2>SIGN IN</h2>
                        <input value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder="Email" id="email" />
                        <input value={password} onChange={(e) => { setPasword(e.target.value) }} type="password" placeholder="Password" id="pass" autoComplete="off" />
                        <button type="submit" onClick={handleSubmit}>SIGN IN</button>
                        <p className="message"><a href={'/Register'}>Create account Signup?</a></p>
                    </form>
                </div>
            </div>
        </>


    )
}

export default Login
