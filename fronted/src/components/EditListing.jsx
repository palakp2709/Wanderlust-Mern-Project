import {  useState , useEffect} from "react";
import "./EditListing.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


export default  function EditListing(props) {

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const {id} = useParams();

    let [list , setList] = useState({
        title: "" ,
        description : "",
        price : "",
        location : "",
        country : ""
    });

    useEffect( ()=>{
        const getListingByID = async () => {
            const response = await fetch(`${serverUrl}/listings/${id}`, {
              method: "GET", 
              headers: {
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem("token")
              },
            } );
            const json = await response.json();
            setList(json);
          }
          getListingByID()
    } , [])

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

    //Edit listng
    const editListing = async (title, description, image, price, location, country) => {
    //  API Call
    const response = await fetch(`${serverUrl}/listings/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        "auth-token" :  localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, image, price, location, country }), 
    });
    const result  = await response.json();

    for (let i = 0; i < result.length; i++) {
      if (id) {
        result[i].title = title;
        result[i].description = description;
        result[i].image = image;
        result[i].price = price
        result[i].location = location;
        result[i].country = country;
        break;
      }
    }
    setList(result) ;
    props.showAlert("Updated successfully" , "success")  
  }

    const handleChange = (e) => {      
      setList( (prevVal) => {
        return { ...prevVal , [e.target.name] : e.target.value}
      })
    }

    const handleSubmit = (e) => {
        editListing( list.title ,list.description, uploadImage ,list.price,list.location,list.country) 
        props.showAlert("Updated successfully" , "success")      
    }
  
  
    return (
        <>
            <h2>edit</h2>
            <div className="row">
                <div className="col-md-8 offset-2" >
                    <form className="needs-validation" encType="multipart/form-data" >
                        <div className="mb-2 was-validated">
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
                            <div className="invalid-feedback">Title should be valid</div>
                        </div> 

                        <div className="mb-2 was-validated">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                id="description"
                                onChange={handleChange}
                                value={list.description}
                                required
                            >
                            </textarea>
                            <div className="invalid-feedback">Please enter short description</div>
                        </div>

                        <div className="mb-2 was-validated">
                            <label htmlFor="image" className="form-label">Image Link</label>
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
                                    type="text"
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
                                    className="form-control"
                                    onChange={handleChange}
                                    name="country"
                                    value={list.country}
                                    required
                                />
                                 <div className="invalid-feedback">Country should be valid</div>
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
        
                      <Link  to={`/updateList/${id}`} className="nav-link update-btn" onClick={handleSubmit} type="submit" > Update</Link>
                    </form>

                </div>
            </div>
        </>
    )
}