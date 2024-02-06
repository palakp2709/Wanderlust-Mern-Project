import { useContext } from "react"
import ListingContext from "../context/ListingContext";
import { Link } from "react-router-dom";

const SearchBarItem = () => {
  
   const data = useContext(ListingContext);
   const { search , setSearch} = data;
      return(
        <>
       
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 "> 
         {search?.results.length < 1 ? <div className="alert alert-danger offset-3 mt-5 w-50 text-center" >No Result Found</div>: 
         search?.results.map( (p , i ) =>(
        
          <Link to={`/showListing/${p._id}`} className="listing-link" >
          <div className="card listing-card col mt-3"  key={i} > 
           <div className="card-body">
              <img src={p.image.url} alt="image" className="card-img-top"/>
              <div className="card-img-overlay"></div>
              <h5 className="card-title">{p.title}</h5>
              <p className="card-text">
                  &#8377; {p.price} / night

              </p> 
            </div>  
          </div>
        </Link>
      
        ))}
      </div>
     
      </>
      )
}

export default SearchBarItem