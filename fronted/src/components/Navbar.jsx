import { Link } from "react-router-dom"
import  "./Navbar.css"
import { useNavigate  } from "react-router-dom"
import SearchBar from "./SearchBar";

export default function Navbar(props) {

  const navigate = useNavigate();

  const logout =() => {
    localStorage.removeItem("token")
    props.showAlert("logged out successfully" , "success")
    navigate("/login")
  }
    return (
      
        <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><i className="fa-regular fa-compass"></i></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/">Explore</Link>   
            </div>

            <div className="navbar-nav ms-auto">
              <SearchBar />          
            </div>
           
           
            <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/newlisting">Airbnb your home</Link>
            { localStorage.getItem("token") ?  <button className="btn " onClick={logout} ><b>Log out</b></button> : 
            <>                
              <Link className="nav-link active" aria-current="page" to="/signup"><b>Sign up</b></Link>
              <Link className="nav-link" to="/login" ><b>Log in</b></Link> </>  }
            </div> 
          </div>    
        </div>
      </nav>
    )
}