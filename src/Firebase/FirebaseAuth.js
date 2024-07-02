import React, {useRef, useState} from 'react';
import { auth } from './FirebaseInit';  // Import the initialized auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {Navigate, useNavigate, useOutletContext} from "react-router-dom";
import {useUserDetails} from "../Contexts/UserDetailsContext";
import {Bounce, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function FirebaseAuth(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {signInMode,setSignInMode,setIsUserAuthenticated} = useOutletContext();
    const {userDetails,setUserDetails}=useUserDetails();
    const navigate=useNavigate();
    const consentRef=useRef();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (consentRef.current && !consentRef.current.checked){
                throw new Error('Consent is required to sign up');
            }
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // User signed up successfully
            console.log('User signed up successfully!');
            setError(null);
            setIsUserAuthenticated(true);

            // Get the user details
            const user = userCredential.user;
            const userDetails = { id: user.uid, email, cartItems: [],orders:[] }; // Include UID here

            // Set user details in context or state
            setUserDetails(userDetails);
            toast.success('You Are Successfully Signed Up!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            // Navigate to the desired route
            navigate('/');

        } catch (error) {
            setError(error.message);
            toast.error('Invalid Credentials Please Try Again!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

        }
        setLoading(false);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Sign in with email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // User signed in successfully
            console.log('User signed in successfully!');
            setError(null);
            setIsUserAuthenticated(true);

            // Get the user details
            const user = userCredential.user;
            const userDetails = { id: user.uid, email, cartItems: [],orders:[] }; // Include UID here

            // Set user details in context or state
            setUserDetails(userDetails);

            // Navigate to the desired route
            navigate("/");
            toast.success('You Are Successfully Signed In!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } catch (error) {
            setError(error.message);
            toast.error('Something Went Wrong Please Try Again!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '90vh',height:'auto', color: '#157347' }} className="container-fluid bg-black d-flex flex-column justify-content-center align-items-center w-100 ">
            <form className="w-25 h-50" onSubmit={signInMode ? handleSignIn : handleSignUp}>
                {!signInMode && (
                    <div className="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" />
                    </div>
                )}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {!signInMode && (
                    <div className="mb-3 form-check">
                        <input ref={consentRef} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">I am Willing To Sign Up</label>
                    </div>
                )}
                <button type="submit" className="btn btn-success">{signInMode ? "Sign In" : "Sign Up"}</button><br />
                {signInMode && <span className="mt-3 w-100 btn btn-outline-warning" onClick={() => setSignInMode(!signInMode)}>Or Sign Up Instead</span>}
            </form>
            <br/>
            {error && <p className="mt-2 text-danger">{error}</p>}
        </div>
    );
}

export default FirebaseAuth;
