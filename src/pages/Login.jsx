import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../firebase.svg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // signed in 
                const user = userCredential.user;
                navigate('/dashboard');
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });


    };

    function getYear() {
        return new Date().getFullYear();
    }

    return (
        <>
            <main >
                <section>
                    <div>
                        <div style={{ 'text-align': 'center' }}>
                            <h2> Todo Login </h2>
                            <img src={logo} width='100px' height='50px' alt='firebase logo'/>
                            <br /><br />
                        </div>

                        <form className='login'>
                            <div>
                                <label htmlFor="email">Email address</label>
                                <br />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <br /><br />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <br /><br />
                            </div>

                            <br /><br />

                            <div style={{ 'text-align': 'center' }}>
                                <button id='login' onClick={handleLogin}>Login</button>
                            </div>

                            <br /><br />

                            <div style={{ 'text-align': 'center' }}>
                                <label>No account yet?&nbsp;&nbsp;</label>
                                <Link to="/signup">Sign up</Link>
                            </div>
                        </form>

                    </div>
                </section>
            </main>

            <br /><br />

            <footer style={{ 'text-align': 'center' }}>
                &copy;{getYear()} Shubhrendu Tripathi
            </footer>
        </>
    );
};

export default Login;
