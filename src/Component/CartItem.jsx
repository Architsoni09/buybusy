import React from 'react';
import {doc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../Firebase/FirebaseInit";
import {Bounce, toast} from "react-toastify";
import {useUserDetails} from "../Contexts/UserDetailsContext";
import add from '../Images/add.png';
import remove from '../Images/remove.png';
import styled from "styled-components";

const ActionImageAdd = styled.img`
    height: 65%;
    width: 12%;
    transition: all 0.1s ease-in-out;

    &:hover {
        height: 75%;
        width: 13%;
`;
const ActionImageRemove = styled.img`
    height: 65%;
    width: 12%;
    transition: all 0.1s ease-in-out;

    &:hover {
        height: 75%;
        width: 13%;
`;

function CartItem(props) {
    const {cartItem} = props;
    const {userDetails, setUserDetails} = useUserDetails();

    const removeFromCartHandler = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "userDetails", userDetails.id);
        try {
            // Update the cart items in Firestore
            const updatedCartItems = userDetails.cartItems.filter((item) => item.id !== cartItem.id);
            await updateDoc(docRef, {
                cartItems: updatedCartItems
            });

            // Update the cart items in the local state
            setUserDetails({
                ...userDetails,
                cartItems: updatedCartItems
            });
            toast.success('Item Successfully Removed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        } catch (err) {
            toast.error('Item was not removed Please Try Again!', {
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
    const removeOneItemQuantityFromCartHandler = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "userDetails", userDetails.id);

            let items = userDetails.cartItems.map((item) => {
                if (item.id === cartItem.id) {
                    item.count -= 1;
                }
                return item;
            }).filter(item => item.count > 0);

            await updateDoc(docRef, {
                cartItems: items
            });
            setUserDetails({
                ...userDetails,
                cartItems: items
            })
            toast.success('Item Successfully Removed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        } catch (err) {
            toast.error('Item was not removed Please Try Again!', {
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
    const addItemToCartHandler = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "userDetails", userDetails.id)
        let updatedCart = userDetails.cartItems.map((item) => {
            if (item.id === cartItem.id) {
                item.count += 1;
            }
            return item;
        })
        try {
            await setDoc(docRef, {
                ...userDetails,
                cartItems: updatedCart
            });

            await setUserDetails({
                ...userDetails,
                cartItems: updatedCart
            });

            toast.success('Item Successfully Added!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        } catch (err) {
            toast.error('Item was not added Please Try Again!', {
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
        <div
            style={{height: '500px', width: '30%'}}
            className="d-flex bg-white ms-2 mb-5 text-white rounded p-3 flex-column w-25 justify-content-center align-items-center overflow-hidden"
        >
            <img
                style={{width: '100%', minHeight: '40%', maxHeight: '50%', objectFit: 'contain'}}
                src={cartItem.image}
                alt={cartItem.title}
            />
            <div className="d-flex text-black mt-1 justify-content-center align-items-center w-100"><h4
                className="mt-3">{cartItem.title}</h4></div>
            <div className="d-flex text-black mt-5 justify-content-between align-items-center w-100">
                <div><h3><b>${cartItem.price}</b></h3></div>
                <ActionImageRemove className="rounded-circle" onClick={removeOneItemQuantityFromCartHandler}
                                   src={remove} alt="Remove"/>
                <div><h3><b>{cartItem.count}</b></h3></div>
                <ActionImageAdd className="rounded-circle" onClick={addItemToCartHandler} src={add} alt="Add"/>
            </div>
            <button type="button" onClick={removeFromCartHandler} className="w-75 btn btn-outline-danger mt-3">Remove
                From Cart
            </button>
        </div>
    );
}

export default CartItem;