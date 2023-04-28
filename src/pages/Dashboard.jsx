import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;


    function handleLogout() {
        signOut(auth).then(() => {
            // signout successful
            navigate('/');
            console.log('signed out successfully');
        })
        .catch((error) => {
            // error
            console.log(error);
        });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // user is signed in
                const uid = user.uid;
                console.log("Dashboard: uid", uid);
            } else {
                // user is signed out
                console.log('Dashboard: user is logged out');
                navigate('/');
            }
        })
    }, [auth, navigate]);

    return (
        <>
            <nav>
                <p>
                    Welcome Home, {user?.email}!
                </p>

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                
            </nav>
        </>
    )
};

export default Dashboard;
