import React, { useState } from 'react';
import styles from './Navbar.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, Outlet, useNavigate, useOutletContext} from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {useUserDetails} from "../../Contexts/UserDetailsContext";
import {Bounce, toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
function Navbar(props) {
    const [signInMode, setSignInMode] = useState(true);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const {userDetails,setUserDetails}=useUserDetails();
    const navigate= useNavigate();
    const handleSignOut = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            await signOut(auth);
            setSignInMode(false);
            setIsUserAuthenticated(false);
            navigate("/");
            setUserDetails({
                id:'',
                email: '',
                cartItems: [],
                orders: []
            });
            setSignInMode(true);
            setIsUserAuthenticated(false);
            toast.success('Log Out Successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } catch (error) {
            console.error('Error signing out: ', error);
            toast.error('Please Try Again!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }
    const handleMyOrders=(e)=>{
        e.preventDefault();
        navigate("/orders");
    }
    const handleCart=(e)=>{
        e.preventDefault();
        navigate("/cart");
    }

    return (
        <>
            <nav style={{ height: '13%' }} className="navbar navbar-expand-lg bg-black bg-gradient d-flex">
                <div className="container-fluid h-25">
                    <div>
                        <Link to="/" className="navbar-brand mx-5 px-5 fs-2" style={{color: '#CD7F32'}}>
                            <FontAwesomeIcon icon="fa-solid fa-store" size="1x" style={{color: "#CD7F32",paddingRight:'9px'}}  />
                             Buy Busy
                        </Link>
                    </div>
                    <ul className="nav justify-content-end  px-5">
                        <li className="nav-item">
                            <Link to="/" className="d-flex justify-content-between align-items-center nav-link fs-3" style={{color: '#00ff40'}}>
                                <FontAwesomeIcon icon="fa-solid fa-house"  size="1x" style={{color: "#00ff40",paddingRight:'9px'}} />
                                Home
                            </Link>
                        </li>

                        {isUserAuthenticated &&
                            <li className="nav-item fs-3">
                                <Link to="/" onClick={handleMyOrders} className=" d-flex justify-content-between align-items-center nav-link"
                                      style={{color: 'aqua'}} aria-disabled="true">
                                    <FontAwesomeIcon icon="fa-solid fa-bag-shopping" style={{color: 'aqua',paddingRight:'9px'}} />
                                    My Orders
                                </Link>
                            </li>}
                        {isUserAuthenticated
                            &&
                            <li className="nav-item fs-3">
                                <Link to="/" onClick={handleCart} className="nav-link"
                                      style={{color: 'yellow'}} aria-disabled="true">
                                    <FontAwesomeIcon icon="fas fa-shopping-cart" size="1x" style={{color: "#FFD43B",paddingRight:'9px'}} />
                                    Cart
                                </Link>
                            </li>
                        }
                        {!isUserAuthenticated?<li className="nav-item fs-3">
                                <Link to="auth" onClick={() => setSignInMode(true)} className="nav-link"
                                      style={{color: 'gold'}} aria-disabled="true">Login</Link>
                            </li>:
                            <li className="nav-item fs-3">
                                <Link to="/" onClick={handleSignOut} className="nav-link"
                                      style={{color: 'red'}} aria-disabled="true">
                                    <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" size="1x" style={{color: "red",paddingRight:'9px'}} />
                                    LogOut
                                </Link>
                            </li>}
                    </ul>
                </div>
            </nav>
            <Outlet context={{signInMode, setSignInMode, isUserAuthenticated, setIsUserAuthenticated}}/>
        </>
    );
}

export default Navbar;
