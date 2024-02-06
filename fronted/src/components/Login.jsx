import { useNavigate  , useLocation} from "react-router-dom";
import { useState  } from "react"

export default function Login(props){
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const nav = useNavigate();
    const location = useLocation();

    const [credentials , setCredentials] = useState({
        username : "",
        password : ""
    });

   
    const handleSubmit = async  (e) => {
            e.preventDefault();
            const response  = await fetch(`${serverUrl}/user/login` , {
            method : "POST",
            headers : {
              "Content-Type": "application/json",
            }
            , body : JSON.stringify({username: credentials.username ,  password : credentials.password }),
   
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

    return(
        <div className="row mt-3">
        <div className="col-6 offset-3">
            <h1>Login on wanderlust</h1>
            <form className="need-validation" onSubmit={handleSubmit}>

                <div className="mb-3 was-validated" > 
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                    type="text" 
                    id="username"
                    name="username"
                    className="form-control"
                    onChange={handleChange}
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
                    required
                    />
                </div>
                <button className="btn btn-success"  type="Submit" >Login</button>
            </form>
        </div>   
    </div>
    )
}