import React, {useEffect, useState} from 'react';
import {useUserDetails} from "../Contexts/UserDetailsContext";
import CartItem from "../Component/CartItem";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../Firebase/FirebaseInit";
import {Bounce, toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function Cart(props) {
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const {userDetails, setUserDetails} = useUserDetails();
    const navigate=useNavigate();
    useEffect(() => {
        // Calculate total cart price when userDetails.cartItems changes
        if (userDetails.cartItems.length > 0) {
            const totalPrice = userDetails.cartItems.reduce((acc, item) => {
                return acc + (item.count * item.price);
            }, 0);
            setTotalCartPrice(totalPrice.toFixed(2));
        } else {
            setTotalCartPrice(0); // Handle case when cart is empty
        }
    }, [userDetails.cartItems]); // Depend on userDetails.cartItems

    const buyAllTheCartItemsHandler=async ()=>{

        const docref = doc(db,"userDetails",userDetails.id);

        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
            const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
            return `${day}-${month}-${year}`;
        };

        let order={
            date:formatDate(new Date()),
            items:userDetails.cartItems,
            totalPrice:totalCartPrice
        }
        try {
            await setDoc(docref, {
                ...userDetails,
                cartItems: [],
                orders: [...userDetails.orders, order]
            });
            setUserDetails({
                ...userDetails,
                cartItems: [],
                orders: [...userDetails.orders, order]
            });
            navigate("/orders")
            toast.success('Order Successfully Placed!', {
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
        catch (err){
            console.log(err);
            toast.error('Order was not placed,Please Try Again!', {
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
    return (
        <div style={{ minHeight: '87%' }} className="container-fluid bg-black d-flex flex-column align-items-center w-100">
            <div className="d-flex w-100 mt-5">
                <div style={{ width: '20%', maxHeight: '25%' }} className="h-25 sticky-top d-flex p-3 flex-column bg-white rounded text-black align-items-center">
                    <div className="mb-3">
                        <label htmlFor="customRange1" className="form-label mb-3 fs-2">Details</label>
                        <h5>{`Total Price: $ ${totalCartPrice}/-`}</h5>
                    </div>
                    <div>
                        <button type="button" onClick={buyAllTheCartItemsHandler} className="btn btn-outline-success">Purchase</button>
                    </div>
                </div>
                <div style={{ width: '80%' }} className="d-flex justify-content-around flex-wrap">
                    {userDetails.cartItems.length > 0 ?
                        userDetails.cartItems.map((cartItem, index) => (
                            <CartItem key={index} cartItem={cartItem}/>
                        )) : <div className="w-100 d-flex text-white justify-content-center align-items-center"><h2>Your Cart Is Empty</h2></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Cart;
