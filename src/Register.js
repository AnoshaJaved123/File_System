import { useState } from 'react'
import axios from 'axios';

const Register = () => {

    const [namedata, setName] = useState('')
    const [email, setemail] = useState('')
    const [password, setPasword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(namedata, email, password)
        // let payload = { name: namedata, emaildata: email, passworddata: password };

        // const response = await axios.post('http://localhost:5000/api/userAuth/createuser', {
        //     payload
        // });
        // console.log(response.data);
        fetch('http://localhost:5000/api/userAuth/createuser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                namedata, email, password
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
            })
            .catch(err => {
                console.error(err)
            })

    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form " action="https://www.instagram.com/developer_nikhil27/" target="_blank">
                    <h2>SIGN UP</h2>
                    <input value={namedata} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Username" id="user" />
                    <input value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder="Email" id="email" />
                    <input value={password} onChange={(e) => { setPasword(e.target.value) }} type="password" placeholder="Password" id="pass" autoComplete="off" />
                    <button type="submit" onClick={handleSubmit}>SIGN UP</button>
                    <p className="message"><a href={'/login'}>Already have account Login?</a></p>
                </form>
            </div>
        </div>


    )
}

export default Register
