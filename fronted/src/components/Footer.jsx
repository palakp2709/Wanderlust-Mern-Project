import { Link } from "react-router-dom"
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">

            <div className="f-info">
                <div className="f-info-socials">
                    <i className="fa-brands fa-square-facebook"></i>
                    <i className="fa-brands fa-square-instagram"></i>
                    <i className="fa-brands fa-linkedin"></i>
                </div>
                <div className="f-info-brand"> &copy; Private Limited</div>
                <div className="f-info-links">
                    <Link to="/privacy" className="link">Privacy</Link>
                    <Link to="/terms" className="link">Terms</Link>
                </div>
            </div>
        </footer>

    )
}


