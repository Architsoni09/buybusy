import {createContext, useContext, useEffect, useState} from "react";

export const AllProductContext=createContext();

export function useAllProductsData(){
    return useContext(AllProductContext);
}
export default function CustomAllProductsContext({children}){
    const [productData,setProductData] = useState([]);
    useEffect( ()=>{
        async function fetchData(){
        const response = await fetch("https://fakestoreapi.com/products");
        const data= await response.json();
        setProductData(data);
        }
        fetchData();
    },[])
    return(
        <AllProductContext.Provider  value={productData}>
            {children}
        </AllProductContext.Provider>
    )
}