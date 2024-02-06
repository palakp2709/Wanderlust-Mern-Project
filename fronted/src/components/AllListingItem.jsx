import { Link } from "react-router-dom";
import "./AllListingItem.css"


export default function AllListingItem(props) {

    const { item } = props;
     
    return (
            <Link to={`/showListing/${item._id}`} className="listing-link" >
            <div className="card listing-card col mt-3" > 
                <div className="card-body">
                    <img src={item.image.url} alt="image" className="card-img-top"/>
                    <div className="card-img-overlay"></div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">
                         &#8377; {item.price} / night

                    </p>   
                </div>
            </div>
            </Link>
    )
}