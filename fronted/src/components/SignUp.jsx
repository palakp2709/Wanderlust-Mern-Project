import {  useState } from "react";

import { useNavigate , useLocation} from "react-router-dom";

export default function SignUp(props) {

    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const nav = useNavigate();
    const location = useLocation();

    const [credentials , setCredentials] = useState({
        username : "",
        email : "",
        password : ""
    });

   
    const handleSubmit = async  (e) => {
            e.preventDefault();
            const response  = await fetch(`${serverUrl}/user/signup` , {
            method : "POST",
            headers : {
              "Content-Type": "application/json",
            }
            , body : JSON.stringify({username: credentials.username , email : credentials.email, password : credentials.password }),
   
        })
        const json = await response.json();
        console.log(json)
        if(json.success == true ){
            props.showAlert("Welcome to Wanderlust!" ,"success") 
            //save the data in localstorage 
            localStorage.setItem("token" , json.authToken) 
            nav(location?.state?.from ? location?.state?.from : "/"  )
        }else{
             props.showAlert(`Invalid Credentials` ,"danger");  
         }
      };

      const handleChange = (e ) => {
        setCredentials( (preCred) => {
           return {...preCred , [e.target.name] : e.target.value}
     })};
     
    return (
        <div className="row mt-3">
            <div className="col-6 offset-3">
                <h1>SignUp on Wanderlust</h1>
                <form className="need-validation" onSubmit={handleSubmit}>
                    <div className="mb-3 was-validated" > 
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                        type="text" 
                        id="username"
                        name="username"
                        className="form-control"
                        onChange={handleChange}
                        value={credentials.username}
                        required
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="mb-3 was-validated" > 
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                        type="email" 
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                        value={credentials.email}
                        required
                        />
                    </div>
                    <div className="mb-3 was-validated" > 
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                        type="password" 
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                        value={credentials.password}
                        required
                        />
                    </div>
                    <button className="btn btn-success" type="Submit" >SignUp</button>
                </form>
            </div>   
        </div>
    )
}