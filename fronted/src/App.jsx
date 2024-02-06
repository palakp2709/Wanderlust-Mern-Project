
import Navbar from './components/Navbar'
import AllListing from './components/AllListings';
import AddNewListing from './components/AddListing';
import ListingState from './context/ListingState';
import Footer from "./components/Footer"
import Home from './components/home';
import ListingDetails from './components/ListingDetails';
import EditListing from './components/EditListing';
import Login from './components/Login';
import SignUp from './components/SignUp';
import PrivateRoutes from './utils/PrivateRoutes';
import Alert from './components/Alert';

import SearchBarItem from './components/SearchBarItem';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';



import './App.css'

function App() {
   
   let [alert, setAlert] = useState(null);
   const showAlert = (message , type )=> {
      setAlert({
        message : message,
        type :  type
      })
      setTimeout( ()=>{
         setAlert(null)
      },4000)
   }
  return (
   
    <ListingState>
   
    <Router>
     <Navbar showAlert={showAlert}/>
     <Alert alert={alert}/>
     <div className='contain-1'>
     <div className='container'>
     <Routes>
          <Route  element={ <PrivateRoutes /> }>
                <Route exact path="/allListing" element= { <AllListing />} /> 
                <Route exact path="/newlisting" element={ <AddNewListing showAlert={showAlert}/> } />  
                <Route exact path="/deleteListing" element={<Home  showAlert={showAlert}/>}  />
                <Route exact path="/editListing/:id" element={<EditListing showAlert={showAlert}/> } /> 
                <Route exact path="/updateList/:id" element={<ListingDetails /> } />        
          </Route>
          <Route exact path="/showListing/:id" element={<ListingDetails showAlert={showAlert}/> } />
          <Route path="/" element={ <Home   showAlert={showAlert}/>}/>
          <Route path="/search" element={ <SearchBarItem />}/>
          <Route exact path="/login" element={ <Login showAlert={showAlert}  /> } />
          <Route exact path="/signup" element={<SignUp showAlert={showAlert}  /> } />
     </Routes>
     </div>
     <Footer />
     </div>
    </Router>
    
    </ListingState>
  
  )
}

export default App
