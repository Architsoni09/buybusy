import React from 'react';
import {useUserDetails} from "../Contexts/UserDetailsContext";
import OrderTable from "../Component/OrderTable";

function Orders(props) {
    const {userDetails,setUserDetails}=useUserDetails();
    const {orders}=userDetails;

    return (
        <div style={{minHeight:'87vh',height:'auto'}} className="w-100 d-flex flex-column justify-content-center align-items-center bg-black">
            <div style={{height:'20%'}} className="d-flex mb-3 text-primary justify-content-center align-items-center w-50">
                <h1>Your Orders</h1>
            </div>
                {orders.map((order,index)=><OrderTable key={index} order={order}/>)}

        </div>
    );
}

export default Orders;