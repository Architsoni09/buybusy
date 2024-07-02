import React, {useEffect, useState} from 'react';
import { useUserDetails } from "../Contexts/UserDetailsContext";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseInit";
import {Bounce, toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function ProductCard(props) {
    const { product } = props;
    const { userDetails, setUserDetails } = useUserDetails();
    let [count,setCount]=useState(0);
    const navigate=useNavigate();
    const addToCartHandler = async (e) => {
        e.preventDefault();
        if(userDetails.id===""){
            navigate("/auth");
            toast.info('Please Login/SignUp First', {
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
            return;
        }
        const docRef = doc(db, "userDetails", userDetails.id);

        // Update the cart items in Firestore
       try {
           await setCount(count+=1);
           const productIndexInExistingCart=userDetails.cartItems.findIndex((p)=>p.id===product.id);
           (productIndexInExistingCart!==-1)?
               userDetails.cartItems[productIndexInExistingCart].count+=1:userDetails.cartItems.unshift({...product,count});
               const updatedCart = [...userDetails.cartItems];
           await setDoc(docRef, {
               ...userDetails,
               cartItems: [...updatedCart]
           });
           // Update the cart items in the local state
           await setUserDetails({
               ...userDetails,
               cartItems: [...updatedCart]
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
           });
       }
       catch (err ){
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
           await setCount(count-=1);
       }

    }


    return (
        <div style={{ height: '380px' }}
             className="d-flex bg-dark ms-2 mb-3 text-white rounded p-3 flex-column w-25 justify-content-between align-items-center overflow-hidden">
            <img
                style={{ maxWidth: '100%', maxHeight: '50%', objectFit: 'cover' }}
                src={product.image}
                alt={product.title}
            />
            <span>{product.title}</span>
            <h3><b>${product.price}</b></h3>
           <button onClick={addToCartHandler} type="button" className="w-75 btn btn-outline-primary">Add To Cart</button>
        </div>
    );
}

export default ProductCard;
