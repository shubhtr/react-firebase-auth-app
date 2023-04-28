import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import logo from '../firebase.svg';


function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // success
                const user = userCredential.user;
                console.log(user);
                navigate('/login');
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
                        <div>
                            <div style={{ 'text-align': 'center' }}>
                                <h2> Todo Signup </h2>
                                <img src={logo} width='100px' height='50px' alt='firebase logo' />
                                <br /><br />
                            </div>

                            <form className='login'>
                                <div>
                                    <label htmlFor="email">Email address</label>
                                    <br />
                                    <input
                                        id="email"
                                        type="email"
                                        label="Email address"
                                        value={email}
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
                                        type="password"
                                        label="Create password"
                                        value={password}
                                        required
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <br /><br />
                                </div>

                                <br /><br />

                                <div style={{ 'text-align': 'center' }}>
                                    <button id='login' type="submit" onClick={handleSubmit}>Sign up</button>
                                </div>

                                <br /><br />

                                <div style={{ 'text-align': 'center' }}>
                                    <label>Already have an account?&nbsp;&nbsp;</label>
                                    <Link to="/login">Login</Link>
                                </div>
                            </form>
                        </div>
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

export default Signup;
