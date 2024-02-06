import { useState } from "react";
import { useContext } from "react"
import ListingContext from "../context/ListingContext"

import { useNavigate } from "react-router-dom";

export default function AddNewListing(props) {
   const nav = useNavigate();
    const data = useContext(ListingContext);
    const { addListing } = data

    let [list , setList] = useState({
        title: "" ,
        description : "",
        price : "",
        location : "",
        country : "",
    });

    const [uploadImage, setUploadImage] = useState("");

    //handle and convert it in base 64
    const handleUploadImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    };

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        if(file){
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setUploadImage(reader.result);
        }}else{
            setUploadImage("")
        }
    };
   
    const handleChange = (e) => {
      setList( (prevVal) => {
        return { ...prevVal , [e.target.name] : e.target.value}
      })
    }
    
    const handleClick = (e) => {
            e.preventDefault()
        
            addListing(list.title , list.description, uploadImage, list.price, list.location , list.country)  
            nav("/") 
            props.showAlert("Listing created successfully" , "Success")
    }

    return (
         <>   
        <div className="row">
      
            <div  className="col-md-8 offset-2 mt-3 mb-5" >
            {/* {Object.keys(formErr).length=== 0 && isSubmit ? 
            ( <div>List Created Successfully!</div>) : <pre>{JSON.stringify(list , undefined , 2)}</pre>
            } */}
            <h2>Create Listing</h2>
             
            <form   className="needs-validation" onSubmit={handleClick} encType="multipart/form-data"> 
            <div className="mb-2  was-validated" >
                <label htmlFor="title" className="form-label">Title</label>
                <input 
                id="title" 
                placeholder="Add a catchy title" 
                type="text" 
                className="form-control" 
                onChange={handleChange}
                name="title"
                value={list.title}
                required
                /> 
                <div className="valid-feedback">Title looks good!</div>
            </div>
           
           <div className="mb-2 was-validated">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                name="description" 
                className="form-control " 
                id="description" 
                onChange={handleChange}
                value={list.description}
                required
                >     
                </textarea>  
                <div className="invalid-feedback">Please write short description</div>
            </div>

           <div className="mb-2 was-validated">
                <label htmlFor="image" className="form-label">Upload Image</label>
                <input 
                name="uploadImage"
                type="file" 
                accept="image/"
                id="image" 
                className="form-control" 
                onChange={handleUploadImage}
                
                />
           </div> 
           
    
            <div className="row ">
                <div className="col-md-4 was-validated">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input 
                    type="number"
                    id="price" 
                    placeholder="2200" 
                    className="form-control" 
                    onChange={handleChange}
                    name="price"
                    value={list.price}
                    required
                    />
                    <div className="invalid-feedback">Price should be valid</div>
                </div>

                <div className=" col-md-8 was-validated">
                    <label htmlFor="country" className="form-label">Country</label>
                    <input 
                    type="text" 
                    id="country" 
                    placeholder="India" 
                    className="form-control "    
                    onChange={handleChange}
                    name="country"
                    value={list.country}
                    required
                />
                    <div className="invalid-feedback">Country name should be valid</div>
               </div>
            </div>
           

            <div className="mb-2 was-validated">
                <label htmlFor="location" className="form-label">Location</label>
                <input 
                type="text" 
                id="location" 
                placeholder="Jaipur ,Rajasthan" 
                className="form-control" 
                onChange={handleChange}
                name="location"
                value={list.location}
                required
                />
                <div className="invalid-feedback">Location should be valid</div>
            </div> 
            <button  type="submit"  className="btn btn-primary" >Add</button>
            </form>
            
            </div>
        </div>
        
        </>
    )
}