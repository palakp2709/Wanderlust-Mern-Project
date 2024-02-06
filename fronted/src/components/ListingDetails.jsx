import { useContext, useEffect, useState } from "react"
import ListingContext from "../context/ListingContext"
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import "./ListingDetails.css"
import {useNavigate} from "react-router-dom";


export default function ListingDetails( props) {
   const serverUrl = import.meta.env.VITE_SERVER_URL;
   const {id} = useParams();
   const navigate = useNavigate();

   const data = useContext(ListingContext);
   const {deleteListing} = data;
  

   const [list, setList] = useState({
      title : "",
      description : "",
      image : "",
      price : "",
      location : "",
      country : "",
      reviews : "",
      owner: "",
   })

   
   const [review , setReview] = useState([]);
   const [user , setUser] = useState({
      _id : "",
      username : "",
      email : "",
   });
   const getUser = async () => {
         const res = await fetch(`${serverUrl}/user/getuser` , {
            method : "GET",
            headers : {
               "Content-Type": "application/json",
               "auth-token" : localStorage.getItem("token")
            }
         });
         const json = await res.json();
         console.log(json);
        setUser(json)
   }

   useEffect( ()=>{
      getListingByID();
      getUser();
   },[])


   const getListingByID = async (props) => {
      const response = await fetch(`${serverUrl}/listings/${id}`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
      } );
      const json = await response.json();
      console.log(json)
      setList(json);
    }
  

    const getReviewByID = async (comment, rating, createdAt)=> {
      const res = await fetch(`${serverUrl}/listings/${id}/reviews/createReview` , {
         method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" : localStorage.getItem("token")
        },
        body: JSON.stringify({ comment, rating , createdAt }), 
          });
      console.log("Adding a review")
      const l = {
         "comment" : comment,
         "rating" : rating ,
         "createdAt" : createdAt
           
      }
      setReview(review.concat(l));
      console.log(l)
      }

   
    
     const handleChange = (e) => {
      setReview( (preReview) => {
         return {...preReview , [e.target.name] : e.target.value}
      })
     }

     const handleclick = () => {
           getReviewByID(review.comment , review.rating , review.createdAt)
           navigate(`/showListing/${id}`)
     }
   
 
       //DeleteReview
       const deleteReview = async (id , reviewId)=> {
         const response = await fetch(`${serverUrl}/listings/${id}/reviews/${reviewId}` , {
           method:"DELETE",
           headers : {
              "content-type" : "application/json",
           },
         })
        console.log(id)
        console.log(reviewId)
         console.log("successfully deleted review");
          const updateReview = review.filter( (el )=> {return el._id !== reviewId})
          setReview(updateReview)    
       }

   return (
      <div>
        
         <div className="row mt-3" >

            <div className="col-8 offset-2">
               <div className="card listing-card" > 
                  <div className="card-body">
                        <h2 className="card-title">{list.title}</h2>  
                        <img src={list.image.url} alt="image" className="card-img-top show-img"/>
                        <div className="card-img-overlay"></div>
                        
                        <p className="card-text">
                          <i>Owned By : {list.owner.username}</i>
                          <br />
                         {list.description}   <br />
                          &#8377; {list.price} / night   <br />
                          {list.location}   <br />
                          {list.country}
                        </p>     
                  </div>
               </div>
                { user && user._id == list.owner._id?
                 <div className="d-flex">
                 <Link className="nav-link  del-btn" to="/deleteListing"  type="submit" onClick={()=>{deleteListing(list._id) ; props.showAlert( "deleted successfully","success") ;}}>Delete</Link> 
                 <Link className="nav-link  del-btn mx-3" to={`/editListing/${list._id}`}  type="submit" >Edit</Link>    
                 </div>  : ""}
               
  
            </div>

            <div className="col-8 offset-2 mb-3 mt-3">
             { localStorage.getItem("token") ? <>
                  <h4>Leave a Review</h4>
                  <form  className="needs-validation" onSubmit={handleclick} >

                     <div className="mb-3 mt-3 was-validated">
                        <label htmlFor="rating" className="form-label" >Rating</label>
                         <fieldset className="starability-slot">
                              <input type="radio"  id="no-rate" className="input-no-rate form-input" name="rating" value="1" checked aria-label="No rating." onChange={handleChange} />
                              <input type="radio"  id="first-rate1" name="rating" value="1" onChange={handleChange}  />
                              <label htmlFor="first-rate1" title="Terrible">1 star</label>
                              <input type="radio"  id="first-rate2" name="rating" value="2" onChange={handleChange} />
                              <label htmlFor="first-rate2" title="Not good">2 stars</label>
                              <input type="radio" id="first-rate3" name="rating" value="3" onChange={handleChange}  />
                              <label htmlFor="first-rate3" title="Average">3 stars</label>
                              <input type="radio" id="first-rate4" name="rating" value="4" onChange={handleChange} />
                              <label htmlFor="first-rate4" title="Very good">4 stars</label>
                              <input type="radio" id="first-rate5" name="rating" value="5" onChange={handleChange} />
                              <label htmlFor="first-rate5" title="Amazing">5 stars</label>
                           </fieldset>
                     </div>

                      <div className="mb-3 mt-3 was-validated">
                        <label htmlFor="comment"  className="form-label">Comments</label>
                        <textarea 
                        name="comment" 
                        value={review.comment}
                        id="comment" cols="30" rows="4" 
                        className="form-control"
                        onChange={handleChange}  
                        required
                        >   
                        </textarea>
                        <div className="invalid-feedback">Please add some comments for review!</div>
                      </div>

                      <button  className="btn btn-outline-dark" type="submit" >Submit</button>
                  </form>
                  </>: ""}
                  
            </div>

            <div className="col-9 offset-2 mb-3 mt-3">
               <p> <b>All Reviews</b></p>
               <div className="row">
               {list.reviews.length  ? (
                  list.reviews.map((review , i) => {
                     return  <div className="card col-5 mb-3 ms-3" key={i}>  
                           <div className="card-body">
                              <h5 className="card-title">{review.author.username}</h5>
                              <p className="starability-result card-text" data-rating={review.rating}> </p> <br />
                              <p className="card-text"> {review.comment}</p>
                              <form onSubmit={handleclick}>
                              { user && user._id == review.author._id ?
                              <button className="btn  btn-dark" type="submit" onClick={()=> {deleteReview( list._id , review._id)}}> Delete </button>   
                              : "" }
                           </form>
                          
                           </div>
                           
                              
                     </div>
                  })
               ) : (<p>NO review for this product</p>)}
               </div>
            </div>
              
         </div>  
      </div>
   )
}