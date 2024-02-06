
import ListingContext from "./ListingContext";
import { useState } from "react";

export default function ListingState(props) {

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  let [list, setList] = useState([]);

  const [search, setSearch] = useState({
    keyword:"",
    results:[],
 })


  // get All Listing
  const getListing = async () => {
    //  API Call
    const response = await fetch(`${serverUrl}/listings`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json)
    setList(json);
  }


  // Add listing
  const addListing = async (title, description, image, price, location, country ) => {
    //  API Call  
    const response = await fetch(`${serverUrl}/listings`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
         "auth-token" : localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, image, price, location, country}),  // body data type must match "Content-Type" header
    })
        console.log("Adding a new listing")
        const newList = {
          "title": title,
          "description": description,
          "image": image,
          "price": price,
          "location": location,
          "country": country,      
        }
        setList(list.concat(newList));
  }


  // Delete listng
  const deleteListing = async (id ) => {
    //  API Call
    const response = await fetch(`${serverUrl}/listings/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token" :  localStorage.getItem("token")
      },
    });
    
    const newList = list.filter((ele) => { return ele._id !== id });
    setList(newList);
    
  }


  return (
    <ListingContext.Provider value={{ list, addListing, deleteListing, getListing , search , setSearch}}>
      {props.children}
    </ListingContext.Provider>
  )
}