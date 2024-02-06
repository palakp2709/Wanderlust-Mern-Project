import { useContext , useEffect } from "react"
import ListingContext from "../context/ListingContext"
import AllListingItem from "./AllListingItem";

export default function AllListing(){ 

   const data = useContext(ListingContext);
   const { list , getListing} = data;

    useEffect( () => {
        getListing()
    } , [])

    return (
        <>
         
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 "> 
              {
                list.map( (el , i) => {
                    return <AllListingItem item={el} key={i}  />   ;
                })
              }
        </div> 
        </>  
    )
}