import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseInit";

const UserDetailsContext = createContext();

export const useUserDetails = () => {
    return useContext(UserDetailsContext);
};

export default function CustomUserDetailsContext({ children }) {
    const [userDetails, setUserDetails] = useState({
        id:'',
        email: '',
        cartItems: [],
    });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchUserDetails() {
            if (!userDetails.id) return;  // Exit if email is not set

            try {
                const docRef = doc(db, "userDetails", userDetails.id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data=docSnap.data();
                    console.log(data);
                    setUserDetails(data);
                } else {
                    console.log("No Data Available!");
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUserDetails();
    }, [userDetails.id]);

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails, loading }}>
            {children}
        </UserDetailsContext.Provider>
    );
}
