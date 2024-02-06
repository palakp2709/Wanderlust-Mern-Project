import "./SearchBar.css"
import { useContext } from "react"
import ListingContext from "../context/ListingContext";
import { useNavigate } from "react-router-dom";


export default function SearchBar(){
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const data = useContext(ListingContext);
    const { search , setSearch}= data;
    const nav = useNavigate();
  
    const handlesubmit = async (e) =>{
        e.preventDefault()
       try {
          const response = await fetch(`${serverUrl}/listings/search/${search.keyword}` , {
            method: "GET", 
             headers: {
               "Content-Type": "application/json",
             },
          })
          const json = await response.json();
          console.log(json)
        
            setSearch({...search, results : json});
            nav("/search");  
       } catch (error) {
         console.log(error)
       }
    };
        return (
            <>
             <form className="d-flex" role="search" onSubmit={handlesubmit}>
                <input 
                className="form-control me-2 search-input" 
                placeholder="Search destinations"
                 value={search.keyword}
                 onChange={(e) =>{setSearch({...search , keyword:e.target.value})}}
                />
                <button className="btn search-btn" type="submit" >
                    <i className="fa-solid fa-magnifying-glass"></i> 
                    Search
                </button>
              </form>

             
            </>
        )   
}